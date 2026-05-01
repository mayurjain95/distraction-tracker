package routes

import (
	"distraction-tracker/backend/controllers"

	"github.com/gin-gonic/gin"
)

func AuthRoutes(rg *gin.RouterGroup) {
	rg.POST("/login", controllers.Login) // POST /api/v1/login

	// You can add other auth routes here later:
	// rg.POST("/register", controllers.Register)
	// rg.POST("/logout", controllers.Logout)
	// rg.POST("/refresh", controllers.RefreshToken)
}
