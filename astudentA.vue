<!--  -->
<template>
    <div class="">
        <table border="0" class="ateacherA">
            <tr>
                <th id="nickname">昵称</th>
                <th id="name">姓名</th>
                <th id="sex">性别</th>
                <th id="age">年龄</th>
                <th id="level">级别</th>
                <th id="tel">联系电话</th>
                <th id="type">状态</th>
            </tr>
            <tr v-for="n in currentData" v-bind:key="n">
                <td id="nickname">{{ n.nickname }}</td>
                <td id="name">{{ n.name }}</td>
                <td id="sex">{{ n.sex }}</td>
                <td id="age">{{ n.age }}</td>
                <td id="level">{{ n.level }}</td>
                <td id="tel">{{ n.tel }}</td>
                <td id="type">
                    <button v-if="n.type == 'get'" id="get" @click="Approval()">
                        审批
                    </button>
                    <span v-if="n.type == 'send'" id="send"> 等待 </span>
                    <span v-if="n.type == 'pass'" id="pass"> 已通过 </span>
                    <span v-if="n.type == 'refuse'" id="refuse"> 已拒绝 </span>
                </td>
            </tr>
        </table>
        <div class="block">
            <el-pagination
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="total"
                @current-change="pageChange"
            >
            </el-pagination>
        </div>
        <le-confirm ref="leConfirm" @success="handleSuccess">
            <template v-slot:message>
                <div style="margin-top: 1.2rem"><h1>审批结果</h1></div>
                <div class="approval">
                    <div class="radio">
                        <div>
                            <el-radio class="radio1" v-model="radio" label="1">
                                通过
                            </el-radio>
                            <el-radio class="radio2" v-model="radio" label="2">
                                拒绝
                            </el-radio>
                        </div>
                    </div>
                    <div class="reason" v-if="radio == '2'">
                        <el-input
                            type="textarea"
                            autosize
                            placeholder="请输入拒绝理由"
                            v-model="refuseInfo"
                        >
                        </el-input>
                    </div>
                </div>
            </template>
        </le-confirm>
    </div>
</template>

<script>
export default {

    name: '',
    props: {},
    data() {
        return {
            refuseInfo: '',
            radio: '1',
            applyInfo: [],
            page: 1,
            pageSize: 13,
        };
    },
    methods: {
        async Approval() {
            let res = await this.$refs['leConfirm'].open({
                button: [
                    { name: '确定', label: 0 }
                ]
            })
            res = res || {}
            if (res.label == 0) {
                //
            }
        },
        pageChange(val) {
            this.page = val
        },
        async HandMounted() {
            let options = {
                url: '/school/apply/student/' + this.$route.params.schoolId,
                method: 'GET'
            }
            let response = await this.GLOBAL.request('school', options)
            if (response) {
                this.applyInfo = response.data
            }
        }
    },
    created() {
        //
    },
    components: {
    },
    computed: {
        total() {
            return this.applyInfo.length
        },
        currentData() {
            let list = this.applyInfo.slice() || []
            let size = this.pageSize
            let page = this.page - 1
            return list.splice(page * size, size)
        }
    },
    watch: {},
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
        //生命周期 - 销毁之前
    },
    destroyed() {
        //生命周期 - 销毁完成
    },
    activated() {
        //如果页面有keep-alive缓存功能，这个函数会触发
    },
}
</script>
<style lang='less' >
.radio {
    margin-top: 1.5rem;
    margin-bottom: 2rem;
    .radio2 {
        .el-radio__input.is-checked + .el-radio__label {
            color: red !important;
        }
        .el-radio__input.is-checked .el-radio__inner {
            background: red;
            border-color: red !important;
        }
    }
}
.ateacherA {
    width: 90%;
    margin-left: 5%;

    th,
    td {
        background-color: #cccccc;
        height: 2rem;
    }
    #nickname {
        width: 6rem;
    }
    #type {
        width: 4rem;
        #get {
            border: #6589b5 0.05rem solid;
            padding: 0.08rem 0.3rem;
            border-radius: 0.05rem;
            // background: transparent;
            background: #6589b5;
            // color: #1c7dfc;
            color: rgb(255, 255, 255);
        }
        #send {
            color: #e6912c;
        }
        #pass {
            // color: #018501;
            color: #9e9e9e;
        }
        #refuse {
            // color: #fa5151;
            color: #9e9e9e;
        }
    }
}
</style>