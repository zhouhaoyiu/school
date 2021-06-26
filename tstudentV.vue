<!--  -->
<template>
    <div class="">
        <table class="ateacherM" border="0">
            <tr>
                <th id="nickname">昵称</th>
                <th id="name">姓名</th>
                <th id="sex">性别</th>
                <th id="age">年龄</th>
                <th id="level">级别</th>
                <th id="classname">学习班级</th>
                <th id="tel">联系电话</th>
                <th id="type">状态</th>
                <th id="manage">管理</th>
            </tr>
            <tr v-for="(n, index) in currentData" v-bind:key="">
                <td id="nickname">{{ n.nickname }}</td>
                <td id="name">{{ n.name }}</td>
                <td id="sex">{{ n.sex }}</td>
                <td id="age">{{ n.age }}</td>
                <td id="level">{{ n.level }}</td>
                <td id="classname">
                    {{ n.classId }}
                </td>
                <td id="tel">{{ n.tel }}</td>
                <td id="type">
                    <!-- <el-select
                                            v-model="value"
                                            placeholder="请选择"
                                        >
                                            <el-option
                                                v-for="item in options"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                            >
                                            </el-option>
                                        </el-select> -->
                    <!-- <option value="css">离校</option> -->
                    <span v-if="n.studentStatus == 0"> 在校 </span>
                    <span v-if="n.studentStatus == 1" style="color: #fa5151">
                        离校
                    </span>
                </td>
                <td id="manage">
                    <button onclick="viewM()">
                        <span>查看棋谱</span>
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
    props: {},
    data() {
        return {
            page: 1,
            pageSize: 13,
            classId: this.$route.params.classId || '',
            tableData1: [],
        };
    },
    methods: {
        pageChange(val) {
            this.page = val
        },
        async HandMounted() {
            if (this.classId === null) {
                let options = {
                    url: '/students/info/school_id/' + this.$route.params.schoolId + '/teacher_username/' + this.$store.state.username,
                    method: 'GET'
                }
                let response = await this.GLOBAL.request('school', options)
                if (response) {
                    this.tableData1 = response.data
                }
            }
            if (this.classId != null) {
                let options = {
                    url: '/students/info/school_id/' + this.$route.params.schoolId + '/teacher_username/' + this.$store.state.username + '/class_id/' + this.$route.params.classId,
                    method: 'GET'
                }
                let response = await this.GLOBAL.request('school',options)
                if(response){
                    this.tableData1 = response.data
                }
            }
        }

    },
    created() {

    },
    components: {
    },
    computed: {
        total() {
            return this.tableData1.length
        },
        currentData() {
            let list = this.tableData1.slice() || []
            let size = this.pageSize
            let page = this.page - 1
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
        //生命周期 - 销毁之前
    },
    destroyed() {
        //生命周期 - 销毁完成
    },
    activated() {
        //如果页面有keep-alive缓存功能，这个函数会触发
    }
}
</script>
<style lang='less' >
.ateacherM {
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
    #name,
    #sex,
    #age,
    #level,
    #type,
    #manage {
        width: 4rem;
    }
    #classname {
        width: 12rem;
    }
    #tel {
        width: 6.5rem;
    }
    #type {
        span {
            color: #018501;
        }
    }
    #manage {
        button {
            border: 0.05rem solid #cccccc;
            border-radius: 10rem;

            padding: 0.25rem 0.5rem;
            background: #cccccc;
            span {
                color: #000;
            }
        }
    }
}
</style>