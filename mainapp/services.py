from rest_framework.authtoken.models import Token

from mainapp import models
from mainapp.models import User
from mainapp.serializers import UserSerializer, MeetingSerializer, CommentSerializer, MeetingCreationSerializer, \
    CommentCreateSerializer, TagSerializer


# User Functions

def getAllUsers():
    users = models.User.objects.all()
    return serializeUsers(users, True).data


def getUserById(id: int):
    user = models.User.objects.get(id=id)
    getUserById.userOb = user
    return serializeUsers(user, False).data


def getUserDetail(id):
    user_serializer_data = getUserById(id)
    user = getUserById.userOb
    meetings_created_serializer_data = getMeetingsIfHeadMan(user).data
    meetings_participated_serializer_data = getMeetingsIfParticipant(user).data
    return {"Users": user_serializer_data,
            "Owned meetings": meetings_created_serializer_data,
            "Joined meetings": meetings_participated_serializer_data
            }


def serializeUsers(users, isList: bool):
    return UserSerializer(users, many=isList)


def saveUserToDB(user_data):
    serializer = UserSerializer(data=user_data)
    if serializer.is_valid():
        serializer.save()
    user = User.objects.get(email=user_data["email"])
    token = Token.objects.get(user=user.id)
    return {"data": serializer.data, "token": token.key, "id": user.id}


def updateUser(id, user_data):
    user = models.User.objects.get(id=id)
    serializer = UserSerializer(instance=user, data=user_data)
    if serializer.is_valid():
        serializer.save()
    return serializer.data


def userDelete(id) -> str:
    user = models.User.objects.get(id=id)
    user.delete()
    return 'User has been deleted successfully'


# Meeting Function

def getAllMeetings():
    meetings = models.Meeting.objects.all()
    return serializeMeeting(meetings, True).data


def getMeetingById(id):
    meeting = models.Meeting.objects.get(id=id)
    getMeetingById.meeting = meeting
    return serializeMeeting(meeting, False).data


def getMeetingsIfHeadMan(user):
    meetings = models.Meeting.objects.filter(headman=user)
    return serializeMeeting(meetings, True)


def getMeetingsIfParticipant(user):
    meetings = models.Meeting.objects.filter(users=user)
    return serializeMeeting(meetings, True)


def getMeetingHistory(id):
    meeting_serializer_data = getMeetingById(id)
    meeting = getMeetingById.meeting
    comment_serializer_data = getCommentByMeeting(meeting)
    meeting_rating = countRatingOfMeeting(meeting)
    return {"Meetings": meeting_serializer_data, "Comments": comment_serializer_data,
            "Rating": meeting_rating}


def saveMeetingToDB(meeting_data):
    serializer = MeetingCreationSerializer(data=meeting_data)
    if serializer.is_valid():
        serializer.save()
    return serializer.data


def updateMeeting(id, meeting_data):
    meeting = models.Meeting.objects.get(id=id)
    serializer = MeetingSerializer(instance=meeting, data=meeting_data)
    if serializer.is_valid():
        serializer.save()
    return serializer.data


def deleteMeeting(id):
    meeting = models.Meeting.objects.get(id=id)
    try:
        meeting.delete()
    except:
        return "Something went wrong"
    return 'Meeting has been deleted successfully'


def serializeMeeting(meetings, isList: bool):
    return MeetingSerializer(meetings, many=isList)


def serializeMeetingCreation(meetings, isList: bool):
    return MeetingCreationSerializer(meetings, many=isList)


# Comment Function

def getCommentByMeeting(meeting):
    comments = models.Comment.objects.filter(meeting=meeting)
    return serializeComment(comments, True).data


def serializeComment(comments, isList: bool):
    return CommentSerializer(comments, many=isList)


# Rate Function

def getRatingByMeeting(meeting):
    ratings = models.MeetingRate.objects.filter(meeting=meeting)
    return ratings


def ratingCounter(rating):
    sum = 0
    for rate in rating:
        sum += rate.score
    try:
        sum = sum / len(rating)
    except:
        sum = "Not rated"
    return sum


def countRatingOfMeeting(meeting):
    return ratingCounter(getRatingByMeeting(meeting))


def saveCommentToDB(data, pk):
    data['meeting'] = pk  # We dont need to send meetingId in json, it will added here automatically
    # data['user'] = TODO: We need to get current user id from session, but now we send userId in json
    serializer = CommentCreateSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
    return serializer.data


def serializeTag(tags, isList: bool):
    return TagSerializer(tags, many=isList)


def getAllTags():
    tags = models.Tag.objects.all()
    return serializeTag(tags, True).data
