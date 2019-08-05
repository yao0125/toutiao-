<template>
    <div class="container">
      <el-card class="mycard">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon>
            <el-form-item prop="mobile">
                <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input v-model="loginForm.code" placeholder="请输入手机号" style="width:240px;margin-right:10px"></el-input>

                <el-button >发送验证码</el-button>
            </el-form-item>
            <el-form-item  >
                <el-checkbox :value="true">我已阅读并同意协议和隐私条款</el-checkbox>
             </el-form-item>
            <el-form-item >
                <el-button type="primary" style="width:100%" @click="login()">登录</el-button>
            </el-form-item>
        </el-form>
      </el-card>
    </div>
</template>
<script>
import store from '@/store'
export default {
  data () {
    // 申明校验函数
    const checkMobile = (rule, value, callback) => {
      // 校验手机号  1开头 第二位3-9  9位数字
      if (!/^1[3-9]\d{9}$/.test(value)) { return callback(new Error('手机号格式不对')) }
      callback()
    }
    return {
      // 表单数据对象
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      // 表单对象数据
      loginRules: {
        mobile: [
          { require: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '长度是6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 对整个表单进行校验
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          // 请登录接口
          // this.$http
          //   .post(
          //     '/authorizations',
          //     this.loginForm
          //   )
          //   .then(res => {
          //     // res 响应对象 包含相应主体
          //     // console.log(res.data)
          //     // 跳转页面
          //     store.setUser(res.data.data)
          //     // 跳转去首页
          //     this.$router.push('/')
          //   })
          //   .catch(() => {
          //     // 错误信息提示
          //     this.$message.error('手机号或验证码错误')
          //   })
          try {
            const { data: { data } } = await this.$http.post('authorizations', this.loginForm)
            store.setUser(data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或验证码错误')
          }
        }
      })
    }
  }
}
</script>

<style scoped lang ='less'>
    .container{
        position:absolute;
        width:100%;
        height:100%;
        background:url(../../assets/images/login_bg.jpg) no-repeat center/cover
    }
    .mycard{
        width: 450px;
        height: 350px;
        position:absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%)
    }
</style>
