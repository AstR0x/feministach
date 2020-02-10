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

  export default {
    name: 'AllPosts',
    components: {
      CreatePostForm,
      PostsList,
    },
    data() {
      return {
        isLoading: true,
      };
    },
    computed: mapGetters(['posts']),
    methods: mapActions(['fetchPosts']),
    async mounted() {
      await this.fetchPosts();
      this.isLoading = false;
    },
  };
</script>

<style scoped>
  .section {
    width: 90%;
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
</style>
