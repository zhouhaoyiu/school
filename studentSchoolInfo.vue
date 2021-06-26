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
            </div>

            <div class="divider"></div>

            <div class="infoMain">
                <div class="info">
                    <p v-if="flag">棋校名称：{{ scName }}</p>
                    <p>棋校地址：{{ scAddr }}</p>
                    <p>学生规模：{{ studentSize }}人</p>
                    <p>教师规模：{{ teacherSize }}人</p>
                    <p>棋校介绍：{{ scIntr }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        this.HandMounted()
    },
    created() {

    },
    computed: {

    },
    watch: {
        schoolId: async function () {
            let schoolId = this.schoolId
            let options = {
                url: '/school/info' + schoolId,
                method: 'GET'
            }
            let response = await this.GLOBAL.request('school', options)
            if (response) {
                this.scName = response.data.name
                this.scAddr = response.data.address
                this.scIntr = response.data.intro
                this.studentSize = response.data.studentSize
                this.teacherSize = response.data.teacherSize
                this.schoolStatus = response.data.schoolStatus
            }

        }
    },
    methods: {
        async HandMounted() {
            let schoolId = this.schoolId
            let options = {
                url: '/school/info/' + schoolId,
                method: 'get'
            }
            let response = await this.GLOBAL.request('school', options)
            if (response) {
                console.log(response);
                this.scName = response.data.schoolName
                this.scAddr = response.data.address
                this.scIntr = response.data.intro
                this.studentSize = response.data.scaleTeacher
                this.teacherSize = response.data.scaleStudent
                this.schoolStatus = response.data.schoolStatus
            }
        }
    },


    data() {
        return {
            schoolStatus: '',
            schoolId: this.$route.params.schoolId,
            scName: '',
            scAddr: '',
            scIntr: '',
            teacherSize: null,
            studentSize: null
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