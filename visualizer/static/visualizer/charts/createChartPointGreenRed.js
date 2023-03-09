import { formatToUnits } from "../utils/formatToUnits.js";

export function createChartPointGreenRed (ctx, { labels, data, titleText, titleColor,
                                    titleSize, pointBackgroundColor, pointBorderColor, canvasBackground,
                                    canvasBorderRadius, dataSecond, canvasBoxShadow }, isModal=false) {

    ctx.style.backgroundColor = canvasBackground;
    ctx.style.borderRadius = canvasBorderRadius;
    if (isModal === false) {
        ctx.style.boxShadow = canvasBoxShadow;
    }

    let pointColorControl = []

    for (let i = 0; i < data.length; i++) {
        if ((data[i] - dataSecond[i]) >= 0 ) {
            pointColorControl.push(1);
        } else {
            pointColorControl.push(0);
        }
    }

    const graph = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Actual",
                    radius: 10,
                    hoverRadius: 7,
                    data: data,
                    backgroundColor: function(context) {
                        if (pointColorControl[context.dataIndex] === 0) {
                            return 'red'
                        } else {
                            return 'green'
                        };
                    },
                    pointBackgroundColor: function(context) {
                        if (pointColorControl[context.dataIndex] === 0) {
                            return "rgba(255, 77, 77, 0.8)"
                        } else {
                            return "rgba(3, 187, 3, 0.8)"
                        };
                    },
                    pointBorderColor: function(context) {
                        if (pointColorControl[context.dataIndex] === 0) {
                            return 'red'
                        } else {
                            return 'green'
                        };
                    },
                    rotation: function(context) {
                        if (pointColorControl[context.dataIndex] === 0) {
                            return 180
                        } else {
                            return 0
                        };
                    },
                    pointStyle: "triangle",
                    borderWidth: 0
                },
                {
                    label: "Estimate",
                    radius: 10,
                    hoverRadius: 7,
                    data: dataSecond,
                    borderColor: "transparent",
                    backgroundColor: pointBackgroundColor,
                    pointBackgroundColor: pointBackgroundColor,
                    pointBorderColor: pointBorderColor,
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
                    display: isModal,
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || "";
                                                    
                            // if (context.element.options.backgroundColor === "red") {
                            //     label += "Miss";
                            // }
                            // if (context.element.options.backgroundColor === "green") {
                            //     label += "Beat";
                            // }

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