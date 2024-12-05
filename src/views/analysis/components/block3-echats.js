import { Chart } from "@antv/g2";
import * as echarts from 'echarts';
export const block1Echats = () => {
    var anchor = {
        show: false,
        showAbove: false,
        size: 25,
        itemStyle: {
            borderWidth: 60,
        },
    };
    var title = {
        show: true,
        offsetCenter: [0, '30%'],
        fontSize: 18,
    };
    var detail = {
        valueAnimation: true,
        fontSize: 24,
        lineHeight: 30,
        color: '#333',
        fontWeight: 'bold',
        offsetCenter: [0, '-30%'],
        formatter: function (value) {
            return value + '{a|%}';
        },
        rich: {
            a: {
                color: '#333',
                fontSize: 16,
                lineHeight: 30,
            },
        },
    };
    return {
        title: {

            text: '累计用电量与去年相比的用电量减少',
            bottom: '20%',
            x: 'center',
            textStyle: {
                fontWeight: 'bold',
                fontSize: 13,
                color: '#7B838F'
            }

        },
        grid: {
            top: 0,
        },
        series: [
            {
                type: 'gauge',
                startAngle: 160,
                endAngle: 20,
                center: ['50%', '60%'],
                radius: '100%',
                min: 0,
                max: 100,
                progress: {
                    show: true,
                    width: 20,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            1,
                            0,
                            [
                                {
                                    offset: 0,
                                    color: '#49a8f1',
                                },
                                {
                                    offset: 1,
                                    color: '#59bae5',
                                },
                            ],
                            false
                        ),
                    },
                },
                pointer: {
                    show: true,
                    icon: 'rect',
                    offsetCenter: [0, '-75%'],
                    length: '30%',
                    showAbove: true,
                    itemStyle: {
                        color: '#59bae5',
                    },
                },
                axisLine: {
                    lineStyle: {
                        width: 20,
                        color: [[1, 'RGBA(246, 77, 62, 1)']],
                    },
                },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: {
                    distance: -50,
                    color: '#666',
                    fontSize: 14,
                    formatter: function (value) {
                        if (value === 0 || value === 50 || value === 100) {
                            return value;
                        }
                    },
                },
                anchor: anchor,
                title: title,
                detail: detail,
                data: [
                    {
                        value: 53.4,
                    },
                ],
            },
        ],
    };

}

export const block2Echats = () => {
    const progress = 0.7;
    const chart = new Chart({
        container: "block2Echats",
        autoFit: true,
    });

    chart.coordinate({ type: "theta", innerRadius: 0.7 });

    chart
        .interval()
        .data([1, progress])
        .encode("y", (d) => d)
        .encode("color", (d, idx) => idx)
        .scale("y", { domain: [0, 1] })
        .scale("color", { range: ["rgba(0, 135, 211, 1)", "rgba(217, 217, 217, 1)"] })
        .animate("enter", { type: "waveIn" })
        .axis(false)
        .legend(false);

    chart.text().style({
        text: `${progress * 100}%`,
        x: "50%",
        y: "50%",
        textAlign: "center",
        fontSize: 16,
        fontStyle: "bold",
    });

    chart.interaction("tooltip", false);

    chart.render();
}