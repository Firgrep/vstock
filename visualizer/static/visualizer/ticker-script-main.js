import { createChartBarSimple } from "./charts/createChartBarSimple.js";
import { createChartPointGreenRed } from "./charts/createChartPointGreenRed.js";
import { createChartPointSimple } from "./charts/createChartPointSimple.js";
import { createChartBarsTwoOne } from "./charts/createChartBarsTwoOne.js";
import { createChartLinePrices } from "./charts/createChartLinePrices.js";
import { createChartLineRoic } from "./charts/createChartLineRoic.js";

// |-- UNIVERSAL LEVEL CHART CONTROL CONSTANTS -

const B_IS_MODAL = true;
const I_COMPACT_SLICE_START = 0;
const I_COMPACT_SLICE_END = 4;
const I_ENLARGED_SLICE_START = 0;
const I_ENLARGED_SLICE_END = 30;

const I_TITLE_FONT_SIZE = 20;
const S_TITLE_COLOR = "black";
const S_CANVAS_BACKGROUND = "white";
const S_CANVAS_BORDER_RADIUS = "0";
const S_CANVAS_BOX_SHADOW = "5px 10px 8px #888888";

// |-- DOM WORK CONSTANTS  -
const O_CANVAS_ROIC = document.getElementById("roic_annual");

const O_CANVAS_REVENUE_ANNUAL = document.getElementById("revenue_annual");
const O_CANVAS_REVENUE_ANNUAL_MODAL_1_1 = document.getElementById("image1-1");
const O_CANVAS_REVENUE_ANNUAL_MODAL_2_2 = document.getElementById("image2-2");
const O_CANVAS_REVENUE_QUARTERLY = document.getElementById("revenue_quarterly");
const O_CANVAS_REVENUE_QUARTERLY_MODAL_2_1 = document.getElementById("image2-1");
const O_CANVAS_REVENUE_QUARTERLY_MODAL_1_2 = document.getElementById("image1-2");

const O_CANVAS_NETINCOME_ANNUAL = document.getElementById("netincome_annual");
const O_CANVAS_NETINCOME_ANNUAL_MODAL_1_3 = document.getElementById("image1-3");
const O_CANVAS_NETINCOME_ANNUAL_MODAL_2_4 = document.getElementById("image2-4");
const O_CANVAS_NETINCOME_QUARTERLY = document.getElementById("netincome_quarterly");
const O_CANVAS_NETINCOME_QUARTERLY_MODAL_2_3 = document.getElementById("image2-3");
const O_CANVAS_NETINCOME_QUARTERLY_MODAL_1_4 = document.getElementById("image1-4");

const O_CANVAS_EARNINGS_ANNUAL = document.getElementById("earnings_annual");
const O_CANVAS_EARNINGS_ANNUAL_MODAL_1_5 = document.getElementById("image1-5");
const O_CANVAS_EARNINGS_ANNUAL_MODAL_2_6 = document.getElementById("image2-6");
const O_CANVAS_EARNINGS_QUARTERLY = document.getElementById("earnings_quarterly");
const O_CANVAS_EARNINGS_QUARTERLY_MODAL_2_5 = document.getElementById("image2-5");
const O_CANVAS_EARNINGS_QUARTERLY_MODAL_1_6 = document.getElementById("image1-6");

const O_CANVAS_ASSETS_LIABILITIES_ANNUAL = document.getElementById("assets_liabilities_annual");
const O_CANVAS_ASSETS_LIABILITIES_ANNUAL_MODAL_1_7 = document.getElementById("image1-7");
const O_CANVAS_ASSETS_LIABILITIES_ANNUAL_MODAL_2_8 = document.getElementById("image2-8");
const O_CANVAS_ASSETS_LIABILITIES_QUARTERLY = document.getElementById("assets_liabilities_quarterly");
const O_CANVAS_ASSETS_LIABILITIES_QUARTERLY_MODAL_2_7 = document.getElementById("image2-7");
const O_CANVAS_ASSETS_LIABILITIES_QUARTERLY_MODAL_1_8 = document.getElementById("image1-8");

