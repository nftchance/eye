import json

from asgiref.sync import sync_to_async
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

from .models import Blink
from .serializers import BlinkSerializer

class BlinkConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # TODO: Use for organization groupings
        # self.room_name = self.scope["url_route"]["kwargs"]["room_name"]

        self.room_name = "blink"
        self.room_group_name = "organization_%s" % self.room_name

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

    # Receive message from room group
    async def chat_message(self, event):
        print('in chat_message')

        message = event["message"]

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            "type": event["type"],
            "payload": message
        }))

    @database_sync_to_async
    def db_get_blinks(self):
        blinks = Blink.objects.all()

        serializer = BlinkSerializer(blinks, many=True)

        return serializer.data

    async def get_blinks(self, event):
        blinks = await self.db_get_blinks()

        await self.send(text_data=json.dumps({
            "type": event["type"],
            "payload": blinks
        }))