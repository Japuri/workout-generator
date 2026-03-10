from django.urls import path
from .views import ChatView, ConversationListView, ConversationDetailView

urlpatterns = [
    path('conversation/', ChatView.as_view(), name='chat_view'),
    path('conversations/', ConversationListView.as_view(), name='conversation_list_view'),
    path('conversations/<int:pk>/', ConversationDetailView.as_view(), name='conversation_detail_view'),
]
