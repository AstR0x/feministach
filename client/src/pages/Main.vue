<template>
  <div class="section">
    <CreatePostForm />
    <PostsList />
  </div>
</template>

<script>
  import CreatePostForm from '../components/CreatePostForm.vue';
  import PostsList from '../components/PostsList.vue';

  export default {
    name: 'Main',
    components: {
      CreatePostForm,
      PostsList,
    },
  };
</script>

<style scoped>
  .section {
    width: 90%;
    margin: 0 auto;
  }
</style>
