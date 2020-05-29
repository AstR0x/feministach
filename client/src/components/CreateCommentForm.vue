<template>
    <form v-if="!commentIsLoading" class="form" @submit.prevent="addComment">
      <div>
        <span class="reply-id"
              v-for="id in fromRepliesIds"
              @click="deleteReplyToComment(id)"
              :key="id">
        {{getShortId(id)}}
        </span>
      </div>
      <div class="textarea-container">
        <b-form-textarea
          class="textarea"
          @input="updateComment"
          :value="newComment"
          type="text"
          rows="1"
          max-rows="3"
          autocomplete="off"
          placeholder="Новый комментарий" />
      </div>
      <div class="file-input-button-container">
        <b-form-file
          @input="updateCommentFiles"
          :value="commentFiles"
          :state="isValidCommentFiles"
          :file-name-formatter="fileNameFormatter"
          class="input-file"
          multiple
          accept=".png, .jpg, .jpeg, .mp4, .webm"
          placeholder="Прикрепите файлы"
          drop-placeholder="Поместите изображения сюда"
          browse-text="Выбрать"
        ></b-form-file>
        <b-button
          class="submit-button"
          type="submit"
          variant="danger"
          :disabled="!isValidFormData">
          Ответить
        </b-button>
      </div>
    </form>
    <div v-else class="loader">
      <b-spinner variant="danger" label="Spinning"></b-spinner>
    </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex';

  import getShortId from '../utils/getShortId';

  export default {
    name: 'CreateCommentForm',
    computed: mapGetters([
      'newComment',
      'commentFiles',
      'commentIsLoading',
      'isValidCommentFiles',
      'isValidFormData',
      'fromRepliesIds',
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
        const { fromRepliesIds, $store } = this;

        if (!fromRepliesIds.includes(commentId)) {
          $store.commit('updateFromRepliesIds', [...fromRepliesIds, commentId]);
        }
      },
      deleteReplyToComment(commendId) {
        const { fromRepliesIds, $store } = this;
        const filteredIds = fromRepliesIds.filter(id => id !== commendId);

        $store.commit('updateFromRepliesIds', filteredIds);
      },
      getShortId,
    },
  };
</script>

<style scoped>
  .form {
    margin: 50px 0;
  }

  .reply-id {
    padding-left: 4px;
    font-size: 12px;
    color: var(--danger);
  }

  .reply-id:hover {
    cursor: pointer;
    color: var(--dark);
  }

  .textarea-container {
    margin-top: 4px;
  }

  .file-input-button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .input-file {
    width: 60%;
    font-size: 16px;
  }

  .submit-button {
    font-size: 14px;
  }

  .loader {
    width: 80%;
    text-align: center;
    margin: 100px 0;
  }

  @media (max-width: 414px) {
    .form {
      padding: 0 10px;
    }

    .textarea {
      font-size: 14px;
    }

    .input-file {
      font-size: 12px;
      width: 60%;
    }

    .submit-button {
      font-size: 12px;
    }

    .loader {
      width: 100%;
    }
  }
</style>
