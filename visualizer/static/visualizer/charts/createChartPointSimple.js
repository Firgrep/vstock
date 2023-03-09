import { formatToUnits } from "../utils/formatToUnits.js";

export function createChartPointSimple (ctx, { labels, data, titleText, titleColor,
                                    titleSize, pointBackgroundColor, canvasBackground,
                                    canvasBorderRadius, pointBorderColor, canvasBoxShadow }, isModal=false) {

    ctx.style.backgroundColor = canvasBackground;
    ctx.style.borderRadius = canvasBorderRadius;
    if (isModal === false) {
        ctx.style.boxShadow = canvasBoxShadow;
    }

    const graph = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "EPS",
                    radius: 10,
                    hoverRadius: 7,
                    data: data,
                    backgroundColor: pointBackgroundColor,
                    pointBackgroundColor: pointBackgroundColor,
                    pointBorderColor: pointBorderColor,
                    pointBorderWidth: 1,
                    borderWidth: 0
                }
            ],
        },
        options: {
            elements: {
                point: {
                    pointStyle: "circle"
                    
                }
            },
            interaction: {
                intersect: false,
                mode: "index"
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value, index, ticks) {
                            value = formatToUnits(value, 2);
                            return "$" + value;
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    reverse: true,
                    offset: true
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
                    display: false,
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