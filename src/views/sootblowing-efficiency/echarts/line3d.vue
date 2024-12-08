<template>
    <div class="relative w-full h-full">
        <div class="chart" :class="class" ref="chart" style="height: 100%; width: 100%"></div>
        <a-spin v-if="!isReady" class="absolute z-10 top-[50%] left-[50%]" />
    </div>
</template>
<script setup lang="ts">
import { onMounted, computed, ref, nextTick, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Select, SelectOption, Pagination, Popover } from "ant-design-vue";
import * as echarts from "echarts";
import { merge } from "lodash";
const chart = ref(null);
const myChart = ref(null);

const props = defineProps({
    option: {
        type: Object,
        default: {},
    },
    class: {
        type: String,
        default: "",
    },
});
const isReady = computed(() => {
    const currentOption = myChart.value?.getOption();
    return currentOption?.series.length != 0;
});

const option = {
  title: {
    text: '3D 折线图示例',
  },
  tooltip: {
    formatter: (params) => `x: ${params.value[0]}, y: ${params.value[1]}, z: ${params.value[2]}`,
  },
  xAxis3D: {
    type: 'value',
    name: 'X 轴',
  },
  yAxis3D: {
    type: 'value',
    name: 'Y 轴',
  },
  zAxis3D: {
    type: 'value',
    name: 'Z 轴',
  },
  grid3D: {
    viewControl: {
      projection: 'perspective', // 透视投影
      autoRotate: true,         // 自动旋转
    },
    boxWidth: 200,  // 3D 网格宽度
    boxDepth: 200,  // 3D 网格深度
    light: {
      main: {
        intensity: 1.2,
      },
      ambient: {
        intensity: 0.3,
      },
    },
  },
  series: [
  ],
};
let init = () => {
    if (!chart.value) return;
    if (!myChart.value) {
        var ct = echarts.init(chart.value);
        myChart.value = ct;
        ct.setOption(merge({}, option, props.option), true);
    }
};

watch(
    props,
    (newValue, _oldValue) => {
        const opt = myChart.value.getOption();
        myChart.value.setOption(Object.assign({}, opt, newValue.option));
    },
    { deep: true }
);
nextTick(() => {
    init();
});
defineExpose({
    setChartInit() {
        myChart.value.dispose();
        var chart = echarts.init(chart.value);
        chart.setOption(merge({}, option, props.option));
        myChart.value = chart;
        return myChart.value;
    },

    getChartInstance() {
        return myChart.value;
    },
});
onMounted(() => {
    window.addEventListener("resize", () => {
        myChart.value.resize();
    });
});
</script>