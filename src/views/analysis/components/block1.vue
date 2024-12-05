<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Select, SelectOption, Pagination, Button } from "ant-design-vue";
import { DownloadOutlined } from "@ant-design/icons-vue";
import TitleView from "./title.vue";
const emits = defineEmits([""]);
const router = useRouter();
const route = useRoute();

const props = defineProps({
  sort: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  describe: {
    type: String,
    default: "",
  },
});

const state = reactive({
  deviceId: 1,
  deviceType: route.params.deviceType,
  deviceList: [
    // {
    //   value: 1,
    //   label: "GFJ1"
    // },
    // {
    //   value: 2,
    //   label: "GFJ2"
    // },
    // {
    //   value: 3,
    //   label: "GFJ3"
    // }
  ],
  table: [
    {
      label: "序列号",
      value: "C031836-01",
    },
    {
      label: "设备名称",
      value: "1#矿井通风机",
    },
    {
      label: "型号",
      value: "AMN 2650/1250C",
    },
    {
      label: "调节形式",
      value: "动叶液压调节",
    },
    {
      label: "设计风量",
      value: "250 m3/s",
    },
    {
      label: "润滑型式",
      value: "滚动轴承油浴润滑",
    },
    {
      label: "设计压力",
      value: "2454 Pa",
    },
    {
      label: "电机功率",
      value: "1600KW",
    },
  ],
});

onMounted(() => {
  if (state.deviceType == 0) {
    const arr = [
      {
        value: 1,
        label: "Centrifugal Fan1",
      },
      {
        value: 2,
        label: "Centrifugal Fan2",
      },
      {
        value: 3,
        label: "Centrifugal Fan3",
      },
    ];
    state.deviceList = arr;
  } else if (state.deviceType == 1) {
    const arr = [
      {
        value: 1,
        label: "VPA1",
      },
      {
        value: 2,
        label: "VPA2",
      },
      {
        value: 3,
        label: "VPA3",
      },
    ];
    state.deviceList = arr;
  } else if (state.deviceType == 2) {
    const arr = [
      {
        value: 1,
        label: "GFJ1",
      },
      {
        value: 2,
        label: "GFJ2",
      },
      {
        value: 3,
        label: "GFJ3",
      },
    ];
    state.deviceList = arr;
  }
});

const changeDevice = () => {};
</script>

<template>
  <div class="container-content-blockRow-block1">
    <div class="container-content-blockRow-block1-content">
      <img src="/images/analysis/t1bg.png" style="width: 100%" />
      <div class="container-content-blockRow-block1-content-title flex">
        <div>2024年</div>
        <div>第一季度运行总览</div>
      </div>
      <div class="container-content-blockRow-block1-content-options">
        <img src="/images/analysis/option_bg.png" />
        <div>Operational overview</div>
      </div>
    </div>
    <div class="container-content-blockRow-block1-title">
      <TitleView
        sort="01"
        title="设备参数"
        describe="quipment parameter"
      ></TitleView>
      <div class="container-content-blockRow-block1-select">
        <h3>选择设备</h3>
        <Select
          ref="select"
          size="small"
          class="sitemore"
          v-on:change="changeDevice"
          v-model:value="state.deviceId"
          style="width: 160px"
          :options="state.deviceList"
        >
        </Select>
      </div>
    </div>
    <div class="container-content-blockRow-block1-table flex">
      <div class="container-content-blockRow-block1-table-left flex-items">
        <div
          class="container-content-blockRow-block1-table-left-items flex-items"
          v-for="(items, index) in state.table"
          :key="index"
        >
          <div
            class="container-content-blockRow-block1-table-left-items-label flex-center"
          >
            {{ items.label }}
          </div>
          <div class="container-content-blockRow-block1-table-left-items-value">
            {{ items.value }}
          </div>
        </div>
      </div>
      <img
        src="/images/analysis/right_block.png"
        class="container-content-blockRow-block1-table-right"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.container-content-blockRow-block1 {
  width: 100%;
  position: relative;
  &-title {
    margin-top: -79px;
    margin-left: 155px;
  }
  &-select {
    position: absolute;
    right: 30px;
    top: 420px;
  }
  &-content {
    width: 100%;

    &-title {
      left: 155px;
      top: 95px;
      position: absolute;
      align-items: end;
      & > div:nth-child(1) {
        font-size: 70px;
        font-weight: bold;
        background-image: linear-gradient(
          291deg,
          #00d3d3 20%,
          #00d3d3 0,
          #0087d3 100%,
          #0087d3 50%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-right: 15px;
        transform: skew(-10deg); /* 沿着Y轴切斜 */
      }
      & > div:nth-child(2) {
        font-size: 50px;
        color: #0087d3;
        font-weight: bold;
        text-shadow: 0px 4px 0px rgba(17, 147, 220, 0.39);
      }
    }

    &-options {
      left: 244px;
      top: 188px;
      position: absolute;
      img {
        width: 562px;
        height: 21px;
      }
      div {
        font-weight: bold;
        font-size: 38px;
        color: rgba(0, 135, 211, 0.19);
        position: absolute;
        right: 0;
        top: -15px;
        z-index: 0;
      }
    }
  }

  &-table {
    &-left {
      flex: 1;
      margin-top: 73px;
      margin: 73px 69px 0 155px;
      flex-wrap: wrap;
      justify-content: space-between;
      &-items {
        width: 40%;
        display: flex;
        &-label {
          width: 140px;
          height: 56px;
          background: rgba(0, 135, 211, 0.05);
          border-radius: 4px 4px 4px 4px;
          font-size: 24px;
          color: #5b7f94;
          margin-right: 30px;
        }
        &-value {
          font-weight: bold;
          font-size: 24px;
          color: #2c3133;
        }
      }
    }
    &-right {
      width: 562px;
      height: 468px;
    }
  }
}
</style>
