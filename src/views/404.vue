<script setup>
const handleClick = () => {
  window.location.href = '/'
}
</script>

<template>
  <div class="Error-Content flex-center animate__animated animate__fadeIn">
    <a-result status="404" title="提示" subTitle="页面不存在!">
      <template #extra>
        <a-button type="primary" @click="handleClick">返回首页</a-button>
      </template>
    </a-result>
  </div>
</template>

<style lang="less" scoped>
.Error-Content {
  width: 100%;
  height: 100%;
  background-color: #011642;
  :deep(.ant-result-title),
  :deep(.ant-result-subtitle) {
    color: #ffffff;
  }
}
</style>
