<template>
  <div class="col-lg-12">
    <a href="javascript:void(0)" @click="show">帖子置顶</a>
    <div id="top" style="display: none">
      <table class="table table-striped">
        <thead>
        <tr>
          <th>id</th>
          <th>title</th>
          <th>top</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="it in post">
          <th>{{it.articleEntity.id}}</th>
          <th>{{it.articleEntity.title}}</th>
          <th>
            <button v-bind:id="it.articleEntity.id" class="btn"  @click="best(it.articleEntity.id)" style="display: block" v-show="it.articleEntity.hot===false">置顶</button>
          </th>
        </tr>
        </tbody>
      </table>
      <ul class="pagination">
        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">Next</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OperaUser',
    data(){
      return{
        btn:'加精',
        btn1:'取消加精',
        post:[]
      }
    },
    methods:{
      show(){
        if(document.getElementById("top").style.display === 'none'){
          document.getElementById("top").style.display = 'block';
        }
        else
          document.getElementById("top").style.display = 'none';
      },
      best(id){
        document.getElementById(id).style.display = 'none';
        let url = 'http://localhost:8080/api/articles/top/'+id;
        this.axios.post(url).then(res=>{
          console.log(res);
          alert("置顶成功");
        })
      },
    },
    mounted(){
      this.axios.get('http://localhost:8080/api/articles').then(res=>{
        this.post = res.data;
      })
    }
  };
</script>

<style scoped>

</style>
