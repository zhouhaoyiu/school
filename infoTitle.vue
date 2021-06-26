<!--  -->
<template>
    <div class='info-title'>
        <div class="info-title-body">
            <span class="txt" v-if="!define">{{$t(title)}}</span>
            <div class="title-define-box" v-if="define">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        props: {
            title: String,
            define: Boolean
        },
        data() {
            return {

            };
        },
        methods: {

        },
        created() {

        },
        components: {
        },
        computed: {},
        watch: {},
        mounted() {},
        beforeCreate() {}, //生命周期 - 创建之前
        beforeMount() {}, //生命周期 - 挂载之前
        beforeUpdate() {}, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        beforeDestroy() {}, //生命周期 - 销毁之前
        destroyed() {}, //生命周期 - 销毁完成
        activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>
<style lang='less' >
    .info-title{
        text-align: left;
        width: 100%;
        .info-title-body{
            padding: 0.5rem 0px;
            border-bottom: 0.1rem solid  #C6C6C6;
        }
    }
</style>