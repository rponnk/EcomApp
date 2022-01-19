from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *
from rest_framework_simplejwt.tokens import AccessToken



class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    status_ = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            '_id',
            'username',
            'email',
            'name',
            'status_',
            'isAdmin'
             ]
    """
    _status_ as an example would need method below to be like this def get_ _ status _ | this matches the naming convention
    if it was like this status_ it would need to be like this def get_ status _
    
    """
    def get__id(self,obj):
        return obj.id

    def get_status_(self, obj):
        return obj.is_active
    
    def get_isAdmin(self, obj):
        return obj.is_staff
    
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
                'isAdmin',
                'token'
                ]
        def get_token(self, obj):
            token = AccessToken.for_user(obj)
            return str(token)
        


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(
                obj.shippingaddress, many=False).data
        except:
            address = False
        return address

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data