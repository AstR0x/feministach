<template>
  <div>
    <Post
      v-for="post in posts"
      :key="post.title"
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

</style>
