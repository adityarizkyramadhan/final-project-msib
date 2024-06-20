package main

import (
	"a21hc3NpZ25tZW50/config"
	"a21hc3NpZ25tZW50/handler"
	"a21hc3NpZ25tZW50/middleware"
	"a21hc3NpZ25tZW50/model"
	"a21hc3NpZ25tZW50/repositories"
	"a21hc3NpZ25tZW50/usecase"
	"encoding/json"
	"fmt"
	"html/template"
	"io"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"

	"github.com/joho/godotenv"
)

type AIModelConnector struct {
	Client *http.Client
}

type Inputs struct {
	Table        map[string][]string `json:"table"`
	Query        string              `json:"query"`
	WaitForModel bool                `json:"wait_for_model"`
}

type Response struct {
	Answer      string   `json:"answer"`
	Coordinates [][]int  `json:"coordinates"`
	Cells       []string `json:"cells"`
	Aggregator  string   `json:"aggregator"`
}

func CsvToSlice(data string) (map[string][]string, error) {
	result := map[string][]string{}

	splitByLine := strings.Split(data, "\n")

	feature := strings.Split(splitByLine[0], ",")

	for i := 0; i < len(feature); i++ {
		result[feature[i]] = []string{}
	}

	for i := 1; i < len(splitByLine); i++ {
		row := strings.Split(splitByLine[i], ",")
		for j := 0; j < len(row); j++ {
			result[feature[j]] = append(result[feature[j]], row[j])
		}
	}

	return result, nil
}

func (c *AIModelConnector) ConnectAIModel(payload interface{}, token string) (Response, error) {
	const url = "https://api-inference.huggingface.co/models/google/tapas-large-finetuned-wtq"

	bodyReq, err := json.Marshal(payload)
	if err != nil {
		return Response{}, err
	}

	req, err := http.NewRequest("POST", url, strings.NewReader(string(bodyReq)))
	if err != nil {
		return Response{}, err
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+token)

	res, err := c.Client.Do(req)
	if err != nil {
		return Response{}, err
	}

	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		return Response{}, err
	}

	fmt.Println(string(body))

	var response Response
	err = json.Unmarshal(body, &response)
	if err != nil {
		return Response{}, err
	}

	return response, nil
}

func handleQuery(c *gin.Context) {
	file, _, err := c.Request.FormFile("file")
	if err != nil {
		c.String(http.StatusBadRequest, "Failed to read file")
		return
	}
	defer file.Close()

	query := c.PostForm("query")
	if query == "" {
		c.String(http.StatusBadRequest, "Query is required")
		return
	}

	data, err := io.ReadAll(file)
	if err != nil {
		c.String(http.StatusInternalServerError, "Failed to read file")
		return
	}

	result, err := CsvToSlice(string(data))
	if err != nil {
		c.String(http.StatusInternalServerError, "Failed to process CSV")
		return
	}

	payload := Inputs{
		Table:        result,
		Query:        query,
		WaitForModel: true,
	}

	connector := AIModelConnector{
		Client: &http.Client{},
	}

	token := os.Getenv("HUGGINGFACE_TOKEN")
	response, err := connector.ConnectAIModel(payload, token)
	if err != nil {
		c.String(http.StatusInternalServerError, "Failed to connect to AI model")
		return
	}

	// Render response as HTML using template
	tmpl := `
	<!DOCTYPE html>
	<html>
	<head>
		<title>Query Result</title>
		<style>
			body {
				font-family: Arial, sans-serif;
				background-color: #f2f2f2;
				margin: 0;
			}

			.header {
				background-color: #333;
				color: #fff;
				padding: 10px;
				text-align: center;
			}

			.profile-container {
				max-width: 600px;
				margin: 20px auto;
				background-color: #fff;
				padding: 20px;
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
				border-radius: 5px;
			}

			.profile-info {
				margin-bottom: 20px;
			}

			.profile-info label {
				font-weight: bold;
			}

			.logout-btn {
				background-color: #f44336;
				color: white;
				padding: 10px 20px;
				text-align: center;
				text-decoration: none;
				display: inline-block;
				border-radius: 5px;
				cursor: pointer;
			}

			.logout-btn:hover {
				background-color: #ff6659;
			}

			.actions {
				margin-top: 20px;
				text-align: center;
			}

			.action-btn {
				background-color: #007bff;
				color: white;
				padding: 10px 20px;
				text-decoration: none;
				display: inline-block;
				border-radius: 5px;
				margin-right: 10px;
			}

			.action-btn:hover {
				background-color: #0056b3;
			}
		</style>
	</head>
	<body>
		<div class="header">
			<h1>Query Result</h1>
			<a href="/profile" class="logout-btn">Back to home</a>
		</div>

		<div class="profile-container">
			<div class="profile-info">
				<label>Answer:</label>
				<span>{{ .Answer }}</span>
			</div>
			<div class="profile-info">
				<label>Aggregator:</label>
				<span>{{ .Aggregator }}</span>
			</div>
			<div class="profile-info">
				<label>Coordinates:</label>
				<ul>
					{{ range .Coordinates }}
						<li>{{ . }}</li>
					{{ end }}
				</ul>
			</div>
			<div class="profile-info">
				<label>Cells:</label>
				<ul>
					{{ range .Cells }}
						<li>{{ . }}</li>
					{{ end }}
				</ul>
			</div>
		</div>
		<script>
			document.addEventListener("DOMContentLoaded", function() {
				const errorMessage = "{{ .ErrorMessage }}";
				if (errorMessage) {
					alert(errorMessage);
				}
			});
		</script>
	</body>
	</html>
	`

	// Prepare the data to be passed to the template
	coordinates := []string{}
	for _, coord := range response.Coordinates {
		coordinates = append(coordinates, fmt.Sprintf("(%d, %d)", coord[0], coord[1]))
	}
	dataToTemplate := struct {
		Answer       string
		Aggregator   string
		Coordinates  []string
		Cells        []string
		ErrorMessage string
	}{
		Answer:       response.Answer,
		Aggregator:   response.Aggregator,
		Coordinates:  coordinates,
		Cells:        response.Cells,
		ErrorMessage: "", // This will be filled with the actual error message if any
	}

	t, err := template.New("result").Parse(tmpl)
	if err != nil {
		dataToTemplate.ErrorMessage = "Failed to create template"
	}

	c.Header("Content-Type", "text/html")
	err = t.Execute(c.Writer, dataToTemplate)
	if err != nil {
		c.String(http.StatusInternalServerError, "Failed to render template")
	}
}

