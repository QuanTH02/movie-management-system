"""
Serializers for users app.
"""

from django.contrib.auth.models import User
from rest_framework import serializers

from apps.users.models import FollowFilmUser, LikeMovie


class LoginSerializer(serializers.Serializer):
    """Serializer for user login."""

    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class RegisterSerializer(serializers.Serializer):
    """Serializer for user registration."""

    account = serializers.CharField()
    name = serializers.CharField()
    gmail = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, data):
        """Validate that passwords match."""
        password = data.get("password")
        confirm_password = data.get("confirm_password")

        if password != confirm_password:
            raise serializers.ValidationError("Passwords do not match.")

        return data


class AccountSerializer(serializers.ModelSerializer):
    """Serializer for User account information."""

    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "date_joined"]


class FollowFilmUserSerializer(serializers.ModelSerializer):
    """Serializer for FollowFilmUser model."""

    class Meta:
        model = FollowFilmUser
        fields = "__all__"


class LikeMovieSerializer(serializers.ModelSerializer):
    """Serializer for LikeMovie model."""

    class Meta:
        model = LikeMovie
        fields = "__all__"
