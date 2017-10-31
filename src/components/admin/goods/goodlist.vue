<template>
    <div class="arttmpl">
        <div class="abread bt-line">
            <el-row>
                <el-col :span='24'>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
            </el-row>
        </div>
        <div class="operation">
            <el-row>
                <el-col :span='20'>
                    <router-link to="/admin/goodadd">
                        <el-button>新增</el-button>
                    </router-link>
                    <el-button @click=selectAll>全选</el-button>
                    <el-button type="text" @click="dialogVisible = true">删除</el-button>
                    <el-dialog title="提示" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
                        <span>确定要删除吗</span>
                        <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="sureDel">确 定</el-button>
                      </span>
                    </el-dialog>
                </el-col>
                <el-col :span='4'>
                    <el-input placeholder="请输入搜索内容" icon="search" v-model="searchValue" :on-icon-click="getList">
                    </el-input>
                </el-col>
            </el-row>
        </div>
        <el-table :data="tableData2" style="width: 100%" :row-class-name="tableRowClassName" @select=del ref="multipleTable" >
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="title" label="标题">
                <template scope="scope">
                    <router-link v-bind="{to:'/admin/goodedit/'+scope.row.id}">
                        {{ scope.row.title }}
                    </router-link>
                </template>
            </el-table-column>
            <el-table-column prop="categoryname" label="所属类别" width="150">
            </el-table-column>
            <el-table-column prop="stock_quantity" label="库存" width='80'>
            </el-table-column>
            <el-table-column prop="market_price" label="市场价" width="80">
            </el-table-column>
            <el-table-column prop="sell_price" label="销售价" width='80'>
            </el-table-column>
            <el-table-column prop="address" label="属性" width='160'>
                <template scope="scope">
                    <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
                        <i v-bind="{class:(scope.row.is_slide==1?'el-icon-picture ls imgactive':'el-icon-picture ls')}"></i>
                    </el-tooltip>
                    <i v-bind="{class:(scope.row.is_top==1?'el-icon-upload ls imgactive':'el-icon-upload ls')}"></i>
                    <!-- <i v-bind="{class:(scope.row.is_hot==1?'el-icon-star-on':'el-icon-star-off')}"></i> -->
                    <i v-bind:class="(scope.row.is_hot==1?'el-icon-star-on':'el-icon-star-off')"></i>
                    <!-- <i v-bind="{class:'el-icon-picture ls '+ (scope.row.is_slide==1?'imgactive':'')}"></i> -->
                </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
                <template scope="scope">
                    <router-link v-bind="{to:'/admin/goodedit/'+scope.row.id}">
                        <el-button type="success">修改</el-button>
                    </router-link>
                </template>
            </el-table-column>
            </el-table>
<div class="block">
    <el-pagination :current-page=pageIndex :page-sizes='[10, 20, 30, 40]' :page-size=pageSize layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" :total=totalcount>
    </el-pagination>

</div>
</div>
</template>
<style>
    .el-table .info-row {
        background: #c9e5f5;
    }
    
    .el-table .positive-row {
        background: #e2f0e4;
    }
</style>
<script>
    export default {
        methods: {
            updateMenuid() {

            },

            handleSizeChange(val) {

                this.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.getList();
            },
            selectAll() {
                var rows = this.tableData2;
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },


            tableRowClassName(row, index) {
                if (index % 2 == 0) {
                    return "info-row";
                } else {
                    return "positive-row";
                }
                return "";
            },

            handleClose(done) {

            },
            del(selection, row) {

                var str = '';

                for (var i = 0; i < selection.length; i++) {
                    str += selection[i].id + ',';
                }
                str = str.slice(0, -1)
                var url = "/admin/goods/del/" + str;
                this.ids = url;
                console.log(selection, this.ids)


            },
            sureDel() {
                // const url = this.del();
                this.$http.get(this.ids).then(result => {

                    this.dialogVisible = false;
                    this.getList();
                });

            },
            getList() {
                var url = "/admin/goods/getlist?pageIndex=" + this.pageIndex + "&pageSize=" + this.pageSize + "&searchvalue=" + this.searchValue;
                this.$http.get(url).then(result => {
                    this.tableData2 = result.data.message;
                    this.multipleSelection = result.data.message;
                    this.pageSize = result.data.pageSize;
                    this.totalcount = result.data.totalcount;
                    this.pageIndex = result.data.pageIndex;

                });
            },
        },

        data() {
            return {
                ids: '',
                tableData2: [],
                pageSize: 10,
                totalcount: 0,
                pageIndex: 1,
                dialogVisible: false,
                checkAlls: false,
                multipleSelection: [],
                searchValue: ''
            };
        },

        created() {
            this.getList();

        }
    };
</script>