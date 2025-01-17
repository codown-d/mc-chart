<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Select, SelectOption, Pagination, Button } from "ant-design-vue";
import { DownloadOutlined } from "@ant-design/icons-vue";
import FanOverview from "@/views/equipment-analysis/components/fan-overview.vue";
import html2canvas from "html2canvas";
import TitleView from "@/views/analysis/components/title.vue";
import Charts from "@/views/equipment-analysis/components/charts.vue";
import RiskTrends from "@/views/blocking-analysis/components/risk-trends.vue";
import BlowingSystem from "@/views/components-predictive/components/blowing-system.vue";
import PredictiveMaintenance from "@/views/components-predictive/components/predictive-maintenance.vue";
import Chart from "@/views/perfect-temperature/components/chart.vue";

const emits = defineEmits([""]);
const router = useRouter();
const route = useRoute();
const current = ref(2);

const props = defineProps({});

const state = reactive({
    deviceType: route.params.deviceType,
    nav: [
        { img: "home-items-1.png", text: "离心风机" },
        { img: "home-items-2.png", text: "轴流风机" },
        { img: "home-items-3.png", text: "鼓风机" },
    ],
    deviceId: "轴流风机",
    loading: false,
});


const generateImg = () => {
    let el = document.getElementById("html2canvasDom");
    let options = {
        width: el.offsetWidth,
        height: el.offsetHeight,
        useCORS: true, // 是否尝试使用 CORS 从服务器加载图像
        allowTaint: false, // 是否允许跨源图像污染画布
    };
    console.log(options)
    state.loading = true;
    html2canvas(el, options).then((canvas) => {
        let imgData = canvas.toDataURL("image/jpeg"); // 转base64
        fileDownload(imgData);
    });
};

// 下载图片方法
const fileDownload = (downloadUrl) => {
    let aLink = document.createElement("a");
    aLink.style.display = "none";
    // 以防base64过长导致下载失败，所以将base64转成blob格式
    aLink.href = URL.createObjectURL(dataURIToBlob(downloadUrl));
    aLink.download = "analysis.png";
    document.body.appendChild(aLink);
    aLink.click();
    document.body.removeChild(aLink);
    state.loading = false;
};

// base64转blob方法
const dataURIToBlob = (dataURI) => {
    let binStr = atob(dataURI.split(",")[1]),
        len = binStr.length,
        arr = new Uint8Array(len);

    for (var i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i);
    }
    return new Blob([arr]);
};
</script>

<template>
    <div class="container">
        <pangge-Header :navigation="false">
            <template v-slot:header-right>
                <Button @click="generateImg" :loading="state.loading">
                    报告下载
                    <template #icon>
                        <DownloadOutlined />
                    </template>
                </Button>
            </template>
        </pangge-Header>

        <div class="container-content w-full overflow-hidden" style="margin-top: -40px;">
            <div class=" w-full px-[40px] overflow-hidden" id="html2canvasDom">
                <div class="container-content-blockRow-block1-content">
                    <img src="/images/analysis/t1bg.png" style="width: 100%" />
                    <div class="container-content-blockRow-block1-content-title flex">
                        <div>2024年</div>
                        <div>第一季度运行总览</div>
                    </div>
                    <div class="container-content-blockRow-block1-content-options">
                        <img src="/images/analysis/option_bg.png" />
                        <div>Operational overview</div>
                    </div>
                </div>
                <div class="px-5 w-full overflow-hidden">
                    <div class="container-content-blockRow-block2-title">
                        <TitleView sort="01" title="预热器概述" describe="quipment parameter" />
                    </div>
                    <div class="m-[20px]" style="height: 380px">
                        <FanOverview :device_info="{ Device_Name: 'aph' }" />
                    </div>
                </div>
                <div class="px-5 w-full overflow-hidden">
                    <div class="container-content-blockRow-block2-title">
                        <TitleView sort="02" title="运行统计" describe="quipment parameter" />
                    </div>
                    <Charts />
                </div>
                <div class="px-5 w-full overflow-hidden">
                    <div class="container-content-blockRow-block2-title">
                        <TitleView sort="03" title="堵灰风险趋势" describe="quipment parameter" />
                    </div>
                    <div style="height: 380px">
                        <RiskTrends />
                    </div>
                </div>
                <div class="px-5 w-full overflow-hidden">
                    <div class="container-content-blockRow-block2-title">
                        <TitleView sort="04" title="换热元件预测性维护与分析" describe="quipment parameter" />
                    </div>
                    <div style="height: 380px">
                        <BlowingSystem />
                    </div>
                </div>
                <div class="px-5 w-full overflow-hidden">
                    <div class="container-content-blockRow-block2-title">
                        <TitleView sort="05" title="换热元件寿命衰减趋势" describe="quipment parameter" />
                    </div>
                    <div style="height: 380px">
                        <PredictiveMaintenance />
                    </div>
                </div>
                <div class="px-5 pb-[100px] w-full overflow-hidden">
                    <div class="container-content-blockRow-block2-title">
                        <TitleView sort="06" title="壁温分析" describe="quipment parameter" />
                    </div>
                    <div style="height: 600px">
                         <Chart :title="false" />
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

            &-block {
                height: 3000px;
            }
        }
    }

    :deep(.ant-table-wrapper .ant-table-thead > tr > th) {
        background: rgba(68, 182, 246, 1);
        color: #ffffff;
    }
}

.container-content-blockRow-block1 {
    position: relative;

    &-title {
        margin-top: -79px;
        margin-left: 155px;
    }

    &-select {
        position: absolute;
        right: 30px;
        top: 420px;
    }

    &-content {
        width: 100%;

        &-title {
            left: 155px;
            top: 95px;
            position: absolute;
            align-items: end;

            &>div:nth-child(1) {
                font-size: 70px;
                font-weight: bold;
                background-image: linear-gradient(291deg,
                        #00d3d3 20%,
                        #00d3d3 0,
                        #0087d3 100%,
                        #0087d3 50%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                margin-right: 15px;
                transform: skew(-10deg);
                /* 沿着Y轴切斜 */
            }

            &>div:nth-child(2) {
                font-size: 50px;
                color: #0087d3;
                font-weight: bold;
                text-shadow: 0px 4px 0px rgba(17, 147, 220, 0.39);
            }
        }

        &-options {
            left: 244px;
            top: 188px;
            position: absolute;

            img {
                width: 562px;
                height: 21px;
            }

            div {
                font-weight: bold;
                font-size: 38px;
                color: rgba(0, 135, 211, 0.19);
                position: absolute;
                right: 0;
                top: -15px;
                z-index: 0;
            }
        }
    }

    &-table {
        &-left {
            flex: 1;
            margin-top: 73px;
            margin: 73px 69px 0 155px;
            flex-wrap: wrap;
            justify-content: space-between;

            &-items {
                width: 40%;
                display: flex;

                &-label {
                    width: 140px;
                    height: 56px;
                    background: rgba(0, 135, 211, 0.05);
                    border-radius: 4px 4px 4px 4px;
                    font-size: 24px;
                    color: #5b7f94;
                    margin-right: 30px;
                }

                &-value {
                    font-weight: bold;
                    font-size: 24px;
                    color: #2c3133;
                }
            }
        }

        &-right {
            width: 562px;
            height: 468px;
        }
    }
}
</style>
