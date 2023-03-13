import matplotlib.ticker as ticker
import numpy as np
import json
from statistics import mean
from .yf import get_index_data

#---------------------------------------------------
#  Data Treatment Section
#
#---------------------------------------------------

@ticker.FuncFormatter
def million_formatter(x, pos):
        return "${:,} M".format(int(x/1E6)) # Old return without commas per thousand: return "$%.0f M" % (x/1E6)

def string_to_float_list(string_list):
    float_list = []
    for i in string_list:
        try:
            float_list.append(float(i))
        except ValueError:
            float_list.append(float(0.0000))
    return float_list

def roic_calculation(stkhldr_equity, longdebt, shortdebt,
                        cptl_lease, net_inc):

    sum_of_var_one = np.add(stkhldr_equity, longdebt)
    sum_of_var_two = np.add(shortdebt, cptl_lease)
    sum_of_variables = np.add(sum_of_var_one, sum_of_var_two)
    division_sum = np.divide(net_inc, sum_of_variables)
    result = division_sum * 100
    result = result.tolist()
    return result

def earnings_beat_difference(eps, esti_eps):
    beat_difference = np.subtract(eps, esti_eps)
    beat_diff_json_ready = beat_difference.tolist()
    return beat_diff_json_ready

def process_data(entry):
    
    #--------------------------------------------------------
    # Extracting All Relevant Data For Views
    #--------------------------------------------------------

    # 0 LEVEL DATA
    stock_data = json.loads(entry)

    # 1st LEVEL DATA
    price_series_all = stock_data["price_series"]
    balance = stock_data["balance"]
    income = stock_data["income"]
    overview = stock_data["overview"]
    earnings = stock_data["earnings"]
    
    # 2nd LEVEL DATA
    price_series = price_series_all["Time Series (Daily)"]
    income_annual = income["annualReports"]
    income_quarterly = income["quarterlyReports"]
    balance_annual = balance["annualReports"]
    balance_quarterly = balance["quarterlyReports"]
    earnings_annual = earnings["annualEarnings"]
    earnings_quarterly = earnings["quarterlyEarnings"]

    mkt_cap_str = overview["MarketCapitalization"]
    overview["MarketCapitalization"] = (million_formatter(int(mkt_cap_str)))
    div_yield_str = overview["DividendYield"]
    div_yield = round(float(div_yield_str), 2)
    overview["DividendYield"] = div_yield * 100

    # 3rd LEVEL DATA :: Turning strings into floats where needed
    # -  PRICE SERIES VARIABLES
    dates_and_price = {}
    for i in price_series:
        dates_and_price[i] = price_series[i]['5. adjusted close']

    prices_str = []
    price_dates = []
    for i in dates_and_price.values():
        prices_str.append(i)
    for i in dates_and_price.keys():
        price_dates.append(i)
    
    prices = string_to_float_list(prices_str)
    overview["LastPrice"] = prices[0]

    # -  INCOME STATEMENT VARIABLES
    # -- ANNUAL
    income_annual_dates = [i["fiscalDateEnding"] for i in income_annual]

    revenue_list_annual_str = [i["totalRevenue"] for i in income_annual]
    revenue_list_annual = string_to_float_list(revenue_list_annual_str)

    net_income_annual_str = [inc["netIncome"] for inc in income_annual]
    net_income_annual = string_to_float_list(net_income_annual_str)

    # -- QUARTERLY
    income_quarterly_dates = [date["fiscalDateEnding"] for date in income_quarterly]

    revenue_list_quarterly_str = [rev["totalRevenue"] for rev in income_quarterly]
    revenue_list_quarterly = string_to_float_list(revenue_list_quarterly_str)

    net_income_quarterly_str = [inc["netIncome"] for inc in income_quarterly]
    net_income_quarterly = string_to_float_list(net_income_quarterly_str)

    # -  BALANCE SHEET VARIABLES
    # -- ANNUAL
    balance_annual_time_str = [date["fiscalDateEnding"] for date in balance_annual]

    balance_annual_total_assets_str = [i["totalAssets"] for i in balance_annual]
    balance_annual_assets = string_to_float_list(balance_annual_total_assets_str)

    balance_annual_total_liabilities_str = [i["totalLiabilities"] for i in balance_annual]
    balance_annual_liabilities = string_to_float_list(balance_annual_total_liabilities_str)

    balance_annual_total_shareholder_equity_str = [i["totalShareholderEquity"] for i in balance_annual]
    balance_annual_shareholder_equity = string_to_float_list(balance_annual_total_shareholder_equity_str)

    balance_annual_cash_and_equivalent_str = [i["cashAndCashEquivalentsAtCarryingValue"] for i in balance_annual]
    balance_annual_cash_and_equivalent = string_to_float_list(balance_annual_cash_and_equivalent_str)

    balance_annual_longterm_debt_str = [i["longTermDebt"] for i in balance_annual]
    balance_annual_longterm_debt = string_to_float_list(balance_annual_longterm_debt_str)

    balance_annual_shortterm_debt_str = [i["shortTermDebt"] for i in balance_annual]
    balance_annual_shortterm_debt = string_to_float_list(balance_annual_shortterm_debt_str)

    balance_annual_capital_lease_obligations_str = [i["capitalLeaseObligations"] for i in balance_annual]
    balance_annual_capital_lease_obligations = string_to_float_list(balance_annual_capital_lease_obligations_str)

    # -- QUARTERLY
    balance_quarterly_time_str = [date["fiscalDateEnding"] for date in balance_quarterly]

    quarterly_total_assets_str = [i["totalAssets"] for i in balance_quarterly]
    quarterly_assets = string_to_float_list(quarterly_total_assets_str)

    quarterly_total_liabilities_str = [i["totalLiabilities"] for i in balance_quarterly]
    quarterly_liabilities = string_to_float_list(quarterly_total_liabilities_str)

    quarterly_total_shareholder_equity_str = [i["totalShareholderEquity"] for i in balance_quarterly]
    quarterly_shareholder_equity = string_to_float_list(quarterly_total_shareholder_equity_str)

    balance_quarterly_cash_and_equivalent_str = [i["cashAndCashEquivalentsAtCarryingValue"] for i in balance_quarterly]
    balance_quarterly_cash_and_equivalent = string_to_float_list(balance_quarterly_cash_and_equivalent_str)

    balance_quarterly_longterm_debt_str = [i["longTermDebt"] for i in balance_quarterly]
    balance_quarterly_longterm_debt = string_to_float_list(balance_quarterly_longterm_debt_str)

    balance_quarterly_shortterm_debt_str = [i["shortTermDebt"] for i in balance_quarterly]
    balance_quarterly_shortterm_debt = string_to_float_list(balance_quarterly_shortterm_debt_str)

    balance_quarterly_capital_lease_obligations_str = [i["capitalLeaseObligations"] for i in balance_quarterly]
    balance_quarterly_capital_lease_obligations = string_to_float_list(balance_quarterly_capital_lease_obligations_str)

    # -  EARNINGS VARIABLES
    # -- ANNUAL
    earnings_annual_dates = [i["fiscalDateEnding"] for i in earnings_annual]

    earnings_annual_reported_EPS_str = [i["reportedEPS"] for i in earnings_annual]
    earnings_annual_reported_EPS = string_to_float_list(earnings_annual_reported_EPS_str)

    # -- QUARTERLY
    earnings_quarterly_reported_dates = [i["reportedDate"] for i in earnings_quarterly]

    earnings_quarterly_reported_EPS_str = [i["reportedEPS"] for i in earnings_quarterly]
    earnings_quarterly_reported_EPS = string_to_float_list(earnings_quarterly_reported_EPS_str)

    earnings_quarterly_estimated_EPS_str = [i["estimatedEPS"] for i in earnings_quarterly]
    earnings_quarterly_estimated_EPS = string_to_float_list(earnings_quarterly_estimated_EPS_str)

    
    #--------------------------------------------------------
    # Passing data to views, when then sends it to template
    # where it is picked up by JavaScript
    #--------------------------------------------------------

    earnings_quarterly_beat_difference = earnings_beat_difference(earnings_quarterly_reported_EPS, earnings_quarterly_estimated_EPS)

    roic_range = roic_calculation(balance_annual_shareholder_equity, 
                                  balance_annual_longterm_debt,
                                  balance_annual_shortterm_debt,
                                  balance_annual_capital_lease_obligations,
                                  net_income_annual)
    
    overview["ReturnOnInvestedCapital"] = round(mean(roic_range), 1)
    overview["roic_range"] = roic_range

    overview["revenue_list_annual"] = revenue_list_annual
    overview["revenue_list_quarterly"] = revenue_list_quarterly

    overview["income_annual_dates"] = income_annual_dates
    overview["income_quarterly_dates"] = income_quarterly_dates
    overview["net_income_annual"] = net_income_annual  
    overview["net_income_quarterly"] = net_income_quarterly

    overview["earnings_annual_dates"] = earnings_annual_dates
    overview["earnings_annual_reported_EPS"] = earnings_annual_reported_EPS
    overview["earnings_quarterly_reported_dates"] = earnings_quarterly_reported_dates
    overview["earnings_quarterly_reported_EPS"] = earnings_quarterly_reported_EPS
    overview["earnings_quarterly_estimated_EPS"] = earnings_quarterly_estimated_EPS
    overview["earnings_quarterly_beat_difference"] = earnings_quarterly_beat_difference

    overview["balance_annual_time"] = balance_annual_time_str
    overview["balance_annual_assets"] = balance_annual_assets
    overview["balance_annual_liabilities"] = balance_annual_liabilities
    overview["balance_annual_shareholder_equity"] = balance_annual_shareholder_equity
    overview["balance_quarterly_time"] = balance_quarterly_time_str
    overview["balance_quarterly_assets"] = quarterly_assets
    overview["balance_quarterly_liabilities"] = quarterly_liabilities
    overview["balance_quarterly_shareholder_equity"] = quarterly_shareholder_equity

    overview["balance_annual_cash_and_equivalent"] = balance_annual_cash_and_equivalent
    overview["balance_annual_longterm_debt"] = balance_annual_longterm_debt
    overview["balance_annual_shortterm_debt"] = balance_annual_shortterm_debt
    overview["balance_quarterly_cash_and_equivalent"] = balance_quarterly_cash_and_equivalent
    overview["balance_quarterly_longterm_debt"] = balance_quarterly_longterm_debt
    overview["balance_quarterly_shortterm_debt"] = balance_quarterly_shortterm_debt

    overview["prices"] = prices
    overview["price_dates"] = price_dates

    #--------------------------------------------------------
    # Calling additional index data for comparison
    #--------------------------------------------------------

    index = {}

    spy_preload = get_index_data("SPY")
    spy = json.loads(spy_preload)
    index["spy"] = spy

    overview["market_indices"] = index

   
    

    return overview