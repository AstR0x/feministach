<template>
  <div>
    <div v-if="modalData.fileType === 'image'">
      <b-modal
        :size="sizes[modalData.sizeIndex]"
        id="modal"
        centered
        hide-header
        hide-footer
        :content-class="`content ${modalData.isMobile ? 'mobile-content' : ''}`">
        <div @wheel="handleWheel">
          <img
            :src="modalData.url"
            class="large-item"
            alt="image" />
        </div>
      </b-modal>
    </div>
    <div v-else>
      <b-modal
        id="modal"
        centered
        hide-header
        hide-footer
        :size="sizes[modalData.sizeIndex]"
        :content-class="`content ${modalData.isMobile ? 'mobile-content' : ''}`">
        <div class="video-container" @wheel="handleWheel">
          <video
            class="large-item"
            autoplay
            controls
            :src="modalData.url" />
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'Modal',
    computed: {
      ...mapGetters(['modalData']),
    },
    data() {
      return {
        sizes: ['sm', 'md', 'lg', 'xl'],
      };
    },
    watch: {
      modalUrl() {
        this.index = 0;
      },
    },
    methods: {
      handleWheel(event) {
        let sizeIndex = this.modalData.sizeIndex;

        if (event.deltaY < 0 && sizeIndex < 3) {
          this.$store.commit('updateSizeIndex', sizeIndex += 1);
        } else if (event.deltaY > 0 && sizeIndex > 0) {
          this.$store.commit('updateSizeIndex', sizeIndex -= 1);
        }
      },
    },
  };
</script>

<style scoped>
  /deep/ .content {
    border: none;
    background: transparent;
    margin: 0 auto;
  }

  /deep/ .mobile-content {
    width: 80%;
  }

  .video-container {
    margin: 0 auto;
  }

  .large-item {
    width: 100%;
  }

  @media (max-width: 414px) {
    /deep/ .content {
      background-color: #fff;
    }
  }
</style>
