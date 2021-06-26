<!--  -->
<template>
    <div class='authen-step-box'>
        <div class="user-group">
            <div class="user-group-body" v-if="showUserGroup">
                <div class="group-title">
                    <span class="txt">我的机构：</span>
                </div>
                <ul class="group-content">
                    <li class="group-item" v-for="(v, i) in userGroupCul" :key="i">
                        <groupItem :name.sync="v.schoolName" :code.sync="v.code" type="set" :status.sync="v.certStatus"></groupItem>
                    </li>
                </ul>
            </div>
        </div>
        <div class="authen-step-box-con">
            <div class="authen-step-body" :class="{'audit': auditPage}">
                <div class="step-item step-com" v-if="!stepHide">
                    <leSteps ref="leSteps" :steps.sync="authenSteps.data" :active.sync="stepValue"></leSteps>
                </div>
                <div class="step-item content">
                    <router-view ref="pageNow"
                    :userGroup.sync="userGroup"
                    :userStudent.sync="userStudent"
                    :userTeacher.sync="userTeacher"
                    @userGroupUpdate="userGroupUpdate"
                     />
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
    import leSteps from './leSteps.vue'    
    import groupItem from './groupItem.vue'

    export default {
        name: 'authenStepBox',
        props: {
            path: String,
            userGroup: Array,
            userStudent: Array,
            userTeacher: Array
        },
        data() {
            return {
                auditType: this.$route.params.auditType,
                authenSteps: {
                    data: [
                        {index: 1, name: '选择实名身份'},
                        {index: 2, name: '填写验证信息'},
                        {index: 3, name: '提交审核'},
                    ],
                    hidePath: {
                        'create': true,
                    },
                    value: 1,
                },
            };
        },
        methods: {
            userGroupUpdate(){
                this.$emit('userGroupUpdate')
            },
             appClick(e){
                if(this.$refs['pageNow'] && this.$refs['pageNow'].appClick) this.$refs['pageNow'].appClick(e)
            },
        },
        created() {

        },
        components: {
            leSteps,
            groupItem,
        },
        computed: {
            showUserGroup(){
                if(!this.userGroupCul || !this.userGroupCul.length) return false
                let list = [
                    '/engine/school/authenticate/set/select'
                ]
                let f = false
                for(let i in list){
                    if(this.path.indexOf(list[i]) > -1){
                        f = true
                        break
                    }
                }
                return f
            },
            userGroupCul(){
                return this.userGroup || []
            },
            stepHide(){
                let type = this.auditType
                let list = this.authenSteps.hidePath
                let f = false
                for(let i in list){
                    if(i == type){
                        f = true
                        break
                    }
                }
                return f
            },
            auditPage(){
                let path = this.path
                return path.indexOf('/engine/school/authenticate/set/audit') > -1
            },
            stepValue(){
                console.log(this.path)
                let path = this.path
                let list = [
                    {path: '/engine/school/authenticate/set/select', step: 1},
                    {path: '/engine/school/authenticate/set/teacher', step: 2},
                    {path: '/engine/school/authenticate/set/student', step: 2},
                    {path: '/engine/school/authenticate/set/audit', step: 3},
                ]
                let val = null
                for(let i in list){
                    if(path.indexOf(list[i].path) > -1){
                        val = list[i].step
                        break
                    }
                }
                console.log(val)
                return val
            },
        },
        watch: {
            $route: {
                handler(){
                    this.auditType = this.$route.params.auditType
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
    .authen-step-box{
        @itemSizeWidth: 11rem;
        @itemSizeHeight: 9rem;
        @itemMargin: 1rem;
        // display: flex;
        
        .authen-step-box-con{
            display: flex;
            justify-content: center;
        }
        .authen-step-body.audit{
            width: 60%;
        }
        .authen-step-body{
            width: 100%;
            padding: 0rem 0px 1rem;
            .step-item.content{
                
                margin-top: 2rem;
            } 
        }
        .user-group{
            width: 80%;
            margin: 0px auto 1rem;
            .user-group-body{
                display: flex;
                white-space: nowrap;
                .group-title{
                }
                .group-content{
                    .group-item{
                        display: flex;
                        align-items: center;
                    }
                }
            }
        }
        
    }
</style>