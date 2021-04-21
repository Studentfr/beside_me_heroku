from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response

from mainapp import models
from mainapp.serializers import UserSerializer


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
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


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

