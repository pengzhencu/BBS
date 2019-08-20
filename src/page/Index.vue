<template>
  <div>
    <div class="container">
      <div class="row">
        <left-banner/>
        <bbs-content/>
        <!--<right-banner/>-->
      </div>
    </div>
  </div>
</template>
<script>
import RightBanner from "../components/index/RightBanner";
import LeftBanner from "../components/common/LeftSectionNav";
import BbsContent from "../components/index/Content";

export default {
  components: { BbsContent, LeftBanner, RightBanner }
};
</script>

<style scoped>
</style>
