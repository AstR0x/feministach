<template>
  <div>
    <div v-if="fileType === 'image'">
      <img
        :src="url"
        v-b-modal="url"
        class="item"
        alt="image" />
      <b-modal
        :size="sizes[index]"
        :id="url"
        centered
        hide-header
        hide-footer
        content-class="content">
        <div @wheel="handleWheel">
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
        :size="sizes[index]"
        :id="url"
        centered
        hide-header
        hide-footer
        content-class="content">
        <div @wheel="handleWheel">
          <video
            class="large-item"
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
    data() {
      return {
        sizes: ['sm', 'md', 'lg', 'xl'],
        index: 0,
      };
    },
    methods: {
      handleWheel(event) {
        if (event.deltaY < 0 && this.index < 3) {
          this.index += 1;
        } else if (event.deltaY > 0 && this.index > 0) {
          this.index -= 1;
        }
      },
    },
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

  /deep/ .content {
    background: transparent;
    text-align: center;
    border: none;
  }

  .large-item {
    width: 100%;
  }

  @media (max-width: 414px) {
    .item {
      max-height: 120px;
      max-width: 150px;
      margin: 10px 10px 0 0;
    }

    /deep/ .content {
      background-color: #fff;
    }
  }
</style>
