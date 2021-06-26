<!--  -->
<template>
    <div class="authen-teacher stu">
        <div class="authen-student-body">
            <div class="authen-teacher-title">
                <authenSubTitle
                    title="认证学生身份信息"
                    :icon="`${GLOBAL.assetsUrl}/img/ce3_light.png`"
                ></authenSubTitle>
            </div>
            <div class="authen-teacher-content">
                <div class="item-table">
                    <div class="authen-error-box">
                        <span class="txt recharge-button">{{
                            $t(errorTxt)
                        }}</span>
                    </div>
                    <table class="input-table">
                        <tr>
                            <td class="info-tit">
                                <span class="txt necessary"
                                    >{{ $t("真实姓名") }}：</span
                                >
                            </td>
                            <td
                                class="info-input real-name"
                                :class="{ error: info.realName.error }"
                            >
                                <div class="real-name-box">
                                    <el-input
                                        v-if="!haveInfor"
                                        v-model="info.realName.value"
                                    ></el-input>
                                    <span class="txt" v-if="haveInfor">{{
                                        info.realName.value
                                    }}</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="info-tit">
                                <span class="txt necessary"
                                    >{{ $t("围棋水平") }}：</span
                                >
                            </td>
                            <td
                                class="info-input"
                                :class="{ error: info.level.error }"
                            >
                                <el-select
                                    v-if="!haveInfor"
                                    class="it-select"
                                    v-model="info.level.value"
                                    :popper-append-to-body="false"
                                    :popper-class="`lives-select-options`"
                                    :placeholder="$t('请选择')"
                                >
                                    <el-option
                                        v-for="item in info.level.data"
                                        :key="item.value"
                                        :label="$t(item.name)"
                                        :value="$t(item.value)"
                                    >
                                        <span>{{ $t(item.name) }}</span>
                                    </el-option>
                                </el-select>
                                <span v-if="haveInfor" class="txt">{{
                                    $t(userLevel.name)
                                }}</span>
                            </td>
                        </tr>

                        <tr v-if="haveInfor">
                            <td class="modify-info" colspan="2">
                                <router-link
                                    :to="
                                        GLOBAL.pageList.authenticate
                                            .personalCert
                                    "
                                >
                                    <span class="txt normal">{{
                                        $t("点此")
                                    }}</span>
                                    <span class="txt link-color">{{
                                        $t("修改")
                                    }}</span>
                                    <span class="txt normal">{{
                                        $t("个人信息")
                                    }}</span>
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <td class="info-tit">
                                <span class="txt">{{ $t("手机号") }}：</span>
                            </td>
                            <td
                                class="info-input"
                                :class="{ error: info.phone.error }"
                            >
                                <div class="phone-box">
                                    <el-input
                                        v-model="info.phone.value"
                                    ></el-input>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="info-tit">
                                <span class="txt">{{ $t("邮箱") }}：</span>
                            </td>
                            <td
                                class="info-input"
                                :class="{ error: info.email.error }"
                            >
                                <div class="email-box">
                                    <el-input
                                        v-model="info.email.value"
                                    ></el-input>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td class="info-tit info-group">
                                <span class="txt necessary"
                                    >{{ $t("绑定机构") }}：</span
                                >
                            </td>
                            <td
                                class="info-input"
                                :class="{ error: info.group.error }"
                                data-menu="group-search"
                            >
                                <searchGroup
                                    ref="searchGroup"
                                    @selectChange="selectChange"
                                    :error.sync="info.group.error"
                                    :userStudent.sync="userStudent"
                                ></searchGroup>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="info-input">
                                <div class="submit-box">
                                    <el-button
                                        class="main-button-bcg"
                                        @click="submit"
                                    >
                                        <span class="txt">提交信息</span>
                                    </el-button>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import authenSubTitle from './authenSubTitle.vue'
import identityUpload from './identityUpload.vue'
import searchGroup from './searchGroup.vue'


