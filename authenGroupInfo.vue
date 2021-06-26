<!--  -->
<template>
    <div class='authen-group-info'>
        <div class="group-info-body">
            <div class="info-title">
                <h1></h1>
            </div>
            <div class="info-content">
                <table class="content-body">
                    <tr>
                        <td class="t-title">
                            <span class="txt">{{$t('老师')}}（{{teacherList.length}}）</span>
                        </td>
                        <td>
                            <ul class="list-body">
                                <li class="user-item teacher" v-for="v in teacherList" :key="v.username">
                                    <div class="user-item-body">
                                        <span class="txt name">{{v.realName}}</span>
                                        <span class="txt fun">查看身份证</span>
                                    </div>
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td class="t-title">
                            <span class="txt">{{$t('学生')}}（{{studentList.length}}）</span>
                        </td>
                        <td>
                            <ul class="list-body">
                                <li class="user-item student" v-for="v in studentList" :key="v.username">
                                    <div class="user-item-body">
                                        <span class="txt name">{{v.realName}}</span>
                                    </div>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'authenGroupInfo',
        props: {
            userGroup: Array,
            userStudent: Array,
            userTeacher: Array
        },
        data() {
            return {
                teacherKey: 1,
                studentKey: 2,
                adminKey: 0,
                schoolData: null,
                memberList: [],
                schoolCode: this.$route.params.schoolCode
            };
        },
        // 0 -- 管理员，1 -- 老师， 2 -- 学生
        methods: {
            async pageInit(){
                this.$emit('userGroupUpdate')                
                await this.groupInfoInit()
            },
            async groupInfoInit(){
                this.schoolData = null
                let res = await this.GLOBAL.getSchoolMember(this.schoolCode)
                console.log(res)
                if(res && res.code == 0){
                    let data = res.data || []
                    this.memberList = data
                }
            },
            async accountInit(){

            },
        },
        created() {

        },
        components: {
        },
        computed: {
            teacherList(){
                let list = this.memberList
                let rd = []
                for(let i in list){
                    if(list[i].schoolRole == this.teacherKey){
                        rd.push(list[i])
                    }
                }
                return rd
            },
            studentList(){
                let list = this.memberList
                let rd = []
                for(let i in list){
                    if(list[i].schoolRole == this.studentKey){
                        rd.push(list[i])
                    }
                }
                return rd
            },
            schoolDataCul(){
                return this.schoolData || {}
            },
        },
        watch: {
            schoolDataCul: {
                handler(val){
                    if(val && Object.keys(val).length){
                        console.log(val)
                        this.$emit('update', {
                            schoolName: val.name
                        })
                    }
                },
                deep: true,
                immediate: true
            }
        },
        mounted() {
            this.pageInit()
        },
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
    .authen-group-info{
        .group-info-body{
            .info-content{
                padding: 2rem 0px;
                .content-body{
                    white-space: nowrap;
                    td{
                        vertical-align: top;
                        padding: 0.5rem 0px;
                    }
                    td.t-title{
                        padding-top: 0.9rem;
                    }
                    tr{
                        padding: 0.5rem 0px;
                    }
                    .list-body{
                        overflow: hidden;
                        .user-item.teacher{
                             .user-item-body{
                                min-width: 6rem;
                            }
                        }
                        .user-item.student{
                             .user-item-body{
                                min-width: 3rem;
                            }
                        }
                        .user-item{
                            float: left;
                            display: flex;
                            align-items: flex-end;
                            padding: 0.25rem;
                            .user-item-body{
                                white-space: nowrap;
                                padding: 0.2rem 0px;
                                border-radius: 0.15rem;
                                background: #EEEEEE;
                                .txt.fun{
                                    margin-left: 0.2rem;
                                    color: #6C6C6C;
                                    font-size: 0.5rem;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>