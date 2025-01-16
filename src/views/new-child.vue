<script setup>
import PreheaterGraph from "@/views/blocking-analysis/components/preheater-graph.vue";
</script>

<template>
  <div class="container">
    <pangge-Header-Child :back="false" :timeShow="false" :navigation="false" :home="false"> </pangge-Header-Child>
    <div class="container-content relative">
      <div class="h-[80vh]  absolute top-[-100px] left-[20px] p-5  bg-white " style="width: calc(100% - 40px);">
        <PreheaterGraph type="biwen" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
</style>
