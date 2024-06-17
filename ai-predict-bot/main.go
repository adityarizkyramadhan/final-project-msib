package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

type AIModelConnector struct {
	Client *http.Client
}

type Inputs struct {
	Table map[string][]string `json:"table"`
	Query string              `json:"query"`
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

func handleQuery(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	file, _, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "Failed to read file", http.StatusBadRequest)
		return
	}
	defer file.Close()

	query := r.FormValue("query")
	if query == "" {
		http.Error(w, "Query is required", http.StatusBadRequest)
		return
	}

	data, err := io.ReadAll(file)
	if err != nil {
		http.Error(w, "Failed to read file", http.StatusInternalServerError)
		return
	}

	result, err := CsvToSlice(string(data))
	if err != nil {
		http.Error(w, "Failed to process CSV", http.StatusInternalServerError)
		return
	}

	payload := Inputs{
		Table: result,
		Query: query,
	}

	connector := AIModelConnector{
		Client: &http.Client{},
	}

	token := os.Getenv("HUGGINGFACE_TOKEN") // Ganti dengan token Anda yang sebenarnya
	response, err := connector.ConnectAIModel(payload, token)
	if err != nil {
		http.Error(w, "Failed to connect to AI model", http.StatusInternalServerError)
		return
	}

	// Render response as HTML
	tmpl := `
	<!DOCTYPE html>
	<html>
	<head>
		<title>Query Result</title>
	</head>
	<body>
		<h1>Query Result</h1>
		<p><strong>Answer:</strong> {{.Answer}}</p>
		<p><strong>Aggregator:</strong> {{.Aggregator}}</p>
		<p><strong>Coordinates:</strong></p>
		<ul>
			{{range .Coordinates}}
				<li>{{.}}</li>
			{{end}}
		</ul>
		<p><strong>Cells:</strong></p>
		<ul>
			{{range .Cells}}
				<li>{{.}}</li>
			{{end}}
		</ul>
		<a href="/">Back to home</a>
	</body>
	</html>
	`
	t, err := template.New("result").Parse(tmpl)
	if err != nil {
		http.Error(w, "Failed to create template", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "text/html")
	err = t.Execute(w, response)
	if err != nil {
		http.Error(w, "Failed to render template", http.StatusInternalServerError)
	}
}

func handleHome(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	tmpl := `
	<!DOCTYPE html>
	<html>
	<head>
		<title>CSV Query</title>
	</head>
	<body>
		<h1>Upload CSV and Enter Query</h1>
		<form action="/query" method="post" enctype="multipart/form-data">
			<label for="file">CSV File:</label>
			<input type="file" id="file" name="file" accept=".csv" required>
			<br>
			<label for="query">Query:</label>
			<input type="text" id="query" name="query" required>
			<br>
			<input type="submit" value="Submit">
		</form>
	</body>
	</html>
	`
	w.Header().Set("Content-Type", "text/html")
	w.Write([]byte(tmpl))
}

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}
	http.HandleFunc("/", handleHome)
	http.HandleFunc("/query", handleQuery)
	fmt.Println("Server is running on port 8080")
	http.ListenAndServe(":8080", nil)
}
