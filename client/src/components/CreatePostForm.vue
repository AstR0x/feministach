<template>
  <div class="form-container">
    <b-button
      class="open-form-button"
      variant="danger"
      @click="toggleOpen"
    >
      {{isOpen ? 'Закрыть форму постинга' : 'Создать пост'}}
    </b-button>
    <transition name="fade">
      <div v-if="isOpen">
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
              class="input-file"
              multiple
              accept="image/*"
              :state="isValidImages"
              placeholder="Выберите одно или несколько изображений"
              drop-placeholder="Поместите изображение сюда"
            ></b-form-file>
          </div>
          <b-button
            class="submit-button"
            variant="danger"
            :disabled="!(isValidTitle && isValidContent && isValidImages)"
            @click="createPost"
          >
            Создать пост
          </b-button>
        </b-form>
      </div>
    </transition>
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapGetters } from 'vuex';

  export default {
    name: 'CreatePostForm',
    computed: mapGetters([
      'postTitle',
      'postContent',
      'isValidTitle',
      'isValidContent',
      'isValidImages',
      'isOpen',
    ]),
    methods: {
      ...mapMutations([
        'updateTitle',
        'updateContent',
        'updateImages',
        'toggleOpen',
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
    width: 26%;
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

  .submit-button {
    margin-top: 30px;
  }

  .fade-enter-active, .fade-leave-active {
    max-height: 2048px;
    opacity: 1;
    transition: max-height .5s ease-out, visibility .5s linear, opacity .5s ease-out;
  }

  .fade-enter, .fade-leave-to {
    visibility: hidden;
    max-height: 0;
    opacity: 0;
  }
</style>
