<!--  -->
<template>
    <div class='identity-upload'>
        <div class="load-identity-box">
            <div class="item a">
                <div class="img">
                    <el-image 
                        :src="identityF" :class="{'pre': !identity.imgF}"
                        :preview-src-list="identityFPreviewList">
                    </el-image>
                    <span class="txt" v-if="!identity.imgF">{{$t('正面')}}</span>
                    <input type="file" hidden id="identityF" @change="identityHandle($event, 'F')" ref="identityF">
                </div>
                <span class="clear-img-icon el-icon-circle-close" v-if="this.identity.imgF" @click="clearImg('F')"></span>
                <el-button @click="fileInputClick('identityF')">
                    <span class="txt">{{$t('上传')}}</span>
                </el-button>
            </div>
            <div class="item b">
                <div class="img">
                    <el-image 
                        :src="identityB" :class="{'pre': !identity.imgB}"
                        :preview-src-list="identityBPreviewList">
                    </el-image>
                    <span class="txt" v-if="!identity.imgB">{{$t('反面')}}</span>
                    <input type="file" hidden id="identityB" @change="identityHandle($event, 'B')" ref="identityB">
                </div>
                <span class="clear-img-icon el-icon-circle-close" v-if="this.identity.imgB" @click="clearImg('B')"></span>
                <el-button @click="fileInputClick('identityB')">
                    <span class="txt">{{$t('上传')}}</span>
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'identityUpload',
        props: {
            necessary: Boolean
        },
        data() {
            return {
                identity: {
                    imgF: null,
                    imgB: null,
                    fileF: null,
                    fileB: null
                }
            };
        },
        methods: {
            fileInputClick(id){
                let ele = this.$refs[id]
                if(!ele) return
                ele.click()
            },
            async identityHandle(e, type){
                let file = e.target.files[0]
                if(!this.imgLoadClick(file)) return
                let data = await this.getImgData(file)
                if(!data) return
                this.identity[`img${type}`] = data
                this.identity[`file${type}`] = file
                let sendData = {}
                sendData[`identity${type}`] = file
                this.$emit('fileLoad', sendData)
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
            dataCheck(){
                let res = {code: 0}, singleCheck = false
                if(!this.necessary){
                    if(!this.identity.fileF && !this.identity.fileB) res = {code: 0}
                    else singleCheck = true
                }else{
                    if(this.identity.fileF && this.identity.fileB) res = {code: 0}
                    else singleCheck = true
                }
                if(singleCheck){
                    if(!this.identity.fileF) res = {res: 1, error: 'identityF'}
                    else if(!this.identity.fileB) res = {res: 1, error: 'identityB'}
                }
                return res
            },
            clearImg(type){
                this.identity[`img${type}`] = null
                this.identity[`file${type}`] = null
                try{
                    this.$refs[`identity${type}`].value = null
                }catch(e){}
            },
        },
        created() {

        },
        components: {
        },
        computed: {
            identityFPreviewList(){
                if(!this.identity.imgF) return []
                return [this.identity.imgF]
            },
            identityBPreviewList(){
                if(!this.identity.imgB) return []
                return [this.identity.imgB]
            },
            identityF(){
                let img = this.identity.imgF
                if(!img) return `${this.GLOBAL.assetsUrl}/img/ce6.png`
                return img
            },
            identityB(){
                let img = this.identity.imgB
                if(!img) return `${this.GLOBAL.assetsUrl}/img/ce6.png`
                return img
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
    .identity-upload{
        @inputHeight: 1.7rem;
        @benWidth: 3.5rem;
        .load-identity-box{
            display: flex;
            align-items: center;
            .item:last-child{
                margin: 0px;
            }
            .item{
                margin-right: 1rem;
                display: flex;
                align-items: center;
                .clear-img-icon{
                    margin-left: 0.2rem;
                }
                .el-button{
                    width: @benWidth;
                    background: #F9F9F9;
                    margin-left: 0.5rem;
                }
                .img{
                    position: relative;
                    height: @inputHeight;
                    .el-image.pre{
                        opacity: 0.5;
                    }
                    .el-image{
                        height: 100%;
                        img{
                            width: auto;
                            height: 100%;
                        }
                    }
                    img.pre{
                        opacity: 0.5;
                    }
                    img{
                        height: 100%;
                    }
                    .txt{
                        position: absolute;
                        top: 0px;
                        left: 0px;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #999;
                    }
                }
            }
        }
    }
    
</style>