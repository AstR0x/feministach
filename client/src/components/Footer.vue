<template>
  <footer>
    <b-navbar
      :style="footerBackgroundStyle"
      class="footer"
      toggleable="lg">
    </b-navbar>
  </footer>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'Footer',
    computed: {
      ...mapGetters(['interfaceColor']),
      footerBackgroundStyle() {
        return { backgroundColor: this.interfaceColor || null };
      },
    },
  };
</script>

<style scoped>
  .footer {
    height: 80px;
    flex-shrink: 0;
  }
</style>
