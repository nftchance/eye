from django.urls import re_path

from .consumers import (
    BlinkConsumer,
    EyeConsumer
)

websocket_urlpatterns = [
    re_path(r"^ws/eye/$", EyeConsumer.as_asgi()),
    re_path(r"^ws/blink/", BlinkConsumer.as_asgi())
]