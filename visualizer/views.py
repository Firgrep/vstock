from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from django.core.cache import cache
from .models import StockData
from .forms import TickerForm
from .av import get_stock_data
from .fns import produce_graphs

import json
import requests

DATABASE_ACCESS = True 

def home(request):
    if request.method == 'POST':
        form = TickerForm(request.POST)
        if form.is_valid():
            ticker = request.POST['ticker']
            ticker = ticker.upper()
            return HttpResponseRedirect(ticker)
    else:
        form = TickerForm()
    return render(request, 'visualizer/home.html', {'form': form})

def ticker(request, tid):
    context = {}
    context["ticker"] = tid

    # Before the API is called for fresh data, cache is checked against fixed existing calls
    # within the set parameter. If the cache key is found, function returns a http redirect
    # to an error page. This prevents calling the API beyond allotted usage, which thus
    # prevents data creation with faulty data (e.g. API error messages rather than the
    # actual data). Upon successful API call, a cache is created with fixed relevant key, 
    # value, and a set timeout.
    key_av = "API_av_call"
    cache_value = "Cooldown"
    request_denied = "request_denied/"
    ticker_invalid = "ticker_invalid/"

    if DATABASE_ACCESS == True:
        
        # Tid (Ticker ID) is filtered against the database for existing entries.
        if StockData.objects.filter(symbol=tid).exists():
            print("Retrieving data from database.")
            entry = StockData.objects.filter(symbol=tid)[0]
            now = timezone.now()

            # The existing data is checked against current time. If older than 24 hours,
            # the data will be updated with a fresh API call.
            if (now - entry.date_recorded).days > 2:
                print("Old data detected, calling API and updating record.")
                if cache.get(key_av):
                    print("Max API calls exceeded. Redirecting error page.")
                    return HttpResponseRedirect(request_denied)
                stock_data = get_stock_data(tid)
                cache.set(key_av, cache_value, timeout=61)
                entry.data = json.dumps(stock_data)
                entry.date_recorded = timezone.now()
                entry.save()

            # Calling graph functions with existing or updated data, which will be
            # stored as static files for the templates to use.
            overview = produce_graphs(entry.data)
            context["overview"] = overview
            return render(request, 'visualizer/ticker.html', context)

    # When no existing data is found, API is called for fresh data, which will be packaged 
    # together with <tid> and current date (by default) into a model for the database. 
    # Graph functions are then called on the data of this model, to be stored as static 
    # files for the templates to use, and finally saved to the database.
    print("No existing symbol found in database. Calling API.")
    if cache.get(key_av):
        print("Max API calls exceeded. Redirecting error page.")
        return HttpResponseRedirect(request_denied)

    stock_data = get_stock_data(tid)
    cache.set(key_av, cache_value, timeout=61)

    if stock_data == "invalid_api":
        print("Ticker search returned invalid.")
        return HttpResponseRedirect(ticker_invalid)

    temp = StockData(symbol=tid, data=json.dumps(stock_data))
    overview = produce_graphs(temp.data)
    context["overview"] = overview
    temp.save() 
    return render(request, 'visualizer/ticker.html', context)

def ticker_request_denied(request):
    context = {}
    symbol_list = list(StockData.objects.all().values_list('symbol', flat=True)) 
    context["symbol_list"] = symbol_list
    return render(request, 'visualizer/ticker_request_denied.html', context)

def ticker_invalid(request):
    context = {}
    symbol_list = list(StockData.objects.all().values_list('symbol', flat=True)) 
    context["symbol_list"] = symbol_list
    return render(request, 'visualizer/ticker_invalid.html', context)

def about(request):
    context = {}
    symbol_list = list(StockData.objects.all().values_list('symbol', flat=True)) 
    context["symbol_list"] = symbol_list
    return render(request, 'visualizer/about.html', context)