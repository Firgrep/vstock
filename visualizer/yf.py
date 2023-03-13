import yfinance as yf
from .models import IndexData
from django.utils import timezone
import json
import time

def get_index_data(symbol):

        def get_new_data(symbol):
            time.sleep(0.1)
            data = yf.Ticker(symbol)
            hist = data.history(period="5y", auto_adjust=False)
            hist = hist[::-1]
            return hist["Close"].tolist()

        if IndexData.objects.filter(symbol=symbol).exists():
            print("Retrieving market index from database")
            entry = IndexData.objects.filter(symbol=symbol)[0]
            now = timezone.now()

            if (now - entry.date_recorded).days > 1:
                print("Updating market index record")
                pre_payload = get_new_data(symbol)
                payload = json.dumps(pre_payload)
                entry.data = payload
                entry.date_recorded = timezone.now()
                entry.save()
                return payload
            
            payload = entry.data
            return payload
        
        pre_payload = get_new_data(symbol)
        payload = json.dumps(pre_payload)
        entry = IndexData(symbol=symbol, data=payload)
        entry.save()
        return payload