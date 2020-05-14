<template>
  <div class="form-container">
    <b-button
      class="open-form-button"
      variant="danger"
      v-b-modal.openForm
    > Создать пост
    </b-button>
    <b-modal
      @ok.prevent="createPost"
      @hidden="clearAll"
      :ok-disabled="!(isValidTitle && isValidContent && isValidFiles) || isLoading"
      ok-title="Создать"
      ok-variant="danger"
      ok-only
      id="openForm"
      size="md"
      centered
      hide-header
    >
      <b-form v-if="!isLoading"
        class="form"
        @submit.prevent="onSubmit"
      >
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
      </b-form>
      <div v-if="isLoading" class="loader">
        <b-spinner variant="danger" label="Spinning"></b-spinner>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapGetters } from 'vuex';

  export default {
    name: 'CreatePostForm',
    computed: mapGetters([
      'postTitle',
      'postContent',
      'postFiles',
      'isValidTitle',
      'isValidContent',
      'isValidFiles',
      'isLoading',
    ]),
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

  .loader {
    margin: 86px 0 95px 0;
    text-align: center;
  }
</style>
