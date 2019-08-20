<template>
  <div>
    <post/>
    <comment/>
    <Answer/>
  </div>
</template>

<script>
import Post from "@/components/post/Post";
import Comment from '@/components/comment/Comment'
import Answer from '@/components/post/Answer'
export default {
  name: "PostPage",
  components: {
    Post,
    Comment,
    Answer
  }
};
</script>

<style scoped>
</style>
i
