
# Register your models here.
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Car

# Somente para acessar o Admin do Django para alguns testes
# Não é necessário para a aplicação como um todo.
# Somente a API é importante
admin.site.register(CustomUser, UserAdmin) 
admin.site.register(Car)