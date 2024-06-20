package usecase

import (
	"a21hc3NpZ25tZW50/model"
	"a21hc3NpZ25tZW50/repositories"
)

type (
	DeviceRecordUsecase interface {
		FindAll(userID uint) ([]model.DeviceRecord, error)
		Create(deviceRecord model.DeviceRecord) (model.DeviceRecord, error)
	}

	deviceRecordUsecase struct {
		deviceRecordRepo repositories.DeviceRecordRepository
	}
)

func NewDeviceRecordUsecase(deviceRecordRepo repositories.DeviceRecordRepository) DeviceRecordUsecase {
	return &deviceRecordUsecase{deviceRecordRepo}
}

func (u *deviceRecordUsecase) FindAll(userID uint) ([]model.DeviceRecord, error) {
	return u.deviceRecordRepo.FindAll(userID)
}

func (u *deviceRecordUsecase) Create(deviceRecord model.DeviceRecord) (model.DeviceRecord, error) {
	return u.deviceRecordRepo.Create(deviceRecord)
}
