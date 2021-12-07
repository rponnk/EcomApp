from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *
from rest_framework_simplejwt.tokens import RefreshToken



class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    status_ = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            '_id',
            'username',
            'email',
            'name',
            'status_'
             ]
    """
    _status_ as an example would need method below to be like this def get_ _ status _ | this matches the naming convention
    if it was like this status_ it would need to be like this def get_ status _
    
    """
    def get__id(self,obj):
        return obj.id

    def get_status_(self, obj):
        return obj.is_active

    def get_name(self,obj):

        """ 
        Grab the users name, if the name is empty as its not required
        set the name to email as it will be a requirement
        """
        name = obj.first_name
        
        if name == '':
            name = obj.email
        return name

class UserSerializerWithToken(UserSerializer):
        token = serializers.SerializerMethodField(read_only=True)

        class Meta:
            model = User
            fields = [
                '_id',
                'username',
                'email',
                'name',
                'status_',
                'token'
                ]
        def get_token(self, obj):
            token = RefreshToken.for_user(obj)
            return str(token)