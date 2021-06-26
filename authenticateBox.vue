<!--  -->
<template>
    <div
        class="engine-word-page theme-engine-ready-panel-bcg user-authenticate"
    >
        <div class="body page-box">
            <lePageTitle
                ref="lePageTitle"
                :icon="`${GLOBAL.assetsUrl}/img/ce1.png`"
                message="身份认证"
            >
                <template v-slot:webclass>
                    <div
                        class="webclass-info txt link"
                        v-if="$route.path!='/engine/school/authenticate/info/personal'"
                        @click="
                            $router.push(
                                '/engine/school/authenticate/info/personal'
                            )
                        "
                    >
                        {{ $t("取消认证") }}
                    </div>
                    <div
                        class="return-box"
                        v-if="showReturn"
                        @click="returnFun"
                    >
                        <img :src="`${GLOBAL.assetsUrl}/img/co2.png`" />
                    </div>
                </template>
            </lePageTitle>
            <div class="engine-use-content-common authenticate-content">
                <router-view
                    ref="pageNow"
                    @userGroupUpdate="userGroupInit"
                    :userGroup.sync="userGroup"
                    :userStudent.sync="userStudent"
                    :userTeacher.sync="userTeacher"
                    :path.sync="path"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        username: String
    },
    data() {
        return {
            school: [],
            student: [],
            teacher: [],
            path: this.$route.path,
            pathFunList: {
                '/engine/school/authenticate/create': {
                    type: "select",
                },
                '/engine/school/authenticate/set/teacher': {
                    type: "select",
                },
                '/engine/school/authenticate/set/student': {
                    type: "select",
                },
                '/engine/school/authenticate/set/audit': {
                    type: "select",
                },
                // '/engine/school/authenticate/info/personal': {
                //     type: "select",
                // },
                '/engine/school/authenticate/info/school': {
                    fun: 'schoolBack'
                },
                // '/engine/school/authenticate/info': {
                //     fun: 'commonBack'
                // },
                '/engine/school/authenticate/personal/cert': {
                    fun: 'commonBack'
                }
            }
        };
    },
    methods: {
        returnFun() {
            let data = this.showReturn || {}
            if (data.fun && this[data.fun]) return this[data.fun]()
            let type = data.type
            let params = null
            if (data.params) params = this.teacherId
            this.GLOBAL.gotoAuthen(type, 'jumpToPageReplace', params)
        },
        async userGroupInit(res) {
            if (!this.username) return
            this.LOADING.open()
            res = res || await this.GLOBAL.getUserGroup()
            if (res && res.code == 0) {
                this.school = res.data.admin || []
                this.student = res.data.student
                this.teacher = res.data.teacher
            }
            console.log(res)
            this.LOADING.close()
        },
        async pageInit() {
            await this.userGroupInit()
        },
        appClick(e) {
            if (this.$refs['pageNow'] && this.$refs['pageNow'].appClick) this.$refs['pageNow'].appClick(e)
        },
        async userMessageInit(res) {
            if (!this.username) return
            this.LOADING.open()
            res = res || await this.GLOBAL.schoolUserMessage()
            if (res && res.code == 0) {
            }
            console.log(res)
            this.LOADING.close()
        },
        schoolBack() {
            let retrunPath = this.$route.params.retrunPath
            if (!retrunPath) return
            retrunPath = decodeURIComponent(atob(decodeURIComponent(retrunPath)))
            console.log(retrunPath)
            retrunPath = retrunPath.split('-')
            retrunPath = retrunPath.join('/')
            this.GLOBAL.jumpToPageReplace(retrunPath)
        },
        commonBack() {
            // let refer = document.referrer
            // let origin = document.location.origin
            // if(refer.indexOf(origin) <= -1){
            //     if(this.$route.params.retrunPath) this.schoolBack()
            //     return
            // }
            // refer = refer.replace('http://', '')
            // refer = refer.replace('https://', '')
            // let path = refer.substring(refer.indexOf('/'), refer.length)
            // this.GLOBAL.jumpToPageReplace(path)           
            this.GLOBAL.gotoBackNormal(this.GLOBAL.pageList.authenticate.personal)
        },
    },

    created() {
        this.pageInit()
    },
    components: {
    },
    computed: {
        userGroup() {
            let school = this.GLOBAL.deepCopy(this.school) || []
            for (let i in school) {
                school[i].creator = true
            }
            return school
        },
        adminGroup() {

        },
        userStudent() {
            let data = this.GLOBAL.deepCopy(this.student) || []
            let list = data
            return list
        },
        userTeacher() {
            let data = this.GLOBAL.deepCopy(this.teacher) || []
            console.log(data)
            let list = data
            return list
        },
        showReturn() {
            let path = this.path
            let list = this.pathFunList
            let f = null
            for (let i in list) {
                if (path.indexOf(i) > -1) {
                    f = list[i]
                }
            }
            return f
        },
    },
    watch: {
        $route: {
            handler() {
                this.path = this.$route.path
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
<style lang='less' >
.user-authenticate {
    .authenticate-content {
        padding: 1.5rem 0px;
        .item-table {
            background: #eaeaea;
            padding: 1rem 0.5rem;
        }
        .audit-box {
            .quit-box {
                text-align: right;
                padding: 0.5rem 0.2rem;
                .el-button {
                    padding: 0px;
                    height: auto;
                    color: #333;
                }
            }
        }
        table.input-table {
            @inputHeight: 1.5rem;
            @btnHeight: 1.5rem;
            @benWidth: 3.5rem;
            width: 100%;
            white-space: nowrap;
            td {
                padding: 0.5rem 0px;
            }
            .txt {
                position: relative;
            }
            .txt.necessary {
                padding-left: 0.5rem;
            }
            .info-tit {
                text-align: right;
            }
            .txt {
                font-size: 0.6rem;
            }
            .info-input.error {
                .error-label-box {
                    border: 1px solid #ddd;
                }
                .el-input__inner,
                .error-label-box {
                    border-color: @errorColor2;
                }
            }
            .info-input {
                text-align: left;
                width: 100%;
                padding-left: 0.3rem;
                .el-input__inner {
                    background: none;
                    height: @inputHeight;
                    border: 0.08rem solid #bbbbbb;
                    font-size: 0.6rem;
                    padding: 0px 0.2rem;
                }
                .el-button {
                    height: @btnHeight;
                    padding: 0px;
                }
                .el-image-viewer__wrapper {
                    [class*=" el-icon-"],
                    [class^="el-icon-"] {
                        font-size: 1.5rem;
                        color: #fff;
                    }
                }
                .submit-box {
                    text-align: center;
                    .el-button {
                        width: 6rem;
                        .txx {
                            font-size: 0.7rem;
                        }
                    }
                }
            }
            .necessary::before {
                content: "*";
                color: @errorColor2;
                font-size: 1rem;
                position: absolute;
                top: -0.3rem;
                left: 0rem;
            }
        }
    }
    .clear-img-icon {
        font-size: 0.7rem;
        color: #999;
        cursor: pointer;
    }
    .authen-error-box {
        height: 1rem;
        .txt {
            font-size: 0.6rem;
        }
    }
}
</style>