<!--  -->
<template>
    <div class="class-live-page">
        <router-view
            v-if="pageInit"
            ref="pageNow"
            @takeFun="takeFun"
            @update="update"
            :theme.sync="theme"
            :username.sync="username"
            :coor.sync="coor"
            :userRole.sync="userRole"
            :nickname.sync="nickname"
            :userLevel.sync="userLevel"
            :AISpeed.sync="AISpeed"
            :photo.sync="photo"
            :schoolId.sync="schoolId"
            :scRole.sync="scRole"
        />
    </div>
</template>

<script>

export default {

    name: 'school',
    props: {
        coor: Number,
        username: String,
        theme: String,
        userRole: String,
        photo: String,
        nickname: String,
        userLevel: Number,
        AISpeed: Number,
    },
    data() {
        return {
            schoolId: this.$route.params.schoolId,
            scRole: this.$route.params.scRole,
            // scRole: null,
            pageInit: false
        };
    },
    methods: {

        takeFun(opt) {
            let fun = opt.fun
            if (this[fun]) this[fun](opt.data)
        },
        schoolIdChange(id) {
            this.schoolId = id
        },
        scRoleChange(scRole) {
            const teacher = 20
            // this.scRole = scRole
            if (this.scRole == teacher) {
                this.GLOBAL.gotoSchool_n('tInfo', null, [], { replaceParams: { params1: this.schoolId, params2: this.scRole } })
            }
            else {
                this.GLOBAL.gotoSchool_n('schoolInfo', null, [], { replaceParams: { params1: this.schoolId, params2: this.scRole } })
            }

        },
        update(options) {
            const teacher = 20
            options = options || {}
            for (let i in options) {
                this[i] = options[i]
            }
            if (this.scRole == teacher) {
                this.GLOBAL.gotoSchool_n('tInfo', null, [], { replaceParams: { params1: this.schoolId, params2: this.scRole } })
            }
            else {
                this.GLOBAL.gotoSchool_n('schoolInfo', null, [], { replaceParams: { params1: this.schoolId, params2: this.scRole } })
            }

        },
        setRouteParams() {
            this.schoolId = Number(this.$route.params.schoolId)
            this.scRole = Number(this.$route.params.scRole)
        },
        async mountedHand() {
            const successCode = '0'
            const notloginCode = '03'
            console.log('mountedHand')
            let user_name = this.$store.state.username

            let option = {
                url: '/schools/user/role',
                method: 'GET',
                data: {
                    username: user_name,
                },
            }
            let response = await this.GLOBAL.request('school', option)


            if (response.code == notloginCode) {
                this.$message.error('请先认证您的身份');

                this.$router.push(
                    '/engine/school/authenticate/set/select'
                )
                this.pageInit = true
                console.log('认证身份跳转')
            }
            if (response.code == successCode) {
                this.GLOBAL.info = response.data
                this.scRole = response.data[0].schoolRole
                this.pageInit = true
                console.log('身份跳转')
                this.$router.push('/engine/school/authenticate/info/personal') //用户进入主页
            }
        }
    },
    created() {
        //
    },
    components: {
    },
    computed: {},
    watch: {
        $route: {
            handler() {
                this.setRouteParams()
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {


        // if (!this.$store.state.username) {
        //     this.$message.error('请登录后再使用此功能')
        //     this.$router.push('/engine/login')
        // }
        // else 
        // {
        //     }

            this.mountedHand()
    },
    beforeCreate() {
        //
    }, //生命周期 - 创建之前
    beforeMount() {
        //
    }, //生命周期 - 挂载之前
    beforeUpdate() {
        //
    }, //生命周期 - 更新之前
    updated() {
        ///生命周期 - 更新之后}
    },
    beforeDestroy() {
        //
    }, //生命周期 - 销毁之前
    destroyed() {
        //

    }, //生命周期 - 销毁完成
    activated() {
        //
    }, //如果页面有keep-alive缓存功能，这个函数会触发
}

</script>
<style lang='less' >
.class-live-page {
    .n-txt {
        font-size: 0.7rem;
    }
    .s-txt {
        font-size: 0.6rem;
    }
    .b-txt {
        font-size: 0.85rem;
    }
    .ba-txt {
        font-size: 0.8rem;
    }
}
</style>