func handleHome(c *gin.Context) {
	tmpl := `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSV Query</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .container {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
            width: 400px;
        }

        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 20px;
        }

        form {
            display: flex;
            flex-direction: column;
        }

        label {
            font-weight: bold;
            margin-bottom: 8px;
            color: #333;
        }

        input[type="file"], input[type="text"] {
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 14px;
            transition: border-color 0.3s ease;
            box-sizing: border-box;
        }

        input[type="file"]:hover, input[type="text"]:hover {
            border-color: #66afe9;
        }

        input[type="submit"] {
            background-color: #4CAF50;
            color: white;
            padding: 12px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.3s ease;
        }

        input[type="submit"]:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Upload CSV and Enter Query</h1>
        <form action="/tapas-bot-query" method="post" enctype="multipart/form-data">
            <label for="file">Select CSV File:</label>
            <input type="file" id="file" name="file" accept=".csv" required>
            <label for="query">Enter Query:</label>
            <input type="text" id="query" name="query" required>
            <input type="submit" value="Submit">
        </form>
    </div>
</body>
</html>
`
	c.Header("Content-Type", "text/html")
	c.Writer.Write([]byte(tmpl))
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	r := gin.New(func(e *gin.Engine) {
		e.Use(gin.Logger())
		e.Use(gin.Recovery())
	})

	r.LoadHTMLGlob("views/*")

	db, err := config.InitDB()
	if err != nil {
		log.Fatal(err)
	}

	err = db.AutoMigrate(&model.User{}, &model.DeviceRecord{})
	if err != nil {
		log.Fatal(err)
	}

	userRepo := repositories.NewUserRepository(db)
	deviceRecordRepo := repositories.NewDeviceRecordRepository(db)
	userUsecase := usecase.NewUserUsecase(userRepo)
	deviceRecordUsecase := usecase.NewDeviceRecordUsecase(deviceRecordRepo)
	userHandler := handler.NewUserHandler(userUsecase)
	deviceRecordHandler := handler.NewDeviceRecordHandler(deviceRecordUsecase)

	r.GET("/login", userHandler.ShowLoginPage)
	r.POST("/login", userHandler.Login)
	r.GET("/register", userHandler.ShowRegisterPage)
	r.POST("/register", userHandler.Register)
	r.GET("/profile", middleware.JWTMiddleware(), userHandler.GetByID)
	r.GET("/tapas-bot", middleware.JWTMiddleware(), handleHome)
	r.POST("/tapas-bot-query", middleware.JWTMiddleware(), handleQuery)
	r.GET("/chatbot", middleware.JWTMiddleware(), handler.ShowChatBot)
	r.GET("/chatbot/:question", middleware.JWTMiddleware(), handler.ChatBot)
	r.GET("/device-record", middleware.JWTMiddleware(), deviceRecordHandler.FindAll)
	r.GET("/device-record/create", middleware.JWTMiddleware(), deviceRecordHandler.PageCreate)
	r.POST("/device-record", middleware.JWTMiddleware(), deviceRecordHandler.Create)
	r.GET("/logout", middleware.JWTMiddleware(), logout)
	if err := r.Run(":8081"); err != nil {
		log.Fatal(err)
	}
}

func logout(c *gin.Context) {
	// hapus cookie
	c.SetCookie("token", "", -1, "/", "localhost", false, true)
	c.Redirect(http.StatusTemporaryRedirect, "/login")
}
