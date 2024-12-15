
import { countBy,merge, keys } from "lodash";
export function sampleByPercentage(start, end, percentages) {
  // 确保输入是有效的数字区间
  if (start >= end) {
    throw new Error("Invalid time range: start must be less than end");
  }

  const result = percentages.map((percentage) => {
    if (percentage < 0 || percentage > 100) {
      throw new Error("Percentage must be between 0 and 100");
    }
    // 计算对应的采样时间
    return start + (end - start) * (percentage / 100);
  });

  return result;
}
export  function generateData(startTime, endTime, numPoints) {
  // 起始时间和截止时间的毫秒数
  let startMs = new Date(startTime).getTime();
  let endMs = new Date(endTime).getTime();

  // 计算每个点的时间间隔（根据需要分成 numPoints 个点）
  let timeInterval = (endMs - startMs) / (numPoints - 1);

  // 初始化存储结果的二维数组
  let data = [];

  // 初始数值
  let currentValue = 1;

  // 初始化变化量（增加的差值）
  let decrementRate = 0.01;

  // 生成每个时间点和对应的数值
  for (let i = 0; i < numPoints; i++) {
    let currentTime = startMs + i * timeInterval;

    // 减少的值（随着每次迭代增大）
    currentValue -= decrementRate;

    // 确保数值不会小于 0.5
    if (currentValue < 0.5) {
      currentValue = 0.5;
    }

    // 增加导数变大的幅度
    decrementRate += 0.01;

    // 添加时间和数值对
    data.push([currentTime, currentValue]);
  }

  return data;
}
export  function generateRandomPoints(startTime, endTime, numPoints) {
  // 起始时间和截止时间的毫秒数
  let startMs = new Date(startTime).getTime();
  let endMs = new Date(endTime).getTime();

  // 计算每个点的时间间隔（根据需要分成 numPoints 个点）
  let timeInterval = (endMs - startMs) / (numPoints - 1);

  // 初始化存储结果的二维数组
  let data = [];

  // 生成每个时间点和对应的随机数值
  for (let i = 0; i < numPoints; i++) {
    let currentTime = startMs + i * timeInterval;

    // 随机生成 20 到 200 之间的数值
    let randomValue = Math.random() * (200 - 20) + 20;

    // 添加时间和数值对
    data.push([currentTime, randomValue]);
  }

  return data;
}

export  const useCulPercent=(data) => {
  let arr = data.map((item) => {
    let percent;
    if (item.unitLoad / 6 > 100) {
      percent = "超额负荷";
    } else if (item.unitLoad / 6 > 90) {
      percent = "90%-100%";
    } else if (item.unitLoad / 6 > 75) {
      percent = "75%-90%";
    } else if (item.unitLoad / 6 > 50) {
      percent = "50%-75%";
    } else {
      percent = "小于50%";
    }
    return { percent };
  });
  const totalCount = arr.length;
  const categoryCount = countBy(arr, "percent");
  return keys(categoryCount).map((count) => ({
    percent: count,
    percentage: ((categoryCount[count] / totalCount) * 100).toFixed(2),
    name: count,
    value:Number(((categoryCount[count] / totalCount) * 100).toFixed(2))
  }));
};