from django.urls import path

from mainapp import views


urlpatterns = [
    path('', views.index),

    path('user-list/', views.userList, name="user-list"),
    path('user-detail/<int:pk>/', views.userDetail, name="user-detail"),
    path('user-update/<int:pk>/', views.userUpdate, name="user-update"),
    path('user-delete/<int:pk>/', views.userDelete, name="user-delete"),
    path('user-create/', views.userCreate, name="user-create"),
]