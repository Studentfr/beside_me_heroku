from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response

from mainapp import models
from mainapp.serializers import UserSerializer, MeetingSerializer, CommentSerializer


@api_view(['GET'])
def index(request):
    return Response("hello")


@api_view(['GET'])
def userList(request):
    users = models.User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def userDetail(request, pk):
    user = models.User.objects.get(id=pk)
    my_meetings = models.Meeting.objects.filter(headman=user)
    meetings = models.Meeting.objects.filter(users=user)
    meetingS = MeetingSerializer(my_meetings, many=True)
    meetingSe = MeetingSerializer(meetings, many=True)
    serializer = UserSerializer(user, many=False)
    return Response({"Users": serializer.data, "Owned meetings": meetingS.data, "Joined meetings": meetingSe.data})


@api_view(['POST'])
def userCreate(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['POST'])
def userUpdate(request, pk):
    user = models.User.objects.get(id=pk)
    serializer = UserSerializer(instance=user, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
def userDelete(request, pk):
    user = models.User.objects.get(id=pk)
    if user.id != 1:
        user.delete()
    return Response('User has been deleted successfully')

##################


@api_view(['GET'])
def meetingList(request):
    meetings = models.Meeting.objects.all()
    serializer = MeetingSerializer(meetings, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def meetingDetail(request, pk):
    meeting = models.Meeting.objects.get(id=pk)
    serializer = MeetingSerializer(meeting, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def meetingDetailHistory(request, pk):
    meeting = models.Meeting.objects.get(id=pk)
    comments = models.Comment.objects.filter(meeting=meeting)
    rating = models.MeetingRate.objects.filter(meeting=meeting)
    sum = 0
    for rate in rating:
        sum += rate.score
    try:
        sum = sum/len(rating)
    except:
        sum = "Not rated"
    commentSerializer = CommentSerializer(comments, many=True)
    serializer = MeetingSerializer(meeting, many=False)
    return Response({"Meetings": serializer.data,"Comments": commentSerializer.data, "Rating": sum})


@api_view(['POST'])
def meetingCreate(request):
    serializer = MeetingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['POST'])
def meetingUpdate(request, pk):
    meeting = models.Meeting.objects.get(id=pk)
    serializer = MeetingSerializer(instance=meeting, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
def meetingDelete(request, pk):
    meeting = models.Meeting.objects.get(id=pk)
    if meeting.id != 1:
        meeting.delete()
    return Response('Meeting has been deleted successfully')
