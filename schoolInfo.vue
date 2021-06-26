<template>
    <div>
        <div class="tInfo">
            <div class="topInfo">
                <img
                    style="width: 1.2rem; height: 1.2rem"
                    src="./admin.png"
                    alt=""
                />
                <p>棋校信息</p>
                <img
                    v-if="school_status == 1 && scRole == 10"
                    style="
                        width: 0.8rem;
                        height: 0.8rem;
                        margin-top: 0.3rem;
                        margin-left: 0.6rem;
                        margin-right: 0.2rem;
                    "
                    src="./img/type1.png"
                    alt=""
                />
                <span
                    v-if="school_status == 1 && scRole == 10"
                    style="color: #777777; margin-top: 0.15rem"
                    >待审核</span
                >
                <img
                    v-if="school_status == 0 && scRole == 10"
                    style="
                        width: 0.8rem;
                        height: 0.8rem;
                        margin-top: 0.3rem;
                        margin-left: 0.6rem;
                        margin-right: 0.2rem;
                    "
                    src="./img/type3.png"
                    alt=""
                />
                <span
                    v-if="school_status == 0 && scRole == 10"
                    style="color: #00ad21; margin-top: 0.15rem"
                    >已认证</span
                >
                <img
                    v-if="school_status == 2 && scRole == 10"
                    style="
                        width: 0.8rem;
                        height: 0.8rem;
                        margin-top: 0.3rem;
                        margin-left: 0.6rem;
                        margin-right: 0.2rem;
                    "
                    src="./img/type2.png"
                    alt=""
                />
                <span
                    v-if="school_status == 2 && scRole == 10"
                    style="color: #d80000; margin-top: 0.15rem"
                    >认证未通过</span
                >
                <div v-if="school_status == 0 && scRole == 10" class="btn1">
                    <button v-if="flag" @click="edit()">编辑信息</button>
                    <button v-if="!flag" @click="input()">保存</button>
                </div>
                <div v-if="school_status == 2 && scRole == 10" class="btn2">
                    <button
                        style="
                            background: #dddddd;
                            color: black;
                            border: none;
                            width: 5rem;
                            height: 1rem;
                        "
                    >
                        查看原因
                    </button>
                    <button v-if="flag" @click="edit()">立即修改</button>
                    <button v-if="!flag" @click="input()">保存</button>
                </div>
            </div>
            <div class="divider"></div>

            <div class="infoMain">
                <div class="info">
                    <p v-if="flag">棋校名称：{{ scName }}</p>
                    <p v-else>
                        棋校名称：<el-input
                            style="width: 15rem"
                            type="textarea"
                            v-model="scName"
                            :autosize="{ minRows: 1, maxRows: 1 }"
                        />
                    </p>
                    <p v-if="schoolType == 2">类型：企业</p>
                    <p v-if="schoolType == 1">类型：个人</p>
                    <span v-if="scRole == 10 && schoolType == 2">
                        <p>营业执照</p>
                        <p>法人身份证</p>
                        <p>管理员姓名</p>
                        <p>管理员身份证</p>
                    </span>

                    <p v-if="flag">棋校地址：{{ scAddr }}</p>
                    <p v-else>
                        棋校地址：<el-input
                            type="textarea"
                            v-model="scAddr"
                            :autosize="{ minRows: 1, maxRows: 2 }"
                        />
                    </p>
                    <p>学生规模：{{ studentSize }}人</p>
                    <p>教师规模：{{ teacherSize }}人</p>
                    <p v-if="flag">棋校介绍：{{ scIntr }}</p>
                    <p v-else>
                        棋校介绍：<el-input
                            type="textarea"
                            maxlength="500"
                            v-model="scIntr"
                            :autosize="{ minRows: 2, maxRows: 4 }"
                            show-word-limit
                        />
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        this.handMounted()
    },
    created() {

    },
    computed: {

    },
    watch: {
        schoolId: async function () {
            let school_Id = this.schoolId
            let options = {
                url: '/schools/info/school_id/' + school_Id,
                method: 'GET'
            }
            let response = await this.GLOBAL.request('school', options)

            if (response) {
                this.scName = response.data.schoolName
                this.scAddr = response.data.schoolAddress

                this.scIntr = response.data.intro
                this.studentSize = response.data.studentScale
                this.teacherSize = response.data.teacherScale
                this.school_status = response.data.school_status
                this.schoolType = response.data.schoolType
            }
        },
    },
    methods: {
        async handMounted() {
            let school_Id = this.schoolId
            let options = {
                url: '/schools/info/school_id/' + school_Id,
                method: 'GET'
            }
            let response = await this.GLOBAL.request('school', options)

            if (response) {
                this.scName = response.data.schoolName
                this.scAddr = response.data.schoolAddress
                this.scIntr = response.data.intro
                this.studentSize = response.data.studentScale
                this.teacherSize = response.data.teacherScale
                this.school_status = response.data.school_status
                this.schoolType = response.data.schoolType
            }
        },
        handleClick(row) {
            console.log(row);
        },
        edit() {
            this.flag = false;
        },
        async input() {
            this.flag = true;
            let school_id = this.schoolId;

            let options = {
                url: '/school/info/?school_id=' + school_id,
                data: {
                    " id": this.school_id,
                    "name": this.scName,
                    "address": this.scAddr,
                    "intro": this.scIntr,
                    "principalUsername": this.$store.state.username
                },
                method: 'PUT'
            }
            let res = await this.GLOBAL.request('school', options)
            if (res && res.code == 0) {
                this.$message.success('保存成功')
            }
            
        }
    },

    data() {
        return {
            schoolType: 1,
            school_status: 1,
            correct: false,
            flag: true,
            schoolId: this.$route.params.schoolId,
            scName: '',
            scAddr: '',
            scIntr: '',
            teacherSize: '',
            studentSize: ''
        }

    },
    props: {

        scRole: Number
    }

}
</script>

