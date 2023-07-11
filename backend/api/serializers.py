from rest_framework import serializers

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.tokens import TokenError

from api.models import CustomUser as User
from api.models import Car


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField(
        style={'base_template': 'textarea.html'}, write_only=True)

    default_error_messages = {
        "error_token": "Token as expired or invalid!",
    }

    def validate(self, attrs):
        self.refresh_token = attrs['refresh']
        return attrs

    def save(self, **kwargs):
        # Deve ser implementado para enviar tokens para a blacklist
        # Usando um model do database
        try:
            RefreshToken(self.refresh_token).blacklist()
        except TokenError:
            self.fail('error_token')


class RegisterUserSerializer(serializers.ModelSerializer):

    refresh = serializers.CharField(
        style={'base_template': 'textarea.html'}, read_only=True)
    access = serializers.CharField(
        style={'base_template': 'textarea.html'}, read_only=True)
    

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'password', 'refresh', 'access']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data.get('username'),
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )

        user.set_password(validated_data['password'])
        user.save()

        tk = RefreshToken.for_user(user)
        refresh_token = str(tk)
        access_token = str(tk.access_token)

        response_data = {
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'refresh': refresh_token,
            'access': access_token
        }

        return response_data


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'id', 
            'first_name', 
            'last_name', 
            'username', 
            'password', 
            'is_staff', 
            'is_admin',
            'created_at', 
            'updated_at', 
            'email'
        ]
        extra_kwargs = {
            'id': {'read_only': True},
            'is_admin': {'read_only': True},
            'is_staff': {'read_only': True},
            'password': {'write_only': True},
        }

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user
    



class CarSerializer(serializers.ModelSerializer):

    class Meta:
        model = Car
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': True},
        }
