<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-2">
        <ul class="list-group">
          <a href="vuex" class="list-group-item" v-for="it in sort">{{it.label}}</a>
        </ul>
      </div>
      <div class="col-lg-8">
        <h3 style="font-weight: bolder">问答</h3>
        <div style="border: 3px solid #437f82">
          <ul>
            <li v-for="it1 in title">
              <div style="padding-top: 10px;padding-bottom: 10px">
                <router-link to="/answer" class="title" v-bind:id="it1.id">{{it1.label}}</router-link>
                <span style="float: right;font-size: small;padding-right: 10px">
                  <a href="#">{{it1.sort}}</a>
                </span>
              </div>
            </li>
          </ul>
          <!--分页-->
          <ul class="pagination" style="padding-left: 450px">
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">4</a></li>
            <li class="page-item"><a class="page-link" href="#">5</a></li>
            <li class="page-item"><a class="page-link" href="#">更多</a></li>
          </ul>
        </div>
      </div>
      <div class="col-lg-2">
        <h4>我的</h4>
        <div>
          <router-link to="/admin/OpSection" class="list-group-item font-weight-bold">管理板块</router-link>
        </div>
        <div>
          <router-link to="/admin/OpUser" class="list-group-item font-weight-bold">查看用户</router-link>
        </div>
        <div>
          <router-link to="#" class="list-group-item font-weight-bold">管理帖子</router-link>
        </div>
        <div>
          <router-link to="#" class="list-group-item font-weight-bold">none</router-link>
        </div>
        <div>
          <img src="../../assets/index/logo.png" width="100px"/>
        </div>
        <a href="#" style="padding-left: 35px">帖子</a>
        <div>
          <img src="../../assets/index/logo.png" width="100px"/>
        </div>
        <a href="#" style="padding-left: 35px">回帖</a>
        <div>
          <img src="../../assets/index/logo.png" width="100px"/>
        </div>
        <a href="#" style="padding-left: 35px">收藏</a>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "index_admin",
      data() {
        return {
        };
      }
    }
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
