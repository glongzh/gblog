import json
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from rest_framework import viewsets, permissions, status, views
from rest_framework.response import Response
from .models import Account, Profile
from .serializers import AccountSerializer, ProfileSerializer
from .permissions import IsAccountOwner

# Create your views here.

class AccountViewSet(viewsets.ModelViewSet):
	lookup_field = 'username'
	queryset = Account.objects.all()
	serializer_class = AccountSerializer
	filter_fields = ('id', 'username')

	def get_permissions(self):
		if self.request.method in permissions.SAFE_METHODS:
			return (permissions.AllowAny(),)
		return (permissions.IsAuthenticated(), IsAccountOwner())

	def create(self, request):
		serializer = self.serializer_class(data=request.data)

		if serializer.is_valid():
			user = Account.objects.create_user(**serializer.validated_data)
			profile = Profile(account=user)
			profile.save()
			return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProfileViewSet(viewsets.ModelViewSet):
	queryset = Profile.objects.all()
	serializer_class = ProfileSerializer

	def get_permissions(self):
		if self.request.method in permissions.SAFE_METHODS:
			return (permissions.AllowAny(),)
		return (permissions.IsAuthenticated(), IsAccountOwner())


class LoginView(views.APIView):
	def post(self, request):
		data = json.loads(request.body)
		email = data.get('email', None)
		password = data.get('password', None)

		user = authenticate(email=email, password=password)

		if user is not None:
			if user.is_active:
				login(request, user)
				serialized = AccountSerializer(user)
				return Response(serialized.data)
			else:
				return Response({
					'status': 'Unauthorized',
					'message': 'User is not active'
				}, status=status.HTTP_401_UNAUTHORIZED)	
		else:
			return Response({
				'status': 'Unauthorized',
				'message': 'Email or password is invalid'
			}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(views.APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def post(self, request):
		logout(request)
		return Response({}, status=status.HTTP_204_NO_CONTENT)
		