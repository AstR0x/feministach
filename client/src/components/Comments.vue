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
          <ModalImages v-if="comment.images.length" :images="comment.images"/>
          <p class="content">{{comment.content}}</p></div>
      </li>
    </ul>
    <form class="form" @submit.prevent="addComment">
      <div>
        <b-form-input
          autocomplete="off"
          @input="updateComment"
          :value="newComment"
          type="text"
          placeholder="Новый комментарий"
        />
      </div>
      <div class="file-input-button-container">
        <b-form-file
          @input="updateCommentImages"
          :value="commentImages"
          :state="isValidCommentImages"
          class="input-file"
          multiple
          accept=".png, .jpg, .jpeg"
          placeholder="Выберите изображения"
          drop-placeholder="Поместите изображения сюда"
          browse-text="Выбрать"
        ></b-form-file>
        <b-button
          class="submit-button"
          type="submit"
          variant="danger"
        >
          Ответить
        </b-button>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex';

  import ModalImages from './ModalImages.vue';

  export default {
    name: 'Comments',
    props: ['comments'],
    components: {
      ModalImages,
    },
    computed: mapGetters(['newComment', 'commentImages', 'isValidCommentImages']),
    methods: {
      ...mapMutations(['updateComment', 'updateCommentImages']),
      addComment() {
        this.$store.dispatch('addComment', this.$route.params.id);
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

  .content {
    margin-top: 20px;
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
    width: 54%;
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
      width: 60%;
    }
  }
</style>
