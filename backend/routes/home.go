package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func HomeRoute(rg *gin.RouterGroup) {
	rg.GET("/home", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message":          "Welcome to the Distraction Tracker",
			"tracking_enabled": true,
		})
	})
}