const O_CANVAS_DEBT_TO_CASH_ANNUAL = document.getElementById("debt_to_cash_annual");
const O_CANVAS_DEBT_TO_CASH_ANNUAL_MODAL_1_9 = document.getElementById("image1-9");
const O_CANVAS_DEBT_TO_CASH_ANNUAL_MODAL_2_10 = document.getElementById("image2-10");
const O_CANVAS_DEBT_TO_CASH_QUARTERLY = document.getElementById("debt_to_cash_quarterly");
const O_CANVAS_DEBT_TO_CASH_QUARTERLY_MODAL_2_9 = document.getElementById("image2-9");
const O_CANVAS_DEBT_TO_CASH_QUARTERLY_MODAL_1_10 = document.getElementById("image1-10");

const O_CANVAS_PRICES_ANNUAL = document.getElementById("prices_annual");
const O_CANVAS_PRICES_ANNUAL_MODAL_1255 = document.getElementById("A_prices_1255");
const O_CANVAS_PRICES_ANNUAL_MODAL_251 = document.getElementById("A_prices_251");
const O_CANVAS_PRICES_ANNUAL_MODAL_90 = document.getElementById("A_prices_90");
const O_CANVAS_PRICES_ANNUAL_MODAL_30 = document.getElementById("A_prices_30");
const O_CANVAS_PRICES_QUARTERLY = document.getElementById("prices_quarterly");
const O_CANVAS_PRICES_QUARTERLY_MODAL_1255 = document.getElementById("B_prices_1255");
const O_CANVAS_PRICES_QUARTERLY_MODAL_251 = document.getElementById("B_prices_251");
const O_CANVAS_PRICES_QUARTERLY_MODAL_90 = document.getElementById("B_prices_90");
const O_CANVAS_PRICES_QUARTERLY_MODAL_30 = document.getElementById("B_prices_30");

// |-- DATA WORK CONSTANTS  -
const O_OVERVIEW = JSON.parse(document.getElementById('overviewId').textContent);

const S_SYMBOL = O_OVERVIEW.Symbol;
const A_ROIC = O_OVERVIEW.roic_range;
const A_REVENUE_ANNUAL = O_OVERVIEW.revenue_list_annual;
const A_INCOME_DATES_ANNUAL = O_OVERVIEW.income_annual_dates;
const A_NETINCOME_ANNUAL = O_OVERVIEW.net_income_annual;
const A_EPS_ANNUAL_DATES = O_OVERVIEW.earnings_annual_dates;
const A_EPS_ANNUAL = O_OVERVIEW.earnings_annual_reported_EPS;
const A_BALANCE_ANNUAL_DATES = O_OVERVIEW.balance_annual_time;
const A_BALANCE_ANNUAL_ASSETS = O_OVERVIEW.balance_annual_assets;
const A_BALANCE_ANNUAL_LIABILITIES = O_OVERVIEW.balance_annual_liabilities;
const A_BALANCE_ANNUAL_SH_EQUITY = O_OVERVIEW.balance_annual_shareholder_equity;
const A_BALANCE_ANNUAL_CASH = O_OVERVIEW.balance_annual_cash_and_equivalent;
const A_BALANCE_ANNUAL_LONG_DEBT = O_OVERVIEW.balance_annual_longterm_debt;
const A_BALANCE_ANNUAL_SHORT_DEBT = O_OVERVIEW.balance_annual_shortterm_debt;

const A_REVENUE_QUARTERLY = O_OVERVIEW.revenue_list_quarterly;
const A_INCOME_DATES_QUARTERLY = O_OVERVIEW.income_quarterly_dates;
const A_NETINCOME_QUARTERLY = O_OVERVIEW.net_income_quarterly;
const A_EARNINGS_QUARTERLY_DATES = O_OVERVIEW.earnings_quarterly_reported_dates;
const A_EARNINGS_QUARTERLY_EPS = O_OVERVIEW.earnings_quarterly_reported_EPS;
const A_EARNINGS_QUARTERLY_BEAT_DIFF = O_OVERVIEW.earnings_quarterly_beat_difference;
const A_EARNINGS_QUARTERLY_ESTIMATED_EPS = O_OVERVIEW.earnings_quarterly_estimated_EPS;
const A_BALANCE_QUARTERLY_DATES = O_OVERVIEW.balance_quarterly_time;
const A_BALANCE_QUARTERLY_ASSETS = O_OVERVIEW.balance_quarterly_assets;
const A_BALANCE_QUARTERLY_LIABILITIES = O_OVERVIEW.balance_quarterly_liabilities;
const A_BALANCE_QUARTERLY_SH_EQUITY = O_OVERVIEW.balance_quarterly_shareholder_equity;
const A_BALANCE_QUARTERLY_CASH = O_OVERVIEW.balance_quarterly_cash_and_equivalent;
const A_BALANCE_QUARTERLY_LONG_DEBT = O_OVERVIEW.balance_quarterly_longterm_debt;
const A_BALANCE_QUARTERLY_SHORT_DEBT = O_OVERVIEW.balance_quarterly_shortterm_debt;

