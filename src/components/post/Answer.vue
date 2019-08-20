<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="container">
          <div style="width: 500px">
            <textarea cols="67" rows="8" wrap="on" class="test"></textarea>
            <div style="text-align: right;padding-top: 15px">
              <button @click="save" class="btn btn-primary btn-sm">我要回答</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "Answer",
  data() {
    return {
      item: [
        {
          message: "",
          time: ""
        }
      ]
    };
  },
  methods: {
    save() {
      this.item.message = $(".test").val();
      this.item.time = (new Date()).getTime();
      let data = {
        "articleId": this.$route.params.id,
        "content": this.item.message,
        "id": 0,
        "time": this.item.time,
        "userId": localStorage.getItem('user_id')
      };
      $.ajax({
        url : "http://localhost:8080/api/comments",
        type : "POST",
        async : true,
        contentType : "application/json",
        data : JSON.stringify(data),
        dataType : 'json',
        error:function () {
          console.log(this.data);
          alert("请先登录")
        }
      }).done(function (response) {
        location.reload();
        alert("发表成功");
      })
    }
  }
};
</script>

<style scoped>
</style>
