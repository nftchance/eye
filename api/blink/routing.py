from django.urls import re_path

from .consumers import (
    EyeConsumer
)

websocket_urlpatterns = [
    re_path(r"^ws/eye/$", EyeConsumer.as_asgi()),
    # support uuid as primary key
    re_path(r"^ws/eye/(?P<pk>[0-9a-f-]+)/$", EyeConsumer.as_asgi()),
]