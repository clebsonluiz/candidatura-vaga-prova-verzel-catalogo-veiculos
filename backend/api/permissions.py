from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, AuthenticationFailed
from api.models import CustomUser


class IsAuthenticated(permissions.BasePermission):
    
     def has_permission(self, request, view):
        return request.user and request.user.is_authenticated


class IsAdminOrSafeMethods(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user and request.user.is_authenticated and request.user.is_admin 


class IsAdminOrItSelf(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.is_authenticated and request.user.is_admin:
            return True
        return obj.id == request.user.id and request.user.is_authenticated