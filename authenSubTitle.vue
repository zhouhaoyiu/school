<!--  -->
<template>
    <div class='authen-sub-title'>
        <div class="authen-sub-title-content" :class="[{'under-line': underLine}, positionCul]">
            <img :src="iconCul" class="group-icon" v-if="iconCul">
            <span class="txt">{{$t(titleCul)}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        props: {
            icon: String,
            title: String,
            underLine: Boolean,
            position: String
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
            positionCul(){
                return this.position || 'left'
            },
            iconCul(){
                return this.icon || ''
                // if(!this.icon) return `${this.GLOBAL.assetsUrl}/img/ce5.png`
            },
            titleCul(){
                return this.title || ''
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
    .authen-sub-title{
        width: 100%;
        .authen-sub-title-content.under-line{
            border-bottom: 2px solid #333;
        }
        .authen-sub-title-content.left{
            justify-content: flex-stert;
        }
        .authen-sub-title-content.right{
            justify-content: flex-end;
        }
        .authen-sub-title-content{
            display: flex;
            align-items: flex-end;
            padding-bottom: 0.1rem;
            .group-icon{
                width: 1.5rem;
            }
            .txt{
                font-size: 0.8rem;
                margin-left: 0.3rem;
            }
        }
    }
    
</style>