<template>
  <div class="form-container">
    <b-button
      :style="styles.button"
      class="open-form-button"
      v-b-modal.openForm
    > Создать пост
    </b-button>
    <b-modal
      @hidden="clearAll"
      hide-footer
      id="openForm"
      size="md"
      centered
      hide-header>
      <b-form v-if="!isLoading" class="form">
        <div>
          <b-input
            @input="updateTitle"
            :value="postTitle"
            :state="isValidTitle"
            placeholder="Заголовок поста"
            autocomplete="off">
          </b-input>
          <b-form-invalid-feedback :state="isValidTitle">
            Заголовок поста должен содержать не меньше 6 символов.
          </b-form-invalid-feedback>
        </div>
        <div class="textarea-container">
          <b-form-textarea
            trim
            @input="updateContent"
            :value="postContent"
            :state="isValidContent"
            placeholder="Содержание поста"
            autocomplete="off"
            rows="3"
            max-rows="6">
          </b-form-textarea>
          <b-form-invalid-feedback :state="isValidContent">
            Пост должен содержать не меньше 16 символов.
          </b-form-invalid-feedback>
        </div>
        <div class="input-file-container">
          <b-form-file
            @input="updateFiles"
            :value="postFiles"
            :state="isValidFiles"
            :file-name-formatter="fileNameFormatter"
            class="input-file"
            multiple
            accept=".png, .jpg, .jpeg, .mp4, .webm"
            placeholder="Прикрепите изображения или видео"
            drop-placeholder="Поместите изображение сюда"
            browse-text="Выбрать файлы"
          ></b-form-file>
        </div>
        <div class="button-container">
          <b-button
            @click="createPost"
            :disabled="!(isValidTitle && isValidContent && isValidFiles) || isLoading"
            :style="styles.button">
            Создать
          </b-button>
        </div>
      </b-form>
      <div v-if="isLoading" class="loader">
        <b-spinner label="Spinning" :style="styles.spinner"></b-spinner>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapGetters } from 'vuex';

  export default {
    name: 'CreatePostForm',
    computed: {
      ...mapGetters([
        'postTitle',
        'postContent',
        'postFiles',
        'isValidTitle',
        'isValidContent',
        'isValidFiles',
        'isLoading',
        'interfaceColor',
      ]),
      styles() {
        return {
          spinner: {
            color: this.interfaceColor,
          },
          button: {
            backgroundColor: this.interfaceColor || null,
            border: this.interfaceColor || null,
          },
        };
      },
    },
    methods: {
      ...mapMutations([
        'updateTitle',
        'updateContent',
        'updateFiles',
        'clearAll',
      ]),
      ...mapActions(['createPost']),
      fileNameFormatter() {
        return 'Файлы выбраны';
      },
    },
  };
</script>

<style scoped>
  .form-container {
    margin-top: 100px;
    text-align: center;
  }

  .open-form-button {
    margin-bottom: 30px;
    font-size: 14px;
  }

  .form {
    margin: 0 auto;
    width: 100%;
  }

  .input-file {
    text-align: left;
    font-size: 12px;
  }

  .textarea-container {
    margin-top: 30px;
  }

  .input-file-container {
    margin-top: 30px;
  }

  .button-container {
    margin-top: 20px;
    text-align: right;
  }

  .loader {
    margin: 86px 0 95px 0;
    text-align: center;
  }

  @media (max-width: 414px) {
    .open-form-button {
      font-size: 12px;
    }
  }
</style>
