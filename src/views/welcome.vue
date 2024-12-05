<script setup>
import { onMounted, reactive } from "vue";
import { useRouter, useRoute } from 'vue-router'
import API from "@/api";
const emits = defineEmits([""]);
const router = useRouter();
const route = useRoute();
const props = defineProps({

});

const state = reactive({
    nav: [
        { img: 'home-items-1.png', text: '离心风机' },
        { img: 'home-items-2.png', text: '轴流风机', url: "/overview" },
        { img: 'home-items-3.png', text: '鼓风机' }
    ]
})

onMounted(() => {
    setInterval(handGetWebPath, 1000);
});

const handleAclick = (url) => {
    router.push(url)
};

const handGetWebPath = () => {
    const params = {
        id: 1
    }
    API.getWebPath(params).then((res) => {
        const path = res.data[0].urlPath;
        if (route.path !== path) {
            handleAclick(path);
        }
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
                <img class="container-header-logo pointer" src="/images/welcome_logo.jpg" />
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
            width: 455px;
            height: auto;
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
            // display: flex;
            // justify-content: space-between;
            max-width: 680px;
            padding: 0 95px;
            margin: 0 auto; /* 上下保持0，左右自动调整 */
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 40.2593%;

            img {
                // width: 100%;

            }

            &-items {
                width: 435px;

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
