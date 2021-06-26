<!--  -->
<template>
    <div class='personal-cert teacher'>
        <div class="authen-teacher-body">
            <div class="authen-teacher-title">
                <authenSubTitle title="个人认证" :icon="`${GLOBAL.assetsUrl}/img/ce4_light.png`"></authenSubTitle>
            </div>
            <div class="authen-teacher-content">
                <div class="item-table">
                    <div class="authen-error-box">
                        <span class="txt recharge-button">{{$t(errorTxt)}}</span>
                    </div>
                    <table class="input-table">
                        <tr>
                            <td class="info-tit">
                                <span class="txt necessary">{{$t('真实姓名')}}：</span>
                            </td>
                            <td class="info-input" :class="{'error': info.realName.error}">
                                <div class="real-name-box">
                                    <el-input v-model="info.realName.value"></el-input>
                                </div>
                            </td>
                        </tr>
                        <!-- <tr>
                            <td class="info-tit">
                                <span class="txt necessary">{{$t('身份证')}}：</span>
                            </td>
                            <td class="info-input" :class="{'error': info.identityOwn.error}">
                                <div class="error-label-box">
                                    <identityUpload ref="identityUpload" @fileLoad="fileLoadOwn" :necessary="true"></identityUpload>
                                </div>
                            </td>
                        </tr> -->
                        <tr>
                            <td class="info-tit">
                                <span class="txt necessary">{{$t('围棋水平')}}：</span>
                            </td>
                            <td class="info-input" :class="{'error': info.level.error}">
                                <el-select class="it-select" v-model="info.level.value"
                                :popper-append-to-body="false" 
                                :popper-class="`lives-select-options`" :placeholder="$t('请选择')">
                                    <el-option
                                    v-for="item in info.level.data"
                                    :key="item.value"
                                    :label="$t(item.name)"
                                    :value="$t(item.value)">
                                        <span>{{$t(item.name)}}</span>
                                    </el-option>
                                </el-select>
                            </td>
                        </tr>
                        <!-- <tr>
                            <td class="info-tit">
                                <span class="txt">{{$t('手机号')}}：</span>
                            </td>
                            <td class="info-input" :class="{'error': info.phone.error}">
                                <div class="phone-box">
                                    <el-input v-model="info.phone.value"></el-input>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="info-tit">
                                <span class="txt">{{$t('邮箱')}}：</span>
                            </td>
                            <td class="info-input" :class="{'error': info.email.error}">
                                <div class="email-box">
                                    <el-input v-model="info.email.value"></el-input>
                                </div>
                            </td>
                        </tr> -->
                        <!-- <tr>
                            <td class="info-tit">
                                <span class="txt necessary">{{$t('绑定机构')}}：</span>
                            </td>
                            <td class="info-input" :class="{'error': info.group.error}" data-menu="group-search">
                                <searchGroup ref="searchGroup" @selectChange="selectChange" :error.sync="info.group.error" :userStudent.sync="userStudent"></searchGroup>
                            </td>
                        </tr> -->
                        <tr>
                            <td colspan="2" class="info-input">
                                <div class="submit-box">
                                    <el-button class="main-button-bcg" @click="submit">
                                        <span class="txt">提交信息</span>
                                    </el-button>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
    import authenSubTitle from './authenSubTitle.vue'
    import identityUpload from './identityUpload.vue'
    import searchGroup from './searchGroup.vue'
    export default {
        name: 'authenTeacher',
        props: {
            userStudent: Array
        },
        data() {
            return {
                identityOwnF: null,
                identityOwnB: null,
                errorTxt: null,
                info: {
                    realName: {
                        value: null,
                        errorMsg: '请输入您的真实姓名',
                        error: false,
                        disabled: false,
                    },
                    // identityOwn: {
                    //     necessary: true,
                    //     specFun: 'identityOwnCheck',
                    //     error: false
                    // },
                    level: {
                        value: null,
                        errorMsg: '请选择您的围棋水平',
                        data: [],
                        error: false,
                        disabled: false,
                    },
                    // group: {
                    //     value: null,
                    //     select: [],
                    //     errorMsg: '请至少选择一个绑定机构',
                    //     specFun: 'groupCheck',
                    //     error: false,
                    // },
                    phone: {
                        value: null,
                        error: false,
                        errorMsg:'请输入您的电话号码',
                        disabled: false,
                    },
                    email: {
                        value: null,
                        error: false,
                        errorMsg:'请输入您的邮箱',
                        disabled: false,
                    },
                },
                searchResult: {
                    data: [],
                    loading: false,
                    active: false
                },
                userCert: {}
            };
        },
        methods: {
            async pageInit(){
                await this.userCertInit()
                this.levelInit()
            },
            async userCertInit(){
                let res = await this.GLOBAL.userCertInfo()
                if(res && res.code == 0 && res.data){
                    let data = res.data
                    if(data && Object.keys(data).length){
                        this.info.realName.value = data.realName
                        this.info.phone.value = data.phone
                        this.info.email.value = data.email
                        this.info.level.value = isNaN(Number(data.level)) ? null : Number(data.level)

                    }
                    this.userCert = res.data
                }
                return res
            },
            levelInit(){
                let list = this.GLOBAL.deepCopy(this.GLOBAL.playerLevelList)
                // for(let i in list){
                //     list[i].value = i
                // }
                this.info.level.data = list

            },
            deleteGroup(val){
                if(val && val.index)
                this.info.group.select.splice(val.index, 1)
            },
            gotoPersonalInfo(){
                // this.GLOBAL.gotoAuthen('personal', 'jumpToPageReplace')
                this.GLOBAL.gotoBackNormal(this.GLOBAL.pageList.authenticate.personal)
            },
            groupCheck(){
                if(!this.info.group.select.length) return this.info.group.errorMsg
                return false
            },
            identityOwnCheck(){
                let res = this.$refs['identityUpload'].dataCheck()
                if(res && res.code == 0) return null
                return '请上传完整的身份证正反面照片'
            },
            dataCheck(){
                let info = this.info
                let errorMsg = null
                console.log(info)
                for(let i in info){
                    let f
                    if(info[i].specFun){
                        if(this[info[i].specFun]){
                            f = this[info[i].specFun]()
                            if(f) info[i].error = true
                        }
                    }else{
                        if(info[i].value === undefined || info[i].value === null || info[i].value === '' || info[i].value === ' '){
                            f = info[i].errorMsg
                            if(f) info[i].error = true
                        }
                    }
                    if(f){
                        if(!errorMsg) errorMsg = f
                    }else{
                        info[i].error = false
                    }
                }
                this.info = info
                this.errorTxt = errorMsg
                console.log(errorMsg)
                return errorMsg
            },
            async submit(){
                if(this.dataCheck()) return
                this.LOADING.open()
                let opt = {}
                opt.realName = this.info.realName.value
                opt.level = this.info.level.value
                opt.email = this.info.email.value
                opt.phone = this.info.phone.value
                opt.code = []
                // let fileIds = '17,18'
                // fileIds = await this.uploadFiles()
                // if(this.GLOBAL.isObject(fileIds)){
                //     if(fileIds.code != 0) return
                // }
                // opt.files = fileIds
                console.log(opt)
                let res = await this.GLOBAL.schoolCert(opt)
                if(res && res.code == 0) this.gotoPersonalInfo()
                this.LOADING.close()
            },
            selectChange(data){
                console.log(data)
                this.info.group.select = data
            },
            fileLoadOwn(data){
                if(data['identityF']) this.identityOwnF = data['identityF']
                if(data['identityB']) this.identityOwnB = data['identityB']
            },
            async uploadFiles(){
                let files = {
                    file1: this.$refs['identityUpload'].identity.fileF,
                    file2: this.$refs['identityUpload'].identity.fileB,
                }
                let sendData = []
                for(let i in files){
                    if(files[i]) sendData.push({key: i, data: files[i]})
                }
                if(!sendData.length) return ''
                let res = await this.GLOBAL.uploadFileList(sendData)
                if(res && res.code == 0){
                    let data = res.data || []
                    let ids = []
                    for(let i in data){
                        ids.push(data[i].id)
                    }
                    ids = ids.join(',')
                    return ids
                }
                return res
            },
        },
        created() {
            this.pageInit()
        },
        components: {
            authenSubTitle,
            identityUpload,
            searchGroup
        },
        computed: {
            groupSelect(){
                let list = this.GLOBAL.deepCopy(this.info.group.select) || []
                for(let i in list){
                    list[i].index = i
                }
                return list
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
<style lang='less' src="./stuAndTea.less"></style>
<style scoped lang='less' >
    .personal-cert.teacher{
        display: flex;
        justify-content: center;
        .authen-teacher-body{
            width: 25rem;
            .error-label-box{
                border: 1px solid #EAEAEA;
            }
        }
    }
    
</style>