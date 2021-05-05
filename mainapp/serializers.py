from rest_framework import serializers

from mainapp.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UserMeetSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'firstname']


class MeetingSerializer(serializers.ModelSerializer):
    headman = UserMeetSerializer(read_only=True)
    class Meta:
        model = Meeting
        fields = '__all__'

class MeetingCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    user = UserMeetSerializer()
    class Meta:
        model = Comment
        fields = '__all__'

class CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'