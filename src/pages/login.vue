<template>
    <div styLe="width: 100%; height: 100%;" class="appContent" >
        
        <div class="loginContent">
            <h1>后台管理系统</h1>
            <div class="login" v-if="isLogin">
                <h3>登录</h3>
                <div class="login_box">
                    <div class="username">
                        <span>用户名：</span>
                        <input type="text" v-model="fromData.username" placeholder="请输入用户名">
                        <p class="error" v-if="!fromData.username && isShowErr">用户名不能为空</p>
                    </div>
                    <div class="password">
                        <span>密&nbsp;&nbsp;&nbsp;&nbsp;码：</span>
                        <input type="password" v-model="fromData.password" placeholder="请输入密码">
                        <p class="error" v-if="!fromData.password && isShowErr">密码不能为空</p>
                    </div>
                    <el-button type="primary" @click = "loginFn" :loading="btnLoading">登录</el-button>
                </div>
                <!--<div class="nowRegister" @click="nowRegister">立即注册</div>-->
            </div>
            <div class="register" v-if="!isLogin">
                <h3>注册</h3>
                <div class="login_box">
                    <div class="username">
                        <span>用户名：</span>
                        <input type="text" @blur = "userBlurFn" v-model="fromData.username" placeholder="请输入用户名">
                        <p class="error" v-if="isUsername && ((!fromData.username && isShowErr) || data.code == 5)" v-html="data.message && data.code == 5 ? data.message:  '用户名不能为空！&nbsp;&nbsp;&nbsp;&nbsp;'"></p>
                        <p class="error" v-if="!isUsername && fromData.username" >用户名必须由2-6个汉字组成</p>
                    </div> 
                    <div class="password">
                        <span>密&nbsp;&nbsp;&nbsp;&nbsp;码：</span>
                        <input type="password" @blur = "passBlurFn" v-model="fromData.password" placeholder="请输入密码">
                        <p class="error" v-if="isPassword && ((!fromData.password && isShowErr) || data.code == 0)" v-html="data.message && data.code == 0 ?data.message: '密码不能为空！&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' "></p>
                        <p class="error" v-if="!isPassword && fromData.password" >密码必须由 6-16位字母、数字组成</p>
                    </div>
                    <div class="password">
                        <span>验证密码：</span>
                        <input type="password" v-model="fromData.repassword" placeholder="请输入密码">
                        <p class="error" v-if="(!fromData.repassword && isShowErr)  || (fromData.password != fromData.repassword && fromData.repassword && fromData.password)" v-html=" fromData.password != fromData.repassword ? '两次密码不一致，请检查！': '验证密码不能为空！' "></p>
                    </div>
                    <el-button type="primary" @click = "registerFn" :loading="btnLoading">注册</el-button>
                </div>
                <div class="nowRegister" @click="backLogin">返回登录</div>
            </div>
        </div>
    </div>  
