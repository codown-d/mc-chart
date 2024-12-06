<script setup>
import { provide } from "vue";
import { RouterLink, RouterView } from 'vue-router'
import * as echarts from "echarts";
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
provide("echarts", echarts);
</script>

<template>
  <a-config-provider :locale="zhCN">
    <RouterView  />
  </a-config-provider>
</template>

<style >

</style>
