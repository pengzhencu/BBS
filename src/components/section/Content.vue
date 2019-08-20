<template>
  <div class="col-10">
    <div class="row">
      <div class="col-7">
        <p>标题</p>
        <div>
          <ul>
            <li v-for="it1 in title">
              <router-link :to="'/post/'+it1.articleEntity.id" v-bind:id="it1.articleEntity.id">
                <p class="title">{{it1.articleEntity.title}}</p>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-2">
        <p style="padding-left: 40px">作者</p>
        <div>
          <ul style="list-style: none">
            <li v-for="it1 in title">
              <router-link :to="'/user/'+it1.articleEntity.userId" v-bind:id="it1.articleEntity.id">
                <p>{{it1.username}}</p>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-3">
        <p style="padding-left: 40px">时间</p>
        <div>
          <ul style="list-style: none">
            <li v-for="it1 in title">
              <p>{{fmtDate(it1.articleEntity.time)}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Type1",
  data() {
    return {
      sort: [],
      title: [],
      categoryId: 0,
      name:[],
      id:this.$route.params.id,
    };
  },
  methods:{
    fmtDate(obj){
      let date =  new Date(obj);
      let y = 1900+date.getYear();
      let m = "0"+(date.getMonth()+1);
      let d = "0"+date.getDate();
      return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
    },
    showName(id){
      let url = 'http://localhost:8080/api/users/'+id;
      this.axios.get(url).then(res=>{
        this.name =res.data;
      });
      return this.name.username;
    },
    change(){
      this.categoryId = this.$route.params.id;
      let url = 'http://localhost:8080/api/articles/category/' + this.categoryId;
      this.axios.get(url).then(response=>{
        this.title = response.data;
      })
    }
  },
  mounted(){
    this.categoryId = this.$route.params.id;
    let url = 'http://localhost:8080/api/articles/category/' + this.categoryId;
    this.axios.get(url).then(response=>{
      this.title = response.data;
    });
  }
};
</script>

<style scoped>
.title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 500px;
}
a {
  color: black;
}

a:hover {
  color: red;
}
</style>
