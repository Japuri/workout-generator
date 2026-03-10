# Workout Generator Backend

Django REST backend with three apps:
- base_app (main url route /api/v1)
- conversations (Conversation and Message models, serializers, views)
- authentication (Register and JWT signin serializers and views)

Ready for frontend integration.

Here are the backend endpoints:

POST /api/v1/auth/signup/
POST /api/v1/auth/signin/
POST /api/v1/conversation/
GET /api/v1/conversations/
GET /api/v1/conversations/<id>/