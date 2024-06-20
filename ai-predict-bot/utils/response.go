package utils

import "github.com/gin-gonic/gin"

func SuccessResponse(ctx *gin.Context, statusCode int, data interface{}) {
	ctx.JSON(statusCode, gin.H{
		"status": "success",
		"data":   data,
	})
}

func ErrorResponse(ctx *gin.Context, statusCode int, err error) {
	ctx.JSON(statusCode, gin.H{
		"status": "error",
		"error":  err.Error(),
	})
}
