<template>
  <div class="post-list">
    <Post
      v-for="post in posts"
      :key="post.title + post.content"
      :post="post"
    />
  </div>
</template>

<script>
  import Post from './Post.vue';

  export default {
    name: 'PostsList',
    props: ['posts'],
    components: {
      Post,
    },
  };
</script>

<style scoped>
  .post-list {
    width: 75%;
  }

  @media (max-width: 414px) {
    .post-list {
      width: 100%;
    }
  }
</style>
