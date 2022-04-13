from asyncio.windows_events import NULL
from distutils.command.upload import upload
from itertools import product
from pyexpat import model
from tkinter import CASCADE
from django.db import models
from io import BytesIO
from PIL import Image
from django.core.files import File
# from django.contrib.postgres.fields import ArrayField
from django.contrib.postgres.fields import ArrayField
from product.models import Product


class CartItem(models.Model):
    number = models.AutoField(primary_key=True)
    product = models.ForeignKey(
        'product.Product', related_name='prodcut', on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    price_ht = models.DecimalField(max_digits=6, decimal_places=2, blank=True)
    total_price = models.DecimalField(max_digits=6, decimal_places=2)
    cart = models.ForeignKey(
        'Cart', related_name='cart', on_delete=models.CASCADE)

    date_added = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    TAX_AMOUNT = 19.25

    class Meta:
        ordering = ('-date_added',)

    def price_ttc(self):
        return self.price_ht * (1 + TAX_AMOUNT/100.0)

    def __str__(self):
        return f"{self.number}, {self.product}, {self.quantity}, {self.price_ht}"


class Cart(models.Model):
    number = models.AutoField(primary_key=True)
    userId = models.IntegerField()
    name = models.CharField(max_length=256)
    cost = models.DecimalField(max_digits=6, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return f"{self.number}"
