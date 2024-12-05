<template>
  <div class="relative">
    <pangge-Title text="专家建议" class="mb-[10px]"></pangge-Title>
    <div style="background: rgba(0, 135, 211, 0.06)" class="p-2 text-[#0087D3] text-[14px] font-bold">
      换热器阻力性能降低，有堵灰趋势请及时安排换热器检修
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Select, SelectOption, Pagination, Popover } from "ant-design-vue";
import { values } from "lodash";
</script>
