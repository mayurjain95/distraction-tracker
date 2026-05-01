package routes

import (
	"distraction-tracker/backend/controllers"

	"github.com/gin-gonic/gin"
)

func UserRoutes(rg *gin.RouterGroup) {

	user := rg.Group("/users")
	{
		// Bulk Create operations
		// create this file later by reading from a CSV file
		// add functionality to generate random users for testing
		// add functionality to hast the passwork just like sinfle user creations
		// user.POST("/bulk", controllers.CreateMultipleUsers) // POST /api/v1/users/bulk

		// List all users
		user.GET("/", controllers.GetUsers) // GET /api/v1/users/

		// Single user operations
		user.POST("/", controllers.CreateUser)    // POST /api/v1/users/
		user.GET("/:id", controllers.GetUserByID) // GET /api/v1/users/123
	}
}
