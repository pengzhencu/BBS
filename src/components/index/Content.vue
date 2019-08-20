<template>
  <div class="col-8">
    <h3 style="font-weight: bolder">普通</h3>
    <div style="border: 3px solid #437f82">
      <ul>
        <li v-for="it1 in post">
          <div style="padding-top: 10px;padding-bottom: 10px">
            <span v-show="it1.articleEntity.best === true">[精]</span>
            <router-link :to="'/post/'+it1.articleEntity.id" class="title" >{{it1.articleEntity.title}}</router-link>
            <span style="float: right;font-size: small;padding-right: 10px">
              <router-link :to="'/section/'+it1.articleEntity.categoryId">{{it1.categoryname}}</router-link>
            </span>
          </div>
        </li>
      </ul>
      <!--分页-->
      <ul class="pagination" style="padding-left: 450px">
        <li class="page-item">
          <router-link class="page-link" to="#">1</router-link>
        </li>
        <li class="page-item">
          <router-link class="page-link" to="#">2</router-link>
        </li>
        <li class="page-item">
          <router-link class="page-link" to="#">3</router-link>
        </li>
        <li class="page-item">
          <router-link class="page-link" to="#">4</router-link>
        </li>
        <li class="page-item">
          <router-link class="page-link" to="#">5</router-link>
        </li>
        <li class="page-item">
          <router-link class="page-link" to="#">更多</router-link>
        </li>
      </ul>
    </div>
    <h3 style="font-weight: bolder">问答</h3>
    <div style="border: 3px solid #437f82">
      <ul>
        <li v-for="it2 in answer">
          <div style="padding-top: 10px;padding-bottom: 10px">
            <router-link :to="'/post/'+it2.articleEntity.id" class="title">{{it2.articleEntity.title}}</router-link>
            <span style="float: right;font-size: small;padding-right: 10px">
              <router-link :to="'/section/'+it2.articleEntity.categoryId">{{it2.categoryname}}</router-link>
            </span>
          </div>
        </li>
      </ul>
      <!--分页-->
      <ul class="pagination" style="padding-left: 450px">
        <li class="page-item">
          <router-link class="page-link" to="#">1</router-link>
        </li>
        <li class="page-item">
          <router-link class="page-link" to="#">2</router-link>
        </li>
        <li class="page-item">
          <router-link class="page-link" to="#">3</router-link>
        </li>
        <li class="page-item">
          <router-link class="page-link" to="#">4</router-link>
        </li>
        <li class="page-item">
          <router-link class="page-link" to="#">5</router-link>
        </li>
        <li class="page-item">
          <router-link class="page-link" to="#">更多</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Content",
  data() {
    return {
      post: [],
      answer:[],
      cate:[]
    };
  },
  mounted() {
    this.axios.get('http://localhost:8080/api/article/sort/1',{
      headers: {'Access-Control-Allow-Origin': '*'}
    }).then(response => {
//      var tempArray = new Array();
//      for(let i =0;i<response.data.length;i++){
//        tempArray[i]=response.data[i].articleEntity;
//      }
//      console.log(tempArray);
//      this.post = tempArray;
      this.post = response.data;
      console.log(this.post.length);
    });
    this.axios.get('http://localhost:8080/api/article/sort/2',{
      headers: {'Access-Control-Allow-Origin': '*'}
    }).then(res=>{
      console.log(res.data);
//      var tempArray = new Array();
//      for(let i =0;i<res.data.length;i++){
//        tempArray[i]=res.data[i].articleEntity;
//      }
//      console.log(tempArray);
      this.answer = res.data;
      console.log(this.answer.length);
    });
  },
  methods:{
      showCate(id){
        let url = 'http://localhost:8080/api/category/'+id;
        this.axios.get(url).then(res=>{
          return res.data.categoryName;
        });
      }
  },
//  computed:{
//    change(){
//      for(let i=0;i<this.answer.length;i++){
//
//        let name = this.showCate(this.answer[i].categoryId);
//        this.answer[i].categoryId = name;
//      }
//    }
//  }
};
</script>

<style scoped>
a {
  color: black;
}

a:hover {
  color: red;
}

.title {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 500px;
  vertical-align: middle;
}

a.title:visited {
  color: gray;
}
</style>
