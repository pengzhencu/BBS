<template>
  <div class="container">
    <div class="row">
      <div class="col-2"></div>
      <div class="col-8">
        <h3>发帖</h3>
        <br>
        <h5>标题</h5>
        <input class="form-control" type="text" id="title" placeholder="请输入标题" v-model="title">
        <br>
        <select v-model="type">
          <option value="0">选择板块</option>
          <option v-for="it in sort" :value="it.categoryId">{{it.categoryName}}</option>
        </select>
        <h5 style="padding-top: 20px">帖子内容</h5>
        <div id="content"></div>
        <div style="text-align: right;padding-top: 15px">
          <button class="btn btn-primary btn-sm" @click="console">发表</button>
        </div>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>

<script>
import "summernote/dist/summernote-bs4.css";
import "summernote/dist/summernote-bs4";
import $ from "jquery";
import "codemirror/lib/codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/xml/xml";
import "codemirror/theme/monokai.css";
import "codemirror";

export default {
  name: "component1",
  data() {
    return {
      title: "",
      sort: [],
      type: 0,
      message:'',
      user_id:0,
      sort_id: this.$route.params.id
    };
  },
  mounted() {
    this.user_id = localStorage.getItem('user_id');
    $(document).ready(function() {
      $("#content").summernote({
        placeholder: "请输入帖子内容",
        height: 400,
        maxHeight: null,
        minHeight: 400
      });
    });
    this.axios.get('http://localhost:8080/api/category').then(response =>{
      this.sort = response.data;
    })
  },
  methods:{
    console(){
      this.message = $("#content").summernote('code');

      let data = {
        "categoryId": this.type,
        "content": this.message,
        "favoriteNum": 0,
        "id": 0,
        "likeNum": 0,
        "sortId": this.sort_id,
        "time":(new Date()).getTime(),
        "title": this.title,
        "unlikeNum": 0,
        "userId": localStorage.getItem('user_id')
      };
      console.log(data);

      $.ajax({
        url : "http://localhost:8080/api/articles",
        type : "POST",
        async : true,
        contentType : "application/json",
        data : JSON.stringify(data),
        dataType : 'json',
        error:function () {
          alert("请先登录或按要求发帖")
        }
      }).done(function () {
        window.location.href="http://localhost:8070/user/0";
        alert("发表成功");
      })
    }
  }
};
</script>

<style scoped>
</style>
