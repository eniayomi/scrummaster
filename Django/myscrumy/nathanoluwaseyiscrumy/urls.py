from django.urls import path, include
from django.conf.urls import url, include
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework_jwt.views import obtain_jwt_token

app_name = "nathanoluwaseyiscrumy"

def_router = DefaultRouter()
def_router.register('scrumyusers', views.ScrumyUserViewSet)
def_router.register('goalstatus', views.GoalStatusViewSet)

urlpatterns = [
	path('create-user/', views.create_user, name="create_user"),
	path('init-user/', views.init_user, name="init_user"),
	path('nathanoluwaseyiscrumy-login/', views.scrumy_login, name="scrumy_login"),
	path('profile/', views.profile, name="profile"),
	path('nathanoluwaseyiscrumy-logout/', views.scrumy_logout, name="scrumy_logout"),
	path('add-goal/', views.add_goal, name="add_goal"),
	path('remove-goal/<int:goal_id>/', views.remove_goal, name="remove_goal"),
	path('move-goal/<int:goal_id>/<int:to_id>/', views.move_goal, name="move_goal"),
	url(r'api/', include(def_router.urls)),
	url(r'^api-token-auth/', obtain_jwt_token),
]