package handler

import (
	"a21hc3NpZ25tZW50/utils"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/hupe1980/go-huggingface"
	"log"
	"os"
)

func ChatBot(ctx *gin.Context) {
	ic := huggingface.NewInferenceClient(os.Getenv("HUGGINGFACE_TOKEN"))
	prompt := fmt.Sprintf(`You are the AI to recommend energy usage, answer related to energy, the user's question is %s`, ctx.Param("question"))
	waitModel := true
	res, err := ic.TextGeneration(ctx, &huggingface.TextGenerationRequest{
		Inputs: prompt,
		Model:  "meta-llama/Meta-Llama-3-8B-Instruct",
		Options: huggingface.Options{
			WaitForModel: &waitModel,
		},
	})
	if err != nil {
		utils.ErrorResponse(ctx, 500, err)
	}
	log.Println(res[0])
	utils.SuccessResponse(ctx, 200, res[0])
}

func ShowChatBot(ctx *gin.Context) {
	ctx.HTML(200, "chatbot.html", nil)
}
