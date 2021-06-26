<!--  -->

<template>
    <div class="authen-step-select">
        <div class="authen-select">
            <div
                class="select-item"
                v-for="(v, i) in authenType.data"
                :key="i"
                :class="v.css"
            >
                <div class="select-item-body" @click="authenTypeClick(v)">
                    <div class="select-content flex-center">
                        <div class="item-img flex-center">
                            <img :src="v.icon" alt="" />
                        </div>
                        <div class="item-txt flex-center">
                            <span class="txt">{{ $t(v.name) }}</span>
                        </div>
                    </div>
                    <div class="item-intr">
                        <div style="margin: auto;height: 50%;top: 15%;position: relative;">
                            <span
                                >{{v.intr1}}<br />{{v.intr2}}</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--<div class="authen-options">
            <div class="create-group-box">
                <div class="create-group-body">
                    <div class="link-item">
                        <router-link
                            :to="`${GLOBAL.pageList.school.authenticate.personal}`"
                           
                        >
                            <authenSubTitle
                                title="查看个人认证信息"
                                :icon="''"
                            ></authenSubTitle>
                        </router-link>
                    </div>
                    <div class="link-item">
                        <router-link
                            :to="`${GLOBAL.pageList.authenticate.create}`"
                        >
                            <authenSubTitle
                                title="创建机构"
                                :icon="`${GLOBAL.assetsUrl}/img/ce5.png`"
                                :underLine="true"
                            ></authenSubTitle>
                        </router-link>
                    </div> 
                </div>
            </div>
        </div>-->
        <div class="user-message-area">
            <div class="user-message-area-body">
                <userMessage ref="userMessage"></userMessage>
            </div>
        </div>
    </div>
</template>

<script>
import ce3 from './img/ce3.png'
import ce4 from './img/ce4.png'
import ce5 from './img/ce5.png'
import authenSubTitle from './authenSubTitle.vue'
import userMessage from './userMessage.vue'

export default {
    name: 'authenStepSelect',
    props: {},
    data() {
        return {
            authenType: {
                data: [
                    { name: '我是学生', icon: ce3, css: 'student', fun: 'gotoStudent',intr1:'绑定机构后可获得学生权限',intr2:'适用于机构学生' },
                    { name: '我是老师', icon: ce4, css: 'teacher', fun: 'gotoTeacher',intr1:'绑定机构后可获得教师权限',intr2:'适用于机构教师' },
                    { name: '我是机构管理员', icon: ce5, css: 'group', fun: 'gotoCreate',intr1:'创建机构后将成为该机构管理员',intr2:'适用于机构负责人或个体老师' },
                ]
            },
        };
    },
    methods: {
        authenTypeClick(val) {
            if (!val || !val.fun || !this[val.fun]) return
            this[val.fun](val)
        },
        gotoTeacher() {
            this.GLOBAL.gotoAuthen('teacher')
        },
        gotoStudent() {
            this.GLOBAL.gotoAuthen('student')
        },
        gotoCreate() {
            this.$router.push('/engine/school/authenticate/create')
        }
    },
    created() {
        //
    },
    components: {
        authenSubTitle,
        userMessage
    },
    computed: {},
    watch: {},
    mounted() { },
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
@itemSizeWidth: 13rem;
@itemSizeHeight: 8rem;
@itemMargin: 1rem;
.authen-step-select {
    .authen-select {
        display: flex;
        justify-content: center;
        .select-item:last-child {
            margin: 0px;
        }
        .select-item {
            margin-right: @itemMargin;
            .select-item-body {
                border: 0.05rem solid #c1c1c1;
                border-radius: 0.5rem;
                .select-content {
                    display: flex;
                    align-items: flex-end;
                    height: 60%;
                }
                cursor: pointer;
                width: @itemSizeWidth;
                height: @itemSizeHeight;

                align-items: center;
                justify-content: center;

                .item-img {
                    float: left;
                    height: 100%;
                    width: 35%;
                    justify-content: flex-end;
                    align-items: flex-end;
                    img {
                        height: 3rem;
                        width: 3rem;
                    }
                }
                .item-txt {
                    float: left;
                    height: 100%;
                    width: 70%;
                    justify-content: flex-start;
                    //  align-items: flex-end;
                    span {
                        font-size: 1rem;
                        font-weight: 600;
                        padding-left: 0.68rem;
                        position: relative;
                        top: 0.8rem;
                    }
                }
                .item-intr {
                    float: left;
                    height: 40%;
                    width: 100%;
                    justify-items: center;
                    span {
                        color: #b3b3b3;
                        font-size: 0.6rem;
                    }
                }
            }
        }
    }
    .select-item.student {
        .select-item-body {
            background: #EEEEEE;
            color: #000;
            .item-img {
                // background: url("./ce3.png") no-repeat;
                background-size: 100% 100%;
            }
        }
    }
    .select-item.teacher {
        .select-item-body {
            background: #eee;
            color: #000;
            .item-img {
                background-size: 100% 100%;
            }
        }
    }
    .select-item.group {
        .select-item-body {
            background: #eee;
            color: #000;
            .item-img {
                background-size: 100% 100%;
            }
        }
    }
    .authen-options {
        margin-top: 1rem;
        .create-group-box {
            display: flex;
            justify-content: center;
            .create-group-body {
                width: calc(@itemSizeWidth * 2 + @itemMargin);
                display: flex;
                align-items: flex-end;
                justify-content: flex-end;
                .link-item {
                    margin-right: 0.5rem;
                }
                .link-item:last-child {
                    margin: 0px;
                }
            }
        }
    }
    .user-message-area {
        margin-top: 1rem;
        .user-message-area-body {
            width: 70%;
            margin: 0px auto;
        }
    }
}
</style>