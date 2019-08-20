<template>
  <div>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal2">注册</button>

    <!-- 模态框 -->
    <div class="modal fade" id="myModal2">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- 模态框头部 -->
          <div class="modal-header">
            <h4 class="modal-title">注册</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>

          <!-- 模态框主体 -->
          <div class="modal-body">
            <div class="form-group">
              <label>用户名</label>
              <input
                class="form-control"
                type="text"
                placeholder="请输入用户名"
                v-model="username"
                @blur="checkName"
              >
              <span>{{nameMsg}}</span>
            </div>
            <div class="form-group">
              <label>密码</label>
              <input
                class="form-control"
                type="password"
                placeholder="请输入密码"
                v-model="password"
                @blur="checkPwd"
              >
              <span>{{pwdMsg}}</span>
            </div>
            <div class="form-group">
              <label>确认密码</label>
              <input
                class="form-control"
                type="password"
                placeholder="请再次输入密码"
                v-model="reword"
                @blur="checkReword"
              >
              <span>{{rePwdMsg}}</span>
            </div>
            <div class="form-group">
              <label>电子邮箱</label>
              <input
                class="form-control"
                type="email"
                placeholder="请输入邮箱"
                v-model="email"
                @blur="checkEmail"
              >
              <span>{{emailMsg}}</span>
            </div>
            <div class="form-group">
              <label>电话号码</label>
              <input
                class="form-control"
                type="tel"
                placeholder="请输入电话"
                v-model="tel"
                @blur="checkTel"
              >
              <span>{{telMsg}}</span>
            </div>
          </div>

          <!-- 模态框底部 -->
          <div class="modal-footer">
            <button type="submit" class="btn btn-success" @click="register">注册</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
export default {
  name: "component1",
  data() {
    return {
      username: "",
      nameMsg: "",
      password: "",
      pwdMsg: "",
      reword: "",
      rePwdMsg: "",
      email: "",
      emailMsg: "",
      tel: "",
      telMsg: ""
    };
  },
  methods: {
    checkName: function() {
      if (this.username.length === 0) {
        this.nameMsg = "*用户名不能为空";
        return false;
      } else {
        this.nameMsg = "";
        return true;
      }
    },
    checkPwd: function() {
      let word = this.password.trim();
      if (word.length === 0) {
        this.pwdMsg = "*密码不能为空";
        return false;
      }
      let count = 0;
      if (/[0-9]/.test(word)) {
        count++;
      }
      if (/[A-Za-z]/.test(word)) {
        count++;
      }
      if (/[^0-9A-Za-z]/.test(word)) {
        count++;
      }
      if (count === 3 && word.length >= 6) {
        this.pwdMsg = "*高强度";
      } else if (count === 2 && word.length >= 6) {
        this.pwdMsg = "*中强度";
      } else {
        this.pwdMsg = "*低强度";
      }
      return true;
    },
    checkReword: function() {
      if (this.password !== this.reword) {
        this.rePwdMsg = "*两次密码不一致";
        return false;
      } else {
        this.rePwdMsg = "";
        return true;
      }
    },
    checkTel: function() {
      let telRule = /^1[3-578]\d{9}$/;
      if (this.tel.length !== 11) {
        this.telMsg = "*请输入11位电话号码";
        return false;
      } else if (this.tel.match(telRule) == null) {
        this.telMsg = "请输入正确的手机号";
        return false;
      } else {
        this.telMsg = "";
        return true;
      }
    },
    checkEmail: function() {
      let rule = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (this.email.length === 0) {
        this.emailMsg = "*请输入邮箱";
        return false;
      } else if (this.email.match(rule) == null) {
        this.emailMsg = "*请输入正确邮箱格式";
        return false;
      } else {
        this.emailMsg = "";
        return true;
      }
    },
    register(){
      let data = {
        "email": this.email,
        "id":0,
        "password":this.password,
        "tel":this.tel,
        "username":this.username,
      };
      if(this.checkEmail()&&this.checkTel()&&this.checkReword()&&this.checkPwd()&&this.checkName()){
        console.log(this.username+this.password+this.email+this.tel);
        $.ajax({
          url : "http://localhost:8080/api/users",
          type : "POST",
          async : true,
          contentType : "application/json",
          data : JSON.stringify(data),
          dataType : 'json',
        }).done(function (response) {
          localStorage.setItem('user_id', response.id);
          $('#myModal2').modal('hide');
          location.reload();
          console.log(localStorage.getItem('user_id'));
        })
      }
      else{
        alert("请先按要求注册");
      }
    }
  }
};
</script>

<style scoped>
span {
  font-size: small;
  color: red;
}
</style>
