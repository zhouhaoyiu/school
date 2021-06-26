<!--  -->
<template>
    <div class="">
        <table border="0" class="aclassM">
            <tr v-once>
                <th id="number">编号</th>
                <th id="className">班级名称</th>
                <th id="type">类型</th>
                <th id="teacher">老师</th>
                <th id="time">上课时间</th>
                <th id="startDate">开课日期</th>
                <th id="endDate">结课日期</th>
                <th id="type">状态</th>
                <th id="manage">管理</th>
            </tr>
            <tr
                v-for="n in currentData"
                v-bind:key=""
                v-bind:class="{
                    grey: n.status == 2,
                }"
            >
                <td id="number">{{ n.id }}</td>
                <td id="className">
                    {{ n.className }}
                </td>
                <td id="type">
                    <span v-if="n.classType == 1"> 线上课 </span>
                    <span v-if="n.classType == 2"> 线下课 </span>
                    <span v-if="n.classType == 3"> 结合课 </span>
                </td>
                <td id="teacher"><span v-for='i in n.teachers'>{{ i.teacher_realname }}</span></td>
                <td id="time">
                    {{ n.classTime }}
                </td>
                <td id="startDate">
                    {{ n.startTime }}
                </td>
                <td id="endDate">{{ n.endTime }}</td>
                <td id="type">
                    <!-- <span v-if="checkTime(n.endDate)"> 开课中 </span>
                    <span v-if="!checkTime(n.endDate)"> 已结课 </span> -->
                    <span v-if="checkTime(n.endTime)"> 开课中 </span>
                    <span v-if="!checkTime(n.endTime)"> 已结课 </span>
                </td>
                <td id="manage">
                    <!-- <button v-if="checkTime(n.endDate)">
                                                <span>编辑信息</span>
                                            </button> -->
                    <button @click="viewStudents(n.id)">
                        <span>查看学生</span>
                    </button>
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
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        changeTopBtn: Number,
        changeBottomBtn: Number
    },
    data() {
        return {
            page: 1,
            pageSize: 13,
            tableData3: [],

        };
    },
    methods: {
        pageChange(val) {
            this.page = val
        },
        checkTime(e) {
            let a = new Date(e)
            let timeNow = new Date()
            timeNow = new Date(`${timeNow.getFullYear()}-
            ${timeNow.getMonth() + 1}-
            ${timeNow.getDate()} 0:0:0
        `)
            // console.log(a);
            if ((parseInt(timeNow.getTime() / 1000) - parseInt(a.getTime() / 1000)) > 0)
                return false;
            return true;


        },
        viewStudents(classId) {
            let school_id = this.$route.params.schoolId
            let identity = this.$route.params.scRole

            this.GLOBAL.gotoSchool_n('tstudentV', null, [], { replaceParams: { params1: school_id, params2: identity, params3: classId } })
            if (identity == 1) {
                this.$emit('update', {
                    changeTopBtn: 3,
                    changeBottomBtn: 1
                })
            }
            if (identity == 0) {
                this.$emit('update', {
                    changeTopBtn: 2,
                    changeBottomBtn: 0
                })
            }

        },
        async HandMounted() {
            let options = {
                url: '/classes/info/teacher_username/' + this.$store.state.username,
                method: 'GET'
            }
            let response = await this.GLOBAL.request('school', options)
            if (response) {
                this.tableData3 = response.data
            }
        }
    },
    created() {

    },
    components: {
    },
    computed: {
        total() {
            return this.tableData3.length
        },
        currentData() {
            let list = this.tableData3.slice() || []
            let size = this.pageSize
            let page = this.page - 1
            return list.splice(page * size, size)
        }
    },
    watch: {},
    mounted() {
        this.HandMounted()
    },

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
.aclassM {
    width: 90%;
    margin-left: 5%;
    th,
    td {
        background-color: #cccccc;
        height: 2rem;
    }
    tr.grey {
        td {
            color: #818181;
        }
    }
    #manage {
        button {
            cursor: pointer;
            border: #6589b5 0.05rem solid;
            padding: 0.08rem 0.3rem;
            border-radius: 0.15rem;
            margin-right: 0.15rem;
            // background: transparent;
            background: #6589b5;
            // color: #1c7dfc;
            color: rgb(255, 255, 255);
        }
    }
}
</style>