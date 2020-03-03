<template>
  <div class="images">
    <div v-for="image in images" :key="image.url" class="image-container">
      <img
        :src="image.url"
        v-b-modal="image.url"
        class="image"
        alt="image" />
      <b-modal :id="image.url" size="lg" centered hide-header hide-footer>
        <div class="large-image-container">
          <img
            :src="image.url"
            class="large-image"
            alt="image" />
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ModalImages',
    props: ['images'],
  };
</script>

<style scoped>
  .images {
    margin-top: 30px;
    display: flex;
  }

  .image-container {
    width: 12%;
  }

  .image {
    max-width: 90%;
  }

  .large-image-container {
    text-align: center;
  }

  .large-image {
    width: 100%;
  }
</style>
