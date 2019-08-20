<template>
  <div class="container" style="padding-bottom: 50px">
    <div class="row">
      <div class="col-12">
        <div class="container">
          <div style="background-color: burlywood;">
            <div style="padding:10px" v-for="it in item">
              <p style="text-align: left">
                <a href="#">{{it.commenter}}</a>    <!--     -->
                <span>&nbsp; &nbsp;{{fmtDate(it.commentEntity.time)}}</span>
              </p>
              <div id="context">{{it.commentEntity.content}}</div>
              <div style="text-align: right;padding-bottom: 15px">
                <a href="javascript:void (0);" @click="test(it.commentEntity.id)">评论</a>
              </div>
              <div style="width: 900px;padding-left: 100px;display: none" v-bind:id="it.commentEntity.id">
                <div style="padding-left: 100px;padding-bottom: 15px" v-for="it1 in res">
                  <p style="text-align: left">
                    <a href="#">{{it1.responsor}}</a>
                    <span>&nbsp;{{fmtDate(it1.responseEntity.time)}}</span>
                  </p>
                  <div>{{it1.responseEntity.content}}</div>
                </div>
                <div style="padding-left: 100px;">
                  <div style="text-align: right">
                    <textarea cols="90" rows="4" wrap="on" v-model="message"></textarea>
                  </div>
                  <div style="text-align: right;padding-top: 15px">
                    <button class="btn btn-primary btn-sm" @click="determine(it.commentEntity.id)">发表</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: "Comment",
  data() {
    return {
      item: [],
      res:[],
      message:'',
      name:[]
    };
  },
  methods: {
    test(id) {
      console.log(id);
      if (document.getElementById(id).style.display === "none") {
        document.getElementById(id).style.display = "block";
        let url = 'http://localhost:8080/api/responses/'+id;
        this.axios.get(url).then(res=>{
          this.res = res.data;
        })
      } else document.getElementById(id).style.display = "none";
    },
    fmtDate(obj){
      let date =  new Date(obj);
      let y = 1900+date.getYear();
      let m = "0"+(date.getMonth()+1);
      let d = "0"+date.getDate();
      return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
    },
//    showName(id){
//      let url = 'http://localhost:8080/api/users/'+id;
//      this.axios.get(url).then(res=>{
//        this.name =res.data;
//      });
//      return this.name.username;
//    },
    determine(id){
      let data = {
        "commentId": id,
        "content": this.message,
        "id": 0,
        "time":(new Date()).getTime(),
        "user1Id": 0,
        "userId": localStorage.getItem('user_id')
      };
      $.ajax({
        url : "http://localhost:8080/api/responses",
        type : "POST",
        async : true,
        contentType : "application/json",
        data : JSON.stringify(data),
        dataType : 'json',
        error: function () {
          alert("请登录或按要求发帖");
        }
      }).done(function () {
        location.reload();
        alert("发表成功");
      })
    }
  },
  mounted(){
    let url = 'http://localhost:8080/api/comments/'+ this.$route.params.id;
    this.axios.get(url).then(response=>{
      this.item = response.data;
    }).then(error=>{
      console.log(error)
    });
  }
};
</script>

<style scoped>
</style>