<style lang="less">
.tInfo {
    height: 20rem;
    .topInfo {
        margin: auto;
        width: 70%;

        display: flex;
        justify-content: flex-start;
        img {
            width: 1.2rem;
            height: 1.2rem;
            margin-right: 0.5rem;
        }
        p {
            float: left;
            // margin-top: 0.5rem;
        }
        .btn1 {
            margin-left: auto;
            button {
                cursor: pointer;
                width: 5rem;
                height: 1.5rem;
                // border: 1px solid #ccc;
                border: none;
                // border-radius: 0.2rem;
                outline: none;
                // background: #6589b5;
                background: #ddd;
                color: #333333;
            }
            button:active {
                transform: scale(0.99);
            }
        }
        .btn2 {
            margin-left: auto;
            button {
                cursor: pointer;
                width: 8rem;
                height: 1.8rem;
                border: 1px solid #ccc;
                border-radius: 0.2rem;
                outline: none;
                background: red;
                color: #ffffff;
            }
            button:active {
                transform: scale(0.99);
            }
        }
    }
    .divider {
        margin: auto;
        height: 0.07rem;
        width: 70%;
        background-color: #d5d5d5;
    }
    .infoMain {
        width: 70%;
        margin: auto;
        display: flex;
        .info {
            float: left;
            text-align: left;
            p {
                margin-top: 0.8rem;
                display: flex;
                white-space: nowrap;
            }
            .el-input__inner {
                border: 0;
                background-color: #eee;
            }
            /* 如果你的 el-input type 设置成textarea ，就要用这个了 */
            .el-textarea__inner {
                margin: auto;
                border: 0;
                resize: none;
                background-color: #eee; /* 这个是去掉 textarea 下面拉伸的那个标志，如下图 */
            }
        }
    }
}
// .shows2 {
//     color: #777777;
// }
</style>