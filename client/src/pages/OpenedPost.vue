<template>
  <div>
    <div v-if="isLoading" class="loader">
      <b-spinner label="Spinning" :style="spinnerStyle"></b-spinner>
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

  import updateInterval from '../mixins/updateInterval';
  import updateLoading from '../mixins/updateLoading';

  export default {
    name: 'OpenedPost',
    mixins: [updateInterval, updateLoading],
    components: {
      Post,
      Comments,
      CreateCommentForm,
    },
    computed: {
      ...mapGetters(['post', 'interfaceColor']),
      spinnerStyle() {
        return {
          color: this.interfaceColor,
        };
      },
    },
    methods: mapActions(['fetchPost']),
    async mounted() {
      const { $route, fetchPost, setUpdateInterval, setLoading } = this;

      await fetchPost($route.params.id);

      setUpdateInterval(fetchPost);

      setLoading(false);
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
