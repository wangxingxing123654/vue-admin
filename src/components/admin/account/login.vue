<template>
        <el-row>
                <el-col :span="10" :offset="8">
        <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户名" prop="uname" :rules="[ { required: true, message: '用户名不能为空'}]">
                      <el-input  v-model="numberValidateForm.uname" auto-complete="off"></el-input>
               </el-form-item>
                <el-form-item label="密码" prop="upwd" :rules="[ { required: true, message: '密码不能为空'},]">
                        <el-input type="password" v-model="numberValidateForm.upwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                        <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
                        <el-button @click="resetForm('numberValidateForm')">重置</el-button>
                </el-form-item>
        </el-form>
                </el-col>
        </el-row>
</template>
<script>

        export default {
                data() {
                        return {
                                numberValidateForm: {
                                        uname: '',
                                        upwd:''
                                }
                        };
                },
               created(){
               document.body.style.backgroundColor='#53d7f1'
               },
               beforeDestroy(){document.body.style.backgroundColor='#fff'},
                methods: {
                        submitForm(formName) {
                                this.$refs[formName].validate((valid) => {
                                        if (valid) {

                                                       this.$http.post('/admin/account/login',this.numberValidateForm)
                                                               .then(res=>{
                                                               if(res.status==1){
                                                               this.$message(res.message);
                                                               return;
                                                       }
                                                       this.$message('登录成功');
                                                        var menulist={
                                                            '1-1':'goodlist',
                                                            '1-2':'category'
                                                        }
                                                        var dir=menulist[store.state.menuid];
                                            console.log(dir);
                                            this.$router.push({name:dir});

                                               })

                                        } else {
                                                console.log('error submit!!');
                                return false;
                        }
                        });
                        },
                        resetForm(formName) {
                                this.$refs[formName].resetFields();
                        }
                }
        }
</script>