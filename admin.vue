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
                                    v-for="(n, index) in getList"
                                    @click="topChange(index)"
                                    :class="{ show1: changeTopBtn == index }"
                                    :key="index"
                                >
                                    <button v-if="!n.Path" class="button-top">
                                        {{ n.type }}
                                    </button>

                                    <button
                                        v-else
                                        class="button-top"
                                        @click="topBtn(n.Path)"
                                    >
                                        {{ n.type }}
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div class="button-content-bottom">
                            <ul>
                                <li
                                    @click="bottomChange(index)"
                                    v-for="(m, index) in listChildren"
                                    :class="{ show2: changeBottomBtn == index }"
                                    :key="m.name"
                                >
                                    <router-link :to="m.Path">
                                        <button
                                            v-if="m.name != null"
                                            class="button-bottom"
                                        >
                                            {{ m.name }}
                                        </button>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div class="router-view">
                            <router-view
                                :schoolId.sync="schoolId"
                                :scRole.sync="scRole"
                                :changeTopBtn.sync="changeTopBtn"
                                :changeBottomBtn.sync="changeBottomBtn"
                                @update="update"
                            ></router-view>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <le-confirm ref="leConfirm" @success="handleSuccess">
            <template v-slot:message>
                <div class="switchiIdentitiesON">
                    <h1 class="title">{{ $t("切换身份") }}</h1>
                    <table border="0">
                        <caption></caption>
                        <tr v-for="(i, k) in info" v-bind:key="">
                            <td>
                                <el-radio
                                    v-model="schoolSelect"
                                    :label="k"
                                    @change="schoolChange(i, k)"
                                >
                                    {{ i.schoolName }} --
                                    <span
                                        v-if="i.schoolRole == 20"
                                        style="font-size: 14px"
                                        >{{ $t("教师") }}
                                    </span>
                                    <span
                                        v-else-if="i.schoolRole == 10"
                                        style="font-size: 14px"
                                    >
                                        {{ $t("管理员") }}
                                    </span>
                                    <span
                                        v-else-if="i.schoolRole == 30"
                                        style="font-size: 14px"
                                    >
                                        {{ $t("学生") }}
                                    </span>
                                    <span
                                        v-else-if="i.schoolRole == 0"
                                        style="font-size: 14px"
                                    >
                                        {{ $t("系统管理员") }}
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
    name: 'admin',
    props: {
        username: String,
        schoolId: Number,
        scRole: Number
    },
    data() {

        return {
            schoolSelect: 0,
            school: '',
            identity: '',
            changeBottomBtn: null,
            changeTopBtn: 5,
            list: [
                {
                    type: '棋谱',
                    needRole: 20,
                    // Path: '/engine/school/admin/tstudentCM',
                    Path: 'tstudentCM',
                    children: [{
                    }
                    ]
                },
                {
                    type: '教室',
                    needRole: 20,
                    Path: 'troomV',
                    children: [
                        {

                        }
                    ]
                },
                {
                    type: '教师管理',
                    needRole: 10,
                    Path: 'ateacherM',
                    children: [
                        {
                            name: '棋校教师',
                            Path: 'ateacherM',
                            needRole: 10,
                        },
                        {
                            name: '申请列表',
                            Path: 'ateacherA',
                            needRole: 10,

                        }
                    ]

                },
                {
                    type: '学生管理',
                    needRole: 20,
                    Path: 'tstudentV',
                    children: [
                        {
                            name: '棋校学生',
                            needRole: 10,
                            Path: 'astudentM',
                        },
                        {
                            name: '我的学生',
                            needRole: 20,
                            Path: 'tstudentV'
                        },
                        {
                            name: '申请列表',
                            needRole: 10,
                            Path: 'astudentA'
                        }
                    ]
                },
                {
                    type: '班级管理',
                    needRole: 20,
                    Path: 'tclassV',
                    children: [
                        {
                            name: '机构全部班级',
                            needRole: 10,
                            Path: 'aclassM'
                        },
                        {
                            name: '我的班级',
                            needRole: 20,
                            Path: 'tclassV'
                        }
                    ]
                },
                {
                    type: '个人信息',
                    needRole: 20,
                    Path: 'tInfo'
                },
                {
                    type: '棋校信息',
                    needRole: 20,
                    Path: 'schoolInfo'
                },
            ],
            info: this.GLOBAL.info,
        };
    },
    methods: {
        topBtn(path) {
            this.GLOBAL.gotoSchool_n(path, 'jumpToPageReplace', [], { replaceParams: { params1: this.schoolId, params2: this.scRole } })
        },

        topChange(index) {
            this.changeTopBtn = index;
            this.changeBottomBtn = null;
        },

        bottomChange(index) {
            this.changeBottomBtn = index;
        },

        update(options) {
            console.log(options)
            options = options || {}
            for (let i in options) {
                this[i] = options[i]
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
                //更新school中的信息              
                this.$emit('update', {
                    schoolId: Number(this.info[this.schoolSelect].schoolId),
                    scRole: Number(this.info[this.schoolSelect].schoolRole),

                })
                this.$nextTick(() => {
                    //选择学生身份时候进入学生页面
                    if (this.info[this.schoolSelect].schoolRole == 30) {
                        let schoolID = Number(this.info[this.schoolSelect].school_id)
                        this.GLOBAL.gotoSchool_n('studentInfo', null, [], { replaceParams: { params1: schoolID } })
                    }
                    if (this.info[this.schoolSelect].schoolRole == 0) {
                        this.GLOBAL.gotoSchool_n('applySelect', null, [],)
                    }
                    else {
                        this.$nextTick(() => {
                            this.changeTopBtnCheck(list, index)
                        })
                    }
                }
                )
            }
        },
        handleSuccess() {
            //
        },
        test(val) {
            console.log(val)
            console.log(val.Path)
        },
        schoolChange(val, index) {
            this.schoolSelect = index
        },
        changeTopBtnCheck() {

            let listNew = this.getList
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
    created() {//
    },
    components: {

    },
    computed: {


        listChildren() {
            let role = this.scRole
            let val = this.changeTopBtn
            let list = this.getList
            let data = this.GLOBAL.deepCopy(list[val]) || {}
            let childrens = []
            // console.log(list[val])
            for (let j in data.children) {
                data.children[j].Path = '/engine/school/admin/' + this.schoolId + '/' + this.scRole + '/' + data.children[j].Path
                if (data.children[j].needRole >= role) {
                    childrens.push(data.children[j])
                }
            }
            console.log(childrens)
            return childrens || []

        },
        getList() {
            // v-if="role >= n.needRole"
            let list = this.list
            let role = this.scRole
            let data = []
            for (let i in list) {
                if (list[i].needRole >= role) {
                    list[i].path = ''
                    data.push(list[i])
                }
            }
            // console.log(data)
            return data
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
        const admin = 10
        const teacher = 20
        if (this.scRole == admin) {
            this.changeTopBtn = 6
        }
        if (this.scRole == teacher) {
            this.changeTopBtn = 4
        }



    },
    beforeCreate() {
        //生命周期 - 创建之前
    },
    beforeMount() { //生命周期 - 挂载之前
    },
    beforeUpnickname() {//生命周期 - 更新之前 
    },
    upnicknamed() { //生命周期 - 更新之后
    },
    beforeDestroy() {
        this.GLOBAL.loginMask = null

    }, //生命周期 - 销毁之前
    destroyed() { //生命周期 - 销毁完成
    },
    activated() {
        //如果页面有keep-alive缓存功能，这个函数会触发
    },
}
</script>
<style lang='less' >
.router-view {
    position: relative;
    margin-top: 0.5rem;
}

.button-content {
    width: 100%;
    .button-content-top {
        width: 100%;
        ul {
            width: 100%;
            display: flex;
        }
        li {
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
}

.show1 {
    button {
        background-color: #e6912c;
        color: white;
    }
}
.show2 {
    .button-bottom {
        background: #6589b5;
        color: white;
    }
}

.btn {
    position: relative;
    margin-top: 6rem;
    button {
        background-color: #e6912c;
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