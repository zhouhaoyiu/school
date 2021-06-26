<template>
    <div>
        <button @click="createClassOn()" class="createClassOnBtn">
            新增班级
        </button>
        <table border="0" class="aclassM">
            <tr>
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
                v-bind:key="n"
                v-bind:class="{
                    grey: !checkTime(n.endDate),
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
                    <span v-if="checkTime(n.endTime)"> 开课中 </span>
                    <span v-if="!checkTime(n.endTime)"> 已结课 </span>
                </td>
                <td id="manage">
                    <button
                        v-if="checkTime(n.endTime)"
                        @click="editClass(n.id)"
                    >
                        <span>编辑信息</span>
                    </button>
                    <button @click="AviewStudents(n.id)">
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
        <le-confirm ref="create" @success="handleSuccess">
            <template v-slot:message>
                <div class="createClass">
                    <div style="margin-top: 0.8rem">新增班级</div>
                    <table border="0">
                        <caption></caption>
                        <th scope=""></th>
                        <tr style="margin-top: 0.8rem" class="className">
                            <td class="tdLeft"><span>班级名称</span></td>
                            <td class="tdRight">
                                <input
                                    v-model="createClassName"
                                    style="
                                        background-color: #eeeeee;
                                        border: none;
                                        width: 295px;
                                    "
                                    type="text"
                                />
                            </td>
                        </tr>

                        <tr>
                            <td class="tdLeft"><span>班级类型</span></td>
                            <td class="tdRight">
                                <el-select
                                    size="medium"
                                    v-model="createClassType"
                                    placeholder="请选择"
                                    :popper-append-to-body="false"
                                >
                                    <el-option
                                        v-for="item in classTypes"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </td>
                        </tr>

                        <tr>
                            <td class="tdLeft"><span>任课老师</span></td>
                            <td class="tdRight">
                                <el-select
                                    size="medium"
                                    v-model="createTeachers"
                                    multiple
                                    placeholder="请选择"
                                    :popper-append-to-body="false"
                                >
                                    <el-option
                                        v-for="item in allTeachers"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </td>
                        </tr>

                        <tr>
                            <td class="tdLeft">
                                <span>班级学生{{ createStudents }}</span>
                            </td>
                            <td class="tdRight">
                                <el-select
                                    size="medium"
                                    v-model="createStudents"
                                    multiple
                                    placeholder="请选择"
                                    :popper-append-to-body="false"
                                >
                                    <el-option
                                        v-for="item in allStudents"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </td>
                        </tr>
                        <tr>
                            <td class="tdLeft classDay">
                                <span>上课时间</span>
                            </td>
                            <td class="tdRight">
                                <div style="display: flex">
                                    <div>
                                        <div
                                            class="time-content"
                                            v-for="i in createClasses"
                                            v-bind:key=""
                                            style="
                                                display: flex;
                                                margin-bottom: 0.5rem;
                                            "
                                        >
                                            <el-select
                                                size="medium"
                                                style="width: 4rem"
                                                v-model="i.classDay"
                                                placeholder="请选择"
                                                :popper-append-to-body="false"
                                            >
                                                <el-option
                                                    v-for="item in classDays"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value"
                                                >
                                                </el-option>
                                            </el-select>
                                            <el-time-picker
                                                style="margin-left: 0.3rem"
                                                :popper-class="'time-for-class'"
                                                v-bind:key="i"
                                                is-range
                                                size="small"
                                                v-model="i.classTime"
                                                range-separator="至"
                                                start-placeholder="开始时间"
                                                end-placeholder="结束时间"
                                                placeholder="选择时间范围"
                                                :popper-append-to-body="false"
                                            >
                                            </el-time-picker>
                                        </div>
                                    </div>
                                    <div class="fun" style="">
                                        <div style="height: 100%">
                                            <i
                                                class="el-icon-circle-plus-outline"
                                                @click="addCreateClasses()"
                                            ></i>
                                            <i
                                                v-if="createClasses.length > 1"
                                                class="el-icon-remove-outline"
                                                @click="reduceCreateClasses()"
                                            ></i>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>

                        <tr class="classDate">
                            <td class="tdLeft"><span>开课时间</span></td>
                            <td class="tdRight">
                                <el-date-picker
                                    size="medium"
                                    :popper-class="'time-for-class'"
                                    v-model="createClassDateStart"
                                    align="left"
                                    type="date"
                                    placeholder="选择日期"
                                    :picker-options="createPickerOptionsStart"
                                    :popper-append-to-body="false"
                                >
                                </el-date-picker>
                            </td>
                        </tr>

                        <tr class="classDate">
                            <td class="tdLeft"><span>结课时间</span></td>
                            <td class="tdRight">
                                <el-date-picker
                                    size="medium"
                                    :popper-class="'time-for-class'"
                                    v-model="createClassDateEnd"
                                    align="right"
                                    type="date"
                                    placeholder="选择日期"
                                    :picker-options="createPickerOptionsEnd"
                                >
                                </el-date-picker>
                            </td>
                        </tr>

                        <tr>
                            <td class="tdLeft"><span>备注</span></td>
                            <td class="tdRight">
                                <el-input
                                    type="textarea"
                                    placeholder="请输入内容"
                                    v-model="createNote"
                                    :autosize="{ minRows: 2, maxRows: 10 }"
                                >
                                </el-input>
                            </td>
                        </tr>
                    </table>
                </div>
            </template>
        </le-confirm>
        <le-confirm ref="edit" @success="handleSuccess">
            <template v-slot:message>
                <div class="createClass">
                    <div style="margin-top: 0.8rem">编辑班级</div>
                    <table border="0">
                        <caption></caption>
                        <th scope=""></th>
                        <tr style="margin-top: 0.8rem" class="className">
                            <td class="tdLeft"><span>班级名称</span></td>
                            <td class="tdRight">
                                <input
                                    v-model="editClassName"
                                    style="
                                        background-color: #eeeeee;
                                        border: none;
                                        width: 295px;
                                    "
                                    type="text"
                                />
                            </td>
                        </tr>

                        <tr>
                            <td class="tdLeft"><span>班级类型</span></td>
                            <td class="tdRight">
                                <el-select
                                    size="medium"
                                    v-model="editClassType"
                                    placeholder="请选择"
                                    :popper-append-to-body="false"
                                >
                                    <el-option
                                        v-for="item in classTypes"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </td>
                        </tr>

                        <tr>
                            <td class="tdLeft"><span>任课老师</span></td>
                            <td class="tdRight">
                                <el-select
                                    size="medium"
                                    v-model="editTeachers"
                                    multiple
                                    placeholder="请选择"
                                    :popper-append-to-body="false"
                                >
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </td>
                        </tr>

                        <tr>
                            <td class="tdLeft"><span>班级学生</span></td>
                            <td class="tdRight">
                                <el-select
                                    size="medium"
                                    v-model="editStudents"
                                    multiple
                                    placeholder="请选择"
                                    :popper-append-to-body="false"
                                >
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </td>
                        </tr>
                        <tr>
                            <td class="tdLeft classDay">
                                <span>上课时间</span>
                            </td>
                            <td class="tdRight">
                                <div style="display: flex">
                                    <div>
                                        <div
                                            class="time-content"
                                            v-for="i in editClasses"
                                            v-bind:key="i"
                                            style="
                                                display: flex;
                                                margin-bottom: 0.5rem;
                                            "
                                        >
                                            <el-select
                                                size="medium"
                                                style="width: 4rem"
                                                v-model="i.classDay"
                                                placeholder="请选择"
                                                :popper-append-to-body="false"
                                            >
                                                <el-option
                                                    v-for="item in classDays"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value"
                                                >
                                                </el-option>
                                            </el-select>
                                            <el-time-picker
                                                style="margin-left: 0.3rem"
                                                :popper-class="'time-for-class'"
                                                v-bind:key="i"
                                                is-range
                                                size="small"
                                                v-model="i.classTime"
                                                range-separator="至"
                                                start-placeholder="开始时间"
                                                end-placeholder="结束时间"
                                                placeholder="选择时间范围"
                                                :popper-append-to-body="false"
                                            >
                                            </el-time-picker>
                                        </div>
                                    </div>
                                    <div class="fun" style="">
                                        <div style="height: 100%">
                                            <i
                                                class="el-icon-circle-plus-outline"
                                                @click="addEditClasses()"
                                            ></i>
                                            <i
                                                v-if="editClasses.length > 1"
                                                class="el-icon-remove-outline"
                                                @click="reduceEditClasses()"
                                            ></i>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>

                        <tr class="classDate">
                            <td class="tdLeft"><span>开课时间</span></td>
                            <td class="tdRight">
                                <el-date-picker
                                    size="medium"
                                    :popper-class="'time-for-class'"
                                    v-model="editClassDateStart"
                                    align="left"
                                    type="date"
                                    placeholder="选择日期"
                                    :picker-options="editPickerOptionsStart"
                                    :popper-append-to-body="false"
                                >
                                </el-date-picker>
                            </td>
                        </tr>

                        <tr class="classDate">
                            <td class="tdLeft"><span>结课时间</span></td>
                            <td class="tdRight">
                                <el-date-picker
                                    size="medium"
                                    :popper-class="'time-for-class'"
                                    v-model="editClassDateEnd"
                                    align="right"
                                    type="date"
                                    placeholder="选择日期"
                                    :picker-options="editPickerOptionsEnd"
                                >
                                </el-date-picker>
                            </td>
                        </tr>

                        <tr>
                            <td class="tdLeft"><span>备注</span></td>
                            <td class="tdRight">
                                <el-input
                                    type="textarea"
                                    placeholder="请输入内容"
                                    v-model="editNote"
                                    :autosize="{ minRows: 2, maxRows: 10 }"
                                >
                                </el-input>
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
        changeTopBtn: Number,
        changeBottomBtn: Number
    },
    data() {
        return {
            createPickerOptionsStart: {
                disabledDate: time => {
                    return time.getTime() > this.createClassDateEnd
                }

            },
            createPickerOptionsEnd: {
                disabledDate: time => {
                    return time.getTime() < this.createClassDateStart
                }
            },
            editPickerOptionsStart: {
                disabledDate: time => {
                    return time.getTime() > this.editClassDateEnd
                }

            },
            editPickerOptionsEnd: {
                disabledDate: time => {
                    return time.getTime() < this.editClassDateStart
                }
            },
            allTeachers: [],
            allStudents: [],
            page: 1,
            pageSize: 13,

            classDays: [
                {
                    value: '星期一',
                    label: '星期一'
                },
                {
                    value: '星期二',
                    label: '星期二'
                },
                {
                    value: '星期三',
                    label: '星期三'
                },
                {
                    value: '星期四',
                    label: '星期四'
                },
                {
                    value: '星期五',
                    label: '星期五'
                },
                {
                    value: '星期六',
                    label: '星期六'
                },
                {
                    value: '星期日',
                    label: '星期日'
                }
            ],


            createClasses: [
                {
                    classDay: '星期一',
                    classTime: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
                }
            ],
            editClasses: [
                {
                    classDay: '星期一',
                    classTime: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
                }
            ],

            createClassName: '',
            createClassDateStart: new Date(),
            createClassDateEnd: new Date(),
            createClassType: '线上课',
            createTeachers: [

            ],
            createStudents: [

            ],
            createNote: '',
            editNote: '',

            editClassName: '',
            editClassType: '线上课',
            editClassDateStart: new Date(),
            editClassDateEnd: new Date(),

            editTeachers: [{

            }],
            editStudents: [{

            }],

            classTypes: [{
                value: '1',
                label: '线上课'
            }, {
                value: '2',
                label: '线下课'
            },
            {
                value: '3',
                label: '结合课'
            }
            ],


            value: '',
            schoolId: this.$route.params.schoolId,
            number: 1,
            note: '',
            classInfo: [],
        };
    },
    methods: {
        // async GetClass() {
        //     let res = await this.GLOBAL.adminGetClass(this.schoolId)
        // },
        async sendCreateClass() {
            // async this.GLOBAL
        },
        async getClass() {

        },
        clearCreateInfo() {
            this.createClassName = ''
            this.createTeachers = ''
            this.createStudents = ''
            this.createNote = ''
        },
        clearEditInfo() {
            this.editClassName = ''
        },
        pageChange(val) {
            this.page = val
        },

        reduceCreateClasses() {
            this.createClasses.pop()
        },
        addCreateClasses() {
            this.createClasses.push({
                classDay: '星期一',
                classTime: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
            })
        },

        reduceEditClasses() {
            this.editClasses.pop()
        },
        addEditClasses() {
            this.editClasses.push({
                classDay: '星期一',
                classTime: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
            })
        },

        async createClassOn() {
            let res = await this.$refs['create'].open({
                button: [
                    { name: '确定', label: 0 }
                ]
            })
            if (!res)
                return
            res = res || {}
            if (this.CreateClassName == '') {
                this.$message({
                    message: '请输入完整信息',
                    type: 'error',
                    duration: 1000
                })

                return this.createClassOn()
            }

            if (res.label == 0) {
                let classCode = 0
                if (this.createClassType == '线上课') {
                    classCode = 1
                }
                else if (this.createClassType == '线下课') {
                    classCode = 2
                }
                else if (this.createClassType == '结合课') {
                    classCode = 3
                }
                let start_time = String(this.createClassDateStart.getFullYear() + '-'
                    + this.createClassDateStart.getMonth() + '-' + this.createClassDateStart.getDate())
                let end_time = String(this.createClassDateEnd.getFullYear() + '-'
                    + this.createClassDateEnd.getMonth() + '-' + this.createClassDateEnd.getDate())
                let CreateClasses = this.createClasses

                let stringCreateclasses = ''

                for (let i in CreateClasses) {
                    stringCreateclasses = String(stringCreateclasses + CreateClasses[i].classDay + '@')
                    for (let j in CreateClasses[i].classTime) {

                        CreateClasses[i].classTime[j] = String(CreateClasses[i].classTime[j].getHours() +
                            '-' + CreateClasses[i].classTime[j].getMinutes())
                        stringCreateclasses = String(stringCreateclasses + CreateClasses[i].classTime[j] + '&')

                    }

                }

                let data = {

                }
                let options = {
                    url: '/classes/info/',
                    method: 'POST',
                    data: {
                        school_Id: this.$route.params.schoolId,
                        class_name: this.createClassName,
                        classType: classCode,
                        class_desc: this.createNote,
                        class_time: stringCreateclasses,
                        start_time: start_time,
                        end_time: end_time
                    },
                }
                let response = await this.GLOBAL.request('school', options)


                for (let i in createTeachers) {

                }
                this.clearCreateInfo()
            }
        },

        async editClass(id) {
            let options = {
                url: '/classes/info/' + id,
                method: 'GET'
            }
            let response = await this.GLOBAL.request('school', options)


            let res = await this.$refs['edit'].open({
                button: [
                    { name: '确定', label: 0 }
                ]
            })
            res = res || {}
            if (res.label == 0) {
                //

            }
        },
        //判断时间
        checkTime(e) {
            let a = new Date(e)
            let timeNow = new Date()
            timeNow = new Date(`${timeNow.getFullYear()}-
            ${timeNow.getMonth() + 1}-
            ${timeNow.getDate()} 0:0:0
        `)
            if ((parseInt(timeNow.getTime() / 1000) - parseInt(a.getTime() / 1000)) > 0)
                return false;
            return true;
        },

        AviewStudents(classId) {
            let school_id = this.$route.params.schoolId
            let identity = this.$route.params.scRole
            //跳转到学生管理页，传入classId
            this.GLOBAL.gotoSchool_n('astudentM', null, [], { replaceParams: { params1: school_id, params2: identity, params3: classId } })
            //更新顶部列表
            this.$emit('update', {
                changeTopBtn: 3,
                changeBottomBtn: 0
            })
        },
        async mountedHand() {
            let options = {
                url: '/classes/info/school_id/' + this.schoolId,
                method: 'GET'
            }
            let response = await this.GLOBAL.request('school', options)
            this.classInfo = response.data

            let options2 = {
                url: '/students/info/school_id/' + this.schoolId,
                method: 'GET'
            }

            let response2 = await this.GLOBAL.request('school', options2)
            for (let i in response2.data) {
                this.allStudents.push({
                    value: response2.data[i].realName,
                    label: response2.data[i].realName

                })
            }

            let options3 = {
                url: '/teachers/info/school_id/' + this.schoolId,
                method: 'GET'
            }
            let response3 = await this.GLOBAL.request('school', options3)
            for (let i in response3.data) {
                this.allTeachers.push({
                    value: response3.data[i].realName,
                    label: response3.data[i].realName

                })
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
            return this.classInfo.length
        },
        currentData() {
            let list = this.classInfo.slice() || []
            let size = this.pageSize
            let page = this.page - 1
            return list.splice(page * size, size)
        }
    },
    watch: {},
    mounted() {
        this.mountedHand()
    },
    beforeCreate() {//生命周期 - 创建之前 
    },
    beforeMount() { //生命周期 - 挂载之前
    },
    beforeUpdate() {//生命周期 - 更新之前 
    },
    updated() {//生命周期 - 更新之后 
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

<style lang="less">
.createClassOnBtn {
    cursor: pointer;
    float: right;
    margin-right: 3rem;
    margin-bottom: 0.5rem;
    background-color: green;
    padding: 0.4rem 1rem;
    color: white;
    border: 0.1rem solid green;
    border-radius: 0.1rem;
}
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

.createClass {
    .el-input__inner,
    .el-range-input {
        background-color: #eeeeee;
        border: none;
    }
    .classDay {
        display: inline;
    }
    table {
        margin: 1rem auto;
    }
    td {
        height: 2rem;
    }
    .tdLeft {
        padding: 0.2rem;
        width: 4rem;
    }
    .tdRight {
        padding: 0.2rem;
        text-align: left;
        width: 10rem;
        .fun {
            align-self: center;
        }
    }
    .el-range-editor--small.el-input__inner {
        height: 36px;
    }
    .el-range-separator {
        padding: 0;
    }
    .el-textarea__inner {
        margin: auto;
        border: 0;
        resize: none;
        background-color: #eee; /* 这个是去掉 textarea 下面拉伸的那个标志，如下图 */
    }
}
</style>

