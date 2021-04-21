from django.contrib import admin

# Register your models here.
from mainapp.models import *

admin.site.register(Meeting)
admin.site.register(User)
admin.site.register(Tag)
admin.site.register(Comment)
admin.site.register(MeetingRate)
