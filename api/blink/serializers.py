from rest_framework import serializers

from .models import Blink, Eye

class EyeSerializer(serializers.ModelSerializer):
    blinks = serializers.PrimaryKeyRelatedField(
        queryset=Blink.objects.all(), 
        many=True,
        required=False,
        read_only=True
    )

    created = serializers.ReadOnlyField()
    updated = serializers.ReadOnlyField()

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

class BlinkSerializer(serializers.ModelSerializer):
    eye = EyeSerializer(read_only=True)

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
            'frequency',
            'url',
            'scheduled',
            'created',
            'updated',
        )