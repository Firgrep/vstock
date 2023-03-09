import { createChartBarSimple } from "./charts/createChartBarSimple.js";
import { createChartPointGreenRed } from "./charts/createChartPointGreenRed.js";
import { createChartPointSimple } from "./charts/createChartPointSimple.js";
import { createChartBalance } from "./charts/createChartBalance.js";


// |-- UNIVERSAL LEVEL CHART CONTROL CONSTANTS -

const B_IS_MODAL = true;
const I_COMPACT_SLICE_START = 0;
const I_COMPACT_SLICE_END = 4;
const I_ENLARGED_SLICE_START = 0;
const I_ENLARGED_SLICE_END = 15;


const I_TITLE_FONT_SIZE = 20;
const S_TITLE_COLOR = "black";
const S_CANVAS_BACKGROUND = "white";
const S_CANVAS_BORDER_RADIUS = "0";
const S_CANVAS_BOX_SHADOW = "5px 10px 8px #888888";





// |-- DOM WORK CONSTANTS  -
// const O_CANVAS_TEST = document.getElementById("canvas_test");

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

// |-- DATA WORK CONSTANTS  -
const O_OVERVIEW = JSON.parse(document.getElementById('overviewId').textContent);

const A_REVENUE_ANNUAL = O_OVERVIEW.revenue_list_annual;
const A_INCOME_DATES_ANNUAL = O_OVERVIEW.income_annual_dates;
const A_NETINCOME_ANNUAL = O_OVERVIEW.net_income_annual;
const A_EPS_ANNUAL_DATES = O_OVERVIEW.earnings_annual_dates;
const A_EPS_ANNUAL = O_OVERVIEW.earnings_annual_reported_EPS;
const A_BALANCE_ANNUAL_DATES = O_OVERVIEW.balance_annual_time;
const A_BALANCE_ANNUAL_ASSETS = O_OVERVIEW.balance_annual_assets;
const A_BALANCE_ANNUAL_LIABILITIES = O_OVERVIEW.balance_annual_liabilities;
const A_BALANCE_ANNUAL_SH_EQUITY = O_OVERVIEW.balance_annual_shareholder_equity;

const A_REVENUE_QUARTERLY = O_OVERVIEW.revenue_list_quarterly;
const A_INCOME_DATES_QUARTERLY = O_OVERVIEW.income_quarterly_dates;
const A_NETINCOME_QUARTERLY = O_OVERVIEW.net_income_quarterly;
const A_EARNINGS_QUARTERLY_DATES = O_OVERVIEW.earnings_quarterly_reported_dates
const A_EARNINGS_QUARTERLY_EPS = O_OVERVIEW.earnings_quarterly_reported_EPS
const A_EARNINGS_QUARTERLY_BEAT_DIFF = O_OVERVIEW.earnings_quarterly_beat_difference
const A_EARNINGS_QUARTERLY_ESTIMATED_EPS = O_OVERVIEW.earnings_quarterly_estimated_EPS
const A_BALANCE_QUARTERLY_DATES = O_OVERVIEW.balance_quarterly_time;
const A_BALANCE_QUARTERLY_ASSETS = O_OVERVIEW.balance_quarterly_assets;
const A_BALANCE_QUARTERLY_LIABILITIES = O_OVERVIEW.balance_quarterly_liabilities;
const A_BALANCE_QUARTERLY_SH_EQUITY = O_OVERVIEW.balance_quarterly_shareholder_equity;

// |-- PARTICULAR LEVEL CHART OPTION OBJECTS -

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
    canvasBoxShadow: S_CANVAS_BOX_SHADOW
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
    canvasBoxShadow: S_CANVAS_BOX_SHADOW
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
    canvasBoxShadow: S_CANVAS_BOX_SHADOW
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
    canvasBoxShadow: S_CANVAS_BOX_SHADOW
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
    canvasBoxShadow: S_CANVAS_BOX_SHADOW
}

const _oOptionsAssetsLiabilitesQuarterly = {
    labels: A_BALANCE_QUARTERLY_DATES,
    data: A_BALANCE_QUARTERLY_LIABILITIES,
    dataSecond: A_BALANCE_QUARTERLY_SH_EQUITY,
    dataThird: A_BALANCE_QUARTERLY_ASSETS,
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
    canvasBoxShadow: S_CANVAS_BOX_SHADOW
}


// |-- SINGULAR LEVEL CHART DESIGNATION AND FUNCTION CALL

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

createChartBalance(O_CANVAS_ASSETS_LIABILITIES_ANNUAL, _oOptionsAssetsLiabilitesAnnual);
createChartBalance(O_CANVAS_ASSETS_LIABILITIES_ANNUAL_MODAL_1_7, _oOptionsAssetsLiabilitesAnnual, B_IS_MODAL);
createChartBalance(O_CANVAS_ASSETS_LIABILITIES_ANNUAL_MODAL_2_8, _oOptionsAssetsLiabilitesAnnual, B_IS_MODAL);
createChartBalance(O_CANVAS_ASSETS_LIABILITIES_QUARTERLY, _oOptionsAssetsLiabilitesQuarterly);
createChartBalance(O_CANVAS_ASSETS_LIABILITIES_QUARTERLY_MODAL_2_7, _oOptionsAssetsLiabilitesQuarterly, B_IS_MODAL);
createChartBalance(O_CANVAS_ASSETS_LIABILITIES_QUARTERLY_MODAL_1_8, _oOptionsAssetsLiabilitesQuarterly, B_IS_MODAL);