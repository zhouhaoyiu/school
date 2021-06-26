<!--  -->
<template>
    <div class='group-item-box'>
        <p class="txt name">{{name}}</p>
        <p class="txt code">{{`（${$t('机构代码')}:${code}）`}}</p>
        <div class="group-fun">
            <!-- <div class="le-tag authen" v-for="(s, j) in funLabel" :key="j">
                <div class="le-tag-body ed">
                    <img :src="`${GLOBAL.assetsUrl}/img/${s.icon}.png`" class="tag-icon">
                    <span class="tag-txt">{{$t(s.name)}}</span>
                </div>
            </div> -->
            <div class="admin-box" v-if="setShow">
                <!-- <img :src="`${GLOBAL.assetsUrl}/img/ce8.png`" @click="gotoSchool" > -->
            </div>
            <div class="i i-opt" v-if="!setShow && typeTxt">
                <div class="le-tag authen">
                    <div class="le-tag-body" :class="{'ing': statusCul != 1, 'ed': statusCul == 1}">
                        <img :src="`${GLOBAL.assetsUrl}/img/${typeTxt.icon}.png`" class="tag-icon" >
                        <span class="tag-txt">{{typeTxt.name}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        props: {
            name: String,
            code: String,
            // role: Array,
            type: String,
            status: Number,
        },
        data() {
            return {
                roleData: {
                    'teacher': {
                        icon: `ce4`,
                        name: '老师'
                    },
                    'student': {
                        icon: 'ce3',
                        name: '学生'
                    }
                }
            };
        },
        methods: {
            gotoSchool(){
                if(!this.code || isNaN(Number(this.code))) return
                let returnPath = this.$route.path
                returnPath = returnPath.split('/')
                returnPath = returnPath.join('-')
                returnPath = btoa(encodeURIComponent(returnPath))
                console.log(returnPath)
                this.GLOBAL.gotoAuthen('school', null, [this.code, returnPath])
            },
            
        },
        created() {
//
        },
        components: {
        },
        computed: {
            funLabel(){
                let role = this.role || []
                let data = []
                for(let i in role){
                    if(this.roleData[role[i]]){
                        data.push(this.roleData[role[i]])
                    }
                }
                return data
            },
            setShow(){
                return this.type === 'set'
            },
            typeTxt(){
                let txt = '', icon = ''
                if(this.type == '0'){
                    txt = '老师'
                    icon = 'ce4'
                }
                if(this.type == '2'){
                    txt = '学生'
                    icon = 'ce3'
                }
                let type = this.type
                let roleData = this.roleData
                if(!roleData[type]) return null
                return roleData[type]
            },
            statusCul(){
                console.log(this.status)
                return this.status
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
    .group-item-box{
        display: flex;
        align-items: center;
        .group-fun{
            .admin-box{
                img{
                    cursor: pointer;
                    width: 0.9rem;
                    float: left;
                }
            }
        }
    }
</style>