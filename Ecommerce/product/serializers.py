from itertools import product
from rest_framework import serializers
from .models import Category, Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['number', 'name', 'get_absolute_url', 'description',
                  'price', 'get_image', 'get_thumbnail']
