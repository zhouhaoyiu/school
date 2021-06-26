<!--  -->
<template>
    <div class='le-steps'>
        <div class="le-steps-body">
            <div class="steps-line-box">
                <div class="steps-line">

                </div>
            </div>
            <div class="step-item" v-for="v in stepsCul" :key="v.index" :class="{'active': v.active}">
                <div class="step-item-body">
                    <div class="step-item-a">
                        <div class="step-content">
                            <div class="step-content-body">
                                <span class="txt">{{v.index}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="step-item-b">
                        <span class="txt">{{$t(v.name)}}</span>
                    </div>
                </div>
            </div>
            <!-- <div class="step-item active">
                <div class="step-item-body">
                    <div class="step-item-a">
                        <div class="step-content">
                            <div class="step-content-body">
                                <span class="txt">2</span>
                            </div>
                        </div>
                    </div>
                    <div class="step-item-b">
                        <span class="txt">{{$t('选择实名身份')}}</span>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
    export default {
        name: 'leSteps',
        props: {
            steps: Array,
            active: Number
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
        computed: {
            stepsCul(){
                let list = this.GLOBAL.deepCopy(this.steps) || []
                for(let i in list){
                    if(list[i].index === undefined) list[i].index = 1 + i
                    if(this.active >= list[i].index) list[i].active = true
                }
                return list
            },
        },
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
    .le-steps{
        @stepLabelSize: 2rem;
        @stepLabelSizePadding: 0.5rem;
        @stepLabelMargin: 0.7rem;
        @stepItemSize: 7rem;
        @stepItemPadding: 1.5rem;
        @boxPadding: calc(@stepItemSize / 2 - @stepLabelSize / 2 - @stepLabelSizePadding);
        .le-steps-body{
            display: flex;
            position: relative;
            padding: 0px @boxPadding;
            width: calc(@boxPadding * 2 + 21rem);
            margin: 0px auto;
            .steps-line-box{
                position: absolute;
                top: 0px;
                left: 0px;
                width: 100%;
                margin: auto;
                height: @stepLabelSize;
                display: flex;
                align-items: center;
                z-index: 1;
                .steps-line{
                    height: 2px;
                    width: 100%;
                    background: #B5B5B5;
                }
            }
            // .step-item:last-child{
            //     width: calc(@stepItemSize * 1.5);
            //     .step-item-body{
            //         .step-item-a{
            //             justify-content: center;
            //         }
            //     }
            // }
            .step-item.active{
                .step-item-body{
                    .step-item-a{
                        .step-content{
                            .step-content-body{
                                background: #4C72B1;
                            }
                        }
                    }
                    .step-item-b{
                        color: #4C72B1;
                    }
                }
            }
            .step-item{
                z-index: 2;
                width: @stepItemSize;
                // padding: 0px @stepItemPadding;
                text-align: center;
                .step-item-body{
                    .step-item-a{
                        display: flex;
                        // justify-content: flex-end;
                        justify-content: center;
                        align-items: center;
                        .step-content{
                            padding: 0px @stepLabelSizePadding;
                            background: @engineUsePageBcg;
                            .step-content-body{
                                width: @stepLabelSize;
                                height: @stepLabelSize;
                                // margin: 0px @stepLabelMargin; 
                                border-radius: 50%;
                                background: #B3B3B3;
                                color: #fff;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }
                        }
                    }
                    .step-item-b{
                        margin-top: 0.5rem;
                    }
                }
            }
        }
    }
</style>