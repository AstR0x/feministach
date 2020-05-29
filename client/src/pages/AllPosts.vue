<template>
  <div class="section">
    <CreatePostForm />
    <div v-if="isLoading" class="loader">
      <b-spinner variant="danger" label="Spinning"></b-spinner>
    </div>
    <PostsList v-else-if="posts.length" :posts="posts" />
    <div v-else class="info">
      <h2>Постов ещё нет!</h2>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  import CreatePostForm from '../components/CreatePostForm.vue';
  import PostsList from '../components/PostsList.vue';

  import updateInterval from '../mixins/updateInterval';
  import updateLoading from '../mixins/updateLoading';

  export default {
    name: 'AllPosts',
    mixins: [updateInterval, updateLoading],
    components: {
      CreatePostForm,
      PostsList,
    },
    computed: mapGetters(['posts']),
    methods: mapActions(['fetchPosts']),
    async mounted() {
      const { fetchPosts, setUpdateInterval, setLoading } = this;

      await fetchPosts();

      setUpdateInterval(fetchPosts);

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

  .loader {
    margin-top: 13%;
    text-align: center;
  }

  .info {
    margin-top: 12%;
    text-align: center;
  }

  @media (max-width: 414px) {
    .section {
      width: 100%;
    }
  }
</style>
