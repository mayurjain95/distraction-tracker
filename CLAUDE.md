# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Backend (run from `backend/`)
```bash
go run main.go          # Start API server on :8080
go build ./...          # Build
go vet ./...            # Lint
go test ./...           # Run all tests
go test ./controllers/  # Run tests in a specific package
```

### Frontend (run from `client/`)
```bash
npm run dev     # Dev server on :3000
npm run build   # Production build
npm run lint    # ESLint
```

### Environment
The backend requires a `.env` file at `backend/.env`:
```
JWT_SECRET=your_secret_key_here
```
The SQLite database (`distraction.db`) is auto-created in `backend/` on first run via GORM `AutoMigrate`.

## Architecture

This is a monorepo with a Go REST API (`backend/`) and a Next.js 16 frontend (`client/`). They communicate over HTTP; the frontend hardcodes `http://localhost:8080` as the API base.

### Backend — request flow
`main.go` → Gin router → route groups (`routes/`) → optional `AuthMiddleware` → controllers → `database.DB` (global GORM handle).

- **`database/db.go`**: Opens SQLite and calls `AutoMigrate` for all models. The global `database.DB` is used directly in controllers — there is no repository layer.
- **`middleware/auth.go`**: JWT validation via `Authorization: Bearer <token>`. On success, sets `userID` (uint) in the Gin context via `c.Set("userID", ...)`.
- **`controllers/`**: Thin handlers — bind JSON, query DB, respond. `auth.go` issues JWTs; `user.go` handles registration with bcrypt hashing; `distraction.go` creates and queries by date.
- **`services/export.go`**: Stub for future Excel export — currently returns `nil, nil`.
- **`utils/response.go`**: Single helper `RespondWithError(c, code, message)` — not yet consistently used across controllers.

### API routes (all under `/api/v1`)
| Method | Path | Auth | Handler |
|--------|------|------|---------|
| POST | `/login` | No | `controllers.Login` |
| POST | `/users/` | No | `controllers.CreateUser` |
| GET | `/users/` | No | `controllers.GetUsers` |
| GET | `/users/:id` | No | `controllers.GetUserByID` |
| POST | `/distractions/` | Yes | `controllers.CreateDistraction` |
| GET | `/distractions/` | Yes | `controllers.GetDistractionsByDate` |

Note: Registration is `POST /users/` (not `/register`). User routes are currently unprotected.

### Data models
- **`User`**: id, email (unique), password (bcrypt, omitted from JSON), firstName, lastName, premium
- **`Distraction`**: id, userID, date, timeSpent (int), distraction (string), feeling, factor, planningProblem, ideas

`GetDistractionsByDate` filters by `?date=` query param. `CreateDistraction` does not automatically attach the authenticated user's ID from the JWT — `userID` must be passed in the request body.

### Frontend
Next.js App Router (`client/app/`). Three routes: `/` (landing), `/login`, `/signup`, `/dashboard`.

Auth state is stored in `localStorage` (`token` and `userEmail`). The dashboard page fetches distractions on mount and posts new ones, both with `Authorization: Bearer <token>` headers. There is no shared API client — fetch calls are inline in each page component.
