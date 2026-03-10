# 💪 15-Min Bodyweight Workout Generator

An AI-powered chat application that generates personalized 15-minute bodyweight-only home workout routines. Built with a Django REST Framework backend and a React + Redux frontend.

---

## Features

- AI-powered workout generation via the Gemini API
- Bodyweight-only, equipment-free routines
- Conversational chat interface (similar to ChatGPT)
- Persistent conversation history per user
- JWT-based authentication (register & login)
- Sidebar with conversation list and new chat support
- Restricted to fitness topics only — no medical advice, diet plans, or gym equipment

---

## Tech Stack

**Frontend**
- React (Create React App)
- Redux + Redux Thunk (state management)
- React Router DOM (routing)
- Axios (HTTP requests)

**Backend**
- Django 6 + Django REST Framework
- SimpleJWT (token authentication)
- Google Gemini API (AI responses)
- SQLite (development database)
- python-dotenv (environment variable management)

---

## Project Structure

```
workoutgenerator/
├── backend-dev/
│   ├── core/               # Django project settings, URLs, WSGI
│   ├── authentication/     # Register & login views, serializers
│   ├── conversations/      # Chat, conversation list/detail views, models
│   ├── base_app/           # Root URL routing (/api/v1/)
│   ├── manage.py
│   ├── requirements.txt
│   └── .env                # API keys (not committed)
└── frontend-dev/
    ├── src/
    │   ├── screens/        # HomeScreen, LoginScreen, RegisterScreen
    │   ├── components/     # ConversationItem, EmptyState, FormComponent, Loader, Message
    │   ├── actions/        # authActions, conversationActions
    │   ├── reducers/       # authReducer, conversationReducer
    │   ├── constants/      # authConstants, conversationConstants
    │   ├── App.js
    │   └── store.js
    └── package.json
```

---

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/signup/` | Register a new user | No |
| POST | `/api/v1/auth/signin/` | Login and receive JWT tokens | No |
| POST | `/api/v1/conversation/` | Send a message, get AI response | Yes |
| GET | `/api/v1/conversations/` | List all user conversations | Yes |
| GET | `/api/v1/conversations/<id>/` | Get a single conversation with messages | Yes |

---

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- A [Google Gemini API key](https://aistudio.google.com/app/apikey)

---

### Backend Setup

```bash
cd backend-dev
pip install -r requirements.txt
```

Create a `.env` file in `backend-dev/`:

```
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.0-flash-exp
```

Run migrations and start the server:

```bash
py manage.py migrate
py manage.py runserver
```

The backend runs at `http://localhost:8000`.

---

### Frontend Setup

```bash
cd frontend-dev
npm install
npm start
```

The frontend runs at `http://localhost:3000` and proxies API requests to `http://localhost:8000`.

---

## Usage

1. Open `http://localhost:3000` in your browser
2. Register a new account or sign in
3. Type a message like *"Give me a 15-minute full body workout"*
4. The AI will respond with a structured bodyweight routine
5. Use the sidebar to start new chats or revisit previous conversations

---

## Restrictions

The AI assistant is configured to only discuss bodyweight home workouts. It will decline requests involving:
- Medical advice
- Diet or nutrition plans
- Gym equipment-based exercises

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Your Google Gemini API key |
| `GEMINI_MODEL` | Gemini model name (e.g. `gemini-2.5-flash`) |

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

---

## License

This project is for educational purposes.

