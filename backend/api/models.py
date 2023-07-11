from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import (
        # AbstractUser as BaseUser, 
        PermissionsMixin as DefaultPermissionsMixin
    )
from uuid import uuid4
from .manager import CustomUserManager


class CustomPermissionMixin(models.Model):

    is_active = models.BooleanField(
        _("Ativo no sistema"),
        default=True,
        help_text=_(
            "Desigina a este usuário a permissão de acessar "
            "as funcionalidades do sistema "
        ),
    )
    is_staff = models.BooleanField(
        _("Status de membro"),
        default=False,
        help_text=_(
            "Desigina a este usuário permissões parciais de acesso "
            "que usuários comuns não teriam."
        ),
    )
    is_admin = models.BooleanField(
        _("Status de admin"),
        default=False,
        help_text=_(
            "Desigina a este usuário total permissão ao sistema."
        ),
    )

    class Meta:
        abstract = True



class CustomUser(AbstractBaseUser, CustomPermissionMixin, DefaultPermissionsMixin):
    id = models.UUIDField(primary_key=True, unique=True, default=uuid4, editable=False)
    username_validator = UnicodeUsernameValidator()

    username = models.CharField(
        _("username"),
        max_length=150,
        unique=True,
        help_text=_(
            "Obrigatório. 150 caracteres ou menos. Letras, digitos e @/./+/-/_ somente."
        ),
        validators=[username_validator],
        error_messages={
            "unique": _("Já existe um usuraio com este username."),
        },
    )
    first_name = models.CharField(_("Nome"), max_length=150, blank=True)
    last_name = models.CharField(_("Sobrenome"), max_length=150, blank=True)
    email = models.EmailField(_("Endereço de email"), blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = CustomUserManager()

    class Meta:
        db_table = 'api_user'

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'username'

    def has_perm(self, perm, obj=None):
        if self.is_active and self.is_admin:
            return True
        return super().has_perm(self, perm, obj)

    def has_module_perms(self, app_label):
        if self.is_active and self.is_admin:
            return True
        return super().has_module_perms(self, app_label)


class Car(models.Model):
    id = models.UUIDField(primary_key=True, unique=True, default=uuid4, editable=False)
    name = models.CharField(max_length=100, null=False)
    description = models.TextField(null=True)
    model = models.CharField(max_length=100, null=False)
    brand = models.CharField(max_length=100, null=False)
    price = models.FloatField(null=False)
    color = models.CharField(max_length=30, null=False)
    year = models.IntegerField(null=False)
    km_road = models.FloatField(null=False)

    class MotorType(models.TextChoices):
        HYBRID = 'HYBRID', 'Híbrido'
        COMBUSTION = 'COMBUSTION', 'Combustão'
        ELETRIC = 'ELETRIC', 'Eletríco'

    motor_type = models.CharField(
        max_length=20, 
        choices=MotorType.choices,
        default=MotorType.COMBUSTION
        )

    class FuelType(models.TextChoices):
        GASOLINE_R =  'Regular gasoline', 'Gasolina comum'
        GASOLINE_A =  'Additive gasoline', 'Gasolina Aditivada'
        GASOLINE_P =  'Premium gasoline', 'Gasolina premium'
        ETHANOL_R =  'Ethanol', 'Etanol'
        ETHANOL_A =  'Additive Ethanol', 'Etanol aditivado'
        DIESEL_R =  'Regular Diesel', 'Diesel comum'
        DIESEL_S10 =  'Diesel S10', 'Diesel S-10'
        DIESEL_A =  'Additive Diesel', 'Diesel aditivado'
        DIESEL_P =  'Premium Diesel', 'Diesel premium'
        NATURAL_GAS =  'CNG', 'GNV (GAS NATURAL)'
        ELETRICITY =  'Eletricity', ' Eletricidade'    

    fuel_type = models.CharField(
        max_length=20, 
        choices=FuelType.choices,
        default=FuelType.GASOLINE_R
        )

    class TransmissionType(models.TextChoices):
        MANUAL = 'MANUAL', 'Manual'
        AUTOMATIC = 'AUTOMATIC', 'Automático'
        AUTOMATIZED = 'AUTOMATIZED', 'Automatizado'

    transmission_type = models.CharField(
        max_length=20, 
        choices=TransmissionType.choices,
        default=TransmissionType.MANUAL
        )
    
    # Armazenando as imagens na pasta media/uploads .... dentro do diretorio raiz do backend
    # Assim evita de usar base64 Images no banco de dados neste exemplo
    photo = models.ImageField(upload_to='uploads/car/img/%Y/%m/%d/', null=True, blank=True)
    

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'api_tb_car'
        ordering = ('-price', 'price', 'created_at', '-created_at')
