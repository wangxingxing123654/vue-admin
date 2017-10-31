<template>
    <div class="arttmpl">
        <div class="abread bt-line">
            <el-row>
                <el-col :span='24'>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
                        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
            </el-row>
        </div>
        <div class="operation">
            <el-row>
                <el-col :span='20'>
                    <el-button>全选</el-button>
                    <el-button>删除</el-button>
                    <el-dropdown>
                        <el-button type="primary">
                            请选择订单状态<i class="el-icon-caret-bottom el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>代付款</el-dropdown-item>
                            <el-dropdown-item>已付款代收货</el-dropdown-item>
                            <el-dropdown-item>已发货待签收</el-dropdown-item>
                            <el-dropdown-item>已签收</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
                <el-col :span='4'>
                    <el-input placeholder="请输入搜索会员" icon="search">
                    </el-input>
                </el-col>
            </el-row>
        </div>
        <el-table :data="tableData2" style="width: 100%" :row-class-name="tableRowClassName" height="400" border>
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="order_no" label="订单号" width="150">
            </el-table-column>
            <el-table-column prop="user_name" label="会员账号">
            </el-table-column>
            <el-table-column prop="paymentTitle" label="支付方式" width='150'>
            </el-table-column>
            <el-table-column prop="expressTitle" label="配送方式" width="150">
            </el-table-column>
            <el-table-column label="订单状态" width="160" prop="statusName">
            </el-table-column>
            <el-table-column prop="order_amount" label="总金额" width="150">
            </el-table-column>
            <el-table-column prop="add_time" label="下单时间" width="150">
            </el-table-column>
            <el-table-column prop="class_layer" label="操作" width="150">
                <template scope="scope">
                    <a href="javascript:;" @click="getPath(id)">修改</a>
                </template>
</el-table-column>
</el-table>
<div class="block">
    <el-pagination @size-change="handleSizeChange(pageSize)" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[1,10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalcount">
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
            tableRowClassName(row, index) {
                if (index % 2 == 0) {
                    return "info-row";
                } else {
                    return "positive-row";
                }
                return "";
            },
            getPath(id) {
                window.location = "#/admin/orderedit/" + id;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            getList() {
                var url =
                    "/admin/order/getorderlist?orderstatus=-1&vipname=&pageIndex=1&pageSize=10";
                this.$http.get(url).then(result => {
                    this.tableData2 = result.data.message;
                    this.page = result.data;
                    this.pageSize = result.data.pageSize;
                    this.totalcount = result.data.totalcount;
                    this.pageIndex = result.data.pageIndex;
                });
            }
        },
        data() {
            return {
                tableData2: [],
                url1: "",
                pageSize: "",
                totalcount: "",
                pageIndex: ""
            };
        },

        created() {
            this.getList();
        }
    };
</script>