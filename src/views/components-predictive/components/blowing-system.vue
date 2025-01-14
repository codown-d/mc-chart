<template>
  <div style="height: calc(100%)" class="relative flex">
    <div id="chart" class="w-full h-full"></div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, watch } from "vue";
import Line from "@/views/blocking-analysis/echarts/line.vue";
import API from "@/api_v2";
import { useDeviceInfo } from "@/hook/useDeviceInfo";
import * as echarts from "echarts";
import { merge } from "lodash";
import dayjs from "dayjs";
import * as d3 from "d3";
const echartComponent = ref(null);
let valueLine = ref();
let option = ref({
  title: {
    show: false,
  },
  // grid: {
  //   show: true, // 启用背景
  //   backgroundColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  //     // 上到下的渐变
  //     { offset: 1, color: "rgba(255, 0, 0, 0.1)" }, // 渐变起始色
  //     { offset: 0.5, color: "rgba(255, 255, 0, 0.1)" }, // 渐变起始色
  //     { offset: 0, color: "rgba(0, 128, 0, 0.1)" }, // 渐变结束色
  //   ]),
  //   borderWidth: 0,
  //   left: "4px",
  //   right: "0%",
  //   top: "0%",
  //   bottom: "2%",
  // },
  xAxis: [
    {
      type: "time",
      boundaryGap: false,
      show: false,
      position: "top", // x 轴放到顶部
    },
  ],
  yAxis: [
    {
      // name: "yAxis-name",
      type: "value",
      // inverse: true,
      splitArea: {
        show: true, // 显示分段区域
        areaStyle: {
          color: [
            "rgba(255, 255, 255, 0)", // 默认区域透明
            "rgba(255, 255, 0, 0.3)", // 8到9的区间为黄色
            "rgba(255, 255, 255, 0)", // 9到10及其他区间为透明
          ],
        },
      },
    },
  ],
  series: [],
});

