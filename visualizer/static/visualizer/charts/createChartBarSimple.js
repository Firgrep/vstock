import { formatToUnits } from "../utils/formatToUnits.js";

export function createChartBarSimple (ctx, { labels, data, titleText, titleColor,
                                    titleSize, barColor, barBorderColor, canvasBackground,
                                    canvasBorderRadius, canvasBoxShadow, sliceStart,
                                    sliceEnd }, isModal=false) {

    ctx.style.backgroundColor = canvasBackground;
    ctx.style.borderRadius = canvasBorderRadius;
    if (isModal === false) {
        ctx.style.boxShadow = canvasBoxShadow;
        labels = labels.slice(sliceStart, sliceEnd);
        data = data.slice(sliceStart, sliceEnd);
    }

    const graph = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    barColor
                ],
                borderColor: [
                    barBorderColor
                ],
                borderWidth: 2
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
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
                    text: titleText,
                    color: titleColor,
                    font: {
                        size: titleSize
                    }
                },
                legend: {
                    display: false
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