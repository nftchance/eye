from djangochannelsrestframework.mixins import (
    ListModelMixin,
    RetrieveModelMixin,
    PatchModelMixin,
    UpdateModelMixin,
    CreateModelMixin,
    DeleteModelMixin,
)
from djangochannelsrestframework.generics import GenericAsyncAPIConsumer

class ConnectedMixin:
    async def connect(self, *args, **kwargs):
        await super().connect(*args, **kwargs)
        await self.send_json({
            'action': 'connected',
        })

class ManagedModelMixin(
    ConnectedMixin,
    ListModelMixin,
    RetrieveModelMixin,
    PatchModelMixin,
    UpdateModelMixin,
    CreateModelMixin,
    DeleteModelMixin,
    GenericAsyncAPIConsumer
):
    async def connect(self, **kwargs):
        await self.model_change.subscribe()
        await super().connect()