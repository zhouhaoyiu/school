<!--  -->
<template>
    <div class='authen-user-message'>
        <ul class="apply-body">
            <li class="apply-item" v-for="(v, i) in messageList" :key="i" :class="{'handl': v.status != 0}">
                <div class="it content">
                    <div class="content-item label"></div>
                    <div class="content-c" v-if="v.messageData">
                        <p class="content-item">{{$t(v.messageData.title)}}</p>
                        <p class="content-item" v-for="(s, j) in v.messageData.message" :key="j">{{$t(s)}}</p>
                    </div>
                </div>
                <div class="it fun" v-if="!v.noneFun && !v.statusTxt">
                    <div class="fun-item">
                        <el-button class="refuse" @click="refuseApply(v)">
                            <span class="txt">{{$t('拒绝')}}</span>
                        </el-button>
                    </div>
                    <div class="fun-item">
                        <el-button class="agree" @click="agreeApply(v)">
                            <span class="txt">{{$t('同意')}}</span>
                        </el-button>
                    </div>
                </div>
                <div class="it fun-txt" v-if="v.statusTxt">
                    <span class="txt">{{v.statusTxt}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
// 0: 学校添加老师
// 1: 学校添加学生
// 2: 老师绑定学校
// 3: 学生绑定学校
// 4: 学校管理员申请创建学校
    export default {
        name: '',
        props: {},
        data() {
            let groupLabel = `%schoolName%`
            let nameLabel = `%username%`
            return {
                groupLabel: groupLabel,
                nameLabel: nameLabel,
                userMessage: null,
                messageTypeList: {
                    '0': {title: '机构', message: [groupLabel, '添加您为老师']},
                    '1': {title: '机构', message: [groupLabel, '添加您为学生']},
                    '2': {title: '老师', message: [nameLabel, '申请绑定', groupLabel]},
                    '3': {title: '学生', message: [nameLabel, '申请绑定', groupLabel]},
                    '4': {title: '机构', message: ['您申请创建的机构', groupLabel, '资料已提交，请耐心等待审核结果'], noneFun: true},
                }
            };
        },
        methods: {
            async pageInit(){
                await this.userCertInit()
                await this.userMessageInit()

            },
            async userCertInit(){
                let res = await this.GLOBAL.userCertInfo()
                console.log(res)
            },
            async userMessageInit(){
                this.LOADING.open()
                this.userMessage = null
                let res = await this.GLOBAL.schoolUserMessage()
                if(res && res.code == 0){
                    this.userMessage = res.data
                }
                this.LOADING.close()
            },
            messageDataGet(data){
                let list = this.messageTypeList
                if(!list[data.type]) return null
                console.log(list[data.type])
                let msgList = list[data.type].message
                if(!this.GLOBAL.isArray(msgList)) msgList = [msgList]
                for(let i in msgList){
                    if(this.groupLabel !== msgList[i] && this.nameLabel !== msgList[i]) continue
                    let key = this.groupLabel == msgList[i] ? this.groupLabel : this.nameLabel
                    key = key.replace(/%/g, '')
                    if(!data[key]) continue
                    msgList[i] = data[key]
                }
                return list[data.type]
            },
            async refuseApply(val){
                console.log(val)
                let status = await this.messageHandleChecn(val, '拒绝')
                console.log(status)
                if(!status) return
                let res = await this.GLOBAL.refuseSchoolMessage(val.id)
                if(res && res.code == 0){
                    this.GLOBAL.MessageOpen({
                        type: 'success',
                        message: '操作成功'
                    })
                    this.userMessageInit()
                    this.$emit('change')
                }
            },
            async agreeApply(val){
                let status = await this.messageHandleChecn(val, '同意')
                if(!status) return
                let res = await this.GLOBAL.agreeSchoolMessage(val.id)
                if(res && res.code == 0){
                    this.GLOBAL.MessageOpen({
                        type: 'success',
                        message: '操作成功'
                    })
                    this.userMessageInit()
                    this.$emit('change')
                }
            },
            async messageHandleChecn(val, type){
                if(!this.GLOBAL.leConfirm.default) return true
                let messageData = val.messageData
                if(!messageData) return true
                let message = messageData.message
                let msg = `${type} `
                for(let i in message){
                    msg += message[i]
                }
                let res = await this.GLOBAL.leConfirm.default.open({
                    message: `${msg}？`,
                    button: [
                        {name: type, code: 0},
                        {name: '取消', type: 'cancel', code: 1},
                    ]
                })
                if(res && res.code == 0) return true
                return false
            },
        },
        created() {
            this.pageInit()
        },
        components: {
        },
        computed: {
            messageList(){
                let disabledType = {
                    '4': true
                }
                let list = this.userMessage || []
                let rd = []
                for(let i in list){
                    let tem = this.GLOBAL.deepCopy(list[i])
                    let type = `${tem.type}`
                    tem.disabledFun = disabledType[type] ? true : false
                    tem.messageData = this.messageDataGet(tem)
                    tem.noneFun = tem.messageData ? tem.messageData.noneFun : true
                    if(tem.status != 0){
                        tem.statusTxt = tem.status == 1 ? '已同意' : '已拒绝'
                    }
                    rd.push(tem)
                }
                return rd
            },
        },
        watch: {},
        mounted() {},
        beforeCreate() {}, //生命周期 - 创建之前
        beforeMount() {}, //生命周期 - 挂载之前
        beforeUpdate() {}, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        beforeDestroy() {}, //生命周期 - 销毁之前
        destroyed() {}, //生命周期 - 销毁完成
        activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>
<style lang='less' >
    .authen-user-message{
        @agree: #00ad21;
        @refuse: #d80000;
        @handl: #C0C0C0;
        .apply-body{
            .apply-item:last-child{
                margin: 0px;
            }
            .apply-item{
                background: #EAEAEA;
                padding: 0.5rem 1rem;
                margin-bottom: 0.5rem;
                white-space: nowrap;
                display: flex;
                .it{
                    display: flex;
                    align-items: center;
                }
                .it.content{
                    width: 100%;
                    .content-item.label{
                        width: 0.4rem;
                        height: 0.4rem;
                        background: #EA0808;
                        border-radius: 50%;
                        margin-right: 0.5rem;
                        
                    }
                    .content-c{
                        display: flex;
                    }
                    .content-item:last-child{
                        margin: 0px;
                    }
                    .content-item{
                        margin-right: 0.3rem;
                    }
                }
                .it.fun{
                    .fun-item:last-child{
                        margin: 0px;
                    }
                    .fun-item{
                        margin-right: 0.3rem;
                        .el-button{
                            padding: 0px;
                            height: 1.3rem;
                            width: 3.5rem;
                            color: #fff;
                        }
                        .el-button.agree{
                            background: @agree;
                        }
                        .el-button.refuse{
                            background: @refuse;
                        }
                        
                    }
                }
            }
            .apply-item.handl{
                color: @handl;
                .it.content{
                    .content-item.label{
                        background: @handl;
                    }
                }
            }
        }
        .txt.refuse{
            color: @refuse;
        }
        .txt.agree{
            color: @agree;
        }
    }
    
</style>