<template>
  <div class="shadow" style="margin-bottom: 20px">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <ul class="nav" style="float: left">
            <li class="nav-item">
              <router-link class="nav-link" to="/">bbs</router-link>
            </li>
            <!--<li class="nav-item">-->
              <!--<router-link class="nav-link" to="/post/hot">热帖榜</router-link>-->
            <!--</li>-->
          </ul>
          <div v-if="this.user_id !==null">
            <ul class="nav" style="float: right">
              <li class="nav-item">
              <router-link :to="'/user/'+0">我的中心</router-link>
              </li>
              <li class="nav-item">
                <a href="javascript:void (0)" @click="signOut">退出</a>
              </li>
            </ul>
          </div>
          <div v-else>
            <ul class="nav" style="float: right">
              <li class="nav-item">
                <sign-in-form/>
              </li>
              <li class="nav-item">
                <sign-up-form/>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignInForm from "../form/SignInForm";
import SignUpForm from "../form/SignUpForm";
export default {
  name: "TestHeader",
  components: {
    SignInForm,
    SignUpForm
  },
  data(){
    return{
      user_id:localStorage.getItem('user_id'),
    }
  },
  methods:{
    signOut(){
      localStorage.removeItem('user_id');
      window.location.href="http://localhost:8070"
    }
  }
};
</script>

<style scoped>
a {
  color: black;
}

a:hover {
  color: red;
}
</style>
