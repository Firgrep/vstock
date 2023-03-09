import matplotlib
matplotlib.use('AGG')
from matplotlib import pyplot as plt
import matplotlib.ticker as ticker
from matplotlib.legend import Legend
import matplotlib.patches as mpatches
import numpy as np
import json
from statistics import mean
import base64
from io import BytesIO

#---------------------------------------------------
#  Data Treatment and Graph Functions Overview
#
#  - Hardcoded variables
#  - Function Definitons
#  - Main Function to Open Data and Call Functions
#  --  Extract data into relevant variables open
#      for repeated use across all functions
#  --  Call functions
#
#---------------------------------------------------

title_fontsize = 40
y_fontsize_prices = 20
y_fontsize = 12
legend_fontsize = 14

def get_graph():
    buffer = BytesIO()
    plt.savefig(buffer, format="png")
    buffer.seek(0)
    image_png = buffer.getvalue()
    graph = base64.b64encode(image_png)
    graph = graph.decode("utf-8")
    buffer.close()
    return graph

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

def price_graph(trading_days):

    prices_selected = prices[:trading_days]
    price_dates_selected = price_dates[:trading_days]

    plt.figure(figsize=(10,8))
    plt.plot(range(len(price_dates_selected)), prices_selected, linewidth=2)
    plt.xlabel(f"Time in {len(price_dates_selected)} trading days")
    plt.title(f"Last price ${prices_selected[0]}", fontsize=title_fontsize)
    ax = plt.gca()
    ax.set_xticks(range(len(price_dates_selected)))
    ax.set_xticklabels(price_dates_selected, rotation=27)
    plt.locator_params(axis='x', nbins=10)
    ax.invert_xaxis()
    ax.tick_params(axis='y', which='major', labelsize=y_fontsize_prices)
    ax.yaxis.set_major_formatter('${x:1.0f}')
    graph = get_graph()
    plt.close()
    return graph

def revenue_annual_graph():   

    plt.figure(figsize=(10,8))
    plt.bar(range(len(income_annual_dates)), revenue_list_annual, color="GoldenRod")
    plt.title("Annual Revenue", fontsize=title_fontsize)
    ax = plt.subplot()
    ax.set_xticks(range(len(income_annual_dates)))
    ax.set_xticklabels(income_annual_dates, rotation=27)
    ax.invert_xaxis()
    ax.tick_params(axis='y', which='major', labelsize=y_fontsize)
    ax.yaxis.set_major_formatter(million_formatter)
    graph = get_graph()
    plt.close()
    return graph

def revenue_quarterly_graph():
    
    plt.figure(figsize=(10,8))
    plt.bar(range(len(income_quarterly_dates)), revenue_list_quarterly, color="GoldenRod")
    plt.title("Quarterly Revenue", fontsize=title_fontsize)
    ax = plt.subplot()
    ax.set_xticks(range(len(income_quarterly_dates)))
    ax.set_xticklabels(income_quarterly_dates, rotation=45, ha="right")
    ax.invert_xaxis()
    ax.tick_params(axis='y', which='major', labelsize=y_fontsize)
    ax.yaxis.set_major_formatter(million_formatter)
    graph = get_graph()
    plt.close()
    return graph

def net_income_annual_graph():
    
    plt.figure(figsize=(10,8))
    plt.bar(range(len(income_annual_dates)), net_income_annual, color="ForestGreen")
    plt.title("Annual Income", fontsize=title_fontsize)
    ax = plt.subplot()
    ax.set_xticks(range(len(income_annual_dates)))
    ax.set_xticklabels(income_annual_dates, rotation=27)
    ax.invert_xaxis()
    ax.tick_params(axis='y', which='major', labelsize=y_fontsize)
    ax.yaxis.set_major_formatter(million_formatter)
    graph = get_graph()
    plt.close()
    return graph

