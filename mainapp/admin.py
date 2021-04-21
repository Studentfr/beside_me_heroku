from django.contrib import admin

# Register your models here.
from mainapp.models import *


class UserAdmin(admin.ModelAdmin):
    """"
        Settings for User Admin Page
    """
    list_display = ('id', 'firstname', 'lastname', 'email')
    list_display_links = ('id', 'firstname', 'lastname', 'email')
    search_fields = ('firstname',)


class MeetingAdmin(admin.ModelAdmin):
    """"
        Settings for Meeting Admin Page
    """
    list_display = ('id', 'title', 'participants', 'created_at', 'start_at',
                    'headman', 'is_expired')
    list_display_links = ('id', 'title')
    search_fields = ('title',)


class CommentAdmin(admin.ModelAdmin):
    """"
        Settings for Comment Admin Page
    """
    list_display = ('id', 'user', 'meeting', 'comment')
    search_fields = ('meeting',)


class RatingAdmin(admin.ModelAdmin):
    """"
        Settings for Rating Admin Page
    """
    list_display = ('id', 'user', 'meeting', 'score')
    search_fields = ('meeting',)


admin.site.register(Meeting, MeetingAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Tag)
admin.site.register(Comment, CommentAdmin)
admin.site.register(MeetingRate, RatingAdmin)
