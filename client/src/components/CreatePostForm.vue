<template>
  <div class="form-container">
    <b-button
      class="open-form-button"
      variant="danger"
      @click="openForm"
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
              v-model.trim="title"
              :value="title"
              :state="titleValidation"
              placeholder="Заголовок поста">
            </b-input>
            <b-form-invalid-feedback :state="titleValidation">
              Заголовок поста должен содержать не меньше 6 символов.
            </b-form-invalid-feedback>
          </div>
          <div class="textarea-container">
            <b-form-textarea
              v-model.trim="content"
              :value="content"
              :state="contentValidation"
              placeholder="Содержание поста"
              rows="3"
              max-rows="6">
            </b-form-textarea>
            <b-form-invalid-feedback :state="contentValidation">
              Пост должен содержать не меньше 16 символов.
            </b-form-invalid-feedback>
          </div>
          <div class="urls-container">
            <b-input
              v-model.trim="imageURL"
              :value="imageURL"
              :state="imageURLValidation"
              placeholder="URL картинки">
            </b-input>
            <b-form-invalid-feedback :state="imageURLValidation">
              Некорректный URL.
            </b-form-invalid-feedback>
            <button class="add-url-button">
              <b-icon-plus
                class="border border-info rounded"
                font-scale="2.3"
                variant="info">
              </b-icon-plus>
            </button>
          </div>
          <div>
            <b-form-file
              multiple
              accept="image/*"
              v-model="images"
              :state="Boolean(file)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
            <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>
            <b-button @click="downloadHandler">Загрузить файлик)</b-button>
          </div>
          <b-button
            class="submit-button"
            variant="danger"
            :disabled="!commonValidation"
            @click="onSubmit"
          >
            Создать пост
          </b-button>
        </b-form>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'CreatePostForm',
    data() {
      return {
        isOpen: false,
        isDisabled: true,
        title: '',
        content: '',
        imageURL: '',
        images: null,
      };
    },
    computed: {
      titleValidation() {
        if (this.title) {
          return this.title.length >= 6;
        }

        return null;
      },
      contentValidation() {
        if (this.content) {
          return this.content.length >= 16;
        }

        return null;
      },
      imageURLValidation() {
        if (this.imageURL) {
          return !!this.imageURL.match(/^https?:\/\/\S+(?:jpg|jpeg|png)$/);
        }

        return null;
      },
      commonValidation() {
        return this.title.length >= 6
          && this.content.length >= 16
          && !!this.imageURL.match(/^https?:\/\/\S+(?:jpg|jpeg|png)$/);
      },
    },
    methods: {
      openForm() {
        this.isOpen = !this.isOpen;
      },
      onSubmit() {
        const { title, content, imageURL } = this;
        this.isOpen = false;
        this.title = '';
        this.content = '';
        this.imageURL = '';

        fetch('/posts', {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title,
            content,
            imageURL,
          }),
        }).then(response => response.json());
      },
      downloadHandler() {
        const images = this.images;
        const formData = new FormData();
        images.forEach((image) => {
          formData.append('images', image);
        });

        console.log(formData);

        fetch('/upload', {
          method: 'POST',
          mode: 'cors',
          body: formData,
        }).then(response => response.json())
          .catch(err => console.log(err));
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
    width: 25%;
  }

  .urls-container {
    display: flex;
    margin-top: 30px;
  }

  .textarea-container {
    margin-top: 30px;
  }

  .add-url-button {
    background-color: #fff;
    border: none;
  }

  .submit-button {
    margin-top: 30px;
  }

  .fade-enter-active, .fade-leave-active {
    max-height: 2048px;
    opacity: 1;
    transition: max-height 1s ease-out, visibility 1s linear, opacity 1s ease-out;
  }

  .fade-enter, .fade-leave-to {
    visibility: hidden;
    max-height: 0;
    opacity: 0;
  }
</style>
