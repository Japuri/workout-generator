
# Workout Generator Backend

## API Endpoints

**Authentication**

- `POST /api/v1/auth/signup/` — Register user
- `POST /api/v1/auth/signin/` — Sign in (JWT token)

**Conversations**

- `POST /api/v1/conversation/` — Create a message in a conversation
- `GET /api/v1/conversations/` — List all conversations
- `GET /api/v1/conversations/<id>/` — Get details of a conversation

**AI chatbot**

- `POST /api/v1/chatbot/`

## Environment variables

- `GEMINI_API_KEY` (required): API key for Gemini text generation.
- `GEMINI_MODEL` (optional): Model name, defaults to `gemini-2.5-flash`.