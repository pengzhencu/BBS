<template>
    <div class="container">
      <div class="row">
        <opera-user/>
        <opera-post/>
      </div>
    </div>
</template>

<script>
 import OperaUser from '../components/admin/OperaUser'
 import OperaPost from '../components/admin/OperaPost'
 export default {
   components: { OperaUser,OperaPost},
   data(){
     return{

     }
   }
 };
</script>

<style scoped>

</style>
