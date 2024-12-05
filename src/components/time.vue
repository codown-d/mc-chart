<template>
    <div class="time-container flex-items">
        <div class="time-container-title">智能分析平台运营时间：</div>
        <div class="time-container-block flex-items">
            <div class="flex-center">{{formattedTime.hours}}</div><span>小时</span>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

export default {
    setup() {
        const startTime = ref(new Date());
        const currentTime = ref(new Date());
        let timer = null;

        const formattedTime = computed(() => {
            const totalSeconds = Math.floor((currentTime.value - startTime.value) / 1000);
            const days = Math.floor(totalSeconds / (24 * 3600));
            // const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
            const hours = 1255;
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            return {
                days,
                hours,
                minutes,
                seconds
            }
        });

        const updateTime = () => {
            currentTime.value = new Date();
        };

        onMounted(() => {
            timer = setInterval(updateTime, 1000);
        });

        onBeforeUnmount(() => {
            clearInterval(timer);
        });

        return {
            formattedTime,
        };
    },
};
</script>
<style lang="less" scoped>
.time-container {

    &-title {
        font-weight: 400;
        font-size: 20px;
        color: #FFFFFF;
    }

    &-block {
        div {
            width: auto;
            height: 55px;
            background: rgba(11, 62, 93, 0.35);
            border-radius: 4px 4px 4px 4px;
            font-weight: bold;
            font-size: 28px;
            color: #FFFFFF;
            padding: 0 10px;
        }

        span {
            font-weight: bold;
            font-size: 28px;
            color: #FFFFFF;
            margin: 0 12px;
        }
    }
}
</style>
