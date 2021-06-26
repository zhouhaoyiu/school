<!--  -->
<template>
    <div class='audit-page-box'>
        <div class="authen-teacher-title">
            <!-- :icon.sync="subIcon" -->
            <authenSubTitle :title.sync="subTitle"></authenSubTitle>
        </div>
        <div class="audit-box">
            <!-- <audit ref="audit"></audit> -->
            <div class="audit-content-box">
                <div class="audit-item">
                    <el-card class="box-card card-item" v-if="userGroupCul.length">
                        <h1 class="audit-item-title">{{$t('创建机构')}}</h1>
                        <div class="audit-content-body">
                            <div class="content-item" v-for="v in userGroupCul" :key="v.code">
                                <div class="item-i">
                                    <span class="txt t">{{$t('机构名称：')}}</span>
                                    <p class="txt">{{v.schoolName}}</p>
                                </div>
                                <div class="item-i">
                                    <div class="txt">{{v.certStatus == 0 ? $t('资料审核中') : $t('已通过审核')}}</div>
                                </div>
                            </div>
                        </div>
                    </el-card>
                    <el-card class="box-card card-item" v-if="userTeacherCul.length">
                        <h1 class="audit-item-title">{{$t('认证为老师')}}</h1>
                        <div class="audit-content-body">
                            <div class="content-item" v-for="v in userTeacherCul" :key="v.code">
                                <div class="item-i">
                                    <span class="txt t">{{$t('机构名称：')}}</span>
                                    <p class="txt">{{v.schoolName}}</p>
                                </div>
                                <div class="item-i">
                                    <div class="txt">{{v.verifyStatus == 0 ? $t('资料审核中') : $t('已通过审核')}}</div>
                                </div>
                            </div>
                        </div>
                    </el-card>
                    <el-card class="box-card card-item" v-if="userStudentCul.length">
                        <h1 class="audit-item-title">{{$t('认证为学生')}}</h1>
                        <div class="audit-content-body">
                            <div class="content-item" v-for="v in userStudentCul" :key="v.code">
                                <div class="item-i">
                                    <span class="txt t">{{$t('机构名称：')}}</span>
                                    <p class="txt">{{v.schoolName}}</p>
                                </div>
                                <div class="item-i">
                                    <div class="txt">{{v.verifyStatus == 0 ? $t('资料审核中') : $t('已通过审核')}}</div>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </div>
            </div>
            <div class="quit-box">
                <el-button type="text" @click="quit">
                    <span class="txt">退出</span>
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import authenSubTitle from './authenSubTitle.vue'
    import audit from './audit.vue'

    export default {
        name: 'auditPage',
        props: {
            userGroup: Array,
            userStudent: Array,
            userTeacher: Array
        },
        data() {
            return {
                auditCode: this.$route.params.auditCode,
                auditType: this.$route.params.auditType,
                subTitleList: {
                    'teacher': {icon: `${this.GLOBAL.assetsUrl}/img/ce4_light.png`, title: '认证老师身份'},
                    'student': {icon: `${this.GLOBAL.assetsUrl}/img/ce3_light.png`, title: '认证学生身份信息'},
                    'create': {icon: `${this.GLOBAL.assetsUrl}/img/ce5.png`, title: '创建机构'},
                }
            };
        },
        methods: {
            quit(){
                this.GLOBAL.gotoAuthen('select', 'jumpToPageReplace')
            },
            pageInit(){
                this.userGroupUpdate()
            },
            userGroupUpdate(){
                this.$emit('userGroupUpdate')
            },
        },
        created() {

        },
        components: {
            authenSubTitle,
            audit
        },
        computed: {
            subTitle(){
                return '审核情况'
                let list = this.subTitleList
                if(!list[this.auditType]) return ''
                return list[this.auditType].title
            },
            subIcon(){
                let list = this.subTitleList
                if(!list[this.auditType]) return ''
                return list[this.auditType].icon
            },
            userGroupCul(){
                let data = this.GLOBAL.deepCopy(this.userGroup) || []
                return data
                console.log(data)
                let rd = []
                for(let i in data){
                    if(data[i].certStatus == 0){
                        rd.push(data[i])
                    }
                }
                console.log(rd)
                return rd
            },
            userStudentCul(){
                let data = this.GLOBAL.deepCopy(this.userStudent) || []
                return data
                console.log(data)
                let rd = []
                for(let i in data){
                    if(data[i].certStatus == 0){
                        rd.push(data[i])
                    }
                }
                console.log(rd)
                return rd
            },
            userTeacherCul(){
                let data = this.GLOBAL.deepCopy(this.userTeacher) || []
                return data
                console.log(data)
                let rd = []
                for(let i in data){
                    if(data[i].certStatus == 0){
                        rd.push(data[i])
                    }
                }
                console.log(rd)
                return rd
            },
        },
        watch: {
            userGroupCul: {
                handler(val){
                    console.log(val)
                },
                deep: true,
                immediate: true
            },
            userStudent: {
                handler(val){
                    console.log(val)
                },
                deep: true,
                immediate: true
            },
            userTeacher: {
                handler(val){
                    console.log(val)
                },
                deep: true,
                immediate: true
            },
            $route: {
                handler(){
                    this.auditType = this.$route.params.auditType
                    this.auditCode = this.$route.params.auditCode
                    
                },
                deep: true,
                immediate: true
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
    .audit-page-box{
        .authen-teacher-title{
            margin-bottom: 1rem;
        }
        .audit-content-box{
            .audit-item{
                margin-top: 1rem;
                .el-card__body{
                    padding: 1rem;
                    background: #EAEAEA;
                }
                .audit-item-title{
                    text-align: left;
                }
                .audit-content-body{
                    .content-item{
                        padding: 0.5rem 0px;
                        display: flex;
                        align-items: center;
                        .item-i:last-child{
                            margin: 0px;
                        }
                        .item-i{
                            margin-right: 0.5rem;
                            display: flex;
                            align-items: center;
                        }
                    }
                }
                .card-item{
                    margin-bottom: 1rem;
                }
                .card-item:last-child{
                    margin: 0px;
                }
            }
        }
    }
</style>