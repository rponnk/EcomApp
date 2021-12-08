from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User

from .models import Product
from .serializers import ProductSerializer, UserSerializer, UserSerializerWithToken


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password, check_password
from rest_framework import status

# Create your classes here.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        print(self.user)
        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v


        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# Create your views here.

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


# Products views
@api_view(['GET'])
def getProducts(request):
    """Grab all products and its info"""
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
    """Grab single product/item"""
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)