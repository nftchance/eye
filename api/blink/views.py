from rest_framework import viewsets

from .models import Blink
from .serializers import BlinkSerializer

class BlinkViewSet(viewsets.ModelViewSet):
    queryset = Blink.objects.all()
    serializer_class = BlinkSerializer