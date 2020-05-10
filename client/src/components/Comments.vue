<template>
  <div class="comments-container">
    <h3 class="comments-heading">Комментарии</h3>
    <ul class="comments">
      <li v-for="comment in comments" :key="comment._id">
        <div class="comment">
          <div class="comment-header">
            <time class="time">{{new Date(comment.date).toLocaleTimeString()}}</time>
            <time class="date">{{new Date(comment.date).toLocaleDateString()}}</time>
          </div>
          <div class="attached-files">
            <Modal
              v-for="file in comment.images.concat(comment.videos)"
              :url="file.url"
              :file-type="file.fileType"
              :key="file.url" />
          </div>
          <p class="content">{{comment.content}}</p></div>
      </li>
    </ul>
    <form class="form" @submit.prevent="addComment">
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
          class="input-file"
          multiple
          accept=".png, .jpg, .jpeg, .mp4, .webm"
          placeholder="Выберите изображения"
          drop-placeholder="Поместите изображения сюда"
          browse-text="Выбрать"
          :file-name-formatter="fileNameFormatter"
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
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex';

  import Modal from './Modal.vue';

  export default {
    name: 'Comments',
    props: ['comments'],
    components: {
      Modal,
    },
    computed: mapGetters(['newComment', 'commentFiles', 'isValidCommentFiles', 'isValidFormData']),
    methods: {
      ...mapMutations(['updateComment', 'updateCommentFiles']),
      addComment() {
        this.$store.dispatch('addComment', this.$route.params.id);
      },
      fileNameFormatter() {
        return 'Файлы выбраны';
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

  li {
    list-style: none;
  }

  .comment {
    display: inline-block;
    padding: 10px 15px 0 15px;
    margin-top: 25px;

    box-shadow: rgba(0, 0, 0, 0.1) 0 3px 3px -2px,
    rgba(0, 0, 0, 0.05) 0 3px 4px 0,
    rgba(0, 0, 0, 0.04) 0 1px 8px 0;

    border-radius: 4px;
  }

  .comment-header {
    display: flex;
    justify-content: space-between;
  }

  .time {
    font-size: 12px;
  }

  .date {
    margin-left: 250px;
    font-size: 12px;
  }

  .attached-files {
    display: flex;
    flex-wrap: wrap;
  }

  .content {
    margin-top: 20px;
    white-space: pre-wrap;
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

  @media (max-width: 414px) {
    .comments-heading {
      padding-left: 16px;
      font-size: 22px;
    }

    .comments-container {
      max-width: 100%
    }

    .comment {
      width: 100%;
    }

    .date {
      margin-left: 230px;
    }

    .form {
      padding: 0 10px;
      width: 100%;
    }

    .input-file {
      font-size: 12px;
      width: 60%;
    }
  }
</style>
