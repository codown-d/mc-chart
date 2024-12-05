<script setup>
import { onMounted, reactive, withDefaults } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Modal, Textarea } from 'ant-design-vue'

const state = reactive({
  recommenOpen: false,
  confirmLoading: false,
  recommenValue: ''
});

// 使用 withDefaults 来设置默认值
const props = defineProps({
    text1: {
        type: String,
        default: false
    },
    text2: {
        type: String,
        default: false
    },
    text3: {
        type: String,
        default: false
    },
    text4: {
        type: String,
        default: false
    },
});


</script>
<template>
    <div class="container-content-blockRow-left-block2 padding10">
        <pangge-Title text="专家建议">
            <template v-slot:content-right>
                <img class="container-content-blockRow-left-block2-img" src="/images/vibraction.png" />
            </template>
        </pangge-Title>
        <div class="container-content-blockRow-left-block2-card padding10">
            <div class="font14 flex-items"><span></span>分析结论</div>
            <div class="borderRadius10 backgroundColorF padding10">
                <div class="defaultColor font16"><p v-html="props.text1"></p><span><p v-html="props.text2"></p></span></div>
                <div class="font16 colorV"><p v-html="props.text3"></p></div>
            </div>
        </div>
        <div class="container-content-blockRow-left-block2-card padding10">
            <div class="font14 flex-items"><span></span>建议
                <img class="container-content-blockRow-left-block2-install pointer" @click="state.recommenOpen = true"
                src="/images/device-icon.png" />
            </div>
            <Modal v-model:open="state.recommenOpen" title="修改建议" :confirm-loading="state.confirmLoading"
              @ok="handleRecommendationOk">
              <Textarea v-model:value="state.recommenValue" placeholder="请输入建议内容" :rows="4"></Textarea>
            </Modal>
            <div class="borderRadius10 backgroundColorF padding10 font16 colorV" id="recommendation">
                <p v-html="props.text4"></p>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
    .container-content-blockRow-left-block2 {
        width: 100%;
        height: 70%;
        background: #FFFFFF;
        // margin-top: 24px;
        display: flex;
        flex-direction: column;

        &-install {
          width: 22px;
          height: 22px;
          margin-left: 10px;
        }

        &-img {
            width: 37px;
            height: 37px;
            margin-top: -8px
        }


        &-card:nth-child(3) {
            .font14 span {
                background: linear-gradient(153deg, #FF9F56 0%, rgba(255, 159, 86, 0) 100%) !important;
            }
        }

        &-card {
            background: #F6F9FB;
            border-radius: 10px 10px 10px 10px;
            flex: 1;
            display: flex;
            flex-direction: column;

            .font14 {
                padding-left: 10px;
                position: relative;
            }

            .font14 span {
                width: 24px;
                height: 24px;
                border-radius: 24px;
                background: linear-gradient(153deg, #0087D3 0%, rgba(0, 135, 211, 0) 100%);
                display: block;
                position: absolute;
                left: 5px;
            }



            .backgroundColorF {
                margin-top: 10px;
                flex: 1;
            }

            .defaultColor {
                margin-bottom: 10px;
            }
        }

        &-card:nth-child(2) {
            margin-bottom: 20px;
        }
    }
</style>
