<template>
    <transition-group
      class="post-list"
      name="flip-list"
      tag="div">
      <Post
        v-for="post in posts"
        :key="post.title + post.content"
        :post="post" />
    </transition-group>
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
    max-width: 60%;
    margin-bottom: 150px;
  }

  .flip-list-move {
    transition: transform 1s;
  }

  @media (max-width: 414px) {
    .post-list {
      max-width: none;
    }
  }
</style>
