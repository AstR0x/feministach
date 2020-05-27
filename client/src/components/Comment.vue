<template>
  <li class="list-item" :class="highlightedListItemClass">
    <a class="list-item-link" :name="comment.id">
      <Contents :data="comment" />
    </a>
  </li>
</template>

<script>
  import { mapGetters } from 'vuex';

  import Contents from './Contents.vue';

  export default {
    name: 'Comment',
    components: {
      Contents,
    },
    props: ['comment'],
    computed: {
      ...mapGetters(['highlightedCommentId']),
      highlightedListItemClass() {
        const { comment, highlightedCommentId } = this;

        return { 'highlighted-list-item': highlightedCommentId === comment.id };
      },
    },
  };
</script>

<style scoped>
  .list-item {
    min-width: 55%;
    background: #fff;
    display: inline-block;
    padding: 10px 15px 0 15px;
    margin-top: 25px;
    list-style: none;

    box-shadow: rgba(0, 0, 0, 0.1) 0 3px 3px -2px,
    rgba(0, 0, 0, 0.05) 0 3px 4px 0,
    rgba(0, 0, 0, 0.04) 0 1px 8px 0;

    border-radius: 4px;
  }

  .highlighted-list-item {
    background-color: #ffd6c7;
  }


  @media (max-width: 414px) {
    .list-item {
      width: 100%;
    }
  }
</style>
