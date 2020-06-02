<template>
  <div>
    <h3 class="comments-heading">Комментарии</h3>
    <transition-group name="list" class="comments" tag="ul">
      <Comment
        v-for="comment in comments"
        :comment="comment"
        :key="comment.id" />
    </transition-group>
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
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

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
