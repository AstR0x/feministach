<template>
  <div>
    <div v-if="modalType === 'image'">
      <b-modal
        :size="sizes[index]"
        id="ory"
        centered
        hide-header
        hide-footer
        content-class="content">
        <div @wheel="handleWheel">
          <img
            :src="modalUrl"
            class="large-item"
            alt="image" />
        </div>
      </b-modal>
    </div>
    <div v-else>
      <b-modal
        :size="sizes[index]"
        id="ory"
        centered
        hide-header
        hide-footer
        content-class="content">
        <div @wheel="handleWheel">
          <video
            class="large-item"
            autoplay
            controls
            :src="modalUrl"
          />
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'Modal',
    computed: mapGetters([
      'modalType',
      'modalUrl',
    ]),
    data() {
      return {
        sizes: ['sm', 'md', 'lg', 'xl'],
        index: 0,
      };
    },
    watch: {
      modalUrl() {
        this.index = 0;
      },
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
  /deep/ .content {
    background: transparent;
    text-align: center;
    border: none;
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
