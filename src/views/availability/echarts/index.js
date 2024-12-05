import dayjs from 'dayjs'
const labelStyle = {
    // color: "#000",
    fontSize: '12px',
}

export const LayoutBlockLef = (legends, serialData, dayList) => {
  const newArray = Array.from({ length: serialData[0].data.length }, () => '');
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          show: true,
        },
      },
    },
    // title: {
    //   text: '设备可用性分析',
    //   left: '50%',
    //   textStyle: {
    //     color: "#FFF"
    //   }
    // },
    grid: {
      top: "30%",
      left: "4%",
      right: "0%",
      bottom: "16%",
      containLabel: true,
    },
    dataZoom: [
      {
        show: true,
        bottom: '10%',
        // start: 0,
        // end: serialData[0].data.length,
        handleIcon: `image://${window.location.origin}/images/icon1.png`,
        handleSize: 12,
        height: 10,
        handleStyle: {
          color: '#000',
        },
        textStyle: {
          color: '#fff',
          fontSize: 12,
        },
        fillerColor: '#302939',
        backgroundColor: '#fff',
        brushSelect: false,
        type: 'slider',
      },
      // {
      //   type: 'slider',
      // }
    ],
    legend: {
      data: legends,
      top: 20,
      left: 'center',
      textStyle: {
        ...labelStyle,
      },
    },
    xAxis: {
      data: newArray,
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: 'rgb(15 11 50)',
        }
      },
      axisLabel: {
        show: false,
      },
    },
    yAxis: [
      {
        type: 'value',
        inverse: true,
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
          lineStyle: {
            ...labelStyle,
          },
        },
        splitLine: {
          show: false, // 不显示 Y 轴分隔线
        },
        min: 0,
        max: 24
      },
      {
        type: 'value',
        // inverse: true,
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
          lineStyle: {
            ...labelStyle,
          },
        },
        splitLine: {
          show: false, // 不显示 Y 轴分隔线
        },
        min: 0,
        max: 10,
        interval: 5
      },
    ],
    series: serialData,
  };
}


export const LayoutFooter = (serialData) => {

  return {
    type: "view",
    width: 1920,
    height: 280,
    paddingLeft: 60,
    paddingRight: 80,
    data: serialData,
    interaction: { tooltip: false },
    children: [
      {
        type: "line",
        encode: { x: "year", y: 1 },
        style: { lineWidth: 4, fill: "#387BFF" },
        axis: false,
        labels: [
          {
            text: "year",
            dy: (d, i) => (i % 2 === 1 ? 8 : -8),
            textAlign: "center",
            textBaseline: (d, i) => (i % 2 === 1 ? "top" : "bottom"),
            style: { fontWeight: '600', fontSize: 12, fill: "#000000" },
          },
          {
            text: (d) => d.composition,
            dy: (d, i) => (i % 2 === 0 ? 48 : -48),
            textAlign: "center",
            textBaseline: (d, i) => (i % 2 === 0 ? "top" : "bottom"),
            wordWrap: true,
            wordWrapWidth: 160,
            connector: true,
            connectorStroke: "#000000",
            connectorLineWidth: 2,
            style: { fontWeight: '600', fontSize: 12, fill: "#000000" },
          },
        ],
        zIndex: 1,
      },
      {
        type: "point",
        encode: { x: "year", y: 1 },
        style: { fill: "#000000" },
        zIndex: 1,
      },
    ],
  }
}

export const LayoutTimelineChart = (serialData) => {
  console.log("serialData ", serialData);
  return {
    type: "view",
    width: 1020,
    height: 280,
    paddingTop: 0,
    paddingLeft: -40,
    paddingRight: 0,
    data: serialData,
    interaction: { tooltip: false },
    children: [
      {
        type: "line",
        encode: { x: "year", y: 1 },
        style: { lineWidth: 4, fill: "#387BFF" },
        axis: false,
        labels: [
          {
            text: "year",
            dy: (d, i) => (i % 2 === 1 ? 8 : -8),
            textAlign: "center",
            textBaseline: (d, i) => (i % 2 === 1 ? "top" : "bottom"),
            style: { fontWeight: '600', fontSize: 12, fill: "#000000" },
          },
          {
            text: (d) => d.composition,
            dy: (d, i) => (i % 2 === 0 ? 48 : -48),
            textAlign: "center",
            textBaseline: (d, i) => (i % 2 === 0 ? "top" : "bottom"),
            wordWrap: true,
            wordWrapWidth: 160,
            connector: true,
            connectorStroke: "#000000",
            connectorLineWidth: 2,
            style: { fontWeight: '600', fontSize: 12, fill: "#000000" },
          },
        ],
        zIndex: 1,
      },
      {
        type: "point",
        encode: { x: "year", y: 1 },
        style: { fill: "#000000" },
        zIndex: 1,
      },
    ],
  }
}