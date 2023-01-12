from django.db import models
from django.utils import timezone

# Create your models here.
class StockData(models.Model):
    symbol = models.TextField(null=True)
    date_recorded = models.DateTimeField(default=timezone.now)
    data = models.JSONField(null=True)

    def __str__(self):
        return self.symbol