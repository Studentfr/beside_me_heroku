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
    headman = UserMeetSerializer()
    class Meta:
        model = Meeting
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
