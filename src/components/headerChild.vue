<script setup>
import { onMounted, reactive, withDefaults, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Modal, Textarea } from 'ant-design-vue'
import TimeBlock from "./time.vue";

const emits = defineEmits([""]);
const route = useRoute();
const router = useRouter();

// 使用 withDefaults 来设置默认值
const props = defineProps({
  timeShow: {
    type: Boolean,
    default: false,
  },
  back: {
    type: Boolean,
    default: false,
  },
  navigation: {
    type: Boolean,
    default: true,
  },
  home: {
    type: Boolean,
    default: true,
  },
});

const state = reactive({
  deviceType: route.params.deviceType,
  navigation: [
    {
      title: "振动分析与异常检测",
      url: "/vibration/" + route.params.deviceType,
      icon: "/images/navigation/icon1.png",
    },
    {
      title: "失速预测与分析",
      url: "/prediction/" + route.params.deviceType,
      icon: "/images/navigation/icon2.png",
    },
    {
      title: "预防性维护",
      url: "/preventive/" + route.params.deviceType,
      icon: "/images/navigation/icon3.png",
    },
    {
      title: "设备概述",
      url: "/equipment/" + route.params.deviceType,
      icon: "/images/navigation/icon4.png",
    },
    {
      title: "可用性分析",
      url: "/availability/" + route.params.deviceType,
      icon: "/images/navigation/icon5.png",
    },
    {
      title: "能耗分析",
      url: "/energy/" + route.params.deviceType,
      icon: "/images/navigation/icon6.png",
    },
    {
      title: "报告汇总",
      titleC: "报告分析与集成",
      url: "/analysis/" + route.params.deviceType,
      icon: "/images/navigation/icon7.png",
    },
    {
      title: "帮助",
      titleC: "使用说明",
      url: "/help/" + route.params.deviceType,
      icon: "/images/navigation/icon8.png",
    },
  ],
  recommenOpen: false,
  confirmLoading: false,
  recommenValue: ''
});

const getNavigation = (url) => {
  return route.path === url;
};

const handleRouter = (url) => {
  router.push(url);
};

const getNavigationTitle = () => {
  const items = state.navigation.find((items) => items.url === route.path);
  if (items) {
    return items.titleC || items.title;
  } else {
    return "";
  }
};

//更改state状态
const setState = (props, fn) => {
  try {
    for (let key in props) {
      state[key] = props[key];
    }
    nextTick(() => {
      fn && fn();
    });
  } catch (err) {
    console.error(err);
  }
};

const handleRecommendationOk = () => {
  document.getElementById('recommendation').innerHTML = state.recommenValue
  setState({
    recommenOpen: false,
    recommenValue: '',
    confirmLoading: false
  })
}


</script>
<template>
  <div class="container-header">
    <Modal v-model:open="state.recommenOpen" title="修改建议" :confirm-loading="state.confirmLoading"
      @ok="handleRecommendationOk">
      <Textarea v-model:value="state.recommenValue" placeholder="请输入建议内容" :rows="4"></Textarea>
    </Modal>
    <div class="space-between" style="align-items: start">
      <img class="container-header-logo pointer" src="/images/logo.png" />
      <div class="flex-items container-header-right">
        <div class="align-end">
          <!-- <img class="container-header-right-install pointer" @click="state.recommenOpen = true"
            src="/images/install.png" /> -->
          <img class="container-header-right-home pointer" v-if="home" @click="handleRouter('/welcome')" src="/images/home.png" />
        </div>
        <div class="flex-items container-header-right-border" v-if="home"></div>
        <img class="container-header-right-user pointer" src="/images/user.png" />
      </div>
    </div>
    <div class="container-titleContent">
      <div class="container-titleContent-row space-between">
        <div class="container-titleContent-row-left flex-items pointer">
          <img @click=" handleRouter('/')" src="/images/back.png" v-if="props.back" />
          <div class="container-titleContent-row-title">
            {{ getNavigationTitle() }}
          </div>
          <slot name="header-block"> </slot>
        </div>
        <slot name="header-right"> </slot>
        <TimeBlock v-if="props.timeShow" />
      </div>
    </div>
    <div class="headerNavigation flex-center" v-if="props.navigation">
      <div v-for="(items, index) in state.navigation" @click="handleRouter(items.url)"
        class="headerNavigation-row flex-items pointer animate__animated" :key="index"
        :class="{ 'headerNavigation-action animate__pulse': getNavigation(items.url) }">
        <img :src="items.icon" />
        <div>{{ items.title }}</div>
      </div>
    </div>
    <slot name="content-block"></slot>
  </div>
</template>

<style lang="less" scoped>
.container {
  &-header {
    width: 100%;
    height: 28%;
    background: url(/images/block_bg.png) no-repeat;
    background-size: 100% 100%;
    position: relative;

    &-logo {
      width: 205px;
      height: 97px;
    }

    &-right {
      margin-top: 15px;
      margin-right: 24px;

      &-border {
        width: 1px;
        height: 16px;
        background-color: rgba(255, 255, 255, 0.63);
        margin: 0 16px;
      }

      &-install {
        width: 22px;
        height: 22px;
        margin-right: 10px;
      }

      &-home {
        width: 24px;
        height: 24px;
      }

      &-user {
        width: 34px;
        height: 34px;
      }
    }
  }

  &-titleContent {
    width: 100%;
    position: absolute;
    left: 0;
    top: 50%;
    padding: 0 30px;
    transform: translateY(-50%);

    &-row {
      &-left {
        &>img {
          width: 36px;
          height: 36px;
        }
      }

      &-title {
        font-weight: bold;
        font-size: 28px;
        color: #ffffff;
        margin: 0 30px 0 5px;
      }
    }
  }

  .headerNavigation {
    position: absolute;
    left: 50%;
    top: 7px;
    transform: translateX(-50%);
    width: 80%;

    &-action {
      background: rgba(5, 70, 102, 0.44);
      border-radius: 6px 6px 6px 6px;

      div {
        color: #ffffff;
      }
    }

    &-row {
      padding: 10px 26px;

      margin-right: 2px;

      img {
        width: 18px;
        height: 18px;
        margin-right: 10px;
      }

      div {
        font-weight: 400;
        font-size: 20px;
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
}
</style>