def net_income_quarterly_graph():
    
    plt.figure(figsize=(10,8))
    plt.bar(range(len(income_quarterly_dates)), net_income_quarterly, color="ForestGreen")
    plt.title("Quarterly Income", fontsize=title_fontsize)
    ax = plt.subplot()
    ax.set_xticks(range(len(income_quarterly_dates)))
    ax.set_xticklabels(income_quarterly_dates, rotation=45, ha="right")
    ax.invert_xaxis()
    ax.tick_params(axis='y', which='major', labelsize=y_fontsize)
    ax.yaxis.set_major_formatter(million_formatter)
    graph = get_graph()
    plt.close()
    return graph

def assets_liabities_annual_graph():
           
    plt.figure(figsize=(10,8))
    ax = plt.subplot()
    ax.bar(balance_annual_time-0.2, balance_annual_assets, color="#003f5c", width=0.2)
    ax.bar(balance_annual_time+0.2, balance_annual_liabilities, width=0.6, color="#bc5090")
    ax.bar(balance_annual_time+0.2, balance_annual_shareholder_equity, bottom=balance_annual_liabilities, color="#ffa600", width=0.6)
    plt.title("Annual Balance", fontsize=title_fontsize)
    ax.set_xticks(range(len(balance_annual_time)))
    ax.set_xticklabels(balance_annual_time_str, ha="center")
    ax.invert_xaxis()
    ax.tick_params(axis='y', which='major', labelsize=y_fontsize)
    ax.yaxis.set_major_formatter(million_formatter)
    plt.legend(["Assets", "Liabilities", "Equity"], fontsize=legend_fontsize)
    graph = get_graph()
    plt.close()
    return graph

def assets_liabities_quarterly_graph():
    
    plt.figure(figsize=(10,8))
    ax = plt.subplot()
    ax.bar(balance_quarterly_time, quarterly_assets, color="#003f5c", width=0.3)
    ax.bar(balance_quarterly_time+0.4, quarterly_liabilities, width=0.5, color="#bc5090")
    ax.bar(balance_quarterly_time+0.4, quarterly_shareholder_equity, bottom=quarterly_liabilities, color="#ffa600", width=0.5)
    plt.title("Quarterly Balance", fontsize=title_fontsize)
    ax.set_xticks(range(len(balance_quarterly_time)))
    ax.set_xticklabels(balance_quarterly_time_str, rotation=45, ha="right")
    ax.invert_xaxis()
    ax.tick_params(axis='y', which='major', labelsize=y_fontsize)
    ax.yaxis.set_major_formatter(million_formatter)
    plt.legend(["Assets", "Liabilities", "Equity"], fontsize=legend_fontsize)
    graph = get_graph()
    plt.close()
    return graph

def earnings_annual_graph(years):

    def eps_graph(time=earnings_annual_dates, eps=earnings_annual_reported_EPS):

        time = time[1:]
        eps = eps[1:]
        plt.figure(figsize=(10,8))
        plt.bar(range(len(time)), eps, color="LightSeaGreen")
        plt.title("Annual Earnings Per Share", fontsize=title_fontsize)
        ax = plt.subplot()
        ax.set_xticks(range(len(time)))
        ax.set_xticklabels(time, rotation=27)
        ax.invert_xaxis()
        ax.tick_params(axis='y', which='major', labelsize=y_fontsize)
        ax.yaxis.set_major_formatter('${x:1.2f}')
        plt.legend([f"Latest EPS: {earnings_annual_reported_EPS[0]}"], fontsize=legend_fontsize)
        graph = get_graph()
        plt.close()
        return graph
    
    if len(earnings_annual_reported_EPS) > years:
        earnings_annual_dates_selected = earnings_annual_dates[:years]
        earnings_annual_reported_EPS_selected = earnings_annual_reported_EPS[:years]
        graph = eps_graph(earnings_annual_dates_selected, earnings_annual_reported_EPS_selected)

    else:
        graph = eps_graph()
    
    return graph

