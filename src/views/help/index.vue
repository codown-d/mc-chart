<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { initX6 } from "./x6";
const emits = defineEmits([""]);
const router = useRouter();
const route = useRoute();
const current = ref(2);

const props = defineProps({});
const activeKey = ref([]);
const text = "内容整理中...";
const state = reactive({
  deviceType: route.params.deviceType,
});
onMounted(() => {
  initX6();
});
</script>

<template>
  <div class="container">
    <pangge-Header> </pangge-Header>
    <div class="container-content">
      <div class="container-content-blockRow flex">
        <div class="container-content-blockRow-left" id="helpV6"></div>
        <div class="container-content-blockRow-right">
          <div class="container-content-blockRow-right-row">
            <!-- <div class="container-content-blockRow-right-row-title flex-center ">核心页面1</div>
            <div class="container-content-blockRow-right-row-content">
              内容内容内容内容内容内容内容内容内容内容内内容内容内容内容内容内容内容内容内容内容内容内内容内容内容内容内容内容内容内容内容内容内容内内容内容内容内容内容内容内容内容内容内容内容内内容内容内容内容内容内容内容内容内容内容内容内内容内容内容内容内容内容内容内容内容内容内容内内容内容内容内容容内容内内容内容内容内容内容内容内容内容内容内容内容内内容内容内容内容内容内容内容内容内容内容内容内内容内容
            </div> -->
            <a-collapse v-model:activeKey="activeKey" accordion style="width: 100%;">
              <a-collapse-panel key="1" header="设备概述">
                <p>{{ text }}</p>
              </a-collapse-panel>
              <a-collapse-panel
                key="2"
                header="振动分析与异常检测"
                :disabled="false"
              >
                <p>{{ text }}</p>
              </a-collapse-panel>
              <a-collapse-panel key="3" header="喘振预测与分析">
                <p>{{ text }}</p>
              </a-collapse-panel>
              <a-collapse-panel key="4" header="预防性维护">
                <p>{{ text }}</p>
              </a-collapse-panel>
              <a-collapse-panel key="5" header="可用性分析">
                <p>{{ text }}</p>
              </a-collapse-panel>
              <a-collapse-panel key="6" header="能耗分析">
                <p>{{ text }}</p>
              </a-collapse-panel>
              <a-collapse-panel key="7" header="报告汇总">
                <p>{{ text }}</p>
              </a-collapse-panel>
            </a-collapse>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.ant-collapse-item-active .ant-collapse-header {
  background-color: rgb(0, 135, 211);
  .ant-collapse-header-text {
    color: #ffffff;
  }
}
</style>
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
      height: 100vh;
      padding: 30px;

      &-left {
        width: 60%;
        height: 100%;
        background: rgba(123, 145, 157, 0.08);
      }

      &-right {
        width: 40%;
        height: 100%;

        &-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 0 0 30px;
          &-title {
            width: 90%;
            height: 60px;
            background: rgba(0, 135, 211, 0.07);
            border-radius: 4px 4px 4px 4px;
            font-weight: bold;
            font-size: 24px;
            color: #000000;
            justify-content: start;
            padding-left: 48px;
          }

          &-content {
            width: 90%;
            margin: 30px 0;
            font-weight: 400;
            font-size: 18px;
            color: #6b767b;
          }
        }
      }
    }
  }
}
</style>