export default {
    name: 'authenTeacher',
    props: {
        userStudent: Array
    },
    data() {
        return {
            haveInfor: true,
            errorTxt: null,
            info: {
                realName: {
                    value: null,
                    errorMsg: '请输入您的真实姓名',
                    error: false,
                    disabled: false,
                },
                level: {
                    value: null,
                    errorMsg: '请选择您的围棋水平',
                    data: [],
                    error: false,
                    disabled: false,
                },
                group: {
                    value: null,
                    select: [],
                    errorMsg: '请至少选择一个绑定机构',
                    specFun: 'groupCheck',
                    error: false,
                },
                phone: {
                    value: null,
                    error: false,
                    // errorMsg: '请输入您的电话号码',
                    disabled: false,
                },
                email: {
                    value: null,
                    error: false,
                    // errorMsg: '请输入您的邮箱',
                    disabled: false,
                },
            },
            searchResult: {
                data: [],
                loading: false,
                active: false
            },
            userCert: {}
        };
    },
    methods: {
        async pageInit() {
            await this.userCertInit()
            this.levelInit()
        },
        async userCertInit() {
            let res = await this.GLOBAL.userCertInfo()
            if (res && res.code == 0 && res.data) {
                let data = res.data
                if (data && Object.keys(data).length) {
                    console.log(data);
                    if (data == []) {
                        this.haveInfor = false
                    } else {
                        this.haveInfor = true
                        this.info.realName.value = data.realName
                        this.info.phone.value = data.phone
                        this.info.email.value = data.email
                        this.info.level.value = isNaN(Number(data.level)) ? null : Number(data.level)
                    }

                }
                this.userCert = res.data
            }
            return res
        },
        levelInit() {
            let list = this.GLOBAL.deepCopy(this.GLOBAL.playerLevelList)

            this.info.level.data = list
            this.info.phone.value = this.$store.state.username
        },
        deleteGroup(val) {
            if (val && val.index)
                this.info.group.select.splice(val.index, 1)
        },
        groupCheck() {
            if (!this.info.group.select.length) return this.info.group.errorMsg
            return false
        },
        groupAuditCheck() {
            let data = this.info.group.select
            let userStudent = this.userStudent
            let f = false, codes = []
            console.log(userStudent)
            for (let i in data) {
                for (let j in userStudent) {
                    if (userStudent[j].code == data[i].code) {
                        f = true
                        codes.push(data[i].code)
                    }
                }
            }
            if (f) return codes
            return f
        },
        dataCheck() {
            let info = this.info
            let errorMsg = null
            console.log(info)
            for (let i in info) {
                let f
                if (info[i].specFun) {
                    if (this[info[i].specFun]) {
                        f = this[info[i].specFun]()
                        if (f) info[i].error = true
                    }
                } else {
                    if (info[i].value === undefined || info[i].value === null || info[i].value === '' || info[i].value === ' ') {
                        f = info[i].errorMsg
                        if (f) info[i].error = true
                    }
                }
                if (f) {
                    if (!errorMsg) errorMsg = f
                } else {
                    info[i].error = false
                }
            }
            this.info = info
            this.errorTxt = errorMsg
            return errorMsg
        },
        async submit() {
            if (this.dataCheck()) return
            this.LOADING.open()
            let opt = {}
            opt.realName = this.info.realName.value
            opt.level = this.info.level.value
            opt.code = []
            // this.scCode = this.groupAuditCheck()
            // if(scCode)
            let codeList = this.info.group.select
            for (let i in codeList) {
                opt.code.push(codeList[i].code)
            }
            let res = await this.GLOBAL.studentCreate(opt)
            if (res && res.code == 0) this.gotoAudit()
            this.LOADING.close()
        },
        gotoAudit() {
            this.GLOBAL.gotoAuthen('audit', 'jumpToPageReplace', 'student')
        },
        appClick(e) {
            if (this.$refs['searchGroup'] && this.$refs['searchGroup'].appClick) this.$refs['searchGroup'].appClick(e)
        },
        selectChange(data) {
            console.log(data)
            this.info.group.select = data
        },

    },
    created() {
        this.pageInit()
    },
    components: {
        searchGroup,
        authenSubTitle,
        identityUpload
    },
    computed: {
        userLevel() {
            let list = this.info.level.data
            let val = this.info.level.value
            let rd = {}
            for (let i in list) {
                if (list[i].value == val) {
                    rd = list[i]
                    break
                }
            }
            return rd
        },
        realnameDisabled() {
            let info = this.studentInfo || {}
            if (!info.realName) return false
            return true
        },
        levelDisabled() {
            let info = this.studentInfo || {}
            let level = info.level || {}
            if (level.value === undefined) return false
            return true
        },
        studentInfo() {
            let userStudent = this.userStudent
            if (!userStudent) return null
            let level = userStudent.level
            let levelList = this.info.level.data
            let levelData = null
            for (let i in levelList) {
                if (levelList[i].value == level) {
                    levelData = levelList[i]
                    break
                }
            }
            return {
                realName: userStudent.realName || userStudent.nickname,
                level: levelData || {}
            }
        },
    },
    watch: {
        userStudent: {
            handler(val) {
                console.log(val)
            },
            deep: true,
            immediate: true
        },
        studentInfo: {
            handler(val) {
                // if(!val) return
                // this.info.realName.value = val.realName
                // this.info.level.value = val.level.value
            },
            deep: true,
            immediate: true
        }
    },
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
<style lang='less' src="./stuAndTea.less"></style>
<style lang='less'>
.authen-teacher.stu {
    display: flex;
    justify-content: center;
    @boxHeight: 3.5rem;
    .authen-student-body {
        width: 25rem;
    }
    .authen-teacher-content {
        .item-table {
            .input-table {
                .notice-modify {
                    text-align: left;
                    padding: 0px 0.5rem;
                    color: #999;
                    .el-button--text {
                        padding: 0px;
                        height: auto;
                    }
                }
                .info-group {
                    vertical-align: top;
                    padding-top: 0.8rem;
                }
                .info-input {
                    // .set-group{
                    //     position: relative;
                    // .search-result-box{
                    //     position: absolute;
                    //     min-width: 60%;
                    //     max-width: 85%;
                    //     top: 1.5rem;
                    //     margin-bottom: 0.1rem;
                    //     background: #fff;
                    //     z-index: 1;
                    //     .el-card__body{
                    //         padding: 0.5rem;

                    //     }
                    //     .search-result-none-data{
                    //         display: flex;
                    //         align-items: center;
                    //         justify-content: center;
                    //         min-height: @boxHeight;
                    //     }
                    //     .search-result-item:last-child{
                    //         margin: 0px;
                    //     }
                    //     .search-result-body{
                    //         min-height: @boxHeight;
                    //     }
                    //     .search-result-item{
                    //         margin-bottom: 0.3rem;
                    //         display: flex;
                    //         align-items: center;
                    //         white-space: nowrap;
                    //         .group-name{
                    //             width: calc(100% - 1.5rem);
                    //             display: flex;
                    //             align-items: center;
                    //         }
                    //         .group-fun{
                    //             margin-left: 0.3rem;
                    //             .el-button{
                    //                 height: auto;
                    //             }
                    //         }
                    //     }
                    // }
                    // }
                }
            }
        }
    }
}
</style>