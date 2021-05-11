from rest_framework import serializers
from rest_framework.authtoken.models import Token

from mainapp.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        print(validated_data['groups'])
        user = User.objects.create_user(validated_data['firstname'], validated_data['lastname'],
                                        validated_data['email'], validated_data['photo'], validated_data['password'])
        for tag in validated_data['tags']:
            user.tags.add(tag)
        Token.objects.create(user=user)
        return user


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


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'