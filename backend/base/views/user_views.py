from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User

from base.serializers import UserSerializer, UserSerializerWithToken


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status

# Create your classes here.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Register views
@api_view(['POST'])
def registerUser(request):
    """ Register a user, if a user exist with the email, handle by using try|catch and giving a bad req"""
    
    data = request.data
    try:
        user = User.objects.create(
            first_name = data['name'],
            username =data['email'],
            email = data['email'],
            password = make_password(data['password'])
        )
        #take the user and serialize it, it will pass info above to serializer below with a token
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exist'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

# User views

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):

    '''Allow the user to update thier profile, password, username, etc...'''
    
    # send a token > token gets used in get request to the url that grabs data below
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)
    
    data = request.data 
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    
    # check the password first before changing
    if data['password'] != '':
        user.password = make_password(data['password'])
    
    user.save()
    
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):

    # send a token > token gets used in get request to the url that grabs data below
    users = request.user
    serializer = UserSerializer(users, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    # send a token > token gets used in get request to the url that grabs data below
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
