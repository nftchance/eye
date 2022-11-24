from rest_framework import serializers
from rest_framework.fields import UUIDField

from .mixins import SerializerRepresentationMixin
from .models import Blink, Eye

class EyeSerializer(
    SerializerRepresentationMixin, 
    serializers.ModelSerializer
):
    # return the serializer of the blinks
    blinks = serializers.SerializerMethodField()

    created = serializers.ReadOnlyField()
    updated = serializers.ReadOnlyField()

    def get_blinks(self, obj):
        return BlinkSerializer(
            obj.blinks.all(), 
            many=True
        ).data

    class Meta:
        model = Eye
        fields = (
            'id',
            'name',
            'description',
            'blinks',
            'created',
            'updated'
        )

class BlinkSerializer(
    SerializerRepresentationMixin,
    serializers.ModelSerializer
):
    # status = serializers.ReadOnlyField()
    scheduled = serializers.ReadOnlyField()

    created = serializers.ReadOnlyField()
    updated = serializers.ReadOnlyField()

    class Meta:
        model = Blink
        fields = (
            'id',
            'status',
            'url',
            'frequency',
            'scheduled',
            'created',
            'updated'
        )