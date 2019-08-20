<template>
  <div class="col-2">
    <ul class="list-group">
      <li v-for="section in sectionList" style="list-style: none">
        <router-link :to="'/section/'+section.categoryId" class="list-group-item" >{{section.categoryName}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
// 左边板块导航
export default {
  data() {
    return {
      sectionList: []
    };
  },
  mounted(){
    this.axios.get('http://localhost:8080/api/category').then(response =>{
      this.sectionList = response.data;
    })
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
