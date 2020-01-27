<template>
  <div class="section">
    <div class="loader" v-if="isLoading">
      <b-spinner
        variant="danger"
        label="Spinning">
      </b-spinner>
    </div>
    <div v-else>
      <Post :post="post" :is-opened="true"/>
      <Comments :comments="post.comments" />
    </div>
  </div>
</template>

<script>
  import Comments from '../components/Comments.vue';
  import Post from '../components/Post.vue';

  export default {
    name: 'OpenedPost',
    data() {
      return {
        post: null,
        isLoading: true,
      };
    },
    components: { Post, Comments },
    mounted() {
      return fetch(`/posts/${this.$route.params.id}`)
        .then(res => res.json())
        .then((data) => {
          this.post = data;
          this.isLoading = false;
        });
    },
  };
</script>
<style scoped>
  .section {
    width: 90%;
    margin: 0 auto;
  }

  .loader {
    margin-top: 25%;
    text-align: center;
  }
</style>
