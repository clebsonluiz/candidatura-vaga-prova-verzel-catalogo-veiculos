from django.apps import apps
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.base_user import BaseUserManager


class CustomUserManager(BaseUserManager):

    def create_user(self, username, password, **extra_fields):
        if not username:
            raise ValueError(_("O campo 'username' deve ser definido"))
        if not password:
            raise ValueError(_("O campo 'passowrd' deve ser definido"))

        extra_fields.setdefault('is_active', True)
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_admin', True)
        
        if extra_fields.get('is_admin') != True:
            raise ValueError('Administrador deve ter as permissões de administrador')
        return self.create_user(username, password, **extra_fields)