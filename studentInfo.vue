<!--  -->
<template>
    <div class="">
        <div class="tInfo">
            <div class="topInfo">
                <img
                    style="width: 1.2rem; height: 1.2rem"
                    src="./student.png"
                    alt=""
                />
                <p>学生身份信息</p>
            </div>
            <div class="divider"></div>

            <div class="infoMain">
                <div class="info">
                    <p>昵称：{{ tableData4.nickName }}</p>
                    <p>真实姓名：{{ tableData4.trueName }}</p>
                    <p>棋力：{{ tableData4.level }}</p>

                    <p>出生日期：{{ tableData4.birth }}</p>
                    <p>联系方式：{{ tableData4.tel }}</p>
                    <p>
                        班级：<span v-for="n in tableData4.course" v-bind:key=""
                            >{{ n.name }}--{{ n.teacher }}<br
                        /></span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    props: {},
    data() {
        return {
            schoolId: this.$route.params.schoolId,
            tableData4: {
                nickName: 'zhouhaoyu',
                trueName: '周浩宇',
                level: '9D',
                birth: '2000-6-30',
                tel: 18811713109,
                course: [
                    {
                        name: '入门练习',
                        teacher: '测试A'
                    },
                    {
                        name: '入门练习',
                        teacher: '测试b'
                    },
                    {
                        name: '入门练习',
                        teacher: '测试*#￥**@'
                    },
                ]
            },
        };
    },
    methods: {
        async HandMounted() {
            let options = {
                url: '/students/info/schoolId' + this.schoolId + '/username/' + this.$store.state.username,
                method: 'GET'
            }
            let response = await this.GLOBAL.request('school', options)
            if (response) {
                console.log(response);
            }
        }
    },
    created() {

    },
    components: {
    },
    computed: {},
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
.tInfo {
    .topInfo {
        margin: auto;
        width: 70%;
        display: flex;
        img {
            width: 1rem;
            height: 1rem;
            margin-right: 0.5rem;
        }
        p {
            float: left;
            margin-bottom: 0.5rem;
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
            }
        }
    }
}
</style>