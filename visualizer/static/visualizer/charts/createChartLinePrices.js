import { formatToUnits } from "../utils/formatToUnits.js";

export function createChartLinePrices (ctx, sliceEnd=30, { labels, data, titleColor,
                                        titleSize, backgroundColor, borderColor, canvasBackground,
                                        canvasBorderRadius, canvasBoxShadow, dataSecond,
                                        backgroundColorSecond, borderColorSecond, symbol,
                                        dataThird, backgroundColorThird, borderColorThird }, isModal=false) {

    function processData(data, comparisonStart) {
        const dataPercentageIncreases = []
        const dataComparison = []
        dataComparison.push(comparisonStart)

        const dataReversed = data.reverse()
        for (let i = 0; i < data.length; i++) {
            dataPercentageIncreases[i] = dataReversed[i + 1] / dataReversed[i];
        }
        for (let i = 0; i < data.length - 1; i++) {
            let result = dataComparison[i] * dataPercentageIncreases[i]
            dataComparison[i + 1] = result
        }
        const dataComparisonReversed = dataComparison.reverse();
        return dataComparisonReversed
    }

    ctx.style.backgroundColor = canvasBackground;
    ctx.style.borderRadius = canvasBorderRadius;

    labels = labels.slice(0, sliceEnd);
    data = data.slice(0, sliceEnd);
    dataSecond = dataSecond.slice(0, sliceEnd);
    //dataThird = dataSecond.slice(0, sliceEnd);

    // DataSecond setup (first comparison)
    // const dataSecondPercentageIncreases = []
    let dataSecondComparison = []
    // dataSecondComparison.push(data[data.length - 1])

    let dataSecondGrowth = 0
    const comparisonStart = data[data.length - 1]
    // DataThird setup (second comparison)
    const dataThirdPercentageIncreases = []
    const dataThirdComparison = []
    dataThirdComparison.push(data[data.length - 1])
    let dataThirdGrowth = 0
    
    if (isModal === false) {
        ctx.style.boxShadow = canvasBoxShadow;
        dataSecond = null;
        dataThird = null;
    } else {
        // DataSecond treatment (first comparison)
        // const dataSecondReversed = dataSecond.reverse()
        // for (let i = 0; i < dataSecond.length; i++) {
        //     dataSecondPercentageIncreases[i] = dataSecondReversed[i + 1] / dataSecondReversed[i];
        // }
        // for (let i = 0; i < dataSecond.length - 1; i++) {
        //     let result = dataSecondComparison[i] * dataSecondPercentageIncreases[i]
        //     dataSecondComparison[i + 1] = result
        // }
        // const dataSecondComparisonReversed = dataSecondComparison.reverse();

        dataSecondComparison = processData(dataSecond, comparisonStart);
        
        dataSecondGrowth = ((dataSecondComparison[0] / dataSecondComparison[dataSecondComparison.length - 1]) - 1) * 100;




        // DataThird treatment (first comparison)
        // // const dataThirdReversed = dataThird.reverse()
        // // for (let i = 0; i < dataThird.length; i++) {
        // //     dataThirdPercentageIncreases[i] = dataThirdReversed[i + 1] / dataThirdReversed[i];
        // // }
        // // for (let i = 0; i < dataThird.length - 1; i++) {
        // //     let result = dataThirdComparison[i] * dataThirdPercentageIncreases[i]
        // //     dataThirdComparison[i + 1] = result
        // // }
        // // const dataThirdComparisonReversed = dataThirdComparison.reverse();
        // // dataThirdGrowth = ((dataThirdComparison[0] / dataThirdComparison[dataThirdComparison.length - 1]) - 1) * 100;
    }

    //console.log("SPY: ", ((dataSecondComparison[0] / dataSecondComparison[dataSecondComparison.length - 1]) - 1) * 100);

    const graph = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    data: data,
                    label: `${symbol}`,
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
                }
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
                    text: "Comparison with funds tracking the indices S&P500, NASDAQ-100 and Russell 3000"
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