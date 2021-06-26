<template>
    <div class="theme-engine-ready-panel-bcg engine-word-page">
        <div class="document-page-content-web page-box">
            <div class="training-list">
                <div class="training-list-title">
                    <lePageTitle
                        :icon="`${GLOBAL.assetsUrl}/img/enm13_dark.png`"
                        message="棋校"
                    >
                        <template v-slot:webclass>
                            <div
                                class="webclass-info txt link"
                                @click="
                                    $router.push(
                                        '/engine/school/authenticate/set/select'
                                    )
                                "
                            >
                                {{ $t("新增身份") }}
                            </div>

                            <div
                                class="webclass-info txt link tester"
                                @click="switchiIdentitiesON"
                            >
                                {{ $t("切换身份") }}
                            </div>
                        </template>
                    </lePageTitle>
                </div>
                <div class="engine-use-content-common">
                    <div class="button-content">
                        <div class="button-content-top">
                            <ul>
                                <li
                                    v-for="(n, index) in list"
                                    @click="topChange(index)"
                                    :class="{ show1: changeTopBtn == index }"
                                    :key="index"
                                >
                                    <button v-if="!n.Path" class="button-top">
                                        {{ n.type }}
                                    </button>
                                    <router-link :to="n.Path" v-else>
                                        <button class="button-top">
                                            {{ n.type }}
                                        </button>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div style="position: relative; margin-top: 2rem">
                            <router-view
                                :schoolId.sync="schoolId"
                                :scRole.sync="scRole"
                            ></router-view>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <le-confirm ref="leConfirm" @success="handleSuccess">
            <template v-slot:message>
                <div class="switchiIdentitiesON">
                    <h1 class="title">切换身份</h1>
                    <table border="0">
                        <tr v-for="(i, k) in Info">
                            <td>
                                <el-radio
                                    v-model="schoolSelect"
                                    :label="k"
                                    @change="schoolChange(i, k)"
                                >
                                    {{ i.school }} --
                                    <span
                                        v-if="i.identity == 0"
                                        style="font-size: 14px"
                                        >教师
                                    </span>
                                    <span
                                        v-else-if="i.identity == 1"
                                        style="font-size: 14px"
                                    >
                                        管理员
                                    </span>
                                    <span
                                        v-else-if="i.identity == 2"
                                        style="font-size: 14px"
                                    >
                                        学生
                                    </span>
                                    <span
                                        v-else-if="i.identity == 9"
                                        style="font-size: 14px"
                                    >
                                        系统管理员
                                    </span>
                                </el-radio>
                            </td>
                        </tr>
                    </table>
                </div>
            </template>
        </le-confirm>
    </div>
</template>


<script>

