package models

type User struct {
	ID        uint   `json:"id" gorm:"primaryKey; autoIncrement"`
	Email     string `json:"email" gorm:"unique; column:email"`
	Password  string `json:"-" gorm:"column:password"`
	Premium   bool   `json:"premium"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
}
