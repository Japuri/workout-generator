
# Workout Generator Backend

## API Endpoints

**Authentication**

- `POST /api/v1/auth/signup/` — Register user
- `POST /api/v1/auth/signin/` — Sign in (JWT token)

**Conversations**

- `POST /api/v1/conversation/` — Create a message in a conversation
- `GET /api/v1/conversations/` — List all conversations
- `GET /api/v1/conversations/<id>/` — Get details of a conversation

All endpoints are ready for frontend integration.

Here are the backend endpoints:

POST /api/v1/auth/signup/
POST /api/v1/auth/signin/
POST /api/v1/conversation/
GET /api/v1/conversations/
GET /api/v1/conversations/<id>/