const A_PRICES = O_OVERVIEW.prices;
const A_PRICE_DATES = O_OVERVIEW.price_dates;

const A_PRICE_INDEX_SPY = O_OVERVIEW.market_indices.spy;


// |-- PARTICULAR LEVEL CHART OPTION OBJECTS -

const _oOptionsRoic = {
    labels: A_INCOME_DATES_ANNUAL,
    data: A_ROIC,
    titleText: "Return on Invested Capital",
    titleColor: S_TITLE_COLOR,
    titleSize: I_TITLE_FONT_SIZE,
    backgroundColor: "purple",
    borderColor: "purple",
    canvasBackground: S_CANVAS_BACKGROUND,
    canvasBorderRadius: "25px",
    canvasBoxShadow: S_CANVAS_BOX_SHADOW
}

const _oOptionsRevenueAnnual = {
    labels: A_INCOME_DATES_ANNUAL,
    data: A_REVENUE_ANNUAL,
    titleText: "Annual Revenue",
    titleColor: S_TITLE_COLOR,
    titleSize: I_TITLE_FONT_SIZE,
    barColor: "rgba(54, 162, 235, 0.4)",
    barBorderColor: "rgb(54, 162, 235)",
    canvasBackground: S_CANVAS_BACKGROUND,
    canvasBorderRadius: S_CANVAS_BORDER_RADIUS,
    canvasBoxShadow: S_CANVAS_BOX_SHADOW,
    sliceStart: I_COMPACT_SLICE_START,
    sliceEnd: I_COMPACT_SLICE_END
}

const _oOptionsRevenueQuarterly = {
    labels: A_INCOME_DATES_QUARTERLY,
    data: A_REVENUE_QUARTERLY,
    titleText: "Quarterly Revenue",
    titleColor: S_TITLE_COLOR,
    titleSize: I_TITLE_FONT_SIZE,
    barColor: "rgba(54, 162, 235, 0.4)",
    barBorderColor: "rgb(54, 162, 235)",
    canvasBackground: S_CANVAS_BACKGROUND,
    canvasBorderRadius: S_CANVAS_BORDER_RADIUS,
    canvasBoxShadow: S_CANVAS_BOX_SHADOW,
    sliceStart: I_COMPACT_SLICE_START,
    sliceEnd: I_COMPACT_SLICE_END
}

const _oOptionsIncomeAnnual = {
    labels: A_INCOME_DATES_ANNUAL,
    data: A_NETINCOME_ANNUAL,
    titleText: "Annual Net Income",
    titleColor: S_TITLE_COLOR,
    titleSize: I_TITLE_FONT_SIZE,
    barColor: "rgba(255, 215, 0, 0.6)",
    barBorderColor: "rgb(218,162,32)",
    canvasBackground: S_CANVAS_BACKGROUND,
    canvasBorderRadius: S_CANVAS_BORDER_RADIUS,
    canvasBoxShadow: S_CANVAS_BOX_SHADOW,
    sliceStart: I_COMPACT_SLICE_START,
    sliceEnd: I_COMPACT_SLICE_END
}

const _oOptionsIncomeQuarterly = {
    labels: A_INCOME_DATES_QUARTERLY,
    data: A_NETINCOME_QUARTERLY,
    titleText: "Quarterly Net Income",
    titleColor: S_TITLE_COLOR,
    titleSize: I_TITLE_FONT_SIZE,
    barColor: "rgba(255, 215, 0, 0.6)",
    barBorderColor: "rgb(218,162,32)",
    canvasBackground: S_CANVAS_BACKGROUND,
    canvasBorderRadius: S_CANVAS_BORDER_RADIUS,
    canvasBoxShadow: S_CANVAS_BOX_SHADOW,
    sliceStart: I_COMPACT_SLICE_START,
    sliceEnd: I_COMPACT_SLICE_END
}

