<!--  -->
<template>
    <div class='search-group-page' :class="{'error': error}">
        <div class="set-group">
            <div class="set-item">
                <el-input v-model="value"  @keyup.enter.native="searchGroup"></el-input>
            </div>
            <div class="set-item">
                <img :src="`${GLOBAL.assetsUrl}/img/search_light.png`" class="search-icon" @click="searchGroup">
                <span class="txt">{{$t('请输入机构代码查找')}}</span>
            </div>
            <div class="search-result-box" v-if="searchResult.active">
                <el-card class="box-card"
                v-loading="searchResult.loading" 
                element-loading-background="rgba(0, 0, 0, 0.0)"
                element-loading-spinner="page-loading-icon-css light">
                    <div class="search-result-body" v-if="searchResult.loading || searchData.length">
                        <div class="search-result-item" v-for="v in searchData" :key="v.code" :class="{'disabled': v.disabledTxt}">
                            <div class="group-name">
                                <p class="txt hide-point-txt">{{v.name}}</p>
                            </div>
                            <div class="group-fun">
                                <el-button type="text" @click="selectGroup(v)" class="le-button" v-if="!v.disabledTxt">
                                    <span class="txt">选择</span>
                                </el-button>
                                <span class="txt" v-else>{{v.disabledTxt}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="search-result-none-data" v-else>
                        <span class="txt">未找到机构</span>
                    </div>
                </el-card>
            </div>
        </div>
        <ul class="group-select-box">
            <li class="select-item" v-for="(v, i) in groupSelect" :key="i">
                <div class="content">
                    <span class="txt hide-point-txt">{{v.name}}</span>
                </div>
                <div class="icon">
                    <span class="txt-icon el-icon-close" @click="deleteGroup(v)"></span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'searchGroup',
        props: {
            error: Boolean,
            userStudent: Array
        },
        data() {
            return {
                value: null,
                select: [],
                searchResult: {
                    data: [],
                    loading: false,
                    active: false
                },
            };
        },
        methods: {
            async searchGroup(){
                if(!this.value) return
                this.searchResult.loading = true
                this.searchResult.data = []
                this.searchResultBoxOn()
                let res = await this.GLOBAL.searchGroup(this.value)
                if(res && res.code == 0){
                    this.searchResultHandle(res.data)
                }
                this.searchResult.loading = false
                console.log(res)
            },
            searchResultBoxOn(){
                this.searchResult.active = true
            },
            searchResultBoxOff(){
                this.searchResult.data = []
                this.searchResult.active = false
                this.searchResult.loading = false
            },
            searchResultHandle(data){
                this.searchResult.data = data
            },
            selectGroup(val){
                let data = this.select
                let f = false
                for(let i in data){
                    if(data[i].code == val.code){
                        f = true
                        break
                    }
                }
                if(f) return
                this.select.unshift(this.GLOBAL.deepCopy(val))
                this.searchResultBoxOff()
                this.value = null
            },
            appClick(e){
                console.log('appClick')
                let f = this.GLOBAL.appClick(e, 'group-search', 'data-menu')
                if(!f) this.searchResultBoxOff()
            },
            deleteGroup(val){
                if(val && val.index) this.select.splice(val.index, 1)
            },
        },
        created() {

        },
        components: {
        },
        computed: {
            searchData(){
                let data = this.GLOBAL.deepCopy(this.searchResult.data) || []
                let userStudent = this.userStudent || {}
                let schoolList = userStudent.schoolCodeMaps || []
                for(let i in data){
                    for(let j in schoolList){
                        if(schoolList[j].code == data[i].code){
                            data[i].disabledTxt = '已绑定'
                            break
                        }
                    }
                    if(data[i].certStatus == 0){
                        data[i].disabledTxt = '审核中'
                    }
                }
                console.log(data)
                return data
            },
            groupSelect(){
                let list = this.GLOBAL.deepCopy(this.select) || []
                for(let i in list){
                    list[i].index = i
                }
                return list
            },
            selectCodes(){
                let data = this.groupSelect || []
                let rd = []
                for(let i in data){
                    rd.push(data[i].code)
                }
                return rd
            },
        },
        watch: {
            selectCodes: {
                handler(val){
                    this.$emit('codeChange', val)
                },
                deep: true,
                immediate: true
            },
            groupSelect: {
                handler(val){
                    this.$emit('selectChange', val)
                },
                deep: true,
                immediate: true
            },
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
    .search-group-page{
        @boxHeight: 3.5rem;
        .set-group{
            position: relative;
            .search-result-box{
                position: absolute;
                min-width: 60%;
                max-width: 85%;
                top: 1.5rem;
                margin-bottom: 0.1rem;
                background: #fff;
                z-index: 1;
                .el-card__body{
                    padding: 0.5rem;
                    
                }
                .search-result-none-data{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: @boxHeight;
                }
                .search-result-item:last-child{
                    margin: 0px;
                }
                .search-result-body{
                    min-height: @boxHeight;
                }
                .search-result-item{
                    margin-bottom: 0.3rem;
                    display: flex;
                    align-items: center;
                    white-space: nowrap;
                    .group-name{
                        width: calc(100% - 1.5rem);
                        display: flex;
                        align-items: center;
                    }
                    .group-fun.disabled{
                        color: #bbb;
                    }
                    .group-fun{
                        margin-left: 0.3rem;
                        .el-button.le-button{
                            height: auto;
                        }
                    }
                }
            }
        }
        .group-select-box{
            margin-top: 0.5rem;
        }
    }

</style>