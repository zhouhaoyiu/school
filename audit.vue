<!--  -->
<template>
    <div class='audit-page'>
        <div class="audit-body">
            <div class="audit-body-content">
                <div class="audit-icon">
                    <img :src="`${GLOBAL.assetsUrl}/img/ce7.png`">
                </div>
                <div class="audit-txt">
                    <div class="title">
                        <span class="txt">{{$t('审核中')}}......</span>
                    </div>
                    <div class="content">
                        <span class="txt">{{$t('资料已提交')}}，{{$t('请耐心等待审核结果')}}</span>
                    </div>
                </div>
            </div>
            <div class="audit-extend">
                <slot name="content"></slot>
            </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        name: 'auditInfo',
        props: {},
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
    .audit-page{
        background: #EAEAEA;
        padding: 1.5rem 0px;
        text-align: left;
        display: flex;
        justify-content: center;
        .audit-body{
            width: 100%;
            .audit-body-content{
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .audit-extend{
                padding: 1rem 0.5rem 0px;
            }
            .audit-icon{
                margin-right: 1rem;
                img{
                    width: 3rem;
                    float: left;
                }
            }
            .audit-txt{
                .title{
                    margin-bottom: 0.5rem;
                    .txt{
                        font-size: 1.2rem;
                    }
                }
            }
        }
    }
</style>