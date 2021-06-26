<template>
  <div>  <le-confirm ref="leConfirm" :loading.sync="loadingCul">
            <template v-slot:message>
                <div class="create-class-box">
                    <div class="hide-input">
                        <el-input type="text" auto-complete="off"></el-input>
                        <el-input type="password" auto-complete="off"></el-input>
                    </div>
                    <h1 class="create-class-title">{{$t('创建教室')}}</h1>
                    
                    <div class="create-class-content">
                        <div class="create-error-msg">
                            <span class="txt">{{$t(errorMsg)}}</span>
                        </div>
                        <table class="content-table">
                            <tr>
                                <td>
                                    <span class="td-txt">{{$t('教室名称')}}</span>
                                </td>
                                <td :class="{'check': check.className}">
                                    <el-input clearable v-model="className" class="td-input" @input="inputCheck('className')" auto-complete="off" @keyup.enter.native="createAction"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="td-txt">{{$t('老师名称')}}</span>
                                </td>
                                <td :class="{'check': check.teacherName}">
                                    <el-input clearable v-model="teacherName" class="td-input" @input="inputCheck('teacherName')" auto-complete="off" @keyup.enter.native="createAction"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="td-txt">{{$t('老师段位')}}</span>
                                </td>
                                <td :class="{'check': check.teacherLevel}">
                                    <el-input clearable v-model="teacherLevel" class="td-input" @input="inputCheck('teacherLevel')" auto-complete="off" @keyup.enter.native="createAction"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="td-txt">{{$t('开始时间')}}</span>
                                </td>
                                <td class="td-date-time" :class="{'check': check.startDate}">
                                    <el-date-picker
                                    name="classDate"
                                    v-model="startDate"
                                    :format="'yyyy-MM-dd HH:mm'"
                                    :popper-class="'create-class-date-options'"
                                    type="datetime"
                                    @input="inputCheck('startDate')"
                                    @keyup.enter.native="createAction"
                                    auto-complete="off"
                                    :picker-options="datePickerOptions"
                                    placeholder="选择日期时间">
                                    
                                    </el-date-picker>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="td-txt">{{$t('管理员密码')}}</span>
                                </td>
                                <td :class="{'check': check.adminPsw}">
                                    <el-input name="admin-psw" clearable type="password" v-model="adminPsw" class="td-input" @input="inputCheck('adminPsw')" show-password auto-complete="off" @keyup.enter.native="createAction"></el-input>
                                </td>
                            </tr>
                            <tr v-if="setPsw">
                                <td>
                                    <span class="td-txt">{{$t('学生密码')}}</span>
                                </td>
                                <td :class="{'check': check.stuPsw}">
                                    <el-input name="stu-psw" clearable type="password" v-model="stuPsw" class="td-input" @input="inputCheck('stuPsw')" show-password auto-complete="off" @keyup.enter.native="createAction"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="td-txt">{{$t('描述')}}</span>
                                </td>
                                <td class="td-date-time" :class="{'check': check.description}">
                                    <el-input clearable type="textarea" v-model="description" :placeholder="$t('选填')" @input="inputCheck('description')" auto-complete="off" @keyup.enter.native="createAction"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" class="td-check-box">
                                    <el-checkbox v-model="setPsw">
                                        <span class="check-txt">{{$t('设置教室密码')}}</span>
                                    </el-checkbox>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </template>
        </le-confirm></div>
</template>

<script>
export default {
    name:'createTeacher',
    props:{}
}
</script>

<style lang="less">
 .create-class{
        .create-class-box{
            .create-class-title{
                font-size: 0.9rem;
                padding: 1rem 0px;
                font-weight: normal;
            }
            .create-class-content{
                padding-bottom: 1rem;
                position: relative;
                .create-error-msg{
                    position: absolute;
                    top: -0.8rem;
                    left: 0px;
                    width: 100%;
                    text-align: center;
                    .txt{
                        font-size: 12px;
                        color: @errorColor;
                    }
                }
                .content-table{
                    margin: 0px auto;
                    width: 80%;
                    td:first-child{
                        padding-right: 0.7rem;
                        text-align: right;
                    }
                    td{
                        padding: 0.5rem 0px;
                        .el-date-editor.el-input, .el-date-editor.el-input__inner{
                            width: 100%;
                        }
                    }
                    td.check{
                        .el-input__inner, .el-textarea__inner{
                            border: 1px solid @errorColor;
                        }
                    }
                    td.td-check-box{
                        text-align: left;
                        .el-checkbox__inner{
                            width: 0.8rem;
                            height: 0.8rem;
                            background: none;
                            border: 1px solid #565656;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        .el-checkbox__input.is-checked+.el-checkbox__label{
                            font-weight: 600;
                            color: #333;
                            
                        }
                        .el-checkbox__inner::after{
                            border-color: #565656;
                            position: static;
                        }
                        .el-checkbox__input.is-checked{
                            .el-checkbox__inner::after{
                                border-color: #565656;
                                position: static;
                            }
                        }
                        .el-checkbox{
                            color: #333;
                        }
                    }
                    .el-input__inner{
                        background: none;
                        border: 1px solid #818181;
                        height: 1.5rem;
                        padding: 0px 0.2rem;
                    }
                    .el-textarea__inner{
                        background: none;
                        border: 1px solid #818181;
                        height: 3rem;
                        border-radius: 0px;
                        padding: 0px 0.2rem;
                        max-height: 10rem;
                        min-height: 3rem !important;
                    }
                    
                    td.td-date-time{
                        .el-input__inner{
                            padding-left: 1.2rem;
                        }
                        .el-input__prefix{
                            left: 0px;
                            .el-input__icon{
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                width: 1.2rem;
                            }
                        }
                    }
                }
            }
        }
        .hide-input{
            width: 0px;
            height: 0px;
            overflow: hidden;
        }
    }
</style>