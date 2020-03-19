<template>
  <div class="form-container">
    <b-button
      class="open-form-button"
      variant="danger"
      v-b-modal.openForm
    > Создать пост
    </b-button>
    <b-modal
      @ok="createPost"
      @hidden="clearAll"
      :ok-disabled="!(isValidTitle && isValidContent && isValidImages)"
      ok-title="Создать"
      ok-variant="danger"
      ok-only
      id="openForm"
      size="m"
      centered
      hide-header
    >
      <b-form
        class="form"
        @submit.prevent="onSubmit"
      >
        <div>
          <b-input
            @input="updateTitle"
            :value="postTitle"
            :state="isValidTitle"
            placeholder="Заголовок поста">
          </b-input>
          <b-form-invalid-feedback :state="isValidTitle">
            Заголовок поста должен содержать не меньше 6 символов.
          </b-form-invalid-feedback>
        </div>
        <div class="textarea-container">
          <b-form-textarea
            @input="updateContent"
            :value="postContent"
            :state="isValidContent"
            placeholder="Содержание поста"
            rows="3"
            max-rows="6">
          </b-form-textarea>
          <b-form-invalid-feedback :state="isValidContent">
            Пост должен содержать не меньше 16 символов.
          </b-form-invalid-feedback>
        </div>
        <div class="input-file-container">
          <b-form-file
            @input="updateImages"
            :value="postImages"
            :state="isValidImages"
            class="input-file"
            multiple
            accept=".png, .jpg, .jpeg"

            placeholder="Выберите одно или несколько изображений"
            drop-placeholder="Поместите изображение сюда"
            browse-text="Выбрать файлы"
          ></b-form-file>
        </div>
      </b-form>
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
      'postImages',
      'isValidTitle',
      'isValidContent',
      'isValidImages',
    ]),
    methods: {
      ...mapMutations([
        'updateTitle',
        'updateContent',
        'updateImages',
        'clearAll',
      ]),
      ...mapActions(['createPost']),
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

  .submit-button-container {
    margin-top: 30px;
    text-align: right;
  }
</style>
