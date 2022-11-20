from djangochannelsrestframework import permissions
from djangochannelsrestframework.generics import GenericAsyncAPIConsumer
from djangochannelsrestframework.mixins import ListModelMixin, PatchModelMixin
from djangochannelsrestframework.observer import model_observer

from .models import Blink, Eye
from .serializers import BlinkSerializer, EyeSerializer

class EyeConsumer(ListModelMixin, PatchModelMixin, GenericAsyncAPIConsumer):
    queryset = Eye.objects.all()
    serializer_class = EyeSerializer

    async def connect(self, **kwargs):
        await self.model_change.subscribe()

        await super().connect(**kwargs)

        # send connected message
        await self.send_json({
            'type': 'connected',
            'message': 'Connected to the eye consumer'
        })


    @model_observer(Blink)
    async def model_change(self, message, observer=None, **kwargs):
        await self.send_json(message)

    @model_change.serializer
    def serialize_model_change(self, instance, action, **kwargs):
        return dict(
            action=action,
            data=self.serializer_class(instance).data
        ) 

class BlinkConsumer(ListModelMixin, PatchModelMixin, GenericAsyncAPIConsumer):
    queryset = Blink.objects.all()
    serializer_class = BlinkSerializer

    async def connect(self, **kwargs):
        await self.model_change.subscribe()
        await super().connect(**kwargs)

    @model_observer(Blink)
    async def model_change(self, message, observer=None, **kwargs):
        await self.send_json(message)

    @model_change.serializer
    def serialize_model_change(self, instance, action, **kwargs):
        return dict(
            action=action,
            data=self.serializer_class(instance).data
        )