package model

import "gorm.io/gorm"

// Date,Time,Appliance,Energy_Consumption,Room,Status

type DeviceRecord struct {
	gorm.Model
	Date              string  `json:"date"`
	Time              string  `json:"time"`
	Appliance         string  `json:"appliance"`
	EnergyConsumption float64 `json:"energy_consumption"`
	Room              string  `json:"room"`
	Status            string  `json:"status"`
	UserID            uint    `json:"user_id"`
}

type DeviceRecordInput struct {
	Date              string  `json:"date" binding:"required"`
	Time              string  `json:"time" binding:"required"`
	Appliance         string  `json:"appliance" binding:"required"`
	EnergyConsumption float64 `json:"energy_consumption" binding:"required"`
	Room              string  `json:"room" binding:"required"`
	Status            string  `json:"status" binding:"required"`
}

func (d *DeviceRecordInput) ToModel() DeviceRecord {
	return DeviceRecord{
		Date:              d.Date,
		Time:              d.Time,
		Appliance:         d.Appliance,
		EnergyConsumption: d.EnergyConsumption,
		Room:              d.Room,
		Status:            d.Status,
	}
}
