from rest_framework import serializers

from .models import Blink

class BlinkSerializer(serializers.ModelSerializer):
    status = serializers.ReadOnlyField()
    scheduled = serializers.ReadOnlyField()
    created = serializers.ReadOnlyField()
    updated = serializers.ReadOnlyField()

    class Meta:
        model = Blink
        fields = (
            'id',
            'frequency',
            'url',
            'status',
            'scheduled',
            'created',
            'updated',
        )