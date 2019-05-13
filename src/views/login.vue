<template>
  <div class="login">
    <el-container>
      <el-header>
        <base-header></base-header>
      </el-header>
      <el-main>
        <el-row class="flex-center">
          <el-col :span="22" class="flex-center container">
            <el-col :xs="18" :sm="6" :md="6" :lg="6" :xl="11">
              <el-form ref="form" label-width="0px">
                <div class="left login">登陆</div>
                <el-form-item>
                  <el-input v-model="form.account" @keyup.enter.native="onSubmit" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input
                    type="password"
                    v-model="form.pass"
                    @keyup.enter.native="onSubmit"
                    placeholder="密码"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button class="login-button" type="primary" @click.native.prevent="onSubmit">登陆</el-button>
                </el-form-item>
              </el-form>
              <!-- 弹出层 -->
              <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
                <span>{{errInfo}}</span>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
              </el-dialog>
            </el-col>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import baseHeader from "@/components/_baseHeader.vue"; //baseHeader是一个头部组件
export default {
  name: "login",
  components: {
    baseHeader
  },
  data() {
    return {
      form: {},
      dialogVisible: false,
      errInfo: ""
    };
  },
  methods: {
    onSubmit() {
      if (!this.form.pass && !this.form.account) {
        this.dialogVisible = true;
        this.errInfo = "请输入用户名和密码";
      } else if (!this.form.pass) {
        this.dialogVisible = true;
        this.errInfo = "请输入密码";
      } else if (!this.form.account) {
        this.dialogVisible = true;
        this.errInfo = "请输入用户名";
      } else {
        const res = {
          email: this.form.account,
          password: this.form.pass
        };
        this.$store
          .dispatch("LoginByUserEmail", res)
          .then(data => {
            console.log(1)
            this.dump();
          })
          .catch(err => {});
      }
    },
    dump() {
      this.$router.replace({ path: "/homepage" });
    },
    to404() {
      this.$router.push("/404");
    }
  }
};
</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
body {
  background: #eee;
}
.login {
  .el-header {
    padding: 0;
    width: 100%;
    height: 65px !important;
    border: 0 none;
    border-color: #121418;
    background-color: #212b37;
    box-shadow: 0 -3px 3px #2c343d inset;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 10pt;
  }
  .el-main {
    padding: 0;
    .flex-center {
      display: flex;
      justify-content: center;
    }
    .container {
      background: #fff;
      box-shadow: 0 0 5px #ccc;
      border-radius: 0 0 5px 5px;
      padding-top: 10px;
      padding-bottom: 150px;
    }
    .login {
      color: #6f7a81;
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 18px;
    }
    .login-button {
      width: 100%;
    }
  }
}
</style>
