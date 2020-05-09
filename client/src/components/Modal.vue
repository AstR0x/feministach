<template>
  <div>
    <div v-if="fileType === 'image'">
      <img
        :src="url"
        v-b-modal="url"
        class="item"
        alt="image" />
      <b-modal
        :id="url"
        size="md"
        centered
        hide-header
        hide-footer>
        <div class="large-item-container">
          <img
            :src="url"
            class="large-item"
            alt="image" />
        </div>
      </b-modal>
    </div>
    <div v-else>
      <video
        :src="url"
        v-b-modal="url"
        class="item video" />
      <b-modal
        :id="url"
        size="sm"
        centered
        hide-header
        hide-footer>
        <div class="large-item-container">
          <video
            class="large-video"
            autoplay
            controls
            :src="url"
             />
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Modal',
    props: ['url', 'fileType'],
  };
</script>

<style scoped>
  .item {
    max-height: 150px;
    max-width: 200px;
    margin: 10px 30px 0 0;
  }

  .video {
    border: 1px dashed;
  }

  .large-item-container {
    text-align: center;
  }

  .large-item {
    max-width: 100%;
  }

  .large-video {
    max-width: 100%;
  }

  @media (max-width: 414px) {
    .item {
      max-height: 120px;
      max-width: 150px;
      margin: 10px 10px 0 0;
    }
  }
</style>
