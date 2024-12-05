<script setup>
import { onMounted, reactive, withDefaults } from "vue";
import { useRoute, useRouter } from "vue-router";


// 使用 withDefaults 来设置默认值
const props = defineProps({
    title: {
        type: String,
        default: false
    },
    production: {
        type: String,
        default: false
    },
    operate: {
        type: String,
        default: true
    }
});


</script>
<template>
    <div class="container-content-blockRow-left-block1 padding10">
        <pangge-Title text="设备信息"></pangge-Title>
        <div class="container-content-blockRow-left-block1-title">{{ title }}</div>
        <div class="space-center container-content-blockRow-left-block1-values">
            <div class="font16 colorL">出厂日期</div>
            <div class="font16 colorV">{{ production }}</div>
        </div>
        <div class="container-content-blockRow-left-block1-border"></div>
        <div class="space-center container-content-blockRow-left-block1-values">
            <div class="font16 colorL">投入运营时间</div>
            <div class="font16 colorV">{{ operate }}</div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.container-content-blockRow-left-block1 {
    width: 100%;
    height: 30%;
    background: #FFFFFF;

    &-title {
        background: rgba(0, 135, 211, 0.06);
        padding: 20px;
        font-weight: bold;
        font-size: 26px;
        color: #0087D3;
        text-align: center;
        margin-top: 10px;
        margin-bottom: 5px;

    }


    &-values {
        margin: 15px 0;
    }

    &-border {
        width: 100%;
        border: 1px dashed #C6D3D8;
    }
}
</style>
