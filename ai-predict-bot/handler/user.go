package handler

import (
	"a21hc3NpZ25tZW50/model"
	"a21hc3NpZ25tZW50/usecase"
	"a21hc3NpZ25tZW50/utils"
	"github.com/gin-gonic/gin"
	"net/http"
)

type UserHandler struct {
	userUsecase usecase.UserUsecase
}

func NewUserHandler(userUsecase usecase.UserUsecase) *UserHandler {
	return &UserHandler{userUsecase}
}

func (h *UserHandler) ShowLoginPage(ctx *gin.Context) {
	ctx.HTML(http.StatusOK, "login.html", nil)
}

func (h *UserHandler) ShowRegisterPage(ctx *gin.Context) {
	ctx.HTML(http.StatusOK, "register.html", nil)
}

func (h *UserHandler) Login(ctx *gin.Context) {
	var arg model.UserLogin
	if err := ctx.ShouldBind(&arg); err != nil {
		utils.ErrorResponse(ctx, http.StatusBadRequest, err)
		return
	}

	token, err := h.userUsecase.Login(arg)
	if err != nil {
		utils.ErrorResponse(ctx, http.StatusInternalServerError, err)
		return
	}
	ctx.SetCookie("token", "Bearer "+token.(string), 60*60*24*7, "/", "localhost", false, true)

	utils.SuccessResponse(ctx, http.StatusOK, gin.H{"token": token})
}

func (h *UserHandler) Register(ctx *gin.Context) {
	var arg model.UserRegister
	if err := ctx.ShouldBind(&arg); err != nil {
		ctx.HTML(http.StatusBadRequest, "register.html", gin.H{"Error": err.Error()})
		return
	}

	user, err := h.userUsecase.Register(arg)
	if err != nil {
		ctx.HTML(http.StatusInternalServerError, "register.html", gin.H{"Error": err.Error()})
		return
	}
	utils.SuccessResponse(ctx, http.StatusCreated, user)
}

func (h *UserHandler) GetByID(ctx *gin.Context) {
	id := ctx.MustGet("user").(float64)
	if id == 0 {
		utils.ErrorResponse(ctx, http.StatusUnauthorized, nil)
		return
	}
	// Convert float64 to uint
	user, err := h.userUsecase.GetByID(uint(id))
	if err != nil {
		utils.ErrorResponse(ctx, http.StatusInternalServerError, err)
		return
	}
	ctx.HTML(http.StatusOK, "profile.html", user)
}
