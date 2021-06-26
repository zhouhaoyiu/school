<!--  -->
<template>
    <div class="">
        <button
            @click="createTeacherOn"
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
            新增教师
        </button>
        <!--  <el-table
                                :data="tableData"
                                border
                                style="margin-left: 5%; width: 90%"
                            >
                                <el-table-column fixed prop="nickname" label="昵称">
                                </el-table-column>
                                <el-table-column prop="name" label="姓名">
                                </el-table-column>
                                <el-table-column prop="sex" label="性别">
                                </el-table-column>
                                <el-table-column prop="age" label="年龄">
                                </el-table-column>
                                <el-table-column prop="level" label="级别">
                                </el-table-column>
                                <el-table-column
                                    prop="classname"
                                    label="所属班级"
                                >   
                                </el-table-column>
                                <el-table-column prop="type" label="状态">
                                </el-table-column>
                                <el-table-column fixed="right" label="管理">
                                    <template slot-scope="scope">
                                        <el-button
                                            @click="handleClick(scope.row)"
                                            type="text"
                                            size="small"
                                            >查看</el-button
                                        >
                                        <el-button type="text" size="small"
                                            >编辑</el-button
                                        >
                                    </template>
                                </el-table-column>
                            </el-table>
                            -->
        <table border="0" class="ateacherM">
            <tr>
                <th id="nickname">昵称</th>
                <th id="name">姓名</th>
                <th id="sex">性别</th>
                <th id="age">年龄</th>
                <th id="level">级别</th>
                <th id="classname">任教班级</th>
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
                    {{ n.classname }}
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
                    <span v-if="n.type == 1"> 在校 </span>
                    <span v-if="n.type == 2" style="color: #fa5151">
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
        <el-pagination
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="total"
            @current-change="pageChange"
        >
        </el-pagination>
        <le-confirm ref="leConfirm1" @success="handleSuccess">
            <template v-slot:message>
                <div class="addT">
                    <div class="name">
                        <span>新增教师</span>
                    </div>
                    <div class="mainInfo">
                        <!-- <el-select
                            style="
                                width: 4rem;
                                color: black;
                                border-right: none;
                                border-radius: 0px;
                            "
                            size="mini"
                            v-model="value"
                            placeholder="+86"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select> -->
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
                        <button class="search" @click="findTeacher()">
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
                            <button @click="addTeacher()">添加</button>
                        </div>
                    </div>
                </div>
            </template>
        </le-confirm>
        <le-confirm ref="leConfirm2" @success="handleSuccess">
            <template v-slot:message>
                <div class="Infomation">
                    <div style="margin-top: 1.2rem">
                        <span>教师姓名</span>
                        <span
                            style="
                                margin-left: 8rem;
                                right: 4.7rem;
                                position: relative;
                            "
                            >{{ radio10 }}</span
                        >
                    </div>
                    <div style="margin-top: 1.2rem">
                        <span style="position: relative; right: 2.5rem"
                            >状态</span
                        >

                        <input
                            type="radio"
                            v-model="radio10"
                            value="在职"
                        />在职
                        <input
                            type="radio"
                            v-model="radio10"
                            value="离职"
                        />离职
                    </div>
                    <div style="margin: 1.2rem 0rem">
                        <span>任教班级</span>
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
            schoolId: this.$route.params.schoolId || '',
            find: false,
            radio10: '在校',
            countryVal: null,
            tableData1: [],
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
        findTeacher() {
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
            console.log(this.countryVal + '+' + this.searchPhone);
        },
        addTeacher() {
            this.find = false
            this.clearSearchInfo()
        },
        countryCodeChange(val) {
            this.countryVal = val
            console.log(val);
        },
        async createTeacherOn() {

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
        async editBtn() {
            let res = await this.$refs['leConfirm2'].open({
                button: [
                    { name: '确定', label: 0 }
                ]
            })
            res = res || {}
            if (res.label == 0) {
                //
            }
        },
        async HandMounted() {
            let options = {
                url: '/teachers/info/school_id/' + this.schoolId,
                method: 'GET'
            }
            let response = await this.GLOBAL.request('school', options)
            if (response) {
                this.tableData1 = response.data
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
            return this.tableData1.length
        },
        currentData() {
            let list = this.tableData1.slice() || []
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
.addT {
    display: block;
    input {
        background: #ddd;
        outline-style: none;
        border: 1px solid #818181;

        padding: 0.1rem 0.2rem;
        height: 22.5px;
        font-size: 14px;
        // font-weight: 700;
        font-family: "Microsoft soft";
    }
    input:focus {
        border-color: #66afe9;
        outline: 0;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
            0 0 8px rgba(102, 175, 233, 0.6);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
            0 0 8px rgba(102, 175, 233, 0.6);
    }

    .name {
        margin: auto;

        margin-top: 1rem;
        margin-bottom: 1rem;

        span {
            font-size: 20px;
        }
    }

    .mainInfo {
        margin-bottom: 1rem;
        display: flex;
        .search {
            background: #ddd;
            outline-style: none;
            border: 1px solid #ddd;
            // border-radius: 3px;
            padding: 0.1rem 0.2rem;
            margin-left: 0.5rem;
        }
        .country-code-com {
            input {
                height: 1.7rem;
            }
        }
    }

    .query {
        padding-top: 1rem;
        padding-bottom: 1rem;
        margin-bottom: 1rem;
        background: #eee;
        p {
            text-align: left;
            margin-left: 1.5rem;
            margin-top: 0.5rem;
            font-size: 16px;
        }
    }
    .add {
        margin-bottom: 1rem;
        button {
            background-color: #e6912c;
            width: 7rem;
            height: 1.7rem;
            border: 0.1rem solid #dddddd;
            border-radius: 0.3rem;
            padding: 0.1rem 0.4rem;
            color: white;
            cursor: pointer;
        }
    }
}
</style>