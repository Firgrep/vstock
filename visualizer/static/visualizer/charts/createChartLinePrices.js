import { formatToUnits } from "../utils/formatToUnits.js";

export function createChartLinePrices ( ctx, sliceEnd=30, { labels, data, titleColor,
                                        titleSize, backgroundColor, borderColor, canvasBackground,
                                        canvasBorderRadius, canvasBoxShadow, dataSecond,
                                        backgroundColorSecond, borderColorSecond, symbol,
                                        dataThird, backgroundColorThird, borderColorThird,
                                        dataFourth, backgroundColorFourth, borderColorFourth }, isModal=false) {

    function processData(data, comparisonStart) {
        const dataPercentageIncreases = [];
        const dataComparison = [];
        dataComparison.push(comparisonStart);

        const dataReversed = data.reverse();
        for (let i = 0; i < data.length; i++) {
            dataPercentageIncreases[i] = dataReversed[i + 1] / dataReversed[i];
        }
        for (let i = 0; i < data.length - 1; i++) {
            let result = dataComparison[i] * dataPercentageIncreases[i];
            dataComparison[i + 1] = result;
        }
        const dataComparisonReversed = dataComparison.reverse();
        return dataComparisonReversed;
    }

    ctx.style.backgroundColor = canvasBackground;
    ctx.style.borderRadius = canvasBorderRadius;

    labels = labels.slice(0, sliceEnd);
    data = data.slice(0, sliceEnd);
    dataSecond = dataSecond.slice(0, sliceEnd);
    dataThird = dataThird.slice(0, sliceEnd);
    dataFourth = dataFourth.slice(0, sliceEnd);

    // Data comparison setup
    const comparisonStart = data[data.length - 1];
    let dataGrowth = 0;

    let dataSecondComparison = [];
    let dataSecondGrowth = 0;

    let dataThirdComparison = [];
    let dataThirdGrowth = 0;
    
    let dataFourthComparison = [];
    let dataFourthGrowth = 0;

    dataGrowth = ((data[0] / data[data.length - 1]) - 1) * 100;
    
    if (isModal === false) {
        ctx.style.boxShadow = canvasBoxShadow;
        dataSecond = null;
        dataThird = null;
        dataFourth = null;
    } else {
        // If there's an error at the API call for indices, it should return zero.
        if (dataSecond !== 0) {
            dataSecondComparison = processData(dataSecond, comparisonStart);
            dataSecondGrowth = ((dataSecondComparison[0] / dataSecondComparison[dataSecondComparison.length - 1]) - 1) * 100;
        } else {
            dataSecond = null;
        }
        if (dataThird !== 0) {
            dataThirdComparison = processData(dataThird, comparisonStart);
            dataThirdGrowth = ((dataThirdComparison[0] / dataThirdComparison[dataThirdComparison.length - 1]) - 1) * 100;
        } else {
            dataThird = null;
        }
        if (dataFourth !== 0) {
            dataFourthComparison = processData(dataThird, comparisonStart);
            dataFourthGrowth = ((dataFourthComparison[0] / dataFourthComparison[dataFourthComparison.length - 1]) - 1) * 100;
        } else {
            dataFourth = null;
        }
    }

    const graph = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    data: data,
                    label: `${symbol} [${dataGrowth.toFixed(2)}%]`,
                    backgroundColor: backgroundColor,
                    radius: 0,
                    hoverRadius: 0,
                    borderColor: borderColor,
                    pointBorderColor: "transparent",
                    borderWidth: 2,
                    fill: {
                        target: 'origin',
                        above: 'rgba(0, 224, 224, 0.2)',
                        below: 'rgb(0, 0, 255)'
                    }
                },
                {
                    data: dataSecondComparison,
                    label: `SPY [${dataSecondGrowth.toFixed(2)}%]`,
                    radius: 0,
                    hoverRadius: 0,
                    backgroundColor: backgroundColorSecond,
                    borderColor: borderColorSecond,
                    pointBorderColor: "transparent",
                    borderWidth: 2,
                },
                {
                    data: dataThirdComparison,
                    label: `QQQ [${dataThirdGrowth.toFixed(2)}%]`,
                    radius: 0,
                    hoverRadius: 0,
                    backgroundColor: backgroundColorThird,
                    borderColor: borderColorThird,
                    pointBorderColor: "transparent",
                    borderWidth: 2,
                },
                {
                    data: dataFourthComparison,
                    label: `VTHR [${dataFourthGrowth.toFixed(2)}%]`,
                    radius: 0,
                    hoverRadius: 0,
                    backgroundColor: backgroundColorFourth,
                    borderColor: borderColorFourth,
                    pointBorderColor: "transparent",
                    borderWidth: 2,
                },
            ]
        },
        options: {
            interaction: {
                intersect: false,
                mode: "index"
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function(value, index, ticks) {
                            value = formatToUnits(value, 0);
                            return "$" + value;
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    reverse: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: `Last price $${data[0]}`,
                    color: titleColor,
                    font: {
                        size: titleSize
                    }
                },
                legend: {
                    display: isModal
                },
                subtitle: {
                    display: isModal,
                    text: "Performance comparison with funds tracking the indices S&P500, NASDAQ-100 and Russell 3000 in the selected time period. Click on the labels below to toggle data."
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || "";
                            if (label) {
                                label += ": ";
                            }
                            if (context.parsed.y !== null) {
                                label += "$" + formatToUnits(context.parsed.y, 2);
                            }
                            return label;
                        }
                    }
                }
            }
        },
    });

    return graph;
}