const _oOptionsEpsAnnualCompact = {
    labels: A_EPS_ANNUAL_DATES.slice(I_COMPACT_SLICE_START, I_COMPACT_SLICE_END),
    data: A_EPS_ANNUAL.slice(I_COMPACT_SLICE_START, I_COMPACT_SLICE_END),
    titleText: "Annual Earnings Per Share",
    titleColor: S_TITLE_COLOR,
    titleSize: I_TITLE_FONT_SIZE,
    pointBackgroundColor: "rgba(32, 178, 170, 0.50)",
    pointBorderColor: "rgba(32, 178, 170, 1)",
    canvasBackground: S_CANVAS_BACKGROUND,
    canvasBorderRadius: S_CANVAS_BORDER_RADIUS,
    canvasBoxShadow: S_CANVAS_BOX_SHADOW
}

const _oOptionsEpsAnnualEnlarged = {
    labels: A_EPS_ANNUAL_DATES.slice(I_ENLARGED_SLICE_START, I_ENLARGED_SLICE_END),
    data: A_EPS_ANNUAL.slice(I_ENLARGED_SLICE_START, I_ENLARGED_SLICE_END),
    titleText: "Annual Earnings Per Share",
    titleColor: S_TITLE_COLOR,
    titleSize: I_TITLE_FONT_SIZE,
    pointBackgroundColor: "rgba(32, 178, 170, 0.50)",
    pointBorderColor: "rgba(32, 178, 170, 1)",
    canvasBackground: S_CANVAS_BACKGROUND,
    canvasBorderRadius: S_CANVAS_BORDER_RADIUS,
    canvasBoxShadow: S_CANVAS_BOX_SHADOW
}

const _oOptionsEpsQuarterlyCompact = {
    labels: A_EARNINGS_QUARTERLY_DATES.slice(I_COMPACT_SLICE_START, I_COMPACT_SLICE_END),
    data: A_EARNINGS_QUARTERLY_EPS.slice(I_COMPACT_SLICE_START, I_COMPACT_SLICE_END),
    dataSecond: A_EARNINGS_QUARTERLY_ESTIMATED_EPS.slice(I_COMPACT_SLICE_START, I_COMPACT_SLICE_END),
    titleText: "Quarterly Earnings Per Share",
    titleColor: S_TITLE_COLOR,
    titleSize: I_TITLE_FONT_SIZE,
    pointBackgroundColor: "rgba(32, 178, 170, 0.50)",
    pointBorderColor: "rgba(32, 178, 170, 1)",
    canvasBackground: S_CANVAS_BACKGROUND,
    canvasBorderRadius: S_CANVAS_BORDER_RADIUS,
    canvasBoxShadow: S_CANVAS_BOX_SHADOW
}

const _oOptionsEpsQuarterlyEnlarged = {
    labels: A_EARNINGS_QUARTERLY_DATES.slice(I_ENLARGED_SLICE_START, I_ENLARGED_SLICE_END),
    data: A_EARNINGS_QUARTERLY_EPS.slice(I_ENLARGED_SLICE_START, I_ENLARGED_SLICE_END),
    dataSecond: A_EARNINGS_QUARTERLY_ESTIMATED_EPS.slice(I_ENLARGED_SLICE_START, I_ENLARGED_SLICE_END),
    titleText: "Quarterly Earnings Per Share",
    titleColor: S_TITLE_COLOR,
    titleSize: I_TITLE_FONT_SIZE,
    pointBackgroundColor: "rgba(32, 178, 170, 0.50)",
    pointBorderColor: "rgba(32, 178, 170, 1)",
    canvasBackground: S_CANVAS_BACKGROUND,
    canvasBorderRadius: S_CANVAS_BORDER_RADIUS,
    canvasBoxShadow: S_CANVAS_BOX_SHADOW
}

