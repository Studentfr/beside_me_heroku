from django.urls import path, include

from mainapp import views
from rest_framework import routers

from mainapp.views import UserViewSet

router = routers.DefaultRouter()
router.register('users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),

    path('user-list/', views.userList, name="user-list"),
    path('user-detail/<int:pk>/', views.userDetail, name="user-detail"),
    path('user-update/<int:pk>/', views.userUpdate, name="user-update"),
    path('user-delete/<int:pk>/', views.userDelete, name="user-delete"),
    path('user-create/', views.userCreate, name="user-create"),

    path('meeting-list/', views.meetingList, name="meeting-list"),
    path('meeting-detail/<int:pk>/', views.meetingDetail, name="meeting-detail"),
    path('meeting-detailH/<int:pk>/', views.meetingDetailHistory, name="meeting-detailH"),
    path('meeting-update/<int:pk>/', views.meetingUpdate, name="meeting-update"),
    path('meeting-delete/<int:pk>/', views.meetingDelete, name="meeting-delete"),
    path('meeting-create/', views.meetingCreate, name="meeting-create"),

    path('comment-create/<int:pk>', views.commentCreate, name="meeting-create"),
]