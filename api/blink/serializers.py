from rest_framework import serializers

from .mixins import SerializerRepresentationMixin
from .models import Blink, Eye

class EyeSerializer(
    SerializerRepresentationMixin, 
    serializers.ModelSerializer
):
    created = serializers.ReadOnlyField()
    updated = serializers.ReadOnlyField()

    class Meta:
        model = Eye
        fields = (
            'id',
            'name',
            'description',
            'created',
            'updated'
        )

class BlinkSerializer(
    SerializerRepresentationMixin,
    serializers.ModelSerializer
):
    status = serializers.ReadOnlyField()
    scheduled = serializers.ReadOnlyField()

    created = serializers.ReadOnlyField()
    updated = serializers.ReadOnlyField()

    class Meta:
        model = Blink
        fields = (
            'id',
            'eye',
            'status',
            'url',
            'frequency',
            'scheduled',
            'created',
            'updated'
        )