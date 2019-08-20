<template>
  <div id="app">
    <bbs-header />
    <router-view />
  </div>
</template>

<script>
  import BbsHeader from './components/common/BbsHeader';

  export default {
    name: 'App',
    components: {
      BbsHeader
    }
  };
</script>

<style>

</style>