export default {
    name: '',
    props: {
        username: String,
        schoolId: Number,
        scRole: Number,
        theme: String,
        coor: Number,
        voice: Number,
        plan: String,
        AISpeed: Number,
        clineStatus: Boolean,
        volume: Number,
        userLevel: Number,
        nickname: String,
        engineId: String,
        pathNowApp: String,
        userNotice: Object,
        userRole: String,
        cardPlanNowApp: Object,
        newFunNotice: Object,
        photo: String,
        challengeLevel: Number,
        engineDataConfigApp: Object,
        language: String,
        classAdmin: Number,
        planId: Number,
        planData: Object
    },
    data() {
        return {
            info: this.GLOBAL.info,
            schoolSelect: 0,
            changeTopBtn: 2,
            list: [
                {
                    type: '棋谱',
                    Path: 'studentCM',

                    children: [{}]
                },

                {
                    type: '教室',
                    Path: 'studentR',
                    children: [{}]
                },

                {
                    type: '个人信息',
                    Path: 'studentInfo'
                },

                {
                    type:'棋校信息',
                    Path:'studentSchoolInfo'
                }

            ],

        };
    },
    methods: {

        topChange(index) {
            // console.log(index)
            this.changeTopBtn = index;

            let path = this.list[index].Path;
            // console.log(path);
        },

        async editBtn() {
            console.log(123);
            let res = await this.$refs['leConfirm'].open({
                // button: [
                //     { name: '确定', label: 0 }
                // ]
            })
            res = res || {}
            if (res.label == 0) {

            }
        },




        async switchiIdentitiesON() {
            let res = await this.$refs['leConfirm'].open({
                button: [
                    { name: '确定', label: 0 }
                ]
            })
            res = res || {}
            if (res.label == 0) {
                let list = this.GLOBAL.deepCopy(this.getList)
                let index = this.GLOBAL.deepCopy(this.changeTopBtn)

                this.$emit('update', {
                    schoolId: Number(this.Info[this.schoolSelect].school_id),
                    scRole: Number(this.Info[this.schoolSelect].identity)
                })
                if (this.Info[this.schoolSelect].identity == 1 || this.info[this.schoolSelect].identity == 0) {
                    this.GLOBAL.gotoSchool_n('tInfo', null, [], { replaceParams: { params1: this.Info[this.schoolSelect].school_id, params2: this.Info[this.schoolSelect].identity } })
                }
                // this.$nextTick(() => {
                //     this.changeTopBtnCheck(list, index)
                // })

            }
        },


        handleSuccess() { },
        test(val) {

        },
        schoolChange(val, index) {
            this.schoolSelect = index
        },
        changeTopBtnCheck(list, index) {
            // if(this.changeTopBtn != index) return
            let listNew = this.getList
            // if(listNew.length == list.length) return
            let selectOld = list[index] || {}
            let selectNew = listNew[this.changeTopBtn] || {}
            // if(selectOld.type == selectNew.type) return
            let defaultType = '个人信息'
            let rd = null, indexNew = null
            for (let i in listNew) {
                if (listNew[i].type == defaultType) {
                    rd = listNew[i]
                    indexNew = i
                    break
                }
            }
            if (rd === null || !rd.Path) return

            this.GLOBAL.jumpToPageReplace(rd.Path)
            // this.changeTopBtn = indexNew
            this.$nextTick(() => {
                this.topChange(indexNew)
            })
        }

    },
    created() {
    },
    components: {
    },
    computed: {
        Info() {
            let InFo = this.info
            for (let i in this.info) {
                if (InFo[i].identity == 1) {
                    // InFo[i].identity = '管理员'
                }
                else if (InFo[i].identity == 0) {
                    // InFo[i].identity = '教师'
                }
                else if (InFo[i].identity == 2) {
                    // InFo[i].identity = '学生'
                }
                else if (InFo[i].identity == 9) {
                    // InFo[i].identity = '系统管理员'
                }
            }
            let Info = InFo
            return Info
        },
        listSelected() {
            let list = this.getList
            let index = this.changeTopBtn
            return list[index]
        },
    },
    watch: {
        changeTopBtn: {
            handler(val) {
                console.log(val)
            },
            deep: true
        },
    },
    mounted() {
    },
    beforeCreate() { }, //生命周期 - 创建之前
    beforeMount() { }, //生命周期 - 挂载之前
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() {
        this.GLOBAL.loginMask = null

    }, //生命周期 - 销毁之前
    destroyed() { }, //生命周期 - 销毁完成
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' >
.button-content {
    // margin-top: 2rem;
    // margin-left: 1rem;
    width: 100%;
    // display: flex;
    // justify-content: flex-start;
    // white-space: nowrap;

    .button-content-top {
        width: 100%;
        ul {
            width: 100%;
            display: flex;
        }
        li {
            // display: inline-block;
            width: 100%;
        }
    }
    .button-content-bottom {
        display: flex;
        width: 100%;
        margin-top: 1rem;
        ul {
            width: 90%;
            margin-left: 2rem;
        }
        li {
            margin-left: 1rem;
            float: left;
            display: inline-block;
            width: 7rem;
        }
    }
}

.button-top {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: initial;
    cursor: pointer;

    width: 100%;
    height: 2.3rem;
    border: 0.1rem solid #dddddd;

    background: #cccccc;
    // border-radius: 0.3rem;
}

.button-bottom {
    background-color: initial;
    padding-left: 1rem;
    padding-right: 1rem;
    cursor: pointer;

    width: 100%;
    height: 1.7rem;
    border: 0.1rem solid #dddddd;
    border-radius: 0.3rem;

    background: #cccccc;
    // margin-left: 3rem;
}

.show1 {
    button {
        background-color: #e6912c;
        // color: #dddddd;
        color: white;
    }
}
.show2 {
    button {
        // background-color: #1381db;
        background-color: #6589b5;
        // color: #dddddd;
        color: white;
    }
}

.btn {
    position: relative;
    margin-top: 6rem;
    button {
        background-color: #e6912c;
        // color: #dddddd;
        color: white;
        border: 0.05rem solid #cccccc;
        padding: 0.25rem 0.5rem;
    }
}

.reason {
    margin-bottom: 1rem;
}

.radio3 {
    margin-top: 3rem;
    margin-bottom: 2rem;

    .el-radio__input.is-checked + .el-radio__label {
        color: black !important;
    }
    .el-radio__input.is-checked .el-radio__inner {
        background: black;
        border-color: black !important;
    }
}

.switchiIdentitiesON {
    .title {
        font-size: 0.9rem;
        padding: 1rem 0;
        font-weight: 400;
    }
    table {
        width: 90%;
        margin-left: 5%;
        tr {
            display: block;
            margin-bottom: 0.5rem;
            margin-left: 3rem;
            width: 15rem;
        }
        td {
            background-color: #eee;
            height: 2rem;

            width: 15rem;
        }
    }
}
button {
    outline: none;
}
</style>