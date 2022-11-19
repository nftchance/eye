import json

from asgiref.sync import sync_to_async
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

from .models import Eye
from .serializers import BlinkSerializer
from .utils import DateTimeEncoder

class BlinkConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["organization_id"]
        self.room_group_name = "organization_%s" % self.room_name

        print("Connected to:", self.room_group_name)

        await self.channel_layer.group_add(
            self.room_group_name, 
            self.channel_name
        )
        await self.accept()

        # Load the initial blinks of the organization when connecting to its layer
        await self.get_blinks({
            "type": "get_blinks"
        })

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name, 
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)

        print('received', text_data_json)

        type = text_data_json["type"]
        message = text_data_json["message"] if 'message' in text_data_json else None

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name, 
            {
                "type": type, 
                "payload": message
            }
        )

    async def get_blink(self, event):
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            "type": event["type"],
            "payload": event["payload"]
        }, cls=DateTimeEncoder))

    @database_sync_to_async
    def db_get_blinks(self):
        if not Eye.objects.filter(id=self.room_name).exists():
            return []

        eye = Eye.objects.get(id=self.room_name)

        serializer = BlinkSerializer(eye.blinks.all(), many=True)

        return serializer.data

    async def get_blinks(self, event):
        blinks = await self.db_get_blinks()

        await self.send(text_data=json.dumps({
            "type": event["type"],
            "payload": json.dumps(blinks, cls=DateTimeEncoder)
        }))