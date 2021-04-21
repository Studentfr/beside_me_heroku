from django.db import models

# Create your models here.
class User(models.Model):
    firstname =models.CharField(max_length=150)
    lastname =models.CharField(max_length=150)
    photo = models.ImageField(upload_to='static/imgs', blank=True, null=True)
    email = models.EmailField()
    password = models.CharField(max_length=150)

    def __str__(self):
        return self.firstname

class Meeting(models.Model):
    users = models.ManyToManyField('User')
    title = models.CharField(max_length=150)
    participants = models.IntegerField()
    created_at = models.DateTimeField()
    start_at = models.DateTimeField()
    longtitude = models.FloatField()
    latitude = models.FloatField()
    headman = models.ForeignKey('User', on_delete=models.CASCADE, related_name='+')
    is_expired = models.BooleanField()

    def __str__(self):
        return self.title

class Tag(models.Model):
    title = models.CharField(max_length=150)
    meetings = models.ManyToManyField('Meeting')
    users = models.ManyToManyField('User')

    def __str__(self):
        return self.title

class Comment(models.Model):
    comment = models.TextField()
    user = models.ForeignKey('User', on_delete=models.SET_NULL, null=True)
    meeting = models.ForeignKey('Meeting', on_delete=models.CASCADE)

class MeetingRate(models.Model):
    score = models.IntegerField()
    user = models.ForeignKey('User', on_delete=models.SET_NULL, null=True)
    meeting = models.ForeignKey('Meeting', on_delete=models.CASCADE)

