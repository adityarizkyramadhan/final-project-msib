package handler

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func ShowLoginPage(ctx *gin.Context) {
	pathLogin := "../views/login.html"
	ctx.HTML(http.StatusOK, pathLogin, nil)
}

func ShowRegisterPage(ctx *gin.Context) {
	pathRegister := "../views/register.html"
	ctx.HTML(http.StatusOK, pathRegister, nil)
}
