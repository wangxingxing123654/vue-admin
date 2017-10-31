<template>
    <div class="arttmpl">
        <div class="abread bt-line">
            <el-row>
                <el-col :span='24'>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                        <el-breadcrumb-item>类别管理</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
            </el-row>
        </div>
        <div class="operation">
            <el-row>
                <el-col :span='20'>
                    <el-button>新增</el-button>
                    <el-button>全选</el-button>
                    <el-button>删除</el-button>
                </el-col>
               
            </el-row>
        </div>
        <el-table :data="tableData2" style="width: 100%" :row-class-name="tableRowClassName" height="400">
              <el-table-column type="selection" width="55">
    </el-table-column>
           
            <el-table-column prop="category_id" label="订单号" width="150">
            </el-table-column>
            <el-table-column prop="title" label="会员账号" >
                <!-- <div v-if="class_layer==2"> -->
                    <template scope="scope">
                            <div v-if='scope.row.class_layer==1'>
                                  <a href="javascript:;"  @click="getPath(scope.row.category_id)"  >{{scope.row.title}}</a>
                            </div>
               <div v-else   >
                            <span >&nbsp;&nbsp;
                                    |- <a href="javascript:;" @click="getPath(scope.row.category_id)">{{scope.row.title}}</a></span>
                  </div>
   </template>
<!-- </div> -->
</el-table-column>
<el-table-column prop="sort_id" label="排序号" width='100'>
    <template scope="scope">
                       <el-input v-model="scope.row.sort_id" ></el-input>
     </template>
</el-table-column>
<el-table-column prop="class_layer" label="层级" width="80">
</el-table-column>
<el-table-column label="操作" width="160">
    <template scope="scope">
                    <a href="javascript:;"  @click="getPath(scope.row.category_id,scope.row.sort_id,scope.row.class_layer)">添加子类</a>
                     <a href="javascript:;" @click="getPath(scope.row.category_id,scope.row.class_layer)">修改</a>
                </template>

</el-table-column>
</el-table>
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
            getPath(id, sid, layer) {
                if (sid && layer) {
                    window.location =
                        "#/admin/goodscateedit/" + id + "/" + sid + "/" + layer;
                    return;
                } else if (sid && !layer) {
                    window.location = "#/admin/goodscateedit/" + sid;
                    return;
                }
                window.location = "#/admin/goodscateedit/" + id;
            },
            getList() {
                var url = "/admin/category/getlist/goods?pageIndex=1&pageSize=10";
                this.$http.get(url).then(result => {
                    this.tableData2 = result.data.message;
                });
            }
        },
        data() {
            return {
                tableData2: [],
                url1: ""
            };
        },

        created() {
            this.getList();
        }
    };
</script>
<style>
    body{
        background-color: #53d7f1;
    }
</style>