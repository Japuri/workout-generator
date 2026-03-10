from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer
import requests
import os

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

        forbidden_keywords = ['medical', 'diet', 'nutrition', 'gym', 'equipment']
        if any(word in user_message.lower() for word in forbidden_keywords):
            return Response({'error': 'Cannot provide medical advice, diet plans, or gym-equipment-based exercises.'}, status=status.HTTP_403_FORBIDDEN)

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

        # Call chatbot API
        api_key = os.getenv('GEMINI_API_KEY')
        url = 'https://api.gemini.com/v1/chatbot'
        payload = {'message': user_message, 'key': api_key}
        try:
            bot_response = requests.post(url, json=payload)
            if bot_response.status_code == 200:
                bot_content = bot_response.json().get('reply', '')
            else:
                bot_content = 'Sorry, I could not get a response right now.'
        except Exception:
            bot_content = 'Sorry, I could not get a response right now.'

        # Save bot message
        Message.objects.create(conversation=conversation, role='assistant', content=bot_content)

        serializer = ConversationSerializer(conversation)
        return Response(serializer.data, status=status.HTTP_200_OK)

