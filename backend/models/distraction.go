package models

import "time"

type Distraction struct {
	ID              uint      `json:"id" gorm:"primaryKey"`
	UserID          uint      `json:"user_id"`
	Date            time.Time `json:"date"`
	TimeSpent       int       `json:"time_spent"`
	Distraction     string    `json:"distraction"`
	Feeling         string    `json:"feeling"`
	Factor          string    `json:"factor"`
	PlanningProblem string    `json:"planning_problem"`
	Ideas           string    `json:"ideas"`
}
