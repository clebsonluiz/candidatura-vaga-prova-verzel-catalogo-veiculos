from django.contrib import admin
from django.urls import path, include, re_path

from rest_framework_simplejwt import views as jwt_views
from api.views import (
        LogoutView, 
        UserList, 
        UserDetail, 
        CarList, 
        CarDetail,
        RegisterUser
    )

urlpatterns = [
    path('auth/token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),
    path('auth/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/logout/', LogoutView.as_view(), name='auth_logout'),
    path('auth/register/', RegisterUser.as_view(), name='auth_register'),
    
    
    path('users/', UserList.as_view(), name='users_list'),
    path('users/<str:pk>', UserDetail.as_view(), name='users_detail'),
    path('cars/', CarList.as_view(), name='cars_list'),
    path('cars/<str:pk>', CarDetail.as_view(), name='cars_detail'),
    
]



