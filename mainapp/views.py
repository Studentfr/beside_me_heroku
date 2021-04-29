from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response

from . import services


# TODO Document Lines


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
