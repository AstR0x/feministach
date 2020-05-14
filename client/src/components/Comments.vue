<template>
  <div class="comments-container">
    <h3 class="comments-heading">Комментарии</h3>
    <ul class="comments">
      <li class="list-item"
          v-for="comment in comments"
          :key="comment._id">
        <Contents :data="comment" />
      </li>
    </ul>
    <form v-if="!commentIsLoading" class="form" @submit.prevent="addComment">
      <div class="textarea-container">
        <b-form-textarea
          @input="updateComment"
          :value="newComment"
          type="text"
          rows="1"
          max-rows="3"
          autocomplete="off"
          placeholder="Новый комментарий"
        />
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
          placeholder="Выберите изображения"
          drop-placeholder="Поместите изображения сюда"
          browse-text="Выбрать"
        ></b-form-file>
        <b-button
          class="submit-button"
          type="submit"
          variant="danger"
          :disabled="!isValidFormData"
        >
          Ответить
        </b-button>
      </div>
    </form>
    <div v-else class="loader">
      <b-spinner variant="danger" label="Spinning"></b-spinner>
    </div>
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

    computed: mapGetters([
      'newComment',
      'commentFiles',
      'commentIsLoading',
      'isValidCommentFiles',
      'isValidFormData',
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
        this.$store.commit('updateModalData', { url, type });
        this.$bvModal.show('ory');
      },
    },
  };
</script>

<style scoped>
  .comments-container {
    max-width: 50%;
  }

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

  .form {
    width: 80%;
    margin: 50px 0;
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

  .loader {
    width: 80%;
    text-align: center;
    margin: 100px 0;
  }

  @media (max-width: 414px) {
    .comments-heading {
      padding-left: 16px;
      font-size: 22px;
    }

    .comments-container {
      max-width: 100%
    }

    .form {
      padding: 0 10px;
      width: 100%;
    }

    .input-file {
      font-size: 12px;
      width: 60%;
    }

    .loader {
      width: 100%;
    }
  }
</style>
