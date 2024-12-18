<template>
  <div class="relative ml-3">
    <pangge-Title text="专家建议" class="mb-[10px]"></pangge-Title>
    <div style="background: rgba(0, 135, 211, 0.06)" class="p-2 text-[#0087D3] text-[14px] font-bold">
      热器阻力与堵灰情况息息相关，请持续关注堵灰趋势分析结果，当堵灰趋势超过风险阈值，请提前安排清理或者开启吹灰系统。
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Select, SelectOption, Pagination, Popover } from "ant-design-vue";
import { values } from "lodash";
</script>
