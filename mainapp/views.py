from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.
from rest_framework import generics, filters
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from . import services
from mainapp import models


# TODO Document Lines
from .models import User
from .serializers import UserSerializer, MeetingSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

@api_view(['GET'])
def index(request):
    return Response("hello")


@api_view(['GET'])
def userList(request):
    """
    Get all users from database
    """
    return Response(services.getAllUsers())


@api_view(['GET'])
def userDetail(request, pk):
    """
    Get user by ID
    return User Data, Meetings he/she own, Meetings he/she participated in
    """
    return Response(services.getUserDetail(pk))


@api_view(['POST'])
def userCreate(request):
    """
    Create user and save it to Database
    """
    return Response(services.saveUserToDB(request.data))


@api_view(['POST'])
def userUpdate(request, pk):
    """
    Update user by certain ID
    """
    return Response(services.updateUser(pk, request.data))


@api_view(['DELETE'])
def userDelete(request, pk):
    """
    Delete user by certain ID
    """
    return Response(services.userDelete(pk))


@api_view(['GET'])
def meetingList(request):
    """
    Get all meetings from database
    """
    return Response(services.getAllMeetings())


@api_view(['GET'])
def meetingDetail(request, pk):
    """
    Get meeting by certain ID
    """
    return Response(services.getMeetingById(pk))


@api_view(['GET'])
def meetingDetailHistory(request, pk):
    """
    Get Meeting History
    Includes:
    Meeting Details, Comments and Meeting Rating
    """
    return Response(services.getMeetingHistory(pk))


@api_view(['POST'])
def meetingCreate(request):
    """
    Create meeting and save it to Database
    """
    return Response(services.saveMeetingToDB(request.data))


@api_view(['POST'])
def meetingUpdate(request, pk):
    """
    Update meeting by certain ID
    """
    return Response(services.updateMeeting(pk, request.data))


@api_view(['DELETE'])
def meetingDelete(request, pk):
    """
    Delete meeting by certain ID
    """
    return Response(services.deleteMeeting(pk))


@api_view(['POST'])
def commentCreate(request, pk):
    """
    Create comment to exact meeting by id and save it to Database
    """
    return Response(services.saveCommentToDB(request.data, pk))


@api_view(['GET'])
def tagList(request):
    """
    Get all tags from database
    """
    return Response(services.getAllTags())


@api_view(['POST'])
def joinMeeting(request):
    meetingId = request.query_params.get('meeting_id', None)
    userId = request.query_params.get('user_id', None)
    meeting = models.Meeting.objects.get(id=meetingId)
    print(meeting.get_meeting_users())
    meeting.add_users_to_meeting(userId)
    return Response("You have joined successfully")


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk
        })

