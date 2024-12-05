<script setup>

</script>
<template>
    <div class="container-content-blockRow-left-block1 padding10"  >
   <div class="image"></div>
   <div class="text" >  <div class="text-top" >1810.05</div>  <div class="text-bottom" >累计运行时间</div></div>

    </div>
</template>

<style lang="less" scoped>
.container-content-blockRow-left-block1 {
    width: 100%;
    height: 100%;
    background: #fff;
    align-items: center;
display: flex;
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
.image{
    width: 60px;
    height: 60px;
    background-image: url('/images/detach/停机服务器 3.png');
              background-size: 100% 100%;
}
.text{
    flex: 1;
    height: 55%;
    padding-left: 20px;

    .text-top{
        font-size: 20px;
    font-weight: 700;
    color: #0087d3;
    margin-bottom: 18px;
    }
   .text-bottom {color: #ccc;}
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
