<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <!--<div class="container">-->
          <!--<a href="#">BBS</a>-->
          <!--<span>&gt;</span>-->
          <!--<span>-->
            <!--<a href="#">大学校园</a>-->
          <!--</span>-->
          <!--<span>&gt;</span>-->
          <!--<a href="#">问答</a>-->
        <!--</div>-->
        <div class="container">
          <h3 style="text-align: center;padding: 8px 0">
            <span class="title">
              <span>{{this.article.articleEntity.title}}</span>
            </span>
          </h3>
          <p style="text-align: center">作者：{{this.article.username}} &nbsp; 时间：{{fmtDate(this.article.articleEntity.time)}}</p>
          <div style="background-color: gray">
            <div id="context">
             {{this.article.articleEntity.content}}
              <!--{{this.test}}-->
            </div>
            <div style="text-align: right">
              <div v-if="getUser == this.article.articleEntity.userId">
                <a href="javascript:void (0);" @click="edit" id="test" v-text="btn" v-show="flag === true"></a>
                <a href="javascript:void (0);" @click="save" id="test1" v-text="btn1" v-show="flag === false"></a>
              </div>
              <!--<div v-else>-->
                <!--<a href="javascript:void (0);">收藏</a>-->
                <!--<a href="javascript:void (0);">点赞</a>-->
              <!--</div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 50px"></div>
  </div>
</template>

<script>
  import 'summernote/dist/summernote-bs4.css';
  import 'summernote/dist/summernote-bs4';
  import $ from 'jquery';
  import 'codemirror/lib/codemirror';
  import 'codemirror/lib/codemirror.css';
  import 'codemirror/mode/xml/xml';
  import 'codemirror/theme/monokai.css';
  import 'codemirror';
  import 'normalize.css'

  export default {
    name: 'tie1',
    data() {
      return {
        btn: '修改',
        btn1: '提交',
        flag: true,
        context: '',
        article:[],
        name:[]
      };
    },
    methods: {
      showName(id){
        let url = 'http://localhost:8080/api/users/'+id;
        this.axios.get(url).then(res=>{
          this.name =res.data;
        });
        return this.name.username;
      },
      edit() {
        this.flag = false;
        $('#context').summernote({focus: true});
      },
      save() {
        this.flag = true;
        this.context = $('#context').summernote('code');
        $('#context').summernote('destroy');
        console.log(this.context);
        let data = {
          "categoryId": this.article.articleEntity.categoryId,
          "content": this.context,
          "favoriteNum": 0,
          "id": this.article.articleEntity.id,
          "likeNum": 0,
          "sortId": this.article.articleEntity.sortId,
          "time": (new Date()).getTime(),
          "title": this.article.articleEntity.title,
          "unlikeNum": 0,
          "userId": this.article.articleEntity.userId
        };
        $.ajax({
          url : "http://localhost:8080/api/articles",
          type : "PUT",
          async : true,
          contentType : "application/json",
          data : JSON.stringify(data),
          dataType : 'json',
          error:function () {
            alert("修改失败")
          }
        }).done(function () {
          location.reload();
          alert("修改成功");
        })
      },


      fmtDate(obj){
        let date =  new Date(obj);
        let y = 1900+date.getYear();
        let m = "0"+(date.getMonth()+1);
        let d = "0"+date.getDate();
        return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
      }
    },
    computed: {
      getUser() {
        return localStorage.getItem('user_id');
      }
    },
    mounted(){
      let url = 'http://localhost:8080/api/articles/'+this.$route.params.id;
        this.axios.get(url).then(response=>{
          this.article = response.data;
        });
    }
  };
</script>

<style scoped>
  .title {
    display: inline-block;
    color: white;
    background-color: #1e5882;
  }
</style>
