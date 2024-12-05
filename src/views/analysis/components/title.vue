<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { Select, SelectOption, Pagination, Button } from "ant-design-vue";
import { DownloadOutlined } from "@ant-design/icons-vue";

const emits = defineEmits([""]);
const router = useRouter();
const current = ref(2);

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
  nav: [
    { img: "home-items-1.png", text: "离心风机" },
    { img: "home-items-2.png", text: "轴流风机" },
    { img: "home-items-3.png", text: "鼓风机" },
  ],
  deviceId: "轴流风机",
});

const handleDeviceChange = () => {};
</script>

<template>
  <div class="title flex-items">
    <div class="title-sort">{{ props.sort }}</div>
    <div class="title-text">{{ props.title }}</div>
    <div class="flex">
      <img src="/images/analysis/title_icon.png" />
      <div class="title-describe">{{ props.describe }}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.title {
  &-sort {
    font-weight: bold;
    font-size: 48px;
    color: #0087d3;
    margin-right: 20px;
  }
  &-text {
    font-weight: bold;
    font-size: 36px;
    color: #2c3133;
    margin-right: -10px;
  }
  .flex {
    align-items: end;
    position: relative;
    img {
      width: 193px;
      height: 49px;
    }
  }
  &-describe {
    position: absolute;
    bottom: 0px;
    left: 45px;
    width: 200px;
    font-weight: bold;
    font-size: 14px;
    color: rgba(0, 135, 211, 0.33);
    text-transform: uppercase; /* 将文本转换为大写 */
  }
}
</style>
