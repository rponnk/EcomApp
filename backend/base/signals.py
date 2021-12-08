from django.db.models.signals import pre_save
from django.contrib.auth.models import User

def updateUser(sender, instance, **kwargs):
    
    user = instance
    
    # convert the username to be the email
    if user.email != '':
        user.username = user.email
    

pre_save.connect(updateUser, sender=User)