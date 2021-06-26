<!--  -->
<template>
    <div class='group-li'>
        <ul class="group-li-body">
            <li class="group-item">
                <div class="i i-name">
                    <p class="txt">{{name}}</p>
                </div>
                <div class="i i-code">
                    <p class="txt">{{`(${$t('机构代码')}：${code})`}}</p>
                </div>
                <div class="i i-opt">
                    <div class="le-tag authen">
                        <div class="le-tag-body ed">
                            <img :src="`${GLOBAL.assetsUrl}/img/ce4.png`" class="tag-icon">
                            <span class="tag-txt">老师</span>
                        </div>
                    </div>
                </div>
            </li>
            <!-- <li class="group-item">
                <div class="i i-name">
                    <p class="txt">某个围棋机构名字</p>
                </div>
                <div class="i i-code">
                    <p class="txt">(机构代码：111111)</p>
                </div>
                <div class="i i-opt">
                    <div class="le-tag authen">
                        <div class="le-tag-body ing">
                            <img :src="`${GLOBAL.assetsUrl}/img/ce3.png`" class="tag-icon">
                            <span class="tag-txt">学生</span>
                        </div>
                    </div>
                </div>
            </li> -->
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'groupLi',
        props: {
            name: String,
            code: Number,
            type: String,
            status: Boolean
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
    .group-li{
        .group-li-body{
            .group-item:last-child{
                margin: 0px;
            }
            .group-item{
                margin-bottom: 0.5rem;
                display: flex;
                align-items: center;
                .i{
                    margin-right: 0.3rem;
                }
                .i:last-child{
                    margin: 0px;
                }
                .i-code{
                    display: flex;
                    align-items: center;
                }
                .i-opt{
                    display: flex;
                    align-items: center;
                    .item{
                        margin-right: 0.3rem;
                        .fun-item{
                            .fun-icon{
                                width: 0.9rem;
                                float: left;
                            }
                        }
                    }
                    .item:last-child{
                        margin: 0px;
                    }
                }
            }
        }
    }
    
</style>