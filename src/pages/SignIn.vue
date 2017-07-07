<template>
  <section>
    <div>
      <article>
        <!-- <img src="../assets/img/colorless_logo.png" />
        <div>
          <h2>广州云软数据科技有限公司</h2>
          <h5>Guangzhou Cloudsoft Data Technology Limited </h5>
        </div> -->
      </article>
      <article>
        <img src="../assets/img/logo.png"/>
        <h1>{{ companyName }}</h1>
        <div class="sign-in">
          <div class="front" @keyup.enter="">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="70px" class="ruleForm">
              <el-form-item label="用户名" prop="name">
                <el-input v-model.trim="ruleForm.name" placeholder="请输入登录账号" @change=""></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model.trim="ruleForm.password" placeholder="请输入登录密码"></el-input>
              </el-form-item>
              <el-form-item label="验证码">
                <el-col :span="15">
                  <el-form-item prop="code">
                    <el-input v-model.trim="ruleForm.code"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9" style="height: 36px">
                  <div class="identifying_code" v-html="identify_content" @click=""></div>
                </el-col>
              </el-form-item>
              <el-button type="primary" @click="goSignIn" class="sign_in">登录</el-button>
              <div class="signin_select">
                <el-checkbox label="记住账号" v-model="ruleForm.checked" @change=""></el-checkbox>
              </div>
              <h3>授权有效期 2016-01-01 至 2017-12-31</h3>
            </el-form>
          </div>
        </div>
      </article>
      <!-- <h2 id="version">Cloudsoft1.0.0</h2> -->
    </div>
    <div>
      <div>
       <!--  <h4>Copyright © 2017-2018 Guangzhou Cloudsoft Data Technology Limited . All Rights Reserved</h4>
        <h3>广州市云软数据科技有限公司 版权所有</h3> -->
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'SignIn',
    data() {
      const checkUser = (rule,value,callback) => {
        if(value === '') {
          callback(new Error('用户名不能为空'))
        }else {
          if(this.ruleForm.checked) {
            localStorage.setItem('user',this.ruleForm.name);
            localStorage.setItem('status',this.ruleForm.checked);
            callback()
          }
         else {
            callback()
          }
        }
      }
      const checkPass = (rule,value,callback) => {
        if(value === '') {
          callback(new Error ('密码不能为空'))
        }else if(value.length < 6 || value.length > 20){
          callback(new Error('长度在 6 到 20 个字符'))
        }else {
          callback()
        }
      }
      const checkCode = (rule,value,callback) => {
        if(value === '') {
          callback(new Error('验证码未填写'))
        }else {
          callback()
        }
      }
      return {
        rules: {
          name: [
            {validator: checkUser, trigger: 'blur'}
          ],
          password: [
            {validator: checkPass, trigger: 'blur'}
          ],
          code: [
            {validator: checkCode, trigger: 'blur'}
          ]
        },
        companyName: '达克斯监控系统',
        ruleForm: {
					name: '',
					password: '',
					code: '',
					checked: false
        },
        identify_content: ''
      }
    },
    methods: {
      goSignIn:function () {
        this.$store.commit('updateUser',{name:this.ruleForm.name})
        this.$router.push('tab/market')
      }
    },
    mounted() {

    }
  }
</script>

<style lang="less" scoped>
  section {
    width: 100%;
    height: 100%;
    background-image: url("../assets/img/background.png");
    -webkit-background-size: 100%;
    background-size: 100%;
    user-select: none;
    .el-input {
      vertical-align: top;
    }
    > div:nth-of-type(1) {
      height: 91%;
      position: relative;
      article:nth-of-type(1) {
        position: absolute;
        left: 40px;
        top: 30px;
        img {
          width: 70px;
          vertical-align: middle;
          margin-right: 15px;
        }
        > div {
          display: inline-block;
          vertical-align: middle;
          h2 {
            font-size: 14px;
            color: #e0e6ed;
            opacity: 0.8;
            text-align: left;
          }
          h5 {
            font-size: 12px;
            color: #e0e6ed;
            opacity: 0.8;
          }
        }
      }
      article:nth-of-type(2) {
        width: 415px;
        height: 560px;
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%,-50%);
        -moz-transform: translate(-50%,-50%);
        -ms-transform: translate(-50%,-50%);
        -o-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        > img {
          width: 130px;
        }
        h1 {
          font-size: 24px;
          color: #fff;
          font-weight: normal;
          margin-bottom: 40px;
        }
        .el-form {
          box-sizing: border-box;
          border-radius: 10px;
          background-color: #fff;
          padding: 50px 20px 30px 20px;
          height: 415px;
          -webkit-box-reflect:below 10px -webkit-linear-gradient(transparent,transparent 80%,rgba(255,255,255,.3));
          box-reflect:below 10px linear-gradient(transparent,transparent 80%,rgba(255,255,255,.3))
        }
        .first_login {
          padding-top: 20px;
          padding-bottom: 0;
          height: 380px;
          .log_in {
            .el-button {
              width: 100%;
            }
          }
        }
        .el-form-item__label {
          text-align: left;
          font-weight: bold;
        }
        .sign_in {
          width: 100%;
          margin-bottom: 15px;
        }
        .signin_select {
          position: relative;
          height: 26px;
          line-height: 26px;
          font-size: 14px;
          margin-bottom: 35px;
          .el-checkbox {
            position: absolute;
            left: 0;
            color: #9facbe;
          }
          .account_activate {
            position: absolute;
            right: 70px;
            text-decoration: none;
            &:link {
              color: #9facbe;
            }
          }
          .forget_password {
            position: absolute;
            right: 0;
            text-decoration: none;
            &:link {
              color: #9facbe;
            }
          }
        }
        h3 {
          font-size: 14px;
          font-weight: normal;
          color: #99a9bf;
        }
        h2 {
          font-size: 18px;
          line-height: 35px;
          background-color: #20a0ff;
          border-radius: 10px 10px 0 0;
          color: #fff;
          font-weight: normal;
          position: relative;
          i {
            position: absolute;
            left: 0;
            font-size: 16px;
            padding: 9.5px 10px;
            cursor: pointer;
          }
        }
      }
      #version {
        position: absolute;
        bottom: 15px;
        right: 50px;
        font-size: 14px;
        color: #fff;
        opacity: 0.32;
      }
      &:after {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 5px;
        background-image: linear-gradient(to right ,#00d8ff 34%,#6178ff 52%,#762dff 68%,#e659a0 88%);
      }
    }
    > div:nth-of-type(2) {
      height: 9%;
      background-color: #202227;
      position: relative;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      > div {
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%,-50%);
        -moz-transform: translate(-50%,-50%);
        -ms-transform: translate(-50%,-50%);
        -o-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        text-align: center;
        h4 {
          font-size: 12px;
          color: #546275;
          margin-top: 5px;
        }
        h3 {
          font-size: 14px;
          color: #546275;
        }
      }
    }
    .sign-in {
    	 width: 415px;
    	 height: 415px;
    	 background-color: #fff;
    	 border-radius: 10px
    }
  }
</style>

<style lang="less">
  .identifying_code {
    height: 100%;
    svg {
      position: relative;
      height: 100%;
      top: 0;
      left: 1px;
      bottom: 10px;
      width: 133px
    }
  }
  .first_login {
    .signin_phoneidentify {
      .el-form-item__content {
        display: flex;
        justify-content: space-between;
        .el-button {
          margin-left: 5px;
        }
        img {
          margin-right: -8px;
        }
      }
    }
  }
</style>