let { deviceInfoOp } = useDeviceInfo();
watch(deviceInfoOp, (data) => {
  valueLine.value = data[0].value;
});
const getDeviceAV = async (deviceName) => {
  var params = {
    deviceName,
    dataType: "DeviceBlowHistory",
    // timeFrom:  dayjs().subtract(60, 'day'),
    // timeEnd: dayjs(),
    timeFrom: "2021-06-14T00:00:00+08:00",
    timeEnd: "2021-07-22T00:00:00+08:00",
  };
  let blowHistory = await API.getData(params);
  let arr1 = blowHistory.data.map((item) => {
    return {
      ...item,
      x: item.history_t,
      y: item.history_v,
      color: "#284ed4",
    };
  });
  var params = {
    deviceName,
    dataType: "DeviceBlowRecently",
    // timeFrom:  dayjs().subtract(60, 'day'),
    // timeEnd: dayjs(),
    timeFrom: "2021-06-14T00:00:00+08:00",
    timeEnd: "2021-07-22T00:00:00+08:00",
  };
  let blowRecently = await API.getData(params);
  let arr2 = blowRecently.data.map((item) => {
    return {
      ...item,
      x: item.recently_t,
      y: item.recently_v,
      color: "#d3ca1c",
    };
  });
  console.log([...arr1, ...arr2]);
  // pointSets.value = [...arr1, ...arr2];
  init( [...arr1, ...arr2]);
};
let init = (circleList) => {
  // 创建SVG容器
  const chartElement = d3.select("#chart").node();
  const { width, height } = chartElement.getBoundingClientRect();
  const margin = { top: 0, right: 0, bottom: 40, left: 32 };

  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // 定义y轴的比例尺
  let ys = [0, 16];
  const yScale = d3
    .scaleLinear()
    .domain(ys) // y轴的值范围
    .range([height - margin.bottom, margin.top]);

  let xs = [100, 400];
  const xScale = d3
    .scaleLinear()
    .domain(xs) // y轴的值范围
    .range([margin.left, width - margin.right]);
  // 创建y轴
  const yAxis = d3.axisLeft(yScale);
  const xAxis = d3.axisBottom(xScale);

  // 在y轴区间8到9之间添加黄色背景矩形
  svg
    .append("rect")
    .attr("x", margin.left) // 设置矩形的左边距
    .attr("y", yScale(8)) // y轴8到9的开始位置
    .attr("width", width - margin.left - margin.right) // 矩形的宽度
    .attr("height", yScale(ys[0]) - yScale(8)) // 高度是9到8的区间
    .attr("fill", "rgba(255,219,26,0.2)"); // 填充黄色
  svg
    .append("rect")
    .attr("x", margin.left) // 设置矩形的左边距
    .attr("y", yScale(9)) // y轴8到9的开始位置
    .attr("width", width - margin.left - margin.right) // 矩形的宽度
    .attr("height", yScale(8) - yScale(9)) // 高度是9到8的区间
    .attr("fill", "#ffde00"); // 填充黄色

  // 在y轴区间9到10之间添加红色背景矩形
  svg
    .append("rect")
    .attr("x", margin.left)
    .attr("y", yScale(ys[1])) // y轴9到10的开始位置
    .attr("width", width - margin.left - margin.right)
    .attr("height", yScale(9) - yScale(ys[1])) // 高度是10到9的区间
    .attr("fill", "#b96c6c"); // 填充红色
  // 添加y轴
  svg.append("g").attr("transform", `translate(${margin.left}, 0)`).call(yAxis);
  svg
    .append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(xAxis);
  // 添加折线图数据
  const data = [{
    x: 260, y: 0
  },
  { x: 280, y: 6 },
  { x: 290, y: 9.5 },
  { x: 300, y: 10 },
  { x: xs[1], y: 10 },
  ];

  const line = d3
    .line()
    .curve(d3.curveBasis) // 使
    .x((d) => xScale(d.x)) // Map x values to x-axis
    .y((d) => yScale(d.y)); // Map y values to y-axis
  const area = d3
    .area()
    .curve(d3.curveBasis) // 保持区域曲线平滑
    .x((d) => xScale(d.x)) // 使用x比例尺来设置x坐标
    .y0(yScale(ys[0])) // 设置y0为y轴的最小值（即区域的底部）
    .y1((d) => yScale(d.y)); // 设置y1为数据点的y值

  svg
    .append("path")
    .data([[...data]])
    .attr("class", "area")
    .attr("d", area) // 使用area生成区域路径
    .attr("fill", "#65974a"); // 设置填充颜色为绿色

  svg
    .append("path")
    .data([data])
    .attr("class", "line")
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", 1);
  svg
    .selectAll("circle")
    .data(circleList)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.x)) // 设置圆点的x坐标
    .attr("cy", (d) => yScale(d.y)) // 设置圆点的y坐标
    .attr("r", 5) // 设置圆点的半径
    .attr("fill", d => d.color); // 设置圆点的颜色
  svg.append("text")
    .attr("x", width - 20)  // 水平居中
    .attr("y", height - margin.bottom / 4)  // 设置位置稍微偏离底部
    .attr("text-anchor", "middle")  // 水平居中对齐
    .attr("font-size", "8px")
    .attr("fill", "black")  // 字体颜色
    .text("温度P");  // 横坐标标题
  svg.append("text")
    .attr("x", -10)  // 设置位置稍微偏离左边
    .attr("y", 8)  // 垂直居中
    .attr("transform", "rotate(-90)")  // 旋转文字为垂直显示
    .attr("text-anchor", "middle")  // 水平居中对齐
    .attr("font-size", "8px")
    .attr("fill", "black")  // 字体颜色
    .text("压力V");  // 纵坐标标题
  [{ color: '#d3ca1c', title: '最近数据' }, { color: '#284ed4', title: '历史数据' }].map((item,index) => {
    let g = svg.append('g').attr("transform", `translate(${index*60+50}, ${height-10})`)
    g.append("circle")
      .attr("r", 6) // 设置圆点的半径
      .attr("fill", d => item.color); // 设置圆点的颜色
    g.append("text")
      .attr("transform", `translate(${10}, ${4})`)
      .attr("font-size", "10px")
      .attr("fill", "black")  // 字体颜色
      .text(item.title);  // 纵坐标标题
  })
};
watch(valueLine, (data) => {
  getDeviceAV(data);
});
onMounted(() => {
  // getDeviceAV();
});
</script>
