<template>
    <div class="theme-engine-ready-panel-bcg engine-word-page">
        <div class="document-page-content-web page-box">
            <div class="training-list">
                <div class="training-list-title">
                    <lePageTitle
                        :icon="`${GLOBAL.assetsUrl}/img/enm13_dark.png`"
                        message="棋校申请"                        
                    >
                     <template v-slot:webclass>
                    <div
                        class="webclass-info txt link"                      
                        @click="
                            $router.push(
                                '/engine/school/authenticate/info/personal'
                            )
                        "
                    >
                        {{ $t("回到主页") }}  
                    </div>                   
                </template>
                </lePageTitle>
                </div>
                <div class="training-list-content engine-use-content-common">
                    <div style="width：100%">
                        <div class="topinfo" style="margin-top: 2rem">
                        <h1>机构管理</h1>
                        <button  :class="{ shows2: page == 1 }" @click="page = 1">线上机构</button>
                        <button  :class="{ shows2: page == 2 }" @click="page = 2">已下线机构</button>                       
                        </div>
                        <div style="width: 100%; ">
                            <table border="0" class="headInfo">
                                <tr>
                                    <th id="adminId">管理员账号</th>
                                    <th id="type">类型</th>
                                    <th id="name">机构名称</th>
                                    <th id="Date">创建日期</th>
                                    <th id="changeDate">最近修改</th>
                                    <th id="state">状态</th>
                                    <th id="manage">管理</th>
                                </tr>
                            </table>
                        </div>
                        <div class="scroll">
                            <table border="0" class="applySelect" v-if="page == 1">
                                <tr v-for="i in currentData1 " v-bind:key="">
                                    <td id="adminId">{{ i.principalUsername }}</td>
                                    <td id="type" v-if="i.schoolType == '个人'">个人</td>
                                    <td id="type" v-if="i.schoolType == '企业'">企业</td>
                                    <td id="name">{{ i.schoolName }}</td>
                                    <td id="Date">{{ i.establishTime.date.year}}-{{ i.establishTime.date.month}}-{{ i.establishTime.date.day}}</td>
                                    <td id="changeDate">{{ i.updateTime.date.year}}-{{ i.updateTime.date.month}}-{{ i.updateTime.date.day}}</td></td>
                                    <td id="state" v-if="i.schoolStatus == '0'">
                                        已认证
                                    </td>
                                    <td
                                        id="state"
                                        style="color: #d80000"
                                        v-if="i.schoolStatus == '1'"                                    >
                                        待审核
                                    </td>
                                    <td
                                        id="state"                                       
                                        v-if="i.schoolStatus == '2'"
                                    >
                                        待修改
                                    </td>                                 
                                    <td id="manage">
                                        <button style="cursor:pointer" @click="details(i.id)">详情</button>                                       
                                        <button style="cursor:pointer" v-if="i.schoolStatus == '1'" @click="agree(i.id)">
                                            同意
                                        </button>
                                        <button 
                                        style="cursor:pointer"
                                        @click="disagree(i.schoolName,i.id)"
                                        v-if="i.schoolStatus == '1'">
                                            拒绝
                                        </button>
                                    </td>
                                </tr>                                
                            </table>
                             <table border="0" class="applySelect" v-if="page == 2">
                                <tr v-for="i in currentData2 " v-bind:key="">
                                    <td id="adminId">{{ i.principalUsername }}</td>
                                    <td id="type" v-if="i.schoolType == '个人'">个人</td>
                                    <td id="type" v-if="i.schoolType == '企业'">企业</td>
                                    <td id="name">{{ i.schoolName }}</td>
                                    <td id="Date">{{ i.establishTime.date.year}}-{{ i.establishTime.date.month}}-{{ i.establishTime.date.day}}</td>
                                    <td id="changeDate">{{ i.updateTime.date.year}}-{{ i.updateTime.date.month}}-{{ i.updateTime.date.day}}</td></td>
                                   
                                    <td
                                        id="state"                                        
                                        v-if="i.schoolStatus == '3'"
                                    >
                                        已下线
                                    </td>
                                    <td id="manage">
                                        <button style="cursor:pointer" @click="details(i.id)">详情</button>                                   
                                    </td>
                                </tr>
                            </table>
                               <div class="block" v-if="page == 1">
                                    <el-pagination
                                       layout="prev, pager, next"
                                       :page-size="pages1Size"
                                       :total="total1"
                                       @current-change="page1Change">
                                    </el-pagination>
                                </div>
                                <div class="block" v-if="page == 2">
                                    <el-pagination
                                       layout="prev, pager, next"
                                       :page-size="pages2Size"
                                       :total="total2"
                                       @current-change="page2Change">
                                    </el-pagination>
                                </div>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
        <le-confirm ref="disagree" @succss="handleSuccess">
            <template v-slot:message>
                <div class="disagree">
                    <h1 style="margin-top: 1rem; margin-bottom: 1rem">
                        {{ disagreeName }}拒绝原因
                    </h1>
                    <el-input
                        style="margin-bottom: 1.5rem"
                        type="textarea"
                        :autosize="{ minRows: 2 }"
                        placeholder="请输入拒绝原因"
                        v-model="disagreeInfo"
                    >
                    </el-input>
                </div>
            </template>
        </le-confirm>
        <le-confirm ref="offline" @succss="handleSuccess">
            <template v-slot:message>
                <div class="disagree">
                    <h1 style="margin-top: 1rem; margin-bottom: 1rem">
                        确认下线
                    </h1>
                    <h1 style="margin-bottom: 1rem">
                        是否将{{ disagreeName }}下线
                    </h1>
                </div>
            </template>
        </le-confirm>
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        theme: String,
        coor: Number,
        voice: Number,
        plan: String,
        AISpeed: Number,
        clineStatus: Boolean,
        volume: Number,
        userLevel: Number,
        username: String,
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
            pages1: 1,
            pages1Size: 13,
            pages2: 1,
            pages2Size: 13,
            page: 1,
            disagreeName: '',
            disagreeInfo: '',
            tableData3: [

            ],
            tableData4: [

            ]
        };
    },
    methods: {
        page1Change(val) {
            this.pages1 = val
        },
        page2Change(val) {
            this.pages2 = val
        },
        async disagree(name, id) {
            const disagreeStatus = 2
            this.disagreeName = name
            let res = await this.$refs['disagree'].open({
                button: [
                    { name: '确定', label: 0 }
                ]
            })
            res = res || {}
            if (res.label == 0) {
                let options = {
                    url: '/school/deal/?school_id=' + id + '&status=' + disagreeStatus + '&reply=' + this.disagreeInfo + '&approver_username=' + this.$store.state.username,
                    method: 'POST'
                }
                let response = await this.GLOBAL.request('school', options)
                {
                    this.$message.success(response.data)
                }                       //
            }
        },
        async offline(name) {
            this.disagreeName = name
            let res = await this.$refs['offline'].open({
                button: [
                    { name: '确定', label: 0 }
                ]
            })
            res = res || {}
            if (res.label == 0) {
                //
            }
        },
        details(id) {
            this.GLOBAL.gotoSchool_n('applySelectInfo', null, [], { replaceParams: { params1: id } })
        },
        async agree(id) {
            const agreeStatus = 0

            let options = {
                url: '/deal/?school_id=' + id + '&status=' + agreeStatus + '&reply=' + '' + '&approver_username=' + this.$store.state.username,
                method: 'POST'
            }
            let response = await this.GLOBAL('school', options)
            if (response) {
                this.$message.success(response.data)
            }

        },
        async HandMounted() {
            // let options1 = {
            //     url: '',
            //     method: 'GET'
            // }
            // let response1 = await this.GLOBAL.request('school', options1)
            // if (response1) {
            //     this.tableData3 = response1.data
            // }
            // let options2 = {
            //     url: '',
            //     method: 'GET'
            // }
            // let response2 = await this.GLOBAL.request('school', options2)
            // if (response2) {
            //     this.tableData4 = response2.data
            // }
        }
    },
    created() {
    },
    components: {
    },
    computed: {
        total1() {
            return this.tableData3.length
        },
        currentData1() {
            let list = this.tableData3.slice() || []
            let size = this.pages1Size
            let page = this.pages1 - 1
            return list.splice(page * size, size)
        },
        total2() {
            return this.tableData4.length
        },
        currentData2() {
            let list = this.tableData4.slice() || []
            let size = this.pages2Size
            let page = this.pages2 - 1
            return list.splice(page * size, size)
        }
    },
    watch: {
    },
    mounted() {
        this.HandMounted()

    },
    beforeCreate() {
        //生命周期 - 创建之前
    },
    beforeMount() {
        //生命周期 - 挂载之前
    },
    beforeUpdate() {
        //生命周期 - 更新之前
    },
    updated() {
        //生命周期 - 更新之后
    },
    beforeDestroy() {
        this.GLOBAL.loginMask = null

    }, //生命周期 - 销毁之前
    destroyed() {
        //生命周期 - 销毁完成
    },
    activated() {
        //如果页面有keep-alive缓存功能，这个函数会触发
    },
}
</script>
<style lang='less' >
.topinfo {
    text-align: start;
    h1 {
        font-size: 1rem;
        margin-bottom: 0.5rem;
    }
    button {
        background-color: initial;
        padding-left: 1rem;
        padding-right: 1rem;
        cursor: pointer;

        width: 7rem;
        height: 1.7rem;
        border: 0.1rem solid #dddddd;
        border-radius: 0.3rem;

        background: #cccccc;
        margin-bottom: 0.5rem;
    }
}
.shows2 {
    background-color: #6589b5 !important;
    color: white;
}
.headInfo {
    width: 100%;
    th,
    td {
        background-color: #cccccc;
        height: 2rem;
    }
    #adminId {
        width: 9rem;
    }
    #type {
        width: 3.7rem;
    }
    #name {
        width: 12rem;
    }
    #Date {
        width: 6rem;
    }
    #state {
        width: 5.4rem;
    }
    #changeDate {
        width: 6rem;
    }
    #manage {
        width: 9rem;
    }
}
.scroll {
    // overflow-y: scroll;
    width: calc(100%);
    height: 25rem;
}
.applySelect {
    width: 100%;
    color: #333333;
    th,
    td {
        background-color: #cccccc;
        height: 2rem;
    }
    #adminId {
        width: 9rem;
    }
    #type {
        width: 3.7rem;
    }
    #name {
        width: 12rem;
    }
    #Date {
        width: 6rem;
    }
    #state {
        width: 5.4rem;
    }
    #changeDate {
        width: 6rem;
    }
    #manage {
        width: 9rem;
        button {
            border: 0.05rem solid #cccccc;
            border-radius: 10rem;
            color: #333333;
            padding: 0.25rem 0.5rem;
            background: #cccccc;
            span {
                color: #333333;
            }
        }
    }
}
.disagree {
    .el-textarea__inner {
        margin: auto;
        border: 0;
        resize: none;
        background-color: #eee; /* 这个是去掉 textarea 下面拉伸的那个标志，如下图 */
    }
}
</style>