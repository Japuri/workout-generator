from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer
import requests
import os


WORKOUT_SYSTEM_INSTRUCTION = (
    "You are a workout assistant. Provide quick, bodyweight-only home workout routines. "
    "Refuse to provide medical advice, diet plans, or gym-equipment-based exercises."
)

class ConversationListView(generics.ListAPIView):
    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Conversation.objects.filter(user=self.request.user)

class ConversationDetailView(generics.RetrieveAPIView):
    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Conversation.objects.filter(user=self.request.user)


class ChatView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_message = request.data.get('message')
        conversation_id = request.data.get('conversation_id')

        if not user_message:
            return Response({'error': 'Message is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Get or create conversation
        if conversation_id:
            try:
                conversation = Conversation.objects.get(id=conversation_id, user=request.user)
            except Conversation.DoesNotExist:
                return Response({'error': 'Conversation not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            conversation = Conversation.objects.create(
                title=user_message[:50],
                user=request.user
            )

        # Save user message
        Message.objects.create(conversation=conversation, role='user', content=user_message)

        # Call Gemini API
        api_key = os.getenv('GEMINI_API_KEY')
        model_name = os.getenv('GEMINI_MODEL')

        if not api_key:
            return Response({'error': 'Missing GEMINI_API_KEY configuration.'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

        url = f'https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={api_key}'

        history = []
        for message in conversation.messages.order_by('created_at'):
            history.append({
                'role': 'model' if message.role == 'assistant' else 'user',
                'parts': [{'text': message.content}],
            })

        payload = {
            'system_instruction': {
                'parts': [{'text': WORKOUT_SYSTEM_INSTRUCTION}],
            },
            'contents': history,
            'generationConfig': {
                'temperature': 0.7,
            },
        }

        try:
            bot_response = requests.post(url, json=payload, timeout=20)
            if bot_response.status_code == 200:
                data = bot_response.json()
                candidate = (data.get('candidates') or [{}])[0]
                parts = candidate.get('content', {}).get('parts', [])
                raw = ''.join(part.get('text', '') for part in parts).strip()
                # Remove horizontal rules, bold markers, bullet asterisks, and excess blank lines
                import re
                cleaned = re.sub(r'---+', '', raw)
                cleaned = re.sub(r'\*\*(.*?)\*\*', r'\1', cleaned)
                cleaned = re.sub(r'^\s*\*\s+', '• ', cleaned, flags=re.MULTILINE)
                cleaned = re.sub(r'\n{3,}', '\n\n', cleaned)
                bot_content = cleaned.strip() or 'Sorry, I could not generate a response right now.'
            else:
                bot_content = 'Sorry, I could not get a response right now.'
        except Exception:
            bot_content = 'Sorry, I could not get a response right now.'

        # Save bot message
        Message.objects.create(conversation=conversation, role='assistant', content=bot_content)

        serializer = ConversationSerializer(conversation)
        return Response(serializer.data, status=status.HTTP_200_OK)

