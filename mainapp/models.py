from django.db import models

# Create your models here.
class User(models.Model):
    firstname =models.CharField(max_length=150)
    lastname =models.CharField(max_length=150)
    photo = models.ImageField
    email = models.EmailField
    password = models.CharField(max_length=150)

    def __str__(self):
        return self.firstname

class Meeting(models.Model):
    title = models.CharField(max_length=150)
    participants = models.IntegerField
    created_at = models.DateTimeField
    start_at = models.DateTimeField
    longtitude = models.FloatField
    latitude = models.FloatField
    headman = models.ForeignKey('User', on_delete=models.CASCADE)
    category = models.ForeignKey('Category',on_delete=models.CASCADE)
    is_expired = models.BooleanField

    def __str__(self):
        return self.title

class Category(models.Model):
    title = models.CharField(max_length=150)

    def __str__(self):
        return self.title

class Meeting_rate(models.Model):
    user_id = models.OneToOneField('User', on_delete=models.CASCADE)
    meeting_id = models.OneToOneField('Meeting', on_delete=models.CASCADE)

class Meeting_participant(models.Model):
    user_id = models.OneToOneField('User', on_delete=models.CASCADE)
    meeting_id = models.OneToOneField('Meeting', on_delete=models.CASCADE)
