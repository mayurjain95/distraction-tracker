package main

import (
	"distraction-tracker/backend/database"
	"distraction-tracker/backend/routes"
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load .env file - ADD THIS AT THE VERY BEGINNING
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	database.ConnectDB()
	r := gin.Default()

	// Add CORS middleware
	r.Use(cors.New(cors.Config{
		AllowAllOrigins: true,
		AllowMethods:    []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:    []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:   []string{"Content-Length"},
		MaxAge:          12 * time.Hour,
	}))

	api := r.Group("/api/v1")
	routes.AuthRoutes(api)
	routes.HomeRoute(api)
	routes.DistractionRoutes(api)
	routes.UserRoutes(api)

	r.Run(":8080")
}
