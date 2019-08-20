<template>
  <div class="container">
    <div class="row">
      <left-banner/>
      <section-content/>
    </div>
  </div>
</template>

<script>
import LeftBanner from "../components/common/LeftSectionNav";
import SectionContent from "../components/section/Content"
export default {
  name: "Section",
  components: {
    LeftBanner,
    SectionContent
  }
};
</script>

<style scoped>
</style>
