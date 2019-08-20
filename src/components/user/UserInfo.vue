<template>
  <div class="container">
    <div class="row">
      <div class="col-4">
        <div style="background-color: rgb(234, 244, 255);padding:0 0 15px 0">
          <div style="text-align: center">
            <img src="../../assets/index/user.png" alt="用户头像">
            <h3 style="padding-top: 15px">{{this.name.username}}</h3>
            <p>注册时间：{{fmtDate(this.name.lastLoginTime)}}</p>
            <p>联系方式：{{this.name.tel}}</p>
            <p>工作性质：{{this.name.occupy}}</p>
            <p>工作地点：{{this.name.address}}</p>
            <p>{{this.$route.params.id}}</p>
            <div v-if="this.id === '0'">
              <user-info-form />
            </div>
          </div>
        </div>
      </div>
      <div class="col-8">
        <div style="background-color: white;padding-left: 15px">
          <div v-if="this.id == 0">
            <h3>我的帖子</h3>
            <router-link :to="'/test/'+1">我要发帖</router-link>
          </div>
          <div v-else><h3>Ta的帖子</h3></div>
          <ul>
            <li v-for="it1 in title">
              <div style="padding-top: 10px;padding-bottom: 10px">
                <router-link :to="'/post/'+it1.articleEntity.id" class="title" v-bind:id="it1.articleEntity.id">{{it1.articleEntity.title}}</router-link>
                <span style="float: right;font-size: small;padding-right: 10px">
                  <router-link :to="'/section/'+it1.articleEntity.categoryId">{{it1.categoryname}}</router-link>
                </span>
              </div>
            </li>
          </ul>
          <div v-if="this.id === '0'">
            <h3>我的问答</h3>
            <router-link :to="'/test/'+2">我要提问</router-link>
          </div>
          <div v-else><h3>Ta的问答</h3></div>
          <ul>
            <li v-for="it1 in answer">
              <div style="padding-top: 10px;padding-bottom: 10px">
                <router-link :to="'/post/'+it1.articleEntity.id" class="title" v-bind:id="it1.articleEntity.id">{{it1.articleEntity.title}}</router-link>
                <span style="float: right;font-size: small;padding-right: 10px">
                  <router-link :to="'/section/'+it1.articleEntity.categoryId">{{it1.categoryname}}</router-link>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // 他人页面
  import UserInfoForm from '../form/UserInfoForm';

  export default {
    name: 'component1',
    components: {
      UserInfoForm
    },
    data() {
      return {
        id: 0,
        title: [
          {
            id: 1,
            label:
              '如何看待微博上“杭州小伙全款房给妻子加名字，9个月离婚被索取一半房子”这则新闻？',
            sort: '婆媳关系',
            type: 1
          },
          {
            id: 2,
            label: '女朋友怀孕了，非要我去做上门女婿',
            sort: '生活那点事',
            type: 2
          }
        ],
        answer:[],
        cate:[],
        name:[]
      };
    },
    methods:{
      showCate(id){
        let url = 'http://localhost:8080/api/category/'+id;
        this.axios.get(url).then(res=>{
          this.cate = res.data
        });
        return this.cate.categoryName;
      },
      fmtDate(obj){
        let date =  new Date(obj);
        let y = 1900+date.getYear();
        let m = "0"+(date.getMonth()+1);
        let d = "0"+date.getDate();
        return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
      },
    },
    mounted() {
      this.id = this.$route.params.id;
      if (this.id == 0) {
        let url = 'http://localhost:8080/api/article/1/'+ localStorage.getItem('user_id');
        this.axios.get(url).then(response => {
          this.title = response.data;
        });
        let url2 = 'http://localhost:8080/api/users/'+localStorage.getItem('user_id');
        this.axios.get(url2).then(res=>{
          this.name = res.data;
        });
        let url3 =  'http://localhost:8080/api/article/2/'+ localStorage.getItem('user_id');
        this.axios.get(url3).then(res=>{
          this.answer = res.data;
        });
      }
      else {
        let url = 'http://localhost:8080/api/article/1/' + this.id;
        this.axios.get(url).then(response => {
          this.title = response.data;
        });
        let url2 = 'http://localhost:8080/api/users/'+this.id;
        this.axios.get(url2).then(response => {
          this.name = response.data;
        });
        let url3 =  'http://localhost:8080/api/article/2/'+ this.id;
        this.axios.get(url3).then(res=>{
          this.answer = res.data;
        });
      }
    }
  };
</script>

<style scoped>
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
