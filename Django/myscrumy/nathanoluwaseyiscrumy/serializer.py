from rest_framework import serializers
from .models import *

class GoalStatusSerializer(serializers.ModelSerializer):
	class Meta:
		model = GoalStatus
		fields = ('visible', 'id', 'name', 'status')

class ScrumyUserSerializer(serializers.ModelSerializer):
	goalstatus_set = GoalStatusSerializer(many=True)
	class Meta:
		model = ScrumyUser
		fields = ('nickname', 'goalstatus_set')				