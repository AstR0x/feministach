<template>
  <div>
    <h3 class="comments-heading">Комментарии</h3>
    <ul class="comments">
      <Comment
        v-for="comment in comments"
        :comment="comment"
        :key="comment.id" />
    </ul>
  </div>
</template>

<script>
  import Comment from './Comment.vue';

  export default {
    name: 'Comments',
    components: {
      Comment,
    },
    props: ['comments'],
  };
</script>

<style scoped>
  .comments-heading {
    font-size: 24px;
  }

  .comments {
    padding: 0;
  }

  @media (max-width: 414px) {
    .comments-heading {
      padding-left: 16px;
      font-size: 22px;
    }
  }
</style>
