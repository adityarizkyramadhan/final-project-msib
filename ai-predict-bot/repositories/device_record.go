package repositories

import (
	"a21hc3NpZ25tZW50/model"
	"gorm.io/gorm"
)

type (
	DeviceRecordRepository interface {
		FindAll(userID uint) ([]model.DeviceRecord, error)
		Create(deviceRecord model.DeviceRecord) (model.DeviceRecord, error)
		Delete(id uint) error
		Update(deviceRecord model.DeviceRecord) (model.DeviceRecord, error)
	}

	deviceRecordRepository struct {
		db *gorm.DB
	}
)

func NewDeviceRecordRepository(db *gorm.DB) DeviceRecordRepository {
	return &deviceRecordRepository{db}
}

func (r *deviceRecordRepository) FindAll(userID uint) ([]model.DeviceRecord, error) {
	var deviceRecords []model.DeviceRecord
	err := r.db.Where("user_id = ?", userID).Find(&deviceRecords).Error
	return deviceRecords, err
}

func (r *deviceRecordRepository) Create(deviceRecord model.DeviceRecord) (model.DeviceRecord, error) {
	err := r.db.Create(&deviceRecord).Error
	return deviceRecord, err
}

func (r *deviceRecordRepository) Delete(id uint) error {
	return r.db.Delete(&model.DeviceRecord{}, id).Error
}

func (r *deviceRecordRepository) Update(deviceRecord model.DeviceRecord) (model.DeviceRecord, error) {
	err := r.db.Save(&deviceRecord).Error
	return deviceRecord, err
}