</template>
<script>
    import loginHref from '../utils/loginHref.js';
    
    export default {
        components: {

        },
        data() {
            return { 
                isShowNotice: false,
                fromData: {
                    username: 'admin' || '',
                    password: 'admin' || '',
                    repassword: '',
                },
                isLogin: true,
                data: {},
                isShowErr: false,
                btnLoading: false,
                isUsername: true,
                isPassword: true,
                ips: '',
            }
        },
        methods: {
            nowRegister(){
                this.isLogin = false;
                if(this.isShowErr){
                    this.isShowErr = false;
                }; 
                this.fromData.username = '';
                this.fromData.password = '';
                this.fromData.repassword = '';
            },
            backLogin(){
                this.isLogin = true;
                if(this.isShowErr){
                    this.isShowErr = false;
                }; 
                this.fromData.username = '';
                this.fromData.password = '';
                this.fromData.repassword = '';
            },
            userBlurFn(){
                if(!this.fromData.username) return;
                const userPattern = /^[\u4E00-\u9FA5]{2,6}$/;
                this.isUsername = userPattern.test(this.fromData.username);  
            },
            passBlurFn(){
                if(!this.fromData.password) return;
                const regPassword = /^[A-Za-z0-9]{6,16}$/;  
                this.isPassword = regPassword.test(this.fromData.password);  
            },
            // 注册
            async registerFn(){
                // if(!this.isUsername || !this.isPassword) return;
                this.btnLoading = true;
                
                if(!this.fromData.username || !this.fromData.password || !this.fromData.repassword || (this.fromData.repassword != this.fromData.password)) {
                    this.isShowErr = true;
                    this.btnLoading = false;
                    return false;
                }
               /* const userPattern = /^[\u4E00-\u9FA5]{2,6}$/;
                let isUsername = userPattern.test(this.fromData.username);  
                if(!isUsername){
                    const datas = {
                        type: 'error',
                        message: '用户名必须由2-6个汉字组成...'
                    }
                    this.tips(datas);
                    this.btnLoading = false;
                    return;
                }
                const regPassword = /^[A-Za-z0-9]{6,16}$/;  
                let isPassword = regPassword.test(this.fromData.password);  
                let isRepassword = regPassword.test(this.fromData.repassword);  
                if(!isPassword || !isRepassword){
                    const datas = {
                        type: 'error',
                        message: '密码必须由 6-16位字母、数字组成...'
                    }
                    this.tips(datas);
                    this.btnLoading = false;
                    return;
                }*/
                this.isShowErr = false;
                this.fromData.addTime = new Date();
                let _data = await this.$http('post', '/user/register',this.fromData);
                if(_data.status == 200){
                    this.fromData.username = '';
                    this.fromData.password = '';
                    this.fromData.repassword = '';
                    this.data = _data.data;
                    _data.data.type = 'success';
                    this.tips(_data.data);
                    this.isLogin = true;
                    this.btnLoading = false;
                }else{
                    this.data = _data;
                    _data.type = 'error';
                    this.btnLoading = false;
                    this.isShowErr = true;
                    this.tips(_data);
                    this.btnLoading = false;
                }
            },
            // 登录
            async loginFn(){
                this.btnLoading = true;
                delete this.fromData.repassword;
                if(!this.fromData.username || !this.fromData.password) {
                    this.isShowErr = true;
                    this.btnLoading = false;
                    return false;
                }
                
                this.fromData.loginTime = new Date();
                if(this.ips){
                    this.fromData.loginIp = this.ips || '';
                }
                this.isShowErr = false;
                let _data = await this.$http('post', '/user/login',this.fromData);
                if(_data.status == 200){
                    this.data = _data.data;
                    _data.data.type = 'success';
                    this.tips(_data.data);
                    localStorage.setItem('userInfo',JSON.stringify(_data.data.data));
                    setTimeout(() =>{
                        this.$router.push('/appContent/index');
                    },1000)
                }else{
                    this.btnLoading = false;
                    _data.type = 'error';
                    this.isShowErr = true;
                    this.tips(_data);
                }
            },
            tips(data) {
                this.$message({
                    message: data.message,
                    type: data.type,
                });
            },
            cb(){

            }
           
                
        },
        computed: {
           
        },
        beforeCreate(){
            
        },
        created() {
            localStorage.clear();
            this.$lcf.getIp((data) => {
                this.ips = data.ip;
            });
        },
        
        
    }
</script>

<style lang="scss" scoped>
    .appContent{
        background: url('../assets/img/login_bg.png');
        overflow: hidden;
    }
    .loginContent{
        position: relative;
        width: 100%;
        height: 100%;
        .nowRegister{
            color: $-color-theme-login;
            position: absolute;
            right: 20px;
            cursor: pointer;
        }
        h1{
            color: #fff;
            text-align: center;
            position: absolute;
            width: 100%;
            top: -60px;
            left: 0;
            font-weight: 600;
            font-size: 30px;
        }
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        width: 500px;
        height: 340px;
        box-shadow: 0px 0px 10px #030303;
        margin:  auto;
        background-color: #fff;
        border-radius: 10px;
        h3{
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            background: $-color-theme-login;
            color: #fff;
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-size: 22px;
        }
        .register{
             .login_box{
                margin-top: 40px;
                p{
                    padding-left: 100px;
                    text-align: left;
                }
                .password{
                    margin-bottom: 20px;
                }
             }
            
        }
        .login_box{
            margin-top: 60px;
            padding: 0 30px;
            font-size: 14px;
            .password{
                margin-bottom: 40px;
            }
            p{
                padding-left: 100px;
                text-align: left;
            }
            span{
                display: inline-block;
                width: 70px;
                height: 40px;
                line-height: 40px;
                text-align: right;
                color: $-color-theme-login;
            }
            div{
                height: 40px;
                margin-bottom: 20px;
                width: 100%;
                input{
                    width: 300px;
                    height: 38px;
                    line-height: 38px;
                    border: 1px solid $-color-theme-login;
                    padding: 0 10px;
                    border-radius: 4px; 
                }
                text-align: center;
            }
            button{
                padding: 10px 60px;
                cursor: pointer;
                margin: 0 auto;
                display: block;
                border-radius: 4px; 
                background-color: $-color-theme-login;
                color: #fff;
                font-size: 16px;
            }
           
        }
    }
</style>


