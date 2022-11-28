from rest_framework import generics
from django.contrib.auth import get_user_model

from .serializers import AccountSerializer

class SignUpView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = AccountSerializer