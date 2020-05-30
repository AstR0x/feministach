<template>
  <b-modal
    :size="sizes[modalData.sizeIndex]"
    id="modal"
    centered
    hide-header
    hide-footer
    :content-class="`content ${mobileContentClass}`">
    <div :class="videoContainerClass" @wheel="handleWheel">
      <img
        v-if="modalData.fileType === 'image'"
        :src="modalData.url"
        class="large-item"
        alt="image" />
      <video
        v-else
        :src="modalData.url"
        class="large-item"
        autoplay
        controls />
    </div>
  </b-modal>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'Modal',
    computed: {
      ...mapGetters(['modalData']),
      mobileContentClass() {
        return this.modalData.isMobile ? 'mobile-content' : '';
      },
      videoContainerClass() {
        return { 'video-container': this.modalData.fileType === 'video' };
      },
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
    created() {
      window.onpopstate = () => {
        this.$bvModal.hide('modal');
      };
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
