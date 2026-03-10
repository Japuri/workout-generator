from rest_framework import generics
from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer

class ConversationListView(generics.ListAPIView):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer

class ConversationDetailView(generics.RetrieveAPIView):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer

class ChatView(generics.CreateAPIView):
    serializer_class = MessageSerializer
