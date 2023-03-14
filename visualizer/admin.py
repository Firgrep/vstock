from django.contrib import admin
from .models import StockData, IndexData
# Register your models here.

admin.site.register(StockData)
admin.site.register(IndexData)