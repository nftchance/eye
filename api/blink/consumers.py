import json

from channels.generic.websocket import AsyncWebsocketConsumer

from .models import Blink

class BlinkConsumer(AsyncWebsocketConsumer):
    groups = ["general"]

    async def connect(self):
        await self.accept()

        # send hello world
        await self.send(text_data=json.dumps({"message": "Hello world!"}))

    async def disconnect(self):
        pass

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]

        self.send(text_data=json.dumps({"message": message}))