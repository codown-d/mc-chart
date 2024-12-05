<script setup>
import { onMounted, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
const emits = defineEmits([""]);
const router = useRouter();
const route = useRoute();
import API from "@/api";
const props = defineProps({

});

const state = reactive({
    nav: [
        { img: 'home-items-1.png', text: '离心风机', url: "/overview/0" },
        { img: 'home-items-2.png', text: '轴流风机', url: "/overview/1" },
        { img: 'home-items-3.png', text: '鼓风机', url: "/overview/2" }
    ]
})

onMounted(() => {
    handSetWebPath('/welcome');
})

const handleAclick = (url) => {
    router.push(url)
};
const handSetWebPath = (url) => {
  const data = {
    id: 1,
    urlPath: url
  }
  API.setWebPath(data).then((res) => {
    console.log("res ", res);
  })
}
</script>

<template>
    <div class="container">
        <div class="container-header">
            <div class="space-between">
                <img class="container-header-logo pointer" src="/images/logo.png" />
                <img class="container-header-user pointer" src="/images/user.png" />
            </div>
            <div class="container-titleContent">
                <div class="container-titleContent-English">OVERVIEW OF DEVICE TYPES</div>
                <div class="container-titleContent-title">设备类型概览</div>
                <div class="container-titleContent-border"></div>
            </div>
        </div>
        <div class="container-content">
            <div class="container-content-blockRow">
                <div class="container-content-blockRow-items" v-for="(items, index) in state.nav" :key="index">
                    <div class="container-content-blockRow-items-bg pointer">
                        <img :src="`/images/${items.img}`" @click="handleAclick(items.url)"/>
                    </div>
                    <div class="container-content-blockRow-items-footer space-center">
                        <img class="pointer" src="/images/home-left.png" />
                        <div>{{ items.text }}</div>
                        <img class="pointer" src="/images/home-right.png" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.container {
    width: 100%;
    height: 100vh;
    background: url(/images/Mask_groupbg.png) no-repeat;
    background-size: 100% 100%;
    background-position: 0 30px;

    &-header {
        width: 100%;
        height: 41%;
        background: url(/images/header_bg.png) no-repeat;
        background-size: 100% 100%;
        position: relative;

        &-logo {
            width: 205px;
            height: 97px;
        }

        &-user {
            width: 34px;
            height: 34px;
            margin-top: 15px;
            margin-right: 24px;
        }
    }



    &-titleContent {
        width: 50%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;

        &-title {
            font-weight: bold;
            font-size: 44px;
            color: #FFFFFF;
        }

        &-border {
            width: 72px;
            height: 7px;
            background: #FFFFFF;
            margin-top: 35px;
        }

        &-English {
            position: absolute;
            z-index: -1;
            font-weight: bold;
            font-size: 30px;
            color: rgba(255, 255, 255, 0.25);
            top: 30px;
        }
    }

    &-content {
        width: 100%;
        height: 59%;
        position: relative;

        &-blockRow {
            display: flex;
            justify-content: space-between;
            padding: 0 95px;
            position: absolute;
            left: 0;
            width: 100%;
            top: -9.2593%;

            img {
                width: 100%;

            }

            &-items {
                width: 535px;

                &-bg {
                    width: 100%;
                    height: 354px;
                    border-radius: 11px;
                    border: 4px solid rgba(255, 255, 255, 0.7);
                    overflow: hidden;
                }

                // height: 354px;
                &-footer {
                    width: 100%;
                    padding: 34px 31px;
                    background: #FFFFFF;
                    box-shadow: 0 0 20px 0 rgba(154, 185, 207, 0.15);
                    border-radius: 11px 11px 11px 11px;
                    margin-top: 30px;

                    div {
                        font-weight: bold;
                        font-size: 28px;
                        color: #2C3133;
                    }

                    img {
                        width: 49px;
                        height: 61px;
                    }
                }
            }
        }
    }
}
</style>
