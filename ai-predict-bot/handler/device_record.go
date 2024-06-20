package handler

import (
	"a21hc3NpZ25tZW50/model"
	"a21hc3NpZ25tZW50/usecase"
	"a21hc3NpZ25tZW50/utils"
	"github.com/gin-gonic/gin"
)

type DeviceRecordHandler struct {
	deviceRecordUsecase usecase.DeviceRecordUsecase
}

func NewDeviceRecordHandler(deviceRecordUsecase usecase.DeviceRecordUsecase) *DeviceRecordHandler {
	return &DeviceRecordHandler{deviceRecordUsecase}
}

func (h *DeviceRecordHandler) FindAll(ctx *gin.Context) {
	pathHtml := "show_device.html"
	userId := uint(ctx.MustGet("user").(float64))
	deviceRecords, err := h.deviceRecordUsecase.FindAll(userId)
	if err != nil {
		ctx.HTML(500, pathHtml, gin.H{"Error": err.Error()})
		return
	}
	ctx.HTML(200, pathHtml, gin.H{"deviceRecords": deviceRecords})
}

func (h *DeviceRecordHandler) Create(ctx *gin.Context) {
	var deviceRecord model.DeviceRecord
	if err := ctx.ShouldBind(&deviceRecord); err != nil {
		utils.ErrorResponse(ctx, 400, err)
		return
	}

	deviceRecord.UserID = uint(ctx.MustGet("user").(float64))

	deviceRecord, err := h.deviceRecordUsecase.Create(deviceRecord)
	if err != nil {
		utils.ErrorResponse(ctx, 500, err)
		return
	}

	utils.SuccessResponse(ctx, 201, deviceRecord)
}

func (h *DeviceRecordHandler) PageCreate(ctx *gin.Context) {
	ctx.HTML(200, "add_device.html", nil)
}
