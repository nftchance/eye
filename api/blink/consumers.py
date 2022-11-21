from djangochannelsrestframework import permissions
from djangochannelsrestframework.observer import model_observer

from .mixins import ManagedModelMixin
from .models import Blink, Eye
from .serializers import BlinkSerializer, EyeSerializer

class EyeConsumer(ManagedModelMixin):
    queryset = Eye.objects.all()
    serializer_class = EyeSerializer
    lookup_field = "pk"

    permissions = (permissions.AllowAny,)

    # Creatde a dynamic model_change that can be used for any model without knowing what class it will be used by
    @model_observer(Eye)
    async def model_change(self, message, observer=None, **kwargs):
        await self.send_json(message)

    @model_change.serializer
    def model_serialize(self, instance, action, **kwargs):
        return dict(data=EyeSerializer(instance=instance).data, action=action.value)

class BlinkConsumer(ManagedModelMixin):
    queryset = Blink.objects.all()
    serializer_class = BlinkSerializer
    permissions = (permissions.AllowAny,)

    # Creatde a dynamic model_change that can be used for any model without knowing what class it will be used by
    @model_observer(Blink)
    async def model_change(self, message, observer=None, **kwargs):
        await self.send_json(message)

    @model_change.serializer
    def model_serialize(self, instance, action, **kwargs):
        return dict(data=BlinkSerializer(instance=instance).data, action=action.value)