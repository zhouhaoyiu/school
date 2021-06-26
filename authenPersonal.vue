<!--  -->
<template>
    <div class="authen-personal">
        <div class="personal-body">
            <div class="personal-item info">
                <table class="info-table">
                    <tr>
                        <td class="info-title">
                            <span class="txt">{{ $t("真实姓名") }}：</span>
                        </td>
                        <td class="info-content">
                            <span class="txt">{{ realName }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="info-title">
                            <span class="txt">{{ $t("围棋水平") }}：</span>
                        </td>
                        <td class="info-content">
                            <span class="txt">{{ $t(userLevel.name) }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="info-title">
                            <span class="txt">{{ $t("绑定机构") }}：</span>
                        </td>
                        <td class="info-content">
                            <div
                                style="cursor: pointer"
                                class="info-item stu"
                                v-for="v in userStudentCul"
                                :key="v.code"
                                @click="goStudent(v.schoolId)"
                            >
                                <groupItem
                                    ref="groupLi"
                                    :name.sync="v.schoolName"
                                    :code.sync="v.schoolCode"
                                    type="student"
                                    :status.sync="v.schoolRole"
                                ></groupItem>
                            </div>
                            <div
                                style="cursor: pointer"
                                class="info-item tea"
                                v-for="(v, i) in userTeacherCul"
                                :key="i"
                                @click="
                                    goTeacher(v.schoolName, v.schoolId, v.schoolRole)
                                "
                            >
                                <groupItem
                                    ref="groupLi"
                                    :name.sync="v.schoolName"
                                    :code.sync="v.schoolCode"
                                    type="teacher"
                                    :status.sync="v.schoolRole"
                                ></groupItem>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="info-title">
                            <span class="txt">{{ $t("我的机构") }}：</span>
                        </td>
                        <td class="info-content">
                            <div
                                class="b"
                                style="margin-bottom: 0.5rem"
                                v-for="(v, i) in userGroupCul"
                                :key="i"
                                @click="
                                    goAdmin(v.schoolName, v.schoolId, v.schoolRole)
                                "
                            >
                                <groupItem
                                    style="cursor: pointer"
                                    ref="groupLi"
                                    :name.sync="v.schoolName"
                                    :code.sync="v.schoolCode"
                                    type="set"
                                ></groupItem>
                            </div>
                        </td>
                    </tr>
                </table>
                <div class="no-cert-box">
                    <!-- <span class="txt">{{$t('您还没有绑定任何机构，')}}</span> -->
                    <router-link
                        :to="GLOBAL.pageList.school.authenticate.select"
                    >
                        <span class="txt link-color">{{ $t("去绑定") }}</span>
                    </router-link>
                </div>
            </div>
            <div class="personal-item apply">
                <!-- <ul class="apply-body">
                    <li class="apply-item">
                        <div class="it content">
                            <div class="content-item label"></div>
                            <p class="content-item">{{$t('机构')}}</p>
                            <p class="content-item">某个围棋机构名字</p>
                            <p class="content-item">{{$t('添加您为老师')}}</p>
                        </div>
                        <div class="it fun">
                            <div class="fun-item">
                                <el-button>
                                    <span class="txt">{{$t('拒绝')}}</span>
                                </el-button>
                            </div>
                            <div class="fun-item">
                                <el-button>
                                    <span class="txt">{{$t('同意')}}</span>
                                </el-button>
                            </div>
                        </div>
                    </li>
                </ul> -->
                <userMessage
                    ref="userMessage"
                    @change="userMessageChange"
                ></userMessage>
            </div>
        </div>
    </div>
</template>

<script>
import infoTitle from './infoTitle.vue'
import groupLi from './groupLi.vue'
import groupItem from './groupItem.vue'
import userMessage from './userMessage.vue'

export default {
    name: 'authenPersonal',
    props: {
        userGroup: Array,
        userStudent: Array,
        userTeacher: Array
    },
    data() {
        return {
            userCert: {}
        };
    },
    methods: {
        async pageInit() {
            await this.userInfoInit()
        },
        async userInfoInit() {
            let res = await this.GLOBAL.userCertInfo()
            if (res && res.code == 0 && res.data) this.userCert = this.GLOBAL.deepCopy(res.data)
            console.log(res)
            return res
        },
        userMessageChange() {
            this.$emit('userGroupUpdate')
        },
        goStudent(schoolId) {
            this.GLOBAL.gotoSchool_n('studentInfo', null, [], { replaceParams: { params1: schoolId } })
            //
        },
        goTeacher(schoolName, schoolId, schoolRole) {
            // this.$router.push()   
            console.log('goteacher');
            this.GLOBAL.gotoSchool_n('tInfo', null, [], { replaceParams: { params1: schoolId, params2: schoolRole } })
            this.GLOBAL.info.schoolRole = schoolRole
        },
        goAdmin(schoolName, schoolId, schoolRole) {
            console.log('goAdmin')
            if (schoolRole == 10) {
                this.GLOBAL.gotoSchool_n('schoolInfo', null, [], {
                    replaceParams: {
                        params1: schoolId, params2: schoolRole
                    }
                })
            }
            if (schoolRole == 0) {
                this.GLOBAL.gotoSchool_n('applySelect', null, [], {})
            }


        }
    },
    created() {
        this.pageInit()
    },
    components: {
        infoTitle,
        groupLi,
        groupItem,
        userMessage
    },
    computed: {
        noGroup() {
            return !this.userGroupCul.length && !this.userStudent.length && !this.userTeacher.length
        },
        isCert() {
            let userCert = this.userCert
            return Object.keys(userCert).length && userCert.realName
        },
        realName() {
            return this.userCert.realName || ''
        },
        userLevel() {
            let userCert = this.userCert || {}
            let levelNum = userCert.level || null
            if (!levelNum) return ''
            let list = this.GLOBAL.playerLevelList
            let rd = {}
            for (let i in list) {
                if (levelNum == list[i].value) {
                    rd = list[i]
                    break
                }
            }
            return rd
        },
        userGroupCul() {
            let list = this.GLOBAL.info
            let listNew = []
            for (let i in list) {
                if (list[i].schoolRole == 10 || list[i].schoolRole == 0) {
                    listNew.push(list[i])
                }
            }
            return listNew
        },

        userStudentCul() {
            let list = this.GLOBAL.info
            let listNew = []
            for (let i in list) {
                if (list[i].schoolRole == 30) {
                    listNew.push(list[i])
                }
            }
            return listNew
        },
        userTeacherCul() {
            let list = this.GLOBAL.info
            let listNew = []
            for (let i in list) {
                if (list[i].schoolRole == 20) {
                    listNew.push(list[i])
                }
            }
            return listNew
        },
    },
    watch: {},
    mounted() { },
    beforeCreate() { }, //生命周期 - 创建之前
    beforeMount() { }, //生命周期 - 挂载之前
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() { }, //生命周期 - 销毁之前
    destroyed() { }, //生命周期 - 销毁完成
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' >
.authen-personal {
    .personal-body {
        .personal-item {
            margin-top: 1rem;
        }
        // .personal-item:last-child{
        //     margin: 0px;
        // }
        .personal-item.info {
            .info-table {
                text-align: left;
                white-space: nowrap;
                td {
                    padding: 0.2rem 0px;
                    vertical-align: top;
                }
                .info-title {
                    width: auto;
                }
                .info-content {
                    width: 100%;
                    .info-item {
                        margin-bottom: 0.5rem;
                    }
                    .info-item:last-child {
                        margin: 0px;
                    }
                    .group-list {
                        .group-item:last-child {
                            margin: 0px;
                        }
                        .group-item {
                            margin-bottom: 0.5rem;
                            display: flex;
                            align-items: center;
                            .i {
                                margin-right: 0.3rem;
                            }
                            .i:last-child {
                                margin: 0px;
                            }
                            .i-code {
                                display: flex;
                                align-items: center;
                            }
                            .i-opt {
                                display: flex;
                                align-items: center;
                                .item {
                                    margin-right: 0.3rem;
                                    .fun-item {
                                        .fun-icon {
                                            width: 0.9rem;
                                            float: left;
                                        }
                                    }
                                }
                                .item:last-child {
                                    margin: 0px;
                                }
                            }
                        }
                    }
                }
            }
            .no-cert-box {
                margin-top: 2rem;
            }
        }
        .personal-item.apply {
            background: #eaeaea;
        }
        // .personal-item.apply{
        //     text-align: left;
        //     .apply-body{
        //         background: #EAEAEA;
        //         padding: 1rem;
        //         .apply-item{
        //             white-space: nowrap;
        //             display: flex;
        //             .it{
        //                 display: flex;
        //                 align-items: center;
        //             }
        //             .it.content{
        //                 width: 100%;
        //                 .content-item.label{
        //                     width: 0.4rem;
        //                     height: 0.4rem;
        //                     background: #EA0808;
        //                     border-radius: 50%;
        //                     margin-right: 0.5rem;
        //                 }
        //                 .content-item:last-child{
        //                     margin: 0px;
        //                 }
        //                 .content-item{
        //                     margin-right: 0.3rem;
        //                 }
        //             }
        //             .it.fun{
        //                 .fun-item:last-child{
        //                     margin: 0px;
        //                 }
        //                 .fun-item{
        //                     margin-right: 0.3rem;
        //                     .el-button{
        //                         padding: 0px;
        //                         height: 1.3rem;
        //                         width: 3.5rem;
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
    }
}
</style>