def earnings_quarterly_graph(years):

    quarters = years * 4
    
    def eps_graph(time=earnings_quarterly_reported_dates, eps=earnings_quarterly_reported_EPS, esti_eps=earnings_quarterly_estimated_EPS):

        beat_difference = np.subtract(esti_eps, eps)

        plt.figure(figsize=(10,8))
        plt.bar(range(len(time)), eps, color="LightSeaGreen")
        plt.bar(range(len(time)), beat_difference, bottom=eps, color=np.where(beat_difference < 0, 'g', 'r'))
        plt.title("Quarterly Earnings Per Share", fontsize=title_fontsize)
        ax = plt.subplot()
        ax.set_xticks(range(len(time)))
        ax.set_xticklabels(time, rotation=45, ha="right")
        ax.invert_xaxis()
        ax.tick_params(axis='y', which='major', labelsize=y_fontsize)
        ax.yaxis.set_major_formatter('${x:1.2f}')
        plt.legend([f"Latest EPS: {earnings_quarterly_reported_EPS[0]}"])
        green_patch = mpatches.Patch(color='green', label='Beat')
        red_patch = mpatches.Patch(color='red', label='Miss')
        leg = Legend(ax, handles=[green_patch, red_patch], labels=["Beat", "Miss"], loc='lower right', fontsize=legend_fontsize)
        ax.add_artist(leg)
        graph = get_graph()
        plt.close()
        return graph
    
    if len(earnings_quarterly_reported_EPS) > quarters:
        earnings_quarterly_reported_dates_selected = earnings_quarterly_reported_dates[:quarters]
        earnings_quarterly_reported_EPS_selected = earnings_quarterly_reported_EPS[:quarters]
        earnings_quarterly_estimated_EPS_selected = earnings_quarterly_estimated_EPS[:quarters]
        graph = eps_graph(earnings_quarterly_reported_dates_selected, earnings_quarterly_reported_EPS_selected, earnings_quarterly_estimated_EPS_selected)
    
    else:
        graph = eps_graph()
    
    return graph
    
def debt_to_cash_annual_graph(years):

    def d_to_c_annual_graph(time=balance_annual_time, 
                            cash=balance_annual_cash_and_equivalent, 
                            long_term=balance_annual_longterm_debt,
                            short_term=balance_annual_shortterm_debt):
        plt.figure(figsize=(10,8))
        ax = plt.subplot()
        ax.bar(time, cash, color="OliveDrab", width=0.4)
        ax.bar(time+0.4, long_term, width=0.4, color="Maroon")
        ax.bar(time+0.4, short_term, bottom=long_term, color="MediumVioletRed", width=0.4)
        plt.title("Debt to Cash Annual", fontsize=title_fontsize)
        ax.set_xticks(range(len(time)))
        ax.set_xticklabels(balance_annual_time_str, ha="right")
        ax.invert_xaxis()
        ax.tick_params(axis='y', which='major', labelsize=y_fontsize)
        ax.yaxis.set_major_formatter(million_formatter)
        plt.legend(["Cash and Cash Equivalents", "Long Term Debt", "Short Term Debt"], fontsize=legend_fontsize)
        graph = get_graph()
        plt.close()
        return graph
    
    if len(balance_annual_time) > years:
        balance_annual_time_selected = balance_annual_time[:years]
        balance_cash_and_equivalent_selected = balance_annual_cash_and_equivalent[:years]
        balance_longterm_debt_selected = balance_annual_longterm_debt[:years]
        balance_shortterm_debt_selected = balance_annual_shortterm_debt[:years]
        graph = d_to_c_annual_graph(balance_annual_time_selected, balance_cash_and_equivalent_selected, 
                    balance_longterm_debt_selected, balance_shortterm_debt_selected)
    
    else:
        graph = d_to_c_annual_graph()
    
    return graph

