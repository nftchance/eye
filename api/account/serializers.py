from django.contrib.auth import get_user_model
from rest_framework import serializers

class AccountSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError("Passwords must match.")
        return data

    def create(self, validated_data):
        user = get_user_model().objects.create_user(
            username=validated_data['username'],
            email = validated_data['email'],
            password=validated_data['password1'],
        )
        return user
    
    class Meta:
        model = get_user_model()
        fields = (
            'id', 
            'email', 
            'username', 
            'password1', 
            'password2'
        )
        read_only_fields = ('id')