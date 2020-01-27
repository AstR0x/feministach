<template>
  <div>
    <div class="loader" v-if="isLoading">
      <b-spinner
        variant="danger"
        label="Spinning">
      </b-spinner>
    </div>
    <div v-else-if="posts.length">
      <Post
        v-for="post in posts"
        :key="post.title"
        :post="post"
      />
    </div>
    <div class="info" v-else>
      <h2>Постов ещё нет!</h2>
    </div>
  </div>
</template>

<script>
  import Post from './Post.vue';

  export default {
    name: 'PostsList',
    data() {
      return {
        posts: [],
        isLoading: true,
      };
    },
    components: {
      Post,
    },
    mounted() {
      return fetch('/posts')
        .then(res => res.json())
        .then((data) => {
          this.posts = data;
          this.isLoading = false;
        });
    },
  };
</script>

<style scoped>
  .loader {
    margin-top: 12.5%;
    text-align: center;
  }

  .info {
    margin-top: 12%;
    text-align: center;
  }
</style>
