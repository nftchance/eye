from django.urls import path

from .consumers import (
    BlinkConsumer,
    EyeConsumer
)

websocket_urlpatterns = [
    path("ws/eye/", EyeConsumer.as_asgi()),
    path("ws/eye/<eye_id>/blink", BlinkConsumer.as_asgi())
]