const _oOptionsAssetsLiabilitesAnnual = {
    labels: A_BALANCE_ANNUAL_DATES,
    data: A_BALANCE_ANNUAL_LIABILITIES,
    dataSecond: A_BALANCE_ANNUAL_SH_EQUITY,
    dataThird: A_BALANCE_ANNUAL_ASSETS,
    dataLabel: "Liabilities",
    dataLabelSecond: "Equity",
    dataLabelThird: "Assets",
    titleText: "Annual Balance",
    titleColor: S_TITLE_COLOR,
    titleSize: I_TITLE_FONT_SIZE,
    barColor: "rgba(188, 80, 144, 0.5)",
    barBorderColor: "rgba(188, 80, 144, 1)",
    barColorSecond: "rgba(255, 166, 0, 0.5",
    barBorderColorSecond: "rgba(255, 166, 0, 1",
    barColorThird: "rgba(0, 63, 118, 0.5)",
    barBorderColorThird: "rgba(0, 63, 118, 1)", 
    canvasBackground: S_CANVAS_BACKGROUND,
    canvasBorderRadius: S_CANVAS_BORDER_RADIUS,
    canvasBoxShadow: S_CANVAS_BOX_SHADOW,
    sliceStart: I_COMPACT_SLICE_START,
    sliceEnd: I_COMPACT_SLICE_END
}

const _oOptionsAssetsLiabilitesQuarterly = {
    labels: A_BALANCE_QUARTERLY_DATES,
    data: A_BALANCE_QUARTERLY_LIABILITIES,
    dataSecond: A_BALANCE_QUARTERLY_SH_EQUITY,
    dataThird: A_BALANCE_QUARTERLY_ASSETS,
    dataLabel: "Liabilities",
    dataLabelSecond: "Equity",
    dataLabelThird: "Assets",
    titleText: "Quarterly Balance",
    titleColor: S_TITLE_COLOR,
    titleSize: I_TITLE_FONT_SIZE,
    barColor: "rgba(188, 80, 144, 0.5)",
    barBorderColor: "rgba(188, 80, 144, 1)",
    barColorSecond: "rgba(255, 166, 0, 0.5",
    barBorderColorSecond: "rgba(255, 166, 0, 1",
    barColorThird: "rgba(0, 63, 118, 0.5)",
    barBorderColorThird: "rgba(0, 63, 118, 1)", 
    canvasBackground: S_CANVAS_BACKGROUND,
    canvasBorderRadius: S_CANVAS_BORDER_RADIUS,
    canvasBoxShadow: S_CANVAS_BOX_SHADOW,
    sliceStart: I_COMPACT_SLICE_START,
    sliceEnd: I_COMPACT_SLICE_END
}

const _oOptionsDebtToCashAnnual = {
    labels: A_BALANCE_ANNUAL_DATES,
    data: A_BALANCE_ANNUAL_LONG_DEBT,
    dataSecond: A_BALANCE_ANNUAL_SHORT_DEBT,
    dataThird: A_BALANCE_ANNUAL_CASH,
    dataLabel: "Long-Term Debt",
    dataLabelSecond: "Short-Term Debt",
    dataLabelThird: "Cash and Equivalents",
    titleText: "Annual Debt To Cash",
    titleColor: S_TITLE_COLOR,
    titleSize: I_TITLE_FONT_SIZE,
    barColor: "rgba(128, 0, 0, 0.5)",
    barBorderColor: "rgba(128, 0, 0, 1)",
    barColorSecond: "rgba(199,21,133, 0.5",
    barBorderColorSecond: "rgba(199,21,133, 1",
    barColorThird: "rgba(107, 142, 35, 0.5)",
    barBorderColorThird: "rgba(107, 142, 35, 1)", 
    canvasBackground: S_CANVAS_BACKGROUND,
    canvasBorderRadius: S_CANVAS_BORDER_RADIUS,
    canvasBoxShadow: S_CANVAS_BOX_SHADOW,
    sliceStart: I_COMPACT_SLICE_START,
    sliceEnd: I_COMPACT_SLICE_END
}

