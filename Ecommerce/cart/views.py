from itertools import product
from unicodedata import category, name
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

import cart
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer, CartItemMaintainableSerializer
from django.http import Http404
from rest_framework import status
from product.models import Product
from product.serializers import ProductSerializer
from django.db.models import Sum


def calculateTotalCost():

    try:
        cost = CartItem.objects.aggregate(Sum('total_price'))
        totalCost = round(cost['total_price__sum'], 2)
        Cart.objects.filter(number=1).update(cost=totalCost)
    except:
        Cart.objects.filter(number=1).update(cost=0.00)
        

class ListestCartList(APIView):

    def get(self, request, format=None):
        calculateTotalCost()
        cart = Cart.objects.get(number=1)
        serializer = CartSerializer(cart)
        cartItems = CartItem.objects.filter(cart=cart)
        cartProudct = list(cartItems.values())
        CartProductData = []
        for item in cartProudct:
            productData = Product.objects.filter(
                number=item['product_id']).get()
            serializeProduct = ProductSerializer(productData)
            data = {"cartItem": item,
                    "product": serializeProduct.data}
            CartProductData.append(data)
        cartData = {"cart": serializer.data, "items": CartProductData}
        return Response(cartData)
        # return Response(serializer.data)

    def post(self, request, format=None):
        serializer = CartSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CartDetail(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """

    def get_object(self, userId):
        try:
            return Cart.objects.get(userId=userId)
        except Cart.DoesNotExist:
            raise Http404

    def get(self, request, userId, format=None):
        cart = self.get_object(userId)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def put(self, request, userId, format=None):
        cart = self.get_object(userId)
        serializer = CartSerializer(cart, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, userId, format=None):
        cart = self.get_object(userId)
        cart.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


######
# def updateCartData(request):

    ######


def checkIsExist(request):
    # try:
    #     productData = request.data['product']
    #     cartData = request.data['cart']
    #     exist = CartItem.objects.filter(product=productData)
    #     return exist
    # except:
    #     return False
    try:
        data = {}
        data['proposal_list'] = CartItem.objects.filter(
            cart=request.data['cart'], product=request.data['product']).get()
        return data['proposal_list'].number
    except:
        return False
    # return request.data['product']

######


class ListestCartItemsList(APIView):

    def get(self, request, format=None):
        cartItems = CartItem.objects.all()
        serializer = CartItemSerializer(cartItems, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        response = checkIsExist(request)
        if response is not False:
            cartItem = CartItem.objects.filter(number=response)
            for data in cartItem:
                tax_Amount = 1.1925
                quantity = int(data.quantity) + 1
                totalPrice = float(data.price_ht) * quantity * tax_Amount
                CartItem.objects.filter(
                    number=response).update(quantity=quantity, total_price=totalPrice)
            return Response(f"Upatated", status=status.HTTP_201_CREATED)
        serializer = CartItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# #####


class CartItemsDetail(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """

    def get_object(self, cart):
        try:
            return CartItem.objects.filter(cart=cart)
        except Cart.DoesNotExist:
            raise Http404

    def get(self, request, cart, format=None):
        cart = self.get_object(cart)
        serializer = CartItemSerializer(cart, many=True)
        return Response(serializer.data)

    def put(self, request, cart, format=None):
        cart = self.get_object(cart)
        serializer = CartItemSerializer(cart, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, cart, format=None):
        cart = self.get_object(cart)
        cart.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

##########


class CartItemsMaintainable(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """

    def get_object(self, pk):
        try:
            return CartItem.objects.filter(pk=pk).first()
        except Cart.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        cart = self.get_object(pk)
        serializer = CartItemSerializer(cart)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        cart = self.get_object(pk)
        serializer = CartItemMaintainableSerializer(cart, data=request.data)
        if serializer.is_valid():
            serializer.save()
            responseSerializer = CartItemSerializer(cart)
            return Response(responseSerializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        cart = self.get_object(pk)
        cart.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
