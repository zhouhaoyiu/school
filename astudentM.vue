<!--  -->
<template>
    <div class="">
        <button
            @click="createStudentOn"
            style="
                cursor: pointer;
                float: right;
                margin-right: 3rem;
                margin-bottom: 0.5rem;
                background-color: green;
                padding: 0.4rem 1rem;
                color: white;
                border: 0.1rem solid green;
                border-radius: 0.1rem;
            "
        >
            新增学生
        </button>
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
            <tr v-for="n in currentData" v-bind:key="n">
                <td id="nickname">{{ n.nickname }}</td>
                <td id="name">{{ n.realname }}</td>
                <td id="sex">{{ n.gender }}</td>
                <td id="age">{{ n.age }}</td>
                <td id="level">{{ n.user_level }}</td>
                <td id="classname">
                    {{ n.class }}
                </td>
                <td id="tel">{{ n.username }}</td>
                <td id="type">
                    <span v-if="n.status == 1"> 在校 </span>
                    <span v-if="n.status == 2" style="color: #fa5151">
                        离校
                    </span>
                </td>
                <td id="manage">
                    <button @click="editBtn()">
                        <span>编辑</span>
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
        <le-confirm ref="leConfirm" @success="handleSuccess">
            <template v-slot:message>
                <div class="Infomation">
                    <div style="margin-top: 1.2rem"><h1>学生信息编辑</h1></div>
                    <div style="margin-top: 1.2rem">
                        <span>学生姓名</span>
                        <span
                            style="
                                margin-left: 8rem;
                                right: 4.7rem;
                                position: relative;
                            "
                            >{{ stuStatus }}</span
                        >
                    </div>
                    <div style="margin-top: 1.2rem">
                        <span style="position: relative; right: 2.9rem"
                            >状态</span
                        >

                        <input
                            type="radio"
                            v-model="stuStatus"
                            value="在校"
                        />在校
                        <input
                            type="radio"
                            v-model="stuStatus"
                            value="离校"
                        />离校
                    </div>
                    <div style="margin: 1.2rem 0rem">
                        <span>学习班级</span>
                        <el-select
                            style="margin-left: 0.5rem"
                            v-model="value1"
                            multiple
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </template>
        </le-confirm>
        <le-confirm ref="leConfirm1" @success="handleSuccess">
            <template v-slot:message>
                <div class="addT">
                    <div class="name">
                        <span>新增学生</span>
                    </div>
                    <div class="mainInfo">
                        <countryCode
                            style="height: 1.7rem; width: 4rem"
                            ref="countryCode"
                            :value.sync="countryVal"
                            @change="countryCodeChange"
                        ></countryCode>
                        <input
                            style="
                                box-sizing: border-box;
                                height: 1.7rem;
                                width: 16rem;
                                border-left: none;
                                border-radius: 0px;
                            "
                            placeholder="请输入手机号查找"
                            v-model.lazy="searchPhone"
                        />
                        <button @click="findStudent()">
                            <em
                                style="font-size: 24px"
                                class="el-icon-search"
                            ></em>
                        </button>
                    </div>
                    <div class="query">
                        <div class="queryInfo">
                            <p>昵称:xz</p>
                            <p>姓名:周浩宇</p>
                        </div>
                    </div>
                    <div class="add">
                        <div v-if="find">
                            <button @click="addStudent()">添加</button>
                        </div>
                    </div>
                </div>
            </template>
        </le-confirm>
    </div>
</template>

<script>

import countryCode from '../../components/countryCode.vue'
export default {
    name: '',
    props: {},
    data() {
        return {
            searchPhone: '',
            page: 1,
            pageSize: 13,
            classId: this.$route.params.classId || null,
            schoolId: this.$route.params.schoolId,
            find: false,
            stuStatus: '在校',
            countryVal: null,
            studentInfo: [
            ],
        };
    },
    methods: {
        clearSearchInfo() {
            this.countryVal = '0086'
            this.searchPhone = ''
        },
        pageChange(val) {
            this.page = val
        },
        findStudent() {
            if (this.searchPhone == '') {
                this.$message({
                    message: '请输入手机号',
                    type: 'error',
                    duration: 1000
                })
            }
            else {
                this.find = true
            }
        },
        addStudent() {
            this.find = false
            this.clearSearchInfo()
        },
        countryCodeChange(val) {
            this.countryVal = val
        },
        async editBtn() {
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
        async createStudentOn() {
            let res = await this.$refs['leConfirm1'].open({
                // button: [
                //     { name: '确定', label: 0 }
                // ]
            })
            if (!res) {
                this.clearSearchInfo()
            }
            res = res || {}
            if (res.label == 0) {
                //
            }
        },

        async mountedHand() {
            if (this.classId == null) {
                let options = {
                    url: '/students/info/school_id/' + this.schoolId,
                    method: 'GET'
                }
                let response = await this.GLOBAL.request('school', options)

                this.studentInfo = response.data
               
            }
            if (this.classId != null) {
                let options = {
                    url: '/students/info/school_id/' + this.schoolId + '/class_id/' + this.classId,
                    method: 'GET'
                }
                let response = await this.GLOBAL.request('school', options)

                this.studentInfo = response.data

               
            }

        }
    },
    created() {
        //
    },
    components: {
        countryCode
    },
    computed: {
        total() {
            return this.studentInfo.length
        },
        currentData() {
            let list = this.studentInfo.slice() || []
            let size = this.pageSize
            let page = this.page - 1
            return list.splice(page * size, size)
        }
    },
    watch: {

    },
    mounted() {
        this.mountedHand()

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
.Infomation {
    width: 100%;
    height: 100%;
}

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