const _oOptionsDebtToCashQuarterly = {
    labels: A_BALANCE_QUARTERLY_DATES,
    data: A_BALANCE_QUARTERLY_LONG_DEBT,
    dataSecond: A_BALANCE_QUARTERLY_SHORT_DEBT,
    dataThird: A_BALANCE_QUARTERLY_CASH,
    dataLabel: "Long-Term Debt",
    dataLabelSecond: "Short-Term Debt",
    dataLabelThird: "Cash and Equivalents",
    titleText: "Quarterly Debt To Cash",
    titleColor: S_TITLE_COLOR,
    titleSize: I_TITLE_FONT_SIZE,
    barColor: "rgba(128, 0, 0, 0.5)",
    barBorderColor: "rgba(128, 0, 0, 1)",
    barColorSecond: "rgba(199,21,133, 0.5",
    barBorderColorSecond: "rgba(199,21,133, 1",
    barColorThird: "rgba(107, 142, 35, 0.5)",
    barBorderColorThird: "rgba(107, 142, 35, 1)", 
    canvasBackground: S_CANVAS_BACKGROUND,
    canvasBorderRadius: S_CANVAS_BORDER_RADIUS,
    canvasBoxShadow: S_CANVAS_BOX_SHADOW,
    sliceStart: I_COMPACT_SLICE_START,
    sliceEnd: I_COMPACT_SLICE_END
}

const _oOptionsPrices = {
    labels: A_PRICE_DATES,
    data: A_PRICES,
    dataSecond: A_PRICE_INDEX_SPY,
    titleColor: S_TITLE_COLOR,
    titleSize: I_TITLE_FONT_SIZE,
    symbol: S_SYMBOL,
    backgroundColor: "rgba(0, 224, 224, 0.3)",
    borderColor: "rgba(0, 224, 224, 0.6)",
    backgroundColorSecond: "rgba(250, 54, 47, 0.3)",
    borderColorSecond: "rgba(250, 54, 47, 0.6)",
    canvasBackground: S_CANVAS_BACKGROUND,
    canvasBorderRadius: S_CANVAS_BORDER_RADIUS,
    canvasBoxShadow: S_CANVAS_BOX_SHADOW
}


// |-- SINGULAR LEVEL CHART DESIGNATION AND FUNCTION CALL

createChartLineRoic(O_CANVAS_ROIC, _oOptionsRoic);

createChartBarSimple(O_CANVAS_REVENUE_ANNUAL, _oOptionsRevenueAnnual);
createChartBarSimple(O_CANVAS_REVENUE_ANNUAL_MODAL_1_1, _oOptionsRevenueAnnual, B_IS_MODAL);
createChartBarSimple(O_CANVAS_REVENUE_ANNUAL_MODAL_2_2, _oOptionsRevenueAnnual, B_IS_MODAL);
createChartBarSimple(O_CANVAS_REVENUE_QUARTERLY, _oOptionsRevenueQuarterly);
createChartBarSimple(O_CANVAS_REVENUE_QUARTERLY_MODAL_1_2, _oOptionsRevenueQuarterly, B_IS_MODAL);
createChartBarSimple(O_CANVAS_REVENUE_QUARTERLY_MODAL_2_1, _oOptionsRevenueQuarterly, B_IS_MODAL);

createChartBarSimple(O_CANVAS_NETINCOME_ANNUAL, _oOptionsIncomeAnnual);
createChartBarSimple(O_CANVAS_NETINCOME_ANNUAL_MODAL_1_3, _oOptionsIncomeAnnual, B_IS_MODAL);
createChartBarSimple(O_CANVAS_NETINCOME_ANNUAL_MODAL_2_4, _oOptionsIncomeAnnual, B_IS_MODAL);
createChartBarSimple(O_CANVAS_NETINCOME_QUARTERLY, _oOptionsIncomeQuarterly);
createChartBarSimple(O_CANVAS_NETINCOME_QUARTERLY_MODAL_2_3, _oOptionsIncomeQuarterly, B_IS_MODAL);
createChartBarSimple(O_CANVAS_NETINCOME_QUARTERLY_MODAL_1_4, _oOptionsIncomeQuarterly, B_IS_MODAL);

