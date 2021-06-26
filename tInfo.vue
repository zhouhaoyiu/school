<!--  -->
<template>
    <div class="tInfo">
        <div class="topInfo">
            <img style="width:1.2rem;height:1.2rem" src="./teacher.png" alt="" />
            <p>教师身份信息</p>
            <div class="btn1">
                    <button v-if='flag == 0' @click="edit()">编辑信息</button>
                    <button v-if='flag == 1' @click="save()">保存</button>
                </div>
        </div>
        
      
        <div class="divider"></div>

        <div class="infoMain">
            <div class="info">
                <!-- <p>{{scRole}}</p> -->
                <p>昵称：{{ nickName }}</p>
                <p>真实姓名：{{ trueName }}</p>
                <p>身份证： <el-image
                        style="max-width: 100%; max-height: 100%"
                        :src="idCardSrc"
                        :preview-src-list="idCardSrcBig"
                    >
                    </el-image>
                     <el-image
                        style="max-width: 100%; max-height: 100%"
                        :src="idCardSrc"
                        :preview-src-list="idCardSrcBig"
                    >
                    </el-image>
                </p>
                <p v-if="flag == 0">棋力：{{ userLevel.name }}</p>
                <p v-if="flag == 1">棋力：
                    <el-select                                 
                            class="it-select"                    
                            v-model="level"                     
                            :popper-append-to-body="false"                     
                            :popper-class="`lives-select-options`"                   
                            :placeholder="$t('请选择')">
                                <el-option
                                    v-for="item in leveldata"
                                    :key="item.value"
                                    :label="$t(item.name)"
                                    :value="$t(item.value)"
                                >
                                    <span>{{ $t(item.name) }}</span>
                                </el-option>
                    </el-select>
                 </p>
                <p v-if="sex=false">性别女</p>
                <p>年龄：{{ age }}</p>
                <p>联系方式：{{ tel }}</p>
                <p>
                    班级：<p v-for="n in course" v-bind:key=""
                        >{{ n.name }}<br
                    /></p>
                </p>
            </div>
        </div>
    </div>
</template>

<script> 

export default {

    name: '',
    props: {
        schoolId: Number,
        scRole: Number
    },
    data() {
        return {
            flag: 0,
            // schoolId: this.$route.params.schoolId,
            nickName: this.$store.state.nickname,
            trueName: '',
            level: null,
            leveldata: [],
            age: '',
            sex: false,
            tel: '',
            course: [
                {
                    name: '',

                },
                {
                    name: '',

                },
                {
                    name: '',

                },
            ]


        };
    },
    methods: {
        levelInit() {
            let list = this.GLOBAL.deepCopy(this.GLOBAL.playerLevelList)
            this.leveldata = list
        },
        async edit() {
            this.flag = 1
        },
        async save() {
            this.flag = 0
            // let options = {
            //     url: '',
            //     method: ''
            // }
            // let response = await this.GLOBAL.request('school', options)
            // if(response){

            // }

        },
        async HandMounted() {
            console.log('HandMounted tInfo');
            let options = {
                url: '/teachers/info/school_id/' + this.schoolId + '/teacher_username/' + this.$store.state.username,
                method: 'GET'
            }
            let response = await this.GLOBAL.request('school', options)
            if (response) {
                this.age = response.data.age
                this.nickName = response.data.nickname
                this.trueName = response.data.realName
                this.tel = response.data.teacherUsername
                this.sex = response.data.gender
                this.level = response.data.userlevel
                this.course = response.data.classes
            }
        }
    },
    created() {

    },
    components: {
    },
    computed: {
        userLevel() {
            let list = this.leveldata
            let val = this.level
            let rd = {}
            for (let i in list) {
                if (list[i].value == val) {
                    rd = list[i]
                    break
                }
            }           
            return rd
        },
    },
    watch: {
        schoolId: async function () {
            let options = {
                url: '/teachers/info/school_id/' + this.schoolId + '/teacher_username/' + this.$store.state.username,
                method: 'GET'
            }
            let response = await this.GLOBAL.request('school', options)
            if (response) {
                this.age = response.data.age
                this.nickName = response.data.nickname
                this.trueName = response.data.realName
                this.tel = response.data.teacherUsername
                this.sex = response.data.gender
                this.level = response.data.userlevel
                this.course = response.data.classes
            }
        }

    },
    mounted() {
        this.HandMounted()
        this.levelInit()
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