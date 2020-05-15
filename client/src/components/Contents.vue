<template>
  <div>
    <div class="list-item-header">
      <time class="time">{{new Date(data.date).toLocaleTimeString()}}</time>
      <time class="date">{{new Date(data.date).toLocaleDateString()}}</time>
    </div>
    <div class="attached-files">
      <div>
        <img
          v-for="video in data.videos"
          :src="video.posterUrl"
          :key="video.url"
          @click="openModal(video)"
          class="attached-image video-poster"
          alt="прикреплённое видео" />
        <img
          v-for="image in data.images"
          :src="image.url"
          :key="image.url"
          @click="openModal(image)"
          class="attached-image"
          alt="прикрепленное изображение" />
      </div>
    </div>
    <div v-if="data.title" class="title-container">
      <h2 class="title">{{data.title}}</h2>
    </div>
    <p class="content" :class="{'post-content': data.title}">{{data.content}}</p>
  </div>
</template>

<script>
  export default {
    name: 'Contents',
    props: ['data'],
    methods: {
      openModal({ url, fileType, width, height }) {
        this.$store.commit('updateModalData', { url, fileType, width, height });
        this.$bvModal.show('modal');
      },
    },
  };
</script>

<style scoped>
  .list-item-header {
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

  .attached-image {
    vertical-align: top;
    max-height: 150px;
    max-width: 150px;
    margin: 10px 30px 0 0;
  }

  .video-poster {
    border: 1px #000 dashed;
  }

  .title-container {
    margin-top: 20px;
  }

  .content {
    margin-top: 20px;
    white-space: pre-wrap;
  }

  .post-content {
    width: 50%;
  }

  @media (max-width: 414px) {
    .attached-image {
      max-height: 150px;
      max-width: 150px;
      margin: 20px 20px 0 0;
    }

    .date {
      margin-left: 230px;
    }
  }
</style>
