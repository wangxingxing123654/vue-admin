<template>

    <div class="abread bt-line">
        <el-row>
            <el-col :span='24'>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/admin/goodlist' }">返回上一页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                    <el-breadcrumb-item>新增商品</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="内容标题" prop="title">
                        <el-input v-model="ruleForm.title"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="副标题">
                        <el-input v-model="ruleForm.sub_title"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="所属类别" prop="category_id">
                        <el-select v-model="ruleForm.category_id " >
                            <el-option :label="item.title" :value="item.category_id" v-for="item in category">
                                <span v-for="i in (item.class_layer-1)">&nbsp;&nbsp;</span>
                                <span v-if="item.class_layer>1">|-</span>
                                <span v-text="item.title"></span>
                            </el-option>
                        </el-select>
                    </el-form-item>

                </el-col>
                <el-col :span="4">
                    <el-form-item label="是否发布" prop="subtitle">
                        <el-switch
                                v-model="ruleForm.status"
                                :width=60
                                on-text="是"
                                off-text="否"
                                on-color="#13ce66"
                                off-color="#ff4949"
                               >
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="推荐类型" >

                            <el-switch
                                    :width=80
                                    on-text="轮播图"
                                    off-text="轮播图"
                                    on-color="#13ce66"
                                    v-model="ruleForm.is_slide"
                                    off-color="#ff4949"
                                   >
                            </el-switch>
                        <el-switch
                                :width=60
                                v-model="ruleForm.is_top"
                                on-text="置顶"
                                off-text="置顶"
                                on-color="#13ce66"
                                off-color="#ff4949"
                                >
                        </el-switch>
                        <el-switch
                                v-model="ruleForm.is_hot"
                                :width=60
                                on-text="推荐"
                                off-text="推荐"
                                on-color="#13ce66"
                                off-color="#ff4949"
                               >
                        </el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="上传封面" >
                    <el-upload
                            :multiple="false"
                            class="upload-demo"
                            action="http://157.122.54.189:9095/admin/article/uploadimg"
                            :on-success="imgUploaded"

                            :file-list="ruleForm.imgList"
                            list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="图片相册">
                    <el-upload
                            class="upload-demo"
                            action="http://157.122.54.189:9095/admin/article/uploadfile"
                            :on-success="fileUploaded"
                            :file-list="ruleForm.fileList"
                            list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="商品货号" prop="goods_no" >
                    <el-input v-model.number="ruleForm.goods_no" type="goods_no"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="库存数量"  prop="stock_quantity">
                    <el-input v-model.number="ruleForm.stock_quantity" type="stock_quantity"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="市场价格" prop="market_price">
                    <el-input v-model.number="ruleForm.market_price" type="market_price"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="销售价格" prop="sell_price">
                    <el-input v-model.number="ruleForm.sell_price" type="sell_price"></el-input>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row>
                <el-form-item label="内容摘要" prop="zhaiyao">
                    <el-input type="textarea" v-model="ruleForm.zhaiyao"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="详细内容" prop="content">
                    <quill-editor v-model="ruleForm.content"
                                  ref="myQuillEditor"
                    >
                    </quill-editor>
                </el-form-item>
            </el-row>
             <el-row>
                 <el-col :span="4" :offset="2">
                     <el-button type="warning" @click="submitForm('ruleForm')">提交保存</el-button>
                 </el-col>
                 <el-col :span="4">
                     <el-button type="success" @click="resetForm('ruleForm')">重置</el-button>
                 </el-col>
             </el-row>
        </el-form>
    </div>
</template>
<script>
    import { quillEditor } from 'vue-quill-editor';
    export default {
        components:{quillEditor},
        data() {
            return {
                ruleForm: {
                    title: '',   //标题
                    sub_title:'', //副标题
                    goods_no:'', //商品货号
                    category_id: '', //类别id
                    stock_quantity:0, //库存数量
                    market_price:0, //市场价格
                    sell_price:0, //销售价格
                    status: true,  // 状态 0:发布 1:不发布
                    is_slide: false, //true:在轮播图显示
                    is_top: false,  // true：置顶
                    is_hot: false,  // true：推荐
                    zhaiyao: '',    // 文章摘要
                    content:'' ,   // 文章富文本雷荣
                    imgList:[],//图片列表
                    fileList:[], //附件列表

                },
                form:{
                    content:''
                },
                rules: {

                    //必须与form中的category_id保持一致，否则无效

                    zhaiyao:[
                        { required: true, message: '请输入摘要', trigger: 'blur' },
                    ],
                    content:[
                        { required: true, message: '请输入详细内容', trigger: 'blur' },
                    ],
                    stock_quantity:[
                        { required: true, message: '不能为空'},
                        { type: 'number', message: '必须为数字值'}
                    ],
                    market_price:[
                        { required: true, message: '不能为空'},
                        { type: 'number', message: '必须为数字值'}
                    ],
                    sell_price:[
                        { required: true, message: '不能为空'},
                        { type: 'number', message: '必须为数字值'}
                    ],
                    goods_no:[
                        { required: true, message: '不能为空'},
                        { type: 'number', message: '必须为数字值'}
                    ],

                },
                category:[]
            }


        },
        created(){this.getCategory()},
        methods: {
            imgUploaded(res,file,fileList){
                console.log(res, file, fileList);
                this.ruleForm.imgList=[res];
            },
            fileUploaded(res,file,fileList){
                this.ruleForm.fileList.push(res)
            },
            getCategory(){
                var url='/admin/category/getlist/goods';
                        this.$http.get(url).then(res=>{
                      this.category=res.data.message;
                })
            },
            submitForm(ruleForm) {
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                        this.$http.post('/admin/goods/add/goods',this.ruleForm).then(res=>{
                            if(res.data.status==1){
                            this.$message.error(res.data.message);
                            return;
                        }
                        this.$router.push({name:'goodlist'});
                        })
                    } else {
                        console.log('error submit!!');
                return false;
            }
            });
            },
            resetForm(ruleForm) {
                this.$refs[ruleForm].resetFields();
            },

        }
    }
</script>
<style>
    .ql-editor {
        min-height: 200px;
        height: 200px;
        max-height: 200px;
    }
</style>