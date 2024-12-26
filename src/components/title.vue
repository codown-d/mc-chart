<script setup>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import TimeBlock from "./time.vue";

const emits = defineEmits([""]);
const router = useRouter();

const props = defineProps({
  text: "",
  fontClass: "",
});
</script>

<template>
  <div class="echats-title space-center">
    <div class="flex-items">
      <div class="echats-title-border"></div>
      <div class="echats-title-text" :class="props.fontClass">{{ props.text }}</div>
    </div>
    <slot name="content-right"> </slot>
  </div>
</template>

<style lang="less" scoped>
.echats-title {
  z-index: 99;
  &-border {
    width: 3px;
    height: 12px;
    background: #0087d3;
    border-radius: 2px 2px 2px 2px;
    margin-right: 13px;
  }
  &-text {
    font-weight: bold;
    font-size: 16px;
    color: #2e383d;
  }
}
</style>
