<!--  -->
<template>
    <div class="">
        <table border="0" class="studentCM">
            <tr>
                <th id="date">日期</th>
                <th id="black">执黑</th>
                <th id="wL">级别</th>
                <th id="white">执白</th>
                <th id="bL">级别</th>
                <th id="condition">条件</th>
                <th id="res">结果</th>
                <th id="total">总手数</th>
                <th id="manege">管理</th>
            </tr>
            <tr v-for="n in currentData" v-bind:key="">
                <td id="date">{{ n.date }}</td>
                <td id="black">{{ n.black }}</td>
                <td id="bL">{{ n.bL }}</td>
                <td id="white">{{ n.white }}</td>
                <td id="wL">{{ n.wL }}</td>
                <td id="condition">
                    {{ n.condition }}
                </td>
                <td id="res">{{ n.res }}</td>
                <td id="total">{{ n.total }}</td>
                <td id="manage">
                    <button>查看</button>
                </td>
            </tr>
        </table>
        <div class="block">
            <el-pagination
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="total"
                @current-change="pageChange"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    props: {},
    data() {
        return {
            tableData6: [
                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },
                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '第一页d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },
                {
                    date: '2021-07-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },
                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },
                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },
                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },
                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },

                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },
                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },
                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },
                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },
                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },
                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },
                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },
                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },
                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },
                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },
                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },
                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },
                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },
                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },
                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },
                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },
                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },
                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },
                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },
                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },
                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },
                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },

                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },
                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },
                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },
                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },
                {
                    date: '2021-06-01',
                    white: 'zhy',
                    wL: '18K',
                    black: 'yhz',
                    bL: '2d',
                    condition: '分先',
                    res: '黑中盘胜',
                    total: '207',

                },

            ],
            page: 1,
            pageSize: 13,
            // total: 0
        };
    },
    methods: {
        pageChange(val) {
            this.page = val
        }
    },
    created() {
        //
    },
    components: {
    },
    computed: {
        total() {
            return this.tableData6.length
        },
        currentData() {
            let list = this.tableData6.slice() || []
            let size = this.pageSize
            let page = this.page - 1
            return list.splice(page * size, size)
        }
    },
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
.studentCM {
    width: 90%;
    margin-left: 5%;
    th,
    td {
        background-color: #cccccc;
        height: 1.7rem;
    }

    #date {
        width: 6rem;
    }
    #manage {
        button {
            border: #6589b5 0.05rem solid;
            padding: 0.08rem 0.3rem;
            border-radius: 0.15rem;
            margin-right: 0.15rem;
            // background: transparent;
            background: #6589b5;
            // color: #1c7dfc;
            color: rgb(255, 255, 255);
        }
    }
}
</style>