def debt_to_cash_quarterly_graph(years):

    quarters = years * 4

    def d_to_c_quarterly_graph(time=balance_quarterly_time, 
                                cash=balance_quarterly_cash_and_equivalent, 
                                long_term=balance_quarterly_longterm_debt,
                                short_term=balance_quarterly_shortterm_debt):
        plt.figure(figsize=(10,8))
        ax = plt.subplot()
        ax.bar(time, cash, color="OliveDrab", width=0.4)
        ax.bar(time+0.4, long_term, width=0.4, color="Maroon")
        ax.bar(time+0.4, short_term, bottom=long_term, color="MediumVioletRed", width=0.4)
        plt.title("Debt to Cash Quarterly", fontsize=title_fontsize)
        ax.set_xticks(range(len(time)))
        ax.set_xticklabels(balance_quarterly_time_str, rotation=45, ha="right")
        ax.invert_xaxis()
        ax.tick_params(axis='y', which='major', labelsize=y_fontsize)
        ax.yaxis.set_major_formatter(million_formatter)
        plt.legend(["Cash and Cash Equivalents", "Long Term Debt", "Short Term Debt"], fontsize=legend_fontsize)
        graph = get_graph()
        plt.close()
        return graph
    
    if len(balance_quarterly_time) > quarters:
        balance_quarterly_time_selected = balance_quarterly_time[:quarters]
        balance_cash_and_equivalent_selected = balance_quarterly_cash_and_equivalent[:quarters]
        balance_longterm_debt_selected = balance_quarterly_longterm_debt[:quarters]
        balance_shortterm_debt_selected = balance_quarterly_shortterm_debt[:quarters]
        graph = d_to_c_quarterly_graph(balance_quarterly_time_selected, balance_cash_and_equivalent_selected, 
                    balance_longterm_debt_selected, balance_shortterm_debt_selected)
    
    else:
        graph = d_to_c_quarterly_graph()
    
    return graph

def roic(years):

    def roic_calculation(stkhldr_equity=balance_annual_shareholder_equity,
                        longdebt=balance_annual_longterm_debt,
                        shortdebt=balance_annual_shortterm_debt,
                        cptl_lease=balance_annual_capital_lease_obligations,
                        net_inc=net_income_annual):

        sum_of_var_one = np.add(stkhldr_equity, longdebt)
        sum_of_var_two = np.add(shortdebt, cptl_lease)
        sum_of_variables = np.add(sum_of_var_one, sum_of_var_two)
        division_sum = np.divide(net_inc, sum_of_variables)
        result = division_sum * 100
        return result

    def roic_graph(time=balance_annual_time, roic_val=roic_calculation()):

        plt.figure(figsize=(10,8))
        plt.plot(range(len(time)), roic_val, color="Purple", marker="o")
        plt.title("Return on Invested Capital", fontsize=title_fontsize)
        ax = plt.subplot()
        ax.set_xticks(range(len(time)))
        ax.set_xticklabels(balance_annual_time_str, rotation=27)
        ax.invert_xaxis()
        ax.tick_params(axis='y', which='major', labelsize=y_fontsize)
        ax.yaxis.set_major_formatter('{x:1.2f}%')
        plt.legend([f"1y RoIC: {round(roic_val[0], 1)}%"], fontsize=legend_fontsize)
        graph = get_graph()
        plt.close()
        return graph, roic_val
    
    if len(balance_annual_time) > years:
        balance_annual_dates_selected = balance_annual_time[:years]
        balance_annual_shareholder_equity_selected = balance_annual_shareholder_equity[:years]
        balance_annual_longterm_debt_selected = balance_annual_longterm_debt[:years]
        balance_annual_shortterm_debt_selected = balance_annual_shortterm_debt[:years]
        balance_annual_capital_lease_obligations_selected = balance_annual_capital_lease_obligations[:years]
        net_income_annual_selected = net_income_annual[:years]

        roic_result_selected = roic_calculation(balance_annual_shareholder_equity_selected, balance_annual_longterm_debt_selected, 
                                            balance_annual_shortterm_debt_selected, balance_annual_capital_lease_obligations_selected, 
                                            net_income_annual_selected)

        roic_val_unnested = roic_graph(balance_annual_dates_selected, roic_result_selected)
    
    else:
        roic_val_unnested = roic_graph()
    
    return roic_val_unnested

def earnings_beat_difference(eps, esti_eps):
    beat_difference = np.subtract(eps, esti_eps)
    beat_diff_json_ready = beat_difference.tolist()
    return beat_diff_json_ready

