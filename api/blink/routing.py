# chat/routing.py
from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path("ws/<Eye_id>/", consumers.BlinkConsumer.as_asgi()),
]