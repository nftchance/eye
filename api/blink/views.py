from rest_framework import viewsets

from .models import Blink, Eye
from .serializers import BlinkSerializer, EyeSerializer

class EyeViewSet(viewsets.ModelViewSet):
    queryset = Eye.objects.all()
    serializer_class = EyeSerializer

class BlinkViewSet(viewsets.ModelViewSet):
    queryset = Blink.objects.all()
    serializer_class = BlinkSerializer