def produce_graphs(entry):
    
    #--------------------------------------------------------
    # Extracting All Relevant Data as Variables for Functions
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
    global price_dates
    price_dates = []
    for i in dates_and_price.values():
        prices_str.append(i)
    for i in dates_and_price.keys():
        price_dates.append(i)
    
    global prices
    prices = string_to_float_list(prices_str)
    overview["LastPrice"] = prices[0]

    # -  INCOME STATEMENT VARIABLES
    # -- ANNUAL
    global income_annual_dates
    income_annual_dates = [i["fiscalDateEnding"] for i in income_annual]

    global revenue_list_annual
    revenue_list_annual_str = [i["totalRevenue"] for i in income_annual]
    revenue_list_annual = string_to_float_list(revenue_list_annual_str)

    global net_income_annual
    net_income_annual_str = [inc["netIncome"] for inc in income_annual]
    net_income_annual = string_to_float_list(net_income_annual_str)

    # -- QUARTERLY
    global income_quarterly_dates
    income_quarterly_dates = [date["fiscalDateEnding"] for date in income_quarterly]

    global revenue_list_quarterly
    revenue_list_quarterly_str = [rev["totalRevenue"] for rev in income_quarterly]
    revenue_list_quarterly = string_to_float_list(revenue_list_quarterly_str)

    global net_income_quarterly
    net_income_quarterly_str = [inc["netIncome"] for inc in income_quarterly]
    net_income_quarterly = string_to_float_list(net_income_quarterly_str)

    # -  BALANCE SHEET VARIABLES
    # -- ANNUAL
    global balance_annual_time_str
    global balance_annual_time
    balance_annual_time_str = [date["fiscalDateEnding"] for date in balance_annual]
    balance_annual_time = np.arange(len(balance_annual_time_str))

    global balance_annual_assets
    balance_annual_total_assets_str = [i["totalAssets"] for i in balance_annual]
    balance_annual_assets = string_to_float_list(balance_annual_total_assets_str)

    global balance_annual_liabilities
    balance_annual_total_liabilities_str = [i["totalLiabilities"] for i in balance_annual]
    balance_annual_liabilities = string_to_float_list(balance_annual_total_liabilities_str)

    global balance_annual_shareholder_equity
    balance_annual_total_shareholder_equity_str = [i["totalShareholderEquity"] for i in balance_annual]
    balance_annual_shareholder_equity = string_to_float_list(balance_annual_total_shareholder_equity_str)

    global balance_annual_cash_and_equivalent
    balance_annual_cash_and_equivalent_str = [i["cashAndCashEquivalentsAtCarryingValue"] for i in balance_annual]
    balance_annual_cash_and_equivalent = string_to_float_list(balance_annual_cash_and_equivalent_str)

    global balance_annual_longterm_debt
    balance_annual_longterm_debt_str = [i["longTermDebt"] for i in balance_annual]
    balance_annual_longterm_debt = string_to_float_list(balance_annual_longterm_debt_str)

    global balance_annual_shortterm_debt
    balance_annual_shortterm_debt_str = [i["shortTermDebt"] for i in balance_annual]
    balance_annual_shortterm_debt = string_to_float_list(balance_annual_shortterm_debt_str)

    global balance_annual_capital_lease_obligations
    balance_annual_capital_lease_obligations_str = [i["capitalLeaseObligations"] for i in balance_annual]
    balance_annual_capital_lease_obligations = string_to_float_list(balance_annual_capital_lease_obligations_str)

    # -- QUARTERLY
    global balance_quarterly_time
    global balance_quarterly_time_str
    balance_quarterly_time_str = [date["fiscalDateEnding"] for date in balance_quarterly]
    balance_quarterly_time = np.arange(len(balance_quarterly_time_str))

    global quarterly_assets
    quarterly_total_assets_str = [i["totalAssets"] for i in balance_quarterly]
    quarterly_assets = string_to_float_list(quarterly_total_assets_str)

    global quarterly_liabilities
    quarterly_total_liabilities_str = [i["totalLiabilities"] for i in balance_quarterly]
    quarterly_liabilities = string_to_float_list(quarterly_total_liabilities_str)

    global quarterly_shareholder_equity
    quarterly_total_shareholder_equity_str = [i["totalShareholderEquity"] for i in balance_quarterly]
    quarterly_shareholder_equity = string_to_float_list(quarterly_total_shareholder_equity_str)

    global balance_quarterly_cash_and_equivalent
    balance_quarterly_cash_and_equivalent_str = [i["cashAndCashEquivalentsAtCarryingValue"] for i in balance_quarterly]
    balance_quarterly_cash_and_equivalent = string_to_float_list(balance_quarterly_cash_and_equivalent_str)

    global balance_quarterly_longterm_debt
    balance_quarterly_longterm_debt_str = [i["longTermDebt"] for i in balance_quarterly]
    balance_quarterly_longterm_debt = string_to_float_list(balance_quarterly_longterm_debt_str)

    global balance_quarterly_shortterm_debt
    balance_quarterly_shortterm_debt_str = [i["shortTermDebt"] for i in balance_quarterly]
    balance_quarterly_shortterm_debt = string_to_float_list(balance_quarterly_shortterm_debt_str)

    global balance_quarterly_capital_lease_obligations
    balance_quarterly_capital_lease_obligations_str = [i["capitalLeaseObligations"] for i in balance_quarterly]
    balance_quarterly_capital_lease_obligations = string_to_float_list(balance_quarterly_capital_lease_obligations_str)

    # -  EARNINGS VARIABLES
    # -- ANNUAL
    global earnings_annual_dates
    earnings_annual_dates = [i["fiscalDateEnding"] for i in earnings_annual]

    global earnings_annual_reported_EPS
    earnings_annual_reported_EPS_str = [i["reportedEPS"] for i in earnings_annual]
    earnings_annual_reported_EPS = string_to_float_list(earnings_annual_reported_EPS_str)

    # -- QUARTERLY
    global earnings_quarterly_reported_dates
    earnings_quarterly_reported_dates = [i["reportedDate"] for i in earnings_quarterly]

    global earnings_quarterly_reported_EPS
    earnings_quarterly_reported_EPS_str = [i["reportedEPS"] for i in earnings_quarterly]
    earnings_quarterly_reported_EPS = string_to_float_list(earnings_quarterly_reported_EPS_str)

    global earnings_quarterly_estimated_EPS
    earnings_quarterly_estimated_EPS_str = [i["estimatedEPS"] for i in earnings_quarterly]
    earnings_quarterly_estimated_EPS = string_to_float_list(earnings_quarterly_estimated_EPS_str)

    
    #--------------------------------------------------------
    # Calling functions to produce graphs
    #--------------------------------------------------------
    # overview["price_graph1255"] = price_graph(1255)
    # overview["price_graph251"] = price_graph(251)
    # overview["price_graph30"] = price_graph(30)
    # overview["price_graph90"] = price_graph(90)
    # overview["revenue_annual_graph"] = revenue_annual_graph()
    # overview["revenue_quarterly_graph"] = revenue_quarterly_graph()
    # overview["net_income_annual_graph"] = net_income_annual_graph()
    # overview["net_income_quarterly_graph"] = net_income_quarterly_graph()
    # overview["assets_liabilities_annual_graph"] = assets_liabities_annual_graph()
    # overview["assets_liabilities_quarterly_graph"] = assets_liabities_quarterly_graph()
    # overview["earnings_annual_graph"] = earnings_annual_graph(10)
    # overview["earnings_quarterly_graph"] = earnings_quarterly_graph(10)
    # overview["debt_to_cash_annual_graph"] = debt_to_cash_annual_graph(10)
    # overview["debt_to_cash_quarterly_graph"] = debt_to_cash_quarterly_graph(10)

    earnings_quarterly_beat_difference = earnings_beat_difference(earnings_quarterly_reported_EPS, earnings_quarterly_estimated_EPS)

    roic_graph, roic_range = roic(10)
    overview["ReturnOnInvestedCapital"] = round(mean(roic_range), 1)
    overview["roic_graph"] = roic_graph


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

    return overview