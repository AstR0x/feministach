<template>
  <div>
    <div v-if="isLoading" class="loader">
      <b-spinner variant="danger" label="Spinning"></b-spinner>
    </div>
    <div v-else class="section">
      <Post :post="post" :is-opened="true" />
      <Comments :comments="post.comments" />
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  import Comments from '../components/Comments.vue';
  import Post from '../components/Post.vue';

  export default {
    name: 'OpenedPost',
    components: {
      Post,
      Comments,
    },
    data() {
      return {
        isLoading: true,
        interval: null,
      };
    },
    computed: mapGetters(['post']),
    methods: mapActions(['fetchPost']),
    async mounted() {
      await this.fetchPost(this.$route.params.id);

      this.isLoading = false;
      this.interval = setInterval(() => {
        this.fetchPost(this.$route.params.id);
      }, 15000);
    },
    beforeDestroy() {
      clearInterval(this.interval);
    },
  };
</script>
<style scoped>
  .section {
    width: 90%;
    margin: 0 auto;
  }

  .loader {
    margin-top: 22%;
    text-align: center;
  }
</style>
