from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Account(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  email_confirmed = models.BooleanField(default=False)

@receiver(post_save, sender=User)
def update_user_account(sender, instance, created, **kwargs):
  if created:
    Account.objects.create(user=instance)
  instance.account.save()