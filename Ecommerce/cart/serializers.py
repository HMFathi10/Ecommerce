from itertools import product
from rest_framework import serializers
from .models import Cart, CartItem


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['number', 'userId', 'name',
                  'cost', 'created_at', 'updated_at']


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['number', 'product', 'quantity',
                  'price_ht', 'total_price', 'cart']


class CartItemMaintainableSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['number', 'quantity', 'total_price']
