import yfinance as yf
from .models import IndexData
from django.utils import timezone
import json
import time

def get_index_data(symbol):

        def get_new_data(symbol):
            time.sleep(0.1)
            try:
                data = yf.Ticker(symbol)
                hist = data.history(period="5y", auto_adjust=False)
                hist = hist[::-1]
                return hist["Close"].tolist()
            except:
                 print(f"Error at fetching new {symbol} data")
                 return 0
            

        if IndexData.objects.filter(symbol=symbol).exists():
            print(f"Retrieving {symbol} from database")
            entry = IndexData.objects.filter(symbol=symbol)[0]
            now = timezone.now()

            if (now - entry.date_recorded).days > 1:
                print(f"Updating {symbol} record")
                pre_payload = get_new_data(symbol)

                if not pre_payload or pre_payload == 0:
                    print(f"{symbol} prepayload is empty")
                    return 0
                
                payload = json.dumps(pre_payload)
                entry.data = payload
                entry.date_recorded = timezone.now()
                entry.save()
                return payload
            
            payload = entry.data
            return payload
        
        print(f"Attempting to fetch new {symbol} data")
        pre_payload = get_new_data(symbol)

        if not pre_payload or pre_payload == 0:
            print(f"{symbol} prepayload is empty")
            return 0
        
        payload = json.dumps(pre_payload)
        entry = IndexData(symbol=symbol, data=payload)
        entry.save()
        return payload