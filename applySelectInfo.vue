<template>
    <div class="theme-engine-ready-panel-bcg engine-word-page">
        <div class="document-page-content-web page-box">
            <div class="training-list">
                <div class="training-list-title">
                    <lePageTitle
                        :icon="`${GLOBAL.assetsUrl}/img/enm13_dark.png`"
                        message="棋校信息"
                    >
                        <template v-slot:webclass>
                            <div
                                class="webclass-info txt link"
                                @click="
                                    $router.push('/engine/school/applySelect')
                                "
                            >
                                {{ $t("回到列表") }}
                            </div>
                        </template>
                    </lePageTitle>
                </div>
                <div class="training-list-content engine-use-content-common">
                    <div class="tInFo">
                        <div class="topInfo">
                            <img
                                style="width: 1.2rem; height: 1.2rem"
                                src="./admin.png"
                                alt=""
                            />
                            <p>{{ $t("棋校信息") }}</p>
                            <img
                                v-if="schoolStatus == 1"
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
                                v-if="schoolStatus == 1"
                                style="color: #777777; margin-top: 0.15rem"
                                >{{ $t("待审核") }}</span
                            >
                            <img
                                v-if="schoolStatus == 0"
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
                                v-if="schoolStatus == 0"
                                style="color: #00ad21; margin-top: 0.15rem"
                                >{{ $t("已认证") }}</span
                            >
                            <img
                                v-if="schoolStatus == 2"
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
                                v-if="schoolStatus == 2"
                                style="color: #d80000; margin-top: 0.15rem"
                                >{{ $t("认证未通过") }}</span
                            >
                        </div>
                        <div class="divider"></div>
                        <div class="infoMain">
                            <div class="info">
                                <p>棋校名称：{{ scName }}</p>
                                <p>类型：企业</p>
                                <span>
                                    <p>营业执照</p>
                                    <p>法人身份证</p>
                                    <p>管理员姓名</p>
                                    <p>管理员身份证</p>
                                </span>
                                <p>棋校地址：{{ scAddr }}</p>
                                <p>学生规模：{{ studentSize }}人</p>
                                <p>教师规模：{{ teacherSize }}人</p>
                                <p v-if="flag">
                                    棋校介绍：{{ scIntr }}--{{ scRole }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
            schoolStatus: '',
            schoolId: this.$route.params.schoolId,
            scName: '',
            scAddr: '',
            scIntr: '',
            teacherSize: null,
            studentSize: null
        };
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
                this.scName = response.data.schoolName
                this.scAddr = response.data.address
                this.scIntr = response.data.intro
                this.studentSize = response.data.scaleTeacher
                this.teacherSize = response.data.scaleStudent
                this.schoolStatus = response.data.schoolStatus
            }
        }
    },
    created() {
        //
    },
    components: {
    },
    computed: {
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
.tInFo {
    margin-top: 3rem;
    width: 100%;
    height: 100%;
    height: 20rem;
    .topInfo {
        margin: auto;
        width: 70%;

        display: flex;
        justify-content: flex-start;
        img {
            width: 1.2rem;
            height: 1.2rem;
            margin-right: 0.3rem;
        }
        p {
            float: left;
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
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
                // color: #ffffff;
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
</style>