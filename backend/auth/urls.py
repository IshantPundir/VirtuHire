from django.urls import path
from . import views
  
urlpatterns = [
    path('home/', views.HomeView.as_view(), name ='home'),
    path('signup/', views.SignUpView.as_view(), name='signup'),
    path('logout/', views.LogoutView.as_view(), name ='logout'),
]