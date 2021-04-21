from django.db import models


# Create your models here.
class User(models.Model):
    """"
    Model of users that contains both participants and headmen information
    """
    firstname = models.CharField(max_length=150, verbose_name="First Name")
    lastname = models.CharField(max_length=150, verbose_name="Last Name")
    photo = models.ImageField(upload_to='static/imgs', blank=True, null=True)
    email = models.EmailField(verbose_name="Email")
    password = models.CharField(max_length=150)
    tags = models.ManyToManyField('Tag')

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.firstname


class Meeting(models.Model):
    """"
    Model of meeting that contains basic information about the event
    """
    title = models.CharField(max_length=150, verbose_name='Title')
    participants = models.IntegerField(verbose_name='Participants Number')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Created At')
    start_at = models.DateTimeField(verbose_name='Expire Time')
    longitude = models.FloatField(verbose_name='Longitude')
    latitude = models.FloatField(verbose_name='Latitude')
    headman = models.ForeignKey('User', on_delete=models.CASCADE, related_name='+', verbose_name='Headman')
    is_expired = models.BooleanField(verbose_name='Is Expired')
    tags = models.ManyToManyField('Tag')
    users = models.ManyToManyField('User')

    class Meta:
        verbose_name = 'Meeting'
        verbose_name_plural = 'Meetings'

    def __str__(self):
        return self.title


class Tag(models.Model):
    """"
    Model of Tags, nothing special...
    """
    title = models.CharField(max_length=150)

    def __str__(self):
        return self.title


class Comment(models.Model):
    """"
    Model of Comments.
    Participants can comment the meeting they have participated in!
    """
    comment = models.TextField(verbose_name="Comment")
    user = models.ForeignKey('User', on_delete=models.SET_NULL, null=True, verbose_name="Participant")
    meeting = models.ForeignKey('Meeting', on_delete=models.CASCADE, verbose_name='Commented Meeting')

    class Meta:
        verbose_name = "Comment"
        verbose_name_plural = "Comments"

    def __str__(self):
        return self.comment


class MeetingRate(models.Model):
    """"
    Model of Ratings
    Participants can rate the meeting they have participated in!
    """
    score = models.IntegerField(verbose_name="Score")
    user = models.ForeignKey('User', on_delete=models.SET_NULL, null=True, verbose_name='Participant')
    meeting = models.ForeignKey('Meeting', on_delete=models.CASCADE, verbose_name='Rated Meeting')

    class Meta:
        verbose_name = "Rating"
        verbose_name_plural = 'Ratings'

    def __str__(self):
        return str(self.score)