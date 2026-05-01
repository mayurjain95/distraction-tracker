# Distraction Tracker

A full-stack application to help users track and manage their distractions. The project consists of a Go backend API and a Next.js frontend application.

## Features

- **User Authentication**: Secure user registration and login with JWT tokens
- **User Management**: User profile management and authentication
- **Distraction Tracking**: Log and track distractions throughout the day
- **Data Export**: Export tracked distractions for analysis
- **Responsive Dashboard**: Real-time dashboard to view distraction patterns

## Tech Stack

### Backend
- **Framework**: Go with [Gin](https://gin-gonic.com/)
- **Database**: SQLite with [GORM](https://gorm.io/)
- **Authentication**: JWT (JSON Web Tokens)
- **Dependencies**:
  - `gin-gonic/gin` - HTTP web framework
  - `golang-jwt/jwt` - JWT authentication
  - `gorm` - ORM for database
  - `crypto` - Password encryption

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) 16.1.4
- **UI Library**: [React](https://react.dev/) 19
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## Project Structure

```
distraction-tracker/
├── backend/                 # Go backend API
│   ├── main.go             # Application entry point
│   ├── config/             # Configuration management
│   ├── controllers/        # Request handlers
│   ├── database/           # Database connection & setup
│   ├── middleware/         # Auth & request middleware
│   ├── models/             # Data models (User, Distraction)
│   ├── routes/             # API route definitions
│   ├── services/           # Business logic (export, etc.)
│   └── utils/              # Utility functions (response handling)
├── client/                 # Next.js frontend
│   ├── app/                # Next.js app directory
│   ├── public/             # Static assets
│   └── components/         # React components
└── LICENSE                 # Project license
```

## Getting Started

### Prerequisites

- **Go** 1.25.3 or higher
- **Node.js** 18+ and npm/yarn
- **SQLite** (included with most systems)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   go mod download
   ```

3. Create a `.env` file in the backend directory with required environment variables:
   ```env
   DATABASE_URL=distraction_tracker.db
   JWT_SECRET=your_secret_key_here
   ```

4. Run the backend server:
   ```bash
   go run main.go
   ```

   The API server will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file if needed for API configuration:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

5. For production build:
   ```bash
   npm run build
   npm start
   ```

## API Endpoints

The backend provides the following API endpoints under `/api/v1`:

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### Users
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile

### Distractions
- `GET /distractions` - Get all distractions
- `POST /distractions` - Log a new distraction
- `PUT /distractions/:id` - Update a distraction
- `DELETE /distractions/:id` - Delete a distraction

### Export
- `GET /export/distractions` - Export distractions data

## CORS Configuration

The backend is configured with CORS to accept requests from the frontend running on `http://localhost:3000`.

Allowed methods: GET, POST, PUT, DELETE, OPTIONS
Allowed headers: Origin, Content-Type, Authorization

## Database

The application uses SQLite for data persistence. The database file (`distraction_tracker.db`) is automatically created on first run.

### Models
- **User**: Stores user account information and credentials
- **Distraction**: Stores logged distractions with timestamps and details

## Development Workflow

1. Start the backend server first
2. Start the frontend development server
3. Access the application at `http://localhost:3000`
4. The frontend will communicate with the backend API

## License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

## Contributing

Feel free to fork this project and submit pull requests for any improvements or bug fixes.

## Support

For issues or questions, please open an issue in the repository.
