<!--  -->
<template>
    <div class='create-group'>
        <div class="create-group-body">
            <div class="group-item title">
                <authenSubTitle ref="authenSubTitle" :icon="`${GLOBAL.assetsUrl}/img/ce5.png`" title="创建机构"></authenSubTitle>
            </div>
            <div class="group-item content">
                <div class="item-table">
                    <div class="authen-error-box">
                        <span class="txt recharge-button">{{$t(errorTxt)}}</span>
                    </div>
                    <table class="input-table"> 
                        <tr>
                            <td class="info-tit">
                                <span class="txt necessary">{{$t('机构名称')}}：</span>
                            </td>
                            <td class="info-input" :class="{'error': errorKey == 'name'}">
                                <el-input v-model="info.name.value"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td class="info-tit">
                                <span class="txt necessary">{{$t('机构类型')}}：</span>                                 
                            </td>
                            <td class="info-input">
                                <el-radio v-model="radio" label="1">企业</el-radio>
                                 <el-radio v-model="radio" label="2">个人</el-radio>
                            </td>
                        </tr>
                        <tr v-if="radio=='1'">
                            <td class="info-tit">
                                <span class="txt">{{$t('营业执照副本')}}：</span>
                            </td>
                            <td class="info-input" :class="{'error': errorKey == 'loadLicense'}">
                                <div class="load-license-box">
                                    <el-image 
                                        class="load-img"
                                        :src="info.loadLicense.img" v-if="info.loadLicense.img"
                                        :preview-src-list="licensePreviewList">
                                    </el-image>
                                    <span class="clear-license el-icon-circle-close clear-img-icon" v-if="info.loadLicense.img" @click="clearLicense"></span>
                                    <el-button type="text" @click="fileInputClick('loadLicense')" class="le-button">
                                        <span class="txt">{{$t(info.loadLicense.img ? '重新上传' : '点击上传')}}</span>
                                    </el-button>
                                    <input type="file" hidden id="loadLicense" @change="loadLicenseHandle" ref="loadLicense">
                                </div>
                            </td>
                        </tr>
                        <tr v-if="radio=='1'">
                            <td class="info-tit">
                                <span class="txt">{{$t('法人/负责人身份证')}}：</span>
                            </td>
                            <td class="info-input" :class="{'error': errorKey == 'identityLegal'}">
                                <div class="ident-box">
                                    <div class="error-label-box">
                                        <identityUpload ref="identityUploadLegal" @fileLoad="fileLoad"></identityUpload>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="info-tit">
                                <span class="txt necessary">{{$t('您的姓名')}}：</span>
                            </td>
                            <td class="info-input" :class="{'error': errorKey == 'realName'}">
                                <div class="contact-name">
                                    <el-input v-model="info.realName.value"></el-input>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="info-tit">
                                <span class="txt necessary">{{$t('身份证')}}：</span>
                            </td>
                            <td class="info-input" :class="{'error': errorKey == 'identityOwn'}">
                                <div class="ident-box">
                                    <div class="error-label-box">
                                        <identityUpload ref="identityUploadOwn" @fileLoad="fileLoadOwn" :necessary="true"></identityUpload>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <!-- <tr>
                            <td class="info-tit">
                                <span class="txt necessary">{{$t('手机号')}}：</span>
                            </td>
                            <td class="info-input" :class="{'error': errorKey == 'phoneNumber'}">
                               
                                <phoneNumberCode ref="phoneNumberCode" @sendSmsCode="sendSmsCode"></phoneNumberCode>
                            </td>
                        </tr>
                        <tr>
                            <td class="info-tit">
                                <span class="txt necessary">{{$t('验证码')}}：</span>
                            </td>
                            <td class="info-input" :class="{'error': errorKey == 'smsCode'}">
                                <div class="contact-code">
                                    <el-input v-model="info.smsCode.value"></el-input>
                                </div>
                            </td>
                        </tr> -->
                        <tr>
                            <td class="info-tit">
                                <span class="txt">{{$t('机构地点')}}：</span>
                            </td>
                            <td class="info-input" :class="{'error': errorKey == 'address'}">
                                <div class="address-box">
                                    <addressSelect ref="addressSelect"></addressSelect>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="info-tit">
                                <span class="txt necessary">{{$t('学生规模')}}：</span>
                            </td>
                            <td class="info-input" :class="{'error': errorKey == 'studentScale'}">
                                <el-select class="it-select" v-model="info.studentScale.value"
                                value-key="data"
                                @change="studentNumChange"
                                :popper-append-to-body="false" 
                                :popper-class="`lives-select-options`" :placeholder="$t('请选择')">
                                    <el-option
                                    v-for="item in info.studentScale.data"
                                    :key="item.value"
                                    :label="$t(item.name)"
                                    :value="$t(item.data)">
                                        <span>{{$t(item.name)}}</span>
                                    </el-option>
                                </el-select>
                            </td>
                        </tr>
                        <tr>
                            <td class="info-tit">
                                <span class="txt necessary">{{$t('教师规模')}}：</span>
                            </td>
                            <td class="info-input" :class="{'error': errorKey == 'teacherScale'}">
                                <el-select class="it-select" v-model="info.teacherScale.value"
                                @change="teacherNumChange"
                                :value-key="'data'"
                                :popper-append-to-body="false" 
                                :popper-class="`lives-select-options`" :placeholder="$t('请选择')">
                                    <el-option
                                    v-for="item in info.teacherScale.data"
                                    :key="item.value"
                                    :label="$t(item.name)"
                                    :value="$t(item.data)">
                                        <span>{{$t(item.name)}}</span>
                                    </el-option>
                                </el-select>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="info-input">
                                <div class="submit-box">
                                    <el-button class="main-button-bcg" @click="submitInfo">
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
    import addressSelect from '../../components/addressSelect.vue'
    import authenSubTitle from './authenSubTitle.vue'
    import audit from './audit.vue'
    import identityUpload from './identityUpload.vue'
    import phoneNumberCode from '../../components/phoneNumberCode.vue'


    export default {
        name: 'createGroup',
        props: {
            userGroup: Array
        },
        data() {
            return {
                identityLegalF: null,
                identityLegalB: null,
                identityOwnF: null,
                identityOwnB: null,
                errorTxt: null,
                errorKey: null,
                radio:'1',
                info: {
                    name: {
                        value: null,
                        necessary: true,
                        errorTxt: '请填写机构名称'
                    },
                    loadLicense: {
                        img: null,
                        necessary: false,
                        value: null,
                    },
                    identityLegal: {
                        necessary: false,
                        checkFun: 'identityLegalCheck'
                    },
                    realName: {
                        value: null,
                        necessary: true,
                        errorTxt: '请填写您的姓名'
                    },
                    identityOwn: {
                        necessary: true,
                        checkFun: 'identityOwnCheck',
                    },
                    phoneNumber: {
                        value: null,
                        necessary: false,
                        checkFun: 'phoneNumberCheck'
                    },
                    smsCode: {
                        value: null,
                        necessary: false,
                        errorTxt: '请填写验证码'
                    },
                    address: {
                        necessary: false,
                        checkFun: 'addressCheck'
                    },
                    studentScale: {
                        value: null,
                        data: [
                            {name: '50-100人', value: 0, data: '50-100'},
                            {name: '101-150人', value: 1, data: '101-150'},
                            {name: '150人以上', value: 2, data: '150-max'},
                        ],
                        necessary: true,
                        errorTxt: '请选择学生规模'
                    },
                    teacherScale: {
                        value: null,
                        data: [
                            {name: '5-10人', value: 0, data: '5-10'},
                            {name: '11-50人', value: 1, data: '11-50'},
                            {name: '50人以上', value: 2, data: '50-max'},
                        ],
                        necessary: true,
                        errorTxt: '请选择教师规模'
                    },
                },

            };
        },
        methods: {
            loadLicenseSelect(){
                this.fileInputClick()
            },
            fileInputClick(id){
                let ele = document.getElementById(id)
                if(!ele) return
                ele.click()
            },
            async loadLicenseHandle(e){
                let file = e.target.files[0]
                if(!this.imgLoadClick(file)) return
                let data = await this.getImgData(file)
                if(!data) return
                this.info.loadLicense.img = data
                this.info.loadLicense.value = file
            },
            getImgData(file){
                let promise = new Promise(res => {
                    let reader = new FileReader()
                    reader.onload = (data) => {
                        res(reader.result)
                    }
                    reader.readAsDataURL(file)
                })
                return promise
            },
            imgLoadClick(file){
                let postfix = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length)
                let reg = /png|jpg/
                if(!reg.test(file.name)){
                    this.GLOBAL.MessageOpen({
                        type: 'error',
                        message: `${this.$i18n.t('请上传')}：png${this.$i18n.t('或')}jpg格式的图片`,
                        duration: 3000,
                        showClose: true
                    })
                    return false
                }
                return true
            },
            async submitInfo(){
                let errorTxt = this.dataCheck()
                if(errorTxt) return
                let fileIds = ''
                this.LOADING.open()
                // fileIds = await this.uploadFiles()
                // if(this.GLOBAL.isObject(fileIds)){
                //     if(fileIds.code != 0) return
                // }
                let opt = {
                    school_name: this.info.name.value,
                    school_address: this.$refs['addressSelect'].addressTxt,
                    teacher_number: this.teacherNumber,
                    student_number: this.studentNumber,
                    admin_name: this.info.realName.value,
                    admin_contact: this.$store.state.username,
                    // files: fileIds,
                    files: `1,2`,
                    // ver_code: this.info.smsCode.value,
                   
                  
                }
                let res = await this.GLOBAL.createGroup(opt)
                this.LOADING.close()
                if(res && res.code == 0) this.createSuccessHandle(res)
            },
            createSuccessHandle(res){
                this.gotoAudit()
            },
            dataCheck(){
                let info = this.info, errorTxt = null
                this.errorKey = null
                for(let i in info){
                    if(info[i].checkFun && this[info[i].checkFun]){
                        errorTxt = this[info[i].checkFun]()
                    }else{
                        if(!info[i].necessary) continue
                        if(info[i].value === null || info[i].value === undefined){
                            errorTxt = info[i].errorTxt
                        }
                    }
                    if(errorTxt){
                        this.errorKey = i
                        break
                    }
                }
                this.errorTxt = errorTxt
                return errorTxt
            },
            identityLegalCheck(){
                let res = this.$refs['identityUploadLegal'].dataCheck()
                if(res && res.code == 0) return null
                return '请上传完整的法人身份证正反面照片'

            },
            identityOwnCheck(){
                let res = this.$refs['identityUploadOwn'].dataCheck()
                if(res && res.code == 0) return null
                return '请上传完整的身份证正反面照片'
            },
            addressCheck(){
                let res = this.$refs['addressSelect'].dataCheck()
                if(res && res.code == 0) return null
                return '请填写完整的地址信息'
            },
            phoneNumberCheck(){
                let res = this.$refs['phoneNumberCode'].dataCheck()
                if(res && res.code == 0) return null
                return '请填写正确的手机号'
            },
            gotoAudit(code){
                code = code || '-1'
                // this.GLOBAL.gotoAuthen('audit', 'jumpToPageReplace', ['create', code])
                this.GLOBAL.gotoAuthen('audit', 'jumpToPageReplace', ['create'])
            },
            gotoStep(){
                this.GLOBAL.gotoAuthen('select', 'jumpToPageReplace')
            },
            async uploadFiles(){
                let files = {
                    file1: this.info.loadLicense.value,
                    file2: this.$refs['identityUploadLegal'].identity.fileF,
                    file3: this.$refs['identityUploadLegal'].identity.fileB,
                    file4: this.$refs['identityUploadOwn'].identity.fileF,
                    file5: this.$refs['identityUploadOwn'].identity.fileB,
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
            fileLoad(data){
                if(data['identityF']) this.identityLegalF = data['identityF']
                if(data['identityB']) this.identityLegalB = data['identityB']
            },
            fileLoadOwn(data){
                if(data['identityF']) this.identityOwnF = data['identityF']
                if(data['identityB']) this.identityOwnB = data['identityB']
            },
            clearLicense(){
                this.info.loadLicense.img = null
                this.info.loadLicense.file = null
                this.info.loadLicense.value = null
                this.$refs['loadLicense'].value = null
            },
            async sendSmsCode(opt){
                let phontNumber = opt.phoneNumber
                let area = opt.area
                if(!phontNumber) return this.$refs['phoneNumberCode'].sendSmsCodeAfter(false)
                let res = await this.GLOBAL.sendSmsCodeLive(area, phontNumber)
                if(res && res.code == 0){
                }
                this.$refs['phoneNumberCode'].sendSmsCodeAfter(res)
            },
            studentNumChange(val){
            },
            teacherNumChange(val){
            },
            pageInit(){
                this.$emit('userGroupUpdate')
            },
        },
        created() {
            this.pageInit()
        },
        components: {
            addressSelect,
            audit,
            authenSubTitle,
            identityUpload,
            phoneNumberCode
        },
        computed: {
            hasAuditGroup(){
                let list = this.userGroup || []
                console.log(list)
                let f = false
                for(let i in list){
                    if(list[i].creator && list[i].certStatus == 0){
                        f = list[i].code
                        break
                    }
                }
                return f
            },
            teacherNumber(){
                let opt = this.info.teacherScale
                return opt.value || ''
                // if(!opt.data[opt.value]) return ''
                // return optdata[opt.value].data
            },
            studentNumber(){
                let opt = this.info.studentScale
                return opt.value || ''
                // if(!opt.data[opt.value]) return ''
                // return opt.data[opt.value].data
            },
            schoolAddress(){
                // let 
            },
            licensePreviewList(){
                if(!this.info.loadLicense.img) return []
                return [this.info.loadLicense.img]
            },
        },
        watch: {
            hasAuditGroup: {
                handler(val){
                    if(val) this.gotoAudit(val)
                },
                deep: true,
                immediate: true
            },
            $route: {
                handler(){
                },
                immediate: true,
                deep: true
            }
        },
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
    .user-authenticate .authenticate-content .create-group-content.group{
        border: 0px;
    }
    @inputHeight: 1.7rem;
    @btnHeight: 1.5rem;
    @benWidth: 3.5rem;
    .create-group{
        display: flex;
        justify-content: center;
        .create-group-body{
            width: 60%;
        }
        .group-item.title{
            display: flex;
            justify-content: flex-start;
        } 
        .group-item.content{
            margin-top: 1rem;
            
            width: 100%;
            
            
            table{
                .info-input{
                    .ident-box{
                        display: flex;
                    }
                    .load-license-box{
                        height: @inputHeight;
                        display: flex;
                        align-items: center;
                        text-align: left;
                        .load-img{
                            height: 100%;
                            margin-right: 0.2rem;
                            img{
                                height: 100%;
                                width: auto;
                            }
                        }
                        .el-button{
                            height: auto;
                            .txt{
                                font-size: 0.6rem;
                            }
                        }
                        .clear-license{
                            margin-right: 0.5rem;
                        }
                    }
                    .contact-name, .contact-number{
                        .el-input__inner{
                            width: auto;
                        }
                    }
                    .contact-code{
                        .el-input__inner{
                            width: 7rem;
                        }
                    }
                    
                }
                .necessary::before{
                    content: '*';
                    color: @errorColor2;
                    font-size: 1rem;
                    position: absolute;
                    top: -0.3rem;
                    left: 0rem;
                }
            }
        }
        
    }
</style>