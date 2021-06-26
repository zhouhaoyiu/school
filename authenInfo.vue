<!--  -->
<template>
    <div class='authen-info'>
        <div class="authen-info-body">
            <div class="info-title">
                <infoTitle v-if="titleInfoCul" ref="infoTitle" :title.sync="titleInfoCul.title" :define="true">
                    <template v-slot:content>
                        <div class="info-title-define">
                            <authenSubTitle :title="titleInfoCul.title" :icon.sync="titleInfoCul.icon" :underLine="false"></authenSubTitle>
                            <!-- <router-link v-if="titleInfoCul.subFun" :to.sync="titleInfoCul.subLink" class="sub-link">
                                <span class="txt link-color">{{$t(titleInfoCul.subFun)}}</span>
                            </router-link> -->
                        </div>
                    </template>
                </infoTitle>
            </div>
            <div class="info-content">
                <router-view ref="pageNow"
                @update="update"
                @userGroupUpdate="userGroupUpdate"
                @paramsSet="paramsSet"
                :userGroup.sync="userGroup"
                :userStudent.sync="userStudent"
                :userTeacher.sync="userTeacher"
                 />
            </div>
        </div>
        
    </div>
</template>

<script>
    import infoTitle from './infoTitle.vue'
    import authenSubTitle from './authenSubTitle.vue'

    export default {
        name: 'authenInfo',
        props: {
            userGroup: Array,
            userStudent: Array,
            userTeacher: Array
        },
        data() {
            return {
                infoTitleSet: '',
                pathNow:  this.$route.path,
                schoolName: null,
                listPath: {
                    '/info/personal':  {
                        title: '身份信息',
                        icon: null,
                        // subFun: '修改',
                        // subLink: this.GLOBAL.pageList.authenticate.personalCert
                    },
                    '/info/school': {
                        title: '身份信息',
                        icon: `${this.GLOBAL.assetsUrl}/img/ce5.png`
                    },
                }
            };
        },
        methods: {
            update(options){
                for(let i in options){
                    this[i] = options[i]
                    this.$forceUpdate()
                }
            },
            userGroupUpdate(){
                this.$emit('userGroupUpdate')
            },
            paramsSet(){

            },
        },
        created() {

        },
        components: {
            infoTitle,
            authenSubTitle
        },
        computed: {
            titleIcon(){
                let path
                return `${this.GLOBAL.assetsUrl}/img/ce5.png`
            },
            modifyLink(){
                let list = [
                    {
                        'title':  '修改',
                        'path': '/info/personal',
                        link: this.GLOBAL.pageList.authenticate.personalCert
                    }
                ]
                let f = false
                for(let i in list){
                    if(this.pathNow.indexOf(list[i].path) > -1){
                        f = list[i]
                        break
                    }
                }
                if(this.schoolName){
                    f.title = this.schoolName
                }
                return f
            },
            schoolNameCul(){
                return this.schoolName || ''
            },
            infoTitle(){
                let path = this.pathNow
                let list = {
                    '/info/personal':  '身份信息',
                    '/info/school':  '身份信息',
                }
                return '身份信息'
            },
            titleInfoCul(){
                let list = this.listPath
                let f = false
                for(let i in list){
                    if(this.pathNow.indexOf(i) > -1){
                        f = list[i]
                        break
                    }
                }
                if(this.schoolName){
                    f.title = this.schoolName
                }
                return f
            },
            defineTitle(){
                let list = [
                    '/info/personal',
                    '/info/school'
                ]
                let f = false
                for(let i in list){
                    if(this.pathNow.indexOf(list[i]) > -1){
                        f = true
                        break
                    }
                }
                return f
                // return this.pathNow.indexOf('/info/school') > -1
            },
        },
        watch: {
            $route: {
                handler(){
                    this.pathNow = this.$route.path
                    this.schoolName = null
                    this.infoTitleSet = null
                },
                immediate: true,
                deep: true
            }
        },
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
    .authen-info{
        .authen-info-body{
            width: 60%;
            margin: 0px auto;
        }
        .info-title-define{
            display: flex;
            align-items: center;
            .authen-sub-title{
                width: auto;
                white-space: nowrap;
            }
            .sub-link{
                margin-left: 0.5rem;
            }
        }
    }
</style>