# Django + React Task Manager

## Project Overview
A full-stack task manager app built with Django REST Framework (backend) and React (frontend). Features authentication (JWT), CRUD for tasks, and a modern UI.

---

## Backend Structure (Django)
- All business logic is in Django apps: `accounts` (auth) and `tasks` (task management)
- Uses Django REST Framework for API endpoints
- JWT authentication via `djangorestframework-simplejwt`
- SQLite database (default)
- CORS enabled for frontend communication

### Backend Setup
1. **Navigate to the backend folder:**
   ```zsh
   cd backend
   ```
2. **Create and activate a virtual environment:**
   ```zsh
   python3 -m venv venv
   source venv/bin/activate
   ```
3. **Install dependencies:**
   ```zsh
   pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
   ```
4. **Run migrations:**
   ```zsh
   python3 manage.py makemigrations
   python3 manage.py migrate
   ```
5. **Start the backend server:**
   ```zsh
   python3 manage.py runserver
   ```
   The API will be available at `http://localhost:8000`.

---

## Frontend Structure (React)
- All task manager logic and components are in `frontend/src/features/taskManager/`
- All authentication logic and components are in `frontend/src/features/auth/`
- API logic is split between `taskApi.js` (tasks) and `authApi.js` (auth)
- Uses Vite for fast development
- AuthContext provides global state for authentication

### Frontend Setup
1. **Navigate to the frontend folder:**
   ```zsh
   cd frontend
   ```
2. **Install dependencies:**
   ```zsh
   npm install
   ```
3. **Set API URL in `.env`:**
   Create a `.env` file in `frontend/` with:
   ```
   VITE_API_URL=http://localhost:8000
   ```
4. **Start the frontend server:**
   ```zsh
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (or another port if busy).

---

## Connecting Frontend to Backend
- The frontend uses the API URL from `.env` to communicate with Django.
- All API endpoints have trailing slashes (e.g. `/api/auth/register/`, `/api/tasks/`).
- JWT tokens are used for authentication; after login, the `access` token is stored in localStorage and sent with all requests.
- CORS is enabled in Django settings to allow requests from the frontend.

---

## Features
- Register, login, and auto-login after registration
- Task CRUD (create, read, update, delete)
- Error handling and user feedback
- Modern UI with Tailwind CSS

---

## How to Run (Summary)
1. Start Django backend: `python3 manage.py runserver` (from `backend`)
2. Start React frontend: `npm run dev` (from `frontend`)
3. Access the app at `http://localhost:5173` (frontend) and `http://localhost:8000` (backend)

---

## Notes
- For production, use a proper WSGI/ASGI server for Django and build the React app for deployment.
- See `info.txt` for more technical details.
