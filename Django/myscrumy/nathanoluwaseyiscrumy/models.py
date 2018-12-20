from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class ScrumyUser(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	nickname = models.CharField(max_length=50)

	def _str_(self):
		return self.nickname

	class Meta:
		ordering = ['nickname']	

class GoalStatus(models.Model):
	visible = models.BooleanField(default=True)
	user = models.ForeignKey(ScrumyUser, on_delete=models.CASCADE)
	name = models.CharField(max_length=140)
	status = models.IntegerField(default=-1)		

	def _str_(self):
		return self.name

	class Meta:
		ordering = ['-id']	