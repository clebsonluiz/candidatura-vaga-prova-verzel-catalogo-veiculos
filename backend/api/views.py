from rest_framework.views import APIView, status
from rest_framework.response import Response
from api.serializers import (LogoutSerializer, RegisterUserSerializer, UserSerializer, CarSerializer)

from api.permissions import IsAdminOrItSelf, IsAdminOrSafeMethods, IsAuthenticated

from api.models import CustomUser
from api.models import Car
from django.db.models import Q


class LogoutView(APIView):
    serializer_class = LogoutSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        tk = serializer.validated_data.get('refresh')
        
        if tk is None or len(tk) == 0:
            return Response({'detail': 'Missing refresh token'}, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


class RegisterUser(APIView):

    serializer_class = RegisterUserSerializer

    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserList(APIView):

    permission_classes = [IsAdminOrItSelf]
    serializer_class = UserSerializer

    def get(self, request):
        users = CustomUser.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetail(APIView):

    permission_classes = [
        IsAdminOrItSelf
    ]

    def get_object(self, pk):
        try:
            return CustomUser.objects.get(pk=pk, is_active=True)
        except CustomUser.DoesNotExist:
            raise Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        user = self.get_object(pk)
        
        self.check_object_permissions(request=request, obj=user)

        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk):

        user = self.get_object(pk)

        self.check_object_permissions(request=request, obj=user)

        fields = dict(request.data)

        serializer = UserSerializer(user, data=fields, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            user = self.get_object(pk)
            self.check_object_permissions(request=request, obj=user)
            user.is_active = False
            user.save()
        except CustomUser.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_204_NO_CONTENT)



class CarList(APIView):

    serializer_class = CarSerializer
    permission_classes =[IsAdminOrSafeMethods]

    def get(self, request, *args, **kwargs):
        
        filterby = request.query_params.get('filterby', '')
        orderby = request.query_params.get('orderby', '')
        
        query_data = Car.objects.filter((
                Q(name__contains=filterby) |
                  Q(brand__contains=filterby) |
                    Q(color__contains=filterby)) & Q(is_active=True)
            )

        cars = query_data.order_by(
                'price' 
                if orderby == 'min' else '-price' 
                if orderby == 'max' else '-created_at'
            )
        
        serializer = self.serializer_class(cars, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CarDetail(APIView):

    serializer_class = CarSerializer

    def get_object(self, pk):
        try:
            return Car.objects.get(pk=pk, is_active=True)
        except Car.DoesNotExist:
            raise Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        car = self.get_object(pk)
        
        self.check_object_permissions(request=request, obj=car)

        serializer = self.serializer_class(data=car)
        return Response(serializer.data)

    def put(self, request, pk):

        car = self.get_object(pk)

        self.check_object_permissions(request=request, obj=car)

        fields = request.data.copy()

        # if photo is the same propaby the value is string, 
        # then drop value to not raise error
        if fields.get('photo') is not None and type(fields.get('photo')) is str:
            fields.pop('photo')

        serializer = self.serializer_class(car, data=fields, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            car = self.get_object(pk)
            self.check_object_permissions(request=request, obj=car)
            car.is_active = False
            car.save()
        except Car.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_204_NO_CONTENT)