createChartPointSimple(O_CANVAS_EARNINGS_ANNUAL, _oOptionsEpsAnnualCompact);
createChartPointSimple(O_CANVAS_EARNINGS_ANNUAL_MODAL_1_5, _oOptionsEpsAnnualEnlarged, B_IS_MODAL);
createChartPointSimple(O_CANVAS_EARNINGS_ANNUAL_MODAL_2_6, _oOptionsEpsAnnualEnlarged, B_IS_MODAL);
createChartPointGreenRed(O_CANVAS_EARNINGS_QUARTERLY, _oOptionsEpsQuarterlyCompact);
createChartPointGreenRed(O_CANVAS_EARNINGS_QUARTERLY_MODAL_2_5, _oOptionsEpsQuarterlyEnlarged, B_IS_MODAL);
createChartPointGreenRed(O_CANVAS_EARNINGS_QUARTERLY_MODAL_1_6, _oOptionsEpsQuarterlyEnlarged, B_IS_MODAL);

createChartBarsTwoOne(O_CANVAS_ASSETS_LIABILITIES_ANNUAL, _oOptionsAssetsLiabilitesAnnual);
createChartBarsTwoOne(O_CANVAS_ASSETS_LIABILITIES_ANNUAL_MODAL_1_7, _oOptionsAssetsLiabilitesAnnual, B_IS_MODAL);
createChartBarsTwoOne(O_CANVAS_ASSETS_LIABILITIES_ANNUAL_MODAL_2_8, _oOptionsAssetsLiabilitesAnnual, B_IS_MODAL);
createChartBarsTwoOne(O_CANVAS_ASSETS_LIABILITIES_QUARTERLY, _oOptionsAssetsLiabilitesQuarterly);
createChartBarsTwoOne(O_CANVAS_ASSETS_LIABILITIES_QUARTERLY_MODAL_2_7, _oOptionsAssetsLiabilitesQuarterly, B_IS_MODAL);
createChartBarsTwoOne(O_CANVAS_ASSETS_LIABILITIES_QUARTERLY_MODAL_1_8, _oOptionsAssetsLiabilitesQuarterly, B_IS_MODAL);

createChartBarsTwoOne(O_CANVAS_DEBT_TO_CASH_ANNUAL, _oOptionsDebtToCashAnnual);
createChartBarsTwoOne(O_CANVAS_DEBT_TO_CASH_ANNUAL_MODAL_1_9, _oOptionsDebtToCashAnnual, B_IS_MODAL);
createChartBarsTwoOne(O_CANVAS_DEBT_TO_CASH_ANNUAL_MODAL_2_10, _oOptionsDebtToCashAnnual, B_IS_MODAL);
createChartBarsTwoOne(O_CANVAS_DEBT_TO_CASH_QUARTERLY, _oOptionsDebtToCashQuarterly);
createChartBarsTwoOne(O_CANVAS_DEBT_TO_CASH_QUARTERLY_MODAL_2_9, _oOptionsDebtToCashQuarterly, B_IS_MODAL);
createChartBarsTwoOne(O_CANVAS_DEBT_TO_CASH_QUARTERLY_MODAL_1_10, _oOptionsDebtToCashQuarterly, B_IS_MODAL);

createChartLinePrices(O_CANVAS_PRICES_ANNUAL, 252, _oOptionsPrices);
createChartLinePrices(O_CANVAS_PRICES_ANNUAL_MODAL_1255, 1259, _oOptionsPrices, B_IS_MODAL);
createChartLinePrices(O_CANVAS_PRICES_ANNUAL_MODAL_251, 251, _oOptionsPrices, B_IS_MODAL);
createChartLinePrices(O_CANVAS_PRICES_ANNUAL_MODAL_90, 90, _oOptionsPrices, B_IS_MODAL);
createChartLinePrices(O_CANVAS_PRICES_ANNUAL_MODAL_30, 30, _oOptionsPrices, B_IS_MODAL);

createChartLinePrices(O_CANVAS_PRICES_QUARTERLY, 90, _oOptionsPrices);
createChartLinePrices(O_CANVAS_PRICES_QUARTERLY_MODAL_1255, 1259, _oOptionsPrices, B_IS_MODAL);
createChartLinePrices(O_CANVAS_PRICES_QUARTERLY_MODAL_251, 252, _oOptionsPrices, B_IS_MODAL);
createChartLinePrices(O_CANVAS_PRICES_QUARTERLY_MODAL_90, 90, _oOptionsPrices, B_IS_MODAL);
createChartLinePrices(O_CANVAS_PRICES_QUARTERLY_MODAL_30, 30, _oOptionsPrices, B_IS_MODAL);