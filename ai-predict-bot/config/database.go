package config

import (
	"errors"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var dbGlobal *gorm.DB

func InitDB() (db *gorm.DB, err error) {
	if dbGlobal != nil {
		return dbGlobal, nil
	}
	username := os.Getenv("DB_USERNAME")
	password := os.Getenv("DB_PASSWORD")
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")

	if username == "" || password == "" || host == "" || port == "" || dbName == "" {
		return nil, errors.New("DB configuration not complete")
	}

	dsn := "host=" + host + " user=" + username + " password=" + password + " dbname=" + dbName + " port=" + port + " sslmode=disable TimeZone=Asia/Jakarta"

	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	dbGlobal = db

	return db, nil
}
