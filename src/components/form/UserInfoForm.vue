<template>
  <div>
  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal3">完善信息</button>

  <div class="modal fade" id="myModal3">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- 模态框头部 -->
        <div class="modal-header">
          <h4 class="modal-title">完善信息</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>

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
            <input class="form-control" type="tel" placeholder="请输入电话" v-model="tel" @blur="checkTel">
            <span>{{telMsg}}</span>
          </div>
          <div class="form-group">
            <label>工作性质</label>
            <input class="form-control" type="text" placeholder="请输入工作" v-model="job">
          </div>
          <div class="form-group">
            <label>工作地点</label>
            <input class="form-control" type="text" placeholder="请输入工作" v-model="workSpace">
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-success" @click="save">确定</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
        </div>
      </div>
    </div>



    </div>
  </div>


</template>

<script>
//完善信息的页面
import $ from 'jquery'
export default {
  name: "PerfectInfo",
  data() {
    return {
      username:"",
      nameMsg: "",
      password: "",
      pwdMsg: "",
      reword: "",
      rePwdMsg: "",
      email: "",
      emailMsg: "",
      tel: "",
      telMsg: "",
      job: "",
      workSpace: ""
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
    save(){
      if(this.checkEmail()&&this.checkTel()&&this.checkReword()&&this.checkPwd()){
        let data ={
          "address": this.workSpace,
          "email": this.email,
          "id": localStorage.getItem("user_id"),
          "lastLoginTime": (new Date()).getTime(),
          "occupy": this.job,
          "password": this.password,
          "tel": this.tel,
          "username": this.username
        };
        $.ajax({
          url : "http://localhost:8080/api/users",
          type : "PUT",
          async : true,
          contentType : "application/json",
          data : JSON.stringify(data),
          dataType : 'json',
        }).done(function (response) {
          $('#myModal3').modal('hide');
          location.reload();
          alert("修改成功")
          console.log(localStorage.getItem('user_id'));
        })
      }
      else {
        alert("请重新填写")
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
