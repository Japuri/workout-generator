from django.urls import path
from .views import RegisterView, MyTokenObtainPairView

urlpatterns = [
    path('signup/', RegisterView.as_view(), name='register_view'),
    path('signin/', MyTokenObtainPairView.as_view(), name='my_token_obtain_pair_view'),
]
