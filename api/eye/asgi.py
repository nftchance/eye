import os

from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application

from blink.routing import websocket_urlpatterns

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "eye.settings")

application = get_asgi_application()

application = ProtocolTypeRouter(
    {
        "http": application,
        "websocket": URLRouter(websocket_urlpatterns)
    }
)