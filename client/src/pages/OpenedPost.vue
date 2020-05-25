<template>
  <div>
    <div v-if="isLoading" class="loader">
      <b-spinner variant="danger" label="Spinning"></b-spinner>
    </div>
    <div v-else class="section">
      <div class="post-container">
        <Post :post="post" :is-opened="true" />
      </div>
      <div class="comments-container">
        <Comments :comments="post.comments" />
        <CreateCommentForm />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  import Post from '../components/Post.vue';
  import Comments from '../components/Comments.vue';
  import CreateCommentForm from '../components/CreateCommentForm.vue';


  export default {
    name: 'OpenedPost',
    components: {
      Post,
      Comments,
      CreateCommentForm,
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
    width: 92%;
    margin: 0 auto;
  }

  .post-container {
    margin: 0 auto;
  }

  .comments-container {
    max-width: 40%;
  }

  .loader {
    margin-top: 20%;
    text-align: center;
  }

  @media (max-width: 414px) {
    .section {
      width: 100%;
    }

    .comments-container {
      max-width: none;
    }

    .loader {
      margin-top: 65%;
    }
  }
</style>
