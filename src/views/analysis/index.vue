<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Select, SelectOption, Pagination, Button } from "ant-design-vue";
import { DownloadOutlined } from "@ant-design/icons-vue";
import html2canvas from "html2canvas";

import Block1View from "./components/block1.vue";
import Block2View from "./components/block2.vue";
import Block3View from "./components/block3.vue";
import Block4View from "./components/block4.vue";

const emits = defineEmits([""]);
const router = useRouter();
const route = useRoute();
const current = ref(2);

const props = defineProps({});

const state = reactive({
  deviceType: route.params.deviceType,
  nav: [
    { img: "home-items-1.png", text: "离心风机" },
    { img: "home-items-2.png", text: "轴流风机" },
    { img: "home-items-3.png", text: "鼓风机" },
  ],
  deviceId: "轴流风机",
  loading: false,
});

const handleDeviceChange = () => {};

const generateImg = () => {
  let el = document.getElementById("html2canvasDom");
  let options = {
    width: el.offsetWidth,
    height: el.offsetHeight,
    useCORS: true, // 是否尝试使用 CORS 从服务器加载图像
    allowTaint: false, // 是否允许跨源图像污染画布
  };
  state.loading = true;
  html2canvas(el, options).then((canvas) => {
    let imgData = canvas.toDataURL("image/jpeg"); // 转base64
    fileDownload(imgData);
  });
};

// 下载图片方法
const fileDownload = (downloadUrl) => {
  let aLink = document.createElement("a");
  aLink.style.display = "none";
  // 以防base64过长导致下载失败，所以将base64转成blob格式
  aLink.href = URL.createObjectURL(dataURIToBlob(downloadUrl));
  aLink.download = "analysis.png";
  document.body.appendChild(aLink);
  aLink.click();
  document.body.removeChild(aLink);
  state.loading = false;
};

// base64转blob方法
const dataURIToBlob = (dataURI) => {
  let binStr = atob(dataURI.split(",")[1]),
    len = binStr.length,
    arr = new Uint8Array(len);

  for (var i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i);
  }
  return new Blob([arr]);
};
</script>

<template>
  <div class="container">
    <pangge-Header>
      <!-- <template v-slot:header-block>
        <Select
          ref="select"
          size="large"
          v-model:value="state.deviceId"
          style="width: 209px"
          @change="handleDeviceChange"
        >
          <SelectOption value="轴流风机">轴流风机</SelectOption>
        </Select>
      </template> -->
      <template v-slot:header-right>
        <Button @click="generateImg" :loading="state.loading">
          报告下载
          <template #icon>
            <DownloadOutlined />
          </template>
        </Button>
        </template>
    </pangge-Header>
    <div class="container-content" id="html2canvasDom">
      <div class="container-content-blockRow">
        <Block1View />
        <Block2View />
        <Block3View />
        <Block4View />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100vh;

  &-content {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: -4.8%;
    &-blockRow {
      background-color: #ffffff;
      margin: 0 30px;
      padding-bottom: 30px;

      &-block {
        height: 3000px;
      }
    }
  }
  :deep(.ant-table-wrapper .ant-table-thead > tr > th) {
    background: rgba(68, 182, 246, 1);
    color: #ffffff;
  }
}
</style>
