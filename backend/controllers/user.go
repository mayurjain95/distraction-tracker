package controllers

import (
	"distraction-tracker/backend/database"
	"distraction-tracker/backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func CreateUser(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	//Check if user with the same email already exists
	var existingUser models.User
	if err := database.DB.Where("email = ?", user.Email).First(&existingUser).Error; err == nil {
		c.JSON(409, gin.H{"error": "User already exists with this email"})
		return
	}

	// hash the password before saving
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError,
			gin.H{"error": "Failed to hash password"})
		return
	}
	user.Password = string(hashedPassword)
	if err := database.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError,
			gin.H{"error": "Failed to create user with given password."})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"message": "User created successfully",
		"user": gin.H{
			"email":     user.Email,
			"firstName": user.FirstName,
			"lastName":  user.LastName,
			"isPremium": user.Premium,
		},
	})
}

func GetUsers(c *gin.Context) {
	var users []models.User
	database.DB.Find(&users)
	for i := range users {
		users[i].Password = ""
	}
	c.JSON(200, users)
}

func CreateMultipleUsers(c *gin.Context) {
	var users []models.User
	if err := c.ShouldBindJSON(&users); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	database.DB.Create(&users)
	c.JSON(201, users)
}

func GetUserByID(c *gin.Context) {
	id := c.Param("id")
	var user models.User
	if err := database.DB.First(&user, id).Error; err != nil {
		c.JSON(404, gin.H{"error": "User not found"})
		return
	}
	user.Password = ""
	c.JSON(200, user)
}
