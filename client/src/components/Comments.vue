<template>
  <div>
    <h3 class="comments-heading">Комментарии</h3>
    <ul class="comments">
      <li class="list-item"
          :class="{'highlighted-list-item': highlightedCommentId === comment.id}"
          v-for="comment in comments"
          :key="comment.id">
        <a class="list-item-link"
          :name="comment.id">
          <Contents
            :data="comment"
            :highlightComment="highlightComment"
            :replyToComment="replyToComment" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex';

  import Contents from './Contents.vue';

  export default {
    name: 'Comments',
    components: {
      Contents,
    },
    props: ['comments'],
    data() {
      return {
        highlightedCommentId: null,
        highlightedCommentClass: null,
      };
    },
    computed: mapGetters([
      'newComment',
      'commentFiles',
      'commentIsLoading',
      'isValidCommentFiles',
      'isValidFormData',
      'commentsIdsToReplay',
    ]),
    methods: {
      ...mapMutations(['updateComment', 'updateCommentFiles']),
      addComment() {
        this.$store.dispatch('addComment', this.$route.params.id);
      },
      fileNameFormatter() {
        return 'Файлы выбраны';
      },
      handleClick(url, type) {
        this.$store.commit('updateModalData', {
          url,
          type,
        });
        this.$bvModal.show('modal');
      },
      replyToComment(commentId) {
        const { commentsIdsToReplay, $store } = this;

        if (!commentsIdsToReplay.includes(commentId)) {
          $store.commit('updateCommentsIdsToReplay', [...commentsIdsToReplay, commentId]);
        }
      },
      deleteReplyToComment(commendId) {
        const { commentsIdsToReplay, $store } = this;
        const filteredIds = commentsIdsToReplay.filter(id => id !== commendId);

        $store.commit('updateCommentsIdsToReplay', filteredIds);
      },
      highlightComment(id) {
        this.highlightedCommentId = id;
      },
    },
    watch: {
      highlightedCommentId() {

      },
    },
  };
</script>

<style scoped>
  .comments-heading {
    font-size: 24px;
  }

  .comments {
    padding: 0;
  }

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
    .comments-heading {
      padding-left: 16px;
      font-size: 22px;
    }

    .list-item {
      width: 100%;
    }
  }
</style>
