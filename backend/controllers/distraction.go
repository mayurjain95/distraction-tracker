package controllers

import (
	"distraction-tracker/backend/database"
	"distraction-tracker/backend/models"

	"github.com/gin-gonic/gin"
)

func CreateDistraction(c *gin.Context) {
	var distraction models.Distraction
	if err := c.ShouldBindJSON(&distraction); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	database.DB.Create(&distraction)
	c.JSON(201, distraction)
}

func GetDistractionsByDate(c *gin.Context) {
	date := c.Query("date")
	var distractions []models.Distraction
	database.DB.Where("date = ?", date).Find(&distractions)
	c.JSON(200, distractions)
}
