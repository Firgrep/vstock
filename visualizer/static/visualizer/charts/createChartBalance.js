import { formatToUnits } from "../utils/formatToUnits.js";

export function createChartBalance (ctx, { labels, data, titleText, titleColor,
                                    titleSize, barColor, barBorderColor, canvasBackground,
                                    canvasBorderRadius, canvasBoxShadow, dataSecond, 
                                    dataThird, barColorSecond, barBorderColorSecond,
                                    barColorThird, barBorderColorThird }, isModal=false) {

    ctx.style.backgroundColor = canvasBackground;
    ctx.style.borderRadius = canvasBorderRadius;
    if (isModal === false) {
        ctx.style.boxShadow = canvasBoxShadow;
    }

    const graph = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                categoryPercentage: 0.6,
                label: "Liabilities",
                data: data,
                backgroundColor: barColor,
                borderColor: barBorderColor,
                borderWidth: 2,
                stack: "Stack 0"
            },
            {
                categoryPercentage: 0.6,
                label: "Equity",
                data: dataSecond,
                backgroundColor: barColorSecond,
                borderColor: barBorderColorSecond,
                borderWidth: 2,
                stack: "Stack 0"
            },
            {
                barPercentage: 1.12,
                categoryPercentage: 0.5, 
                label: "Assets",
                data: dataThird,
                backgroundColor: barColorThird,
                borderColor: barBorderColorThird,
                borderWidth: 2,
                stack: "Stack 1"
            }],
        },
        options: {
            interaction: {
                intersect: false,
                mode: "index"
            },
            scales: {
                y: {
                    beginAtZero: true,
                    stacked: true,
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
                    stacked: true,
                    reverse: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: titleText,
                    color: titleColor,
                    font: {
                        size: titleSize
                    }
                },
                legend: {
                    display: isModal,
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