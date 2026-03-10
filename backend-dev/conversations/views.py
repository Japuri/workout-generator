from rest_framework import generics
from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer

class ConversationListView(generics.ListAPIView):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer

class ConversationDetailView(generics.RetrieveAPIView):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests

class ChatView(generics.CreateAPIView):
    serializer_class = MessageSerializer

class ChatbotAPIView(APIView):
    def post(self, request):
        user_message = request.data.get('message')
        if not user_message:
            return Response({'error': 'Message required'}, status=status.HTTP_400_BAD_REQUEST)

        forbidden_keywords = ['medical', 'diet', 'nutrition', 'gym', 'equipment']
        if any(word in user_message.lower() for word in forbidden_keywords):
            return Response({'error': 'Cannot provide medical advice, diet plans, or gym-equipment-based exercises.'}, status=status.HTTP_403_FORBIDDEN)

        api_key = 'YOUR_GEMINI_API_KEY'
        url = 'https://api.gemini.com/v1/chatbot'
        payload = {
            'message': user_message,
            'key': api_key
        }
        # Example request, update URL and payload as needed for Gemini
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            return Response(response.json())
        return Response({'error': 'Chatbot error'}, status=status.HTTP_502_BAD_GATEWAY)
