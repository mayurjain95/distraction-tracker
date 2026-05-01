package routes

import (
	"distraction-tracker/backend/controllers"
	"distraction-tracker/backend/middleware"

	"github.com/gin-gonic/gin"
)

func DistractionRoutes(rg *gin.RouterGroup) {
	distraction := rg.Group("/distractions")
	{
		distraction.POST("/", middleware.AuthMiddleware(), controllers.CreateDistraction)
		distraction.GET("/", middleware.AuthMiddleware(), controllers.GetDistractionsByDate)
	}
}
