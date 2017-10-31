<template>
    <div>
        <el-row>
            <!-- 左边菜单 -->
            <el-col :span="leftcol">
                <img src="../../../statics/imgs/logo.png" alt="">
                <div class="layout menu">
                    <!-- 导航菜单 -->
                    <el-menu :default-active="this.$store.state.menuid" class="el-menu-vertical-demo" :router=false>
                        <el-submenu index="1">
                            <template slot="title"><i class="el-icon-message"></i>购物商城</template>
                             <el-menu-item-group>
                                    <router-link to='/admin/goodlist'>
                                        <el-menu-item index="1-1">{{this.$store.state.menuid}}内容管理</el-menu-item>
                                    </router-link>
                                    <router-link to='/admin/category'>
                                        <el-menu-item index="1-2">类别管理</el-menu-item>
                                    </router-link>
                                 <router-link to='/admin' >
                                    <el-menu-item index="1-3">评论管理</el-menu-item>
                                 </router-link>
                             </el-menu-item-group>
                        </el-submenu>
                       <el-submenu index="2">
                            <template slot="title"><i class="el-icon-message"></i>订单管理</template>
                            <el-menu-item-group>
                                <router-link to='/admin/order'>
                                    <el-menu-item index="2-1">订单列表</el-menu-item>
                                </router-link>
                            </el-menu-item-group>
                       </el-submenu>
                  </el-menu>
             </div>
        </el-col>
<!-- 右边区域 -->
<el-col :span="rightcol">
    <!-- 顶部区域 -->
    <el-row>
        <el-col :span='24'>
            <div class="topbg">
                <el-row>
                    <el-col :span="1">
                        <!-- 控制菜单的展开和收缩图标 -->
                        <i @click="showhide" class="el-icon-menu layout area"></i>
                    </el-col>
                    <el-col :span="23">
                        <span>欢迎admin登录</span>
                        <el-dropdown split-button type="primary">
                            更多
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>修改密码</el-dropdown-item>
                                <el-dropdown-item>注销登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                </el-row>
            </div>
        </el-col>
    </el-row>
    <!-- 内容 -->
    <el-row>
        <el-col :span="24">
            <!-- 利用vue-router进行填充 -->
            <router-view></router-view>
        </el-col>
    </el-row>
</el-col>
</el-row>
</div>
</template>
<script>
    export default {
        data() {
            return {
                isCollapse: false,
                leftcol: 4,
                rightcol: 20,
                activeCategory:''
            };
        },
        created(){

        },
        methods: {
            showhide() {
                this.isCollapse = !this.isCollapse;
                if (this.isCollapse) {
                    this.leftcol = 1;
                    this.rightcol = 23;
                } else {
                    this.leftcol = 4;
                    this.rightcol = 20;
                }
            }
        }
    };
</script>
<style>
    .router-link-exact-active ,.router-link-active{
         background-color: none;
    }
</style>