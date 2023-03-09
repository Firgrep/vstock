import os
import requests

APIKEY = os.environ.get('AV_KEY')

def get_stock_data(ticker): # Ticker symbol, or tid, gets passed in here.
    ticker = ticker.upper()
    stock_data = {}

    price_series = requests.get(f'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol={ticker}&apikey={APIKEY}&outputsize=full').json()
    if "Error Message" in price_series:
        invalid_api = "invalid_api"
        return invalid_api
    stock_data["price_series"] = price_series

    overview = requests.get(f'https://www.alphavantage.co/query?function=OVERVIEW&symbol={ticker}&apikey={APIKEY}&outputsize=full').json()
    stock_data["overview"] = overview

    income = requests.get(f'https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol={ticker}&apikey={APIKEY}&outputsize=full').json()
    stock_data["income"] = income

    balance = requests.get(f'https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol={ticker}&apikey={APIKEY}&outputsize=full').json()
    stock_data["balance"] = balance

    #cash_flow = requests.get(f'https://www.alphavantage.co/query?function=CASH_FLOW&symbol={ticker}&apikey={APIKEY}&outputsize=full').json()
    #stock_data["cash_flow"] = cash_flow

    earnings = requests.get(f'https://www.alphavantage.co/query?function=EARNINGS&symbol={ticker}&apikey={APIKEY}&outputsize=full').json()
    
    if "Error Message" in earnings:
        print(earnings)
        print("error at final api AV request")
        invalid_api = "invalid_api"
        return invalid_api
    
    stock_data["earnings"] = earnings
    
    return stock_data