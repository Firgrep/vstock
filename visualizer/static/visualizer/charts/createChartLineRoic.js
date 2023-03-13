import { formatToUnits } from "../utils/formatToUnits.js";

export function createChartLineRoic (ctx, { labels, data, titleColor, titleText,
                                    titleSize, backgroundColor, borderColor, canvasBackground,
                                    canvasBorderRadius, canvasBoxShadow }) {

    ctx.style.backgroundColor = canvasBackground;
    ctx.style.borderRadius = canvasBorderRadius;

    // labels = labels.slice(0, sliceEnd);
    // data = data.slice(0, sliceEnd);


    // if (isModal === false) {
    //     ctx.style.boxShadow = canvasBoxShadow;
    // }

    const graph = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                data: data,
                label: `1y RoIC: ${data[0].toFixed(2)}%`,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                pointBorderColor: "transparent",
                borderWidth: 2,
                // fill: {
                //     target: 'origin',
                //     above: 'rgba(0, 224, 224, 0.2)',
                //     below: 'rgb(0, 0, 255)'
                // }
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
                    ticks: {
                        callback: function(value, index, ticks) {
                            return value + "%";
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
                    display: true
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            // context.dataset.label
                            let label = "RoIC";
                            if (label) {
                                label += ": ";
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y.toFixed(2) + "%";
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