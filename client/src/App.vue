<template>
  <div id="app">
    <div class="content" :style="contentStyles">
      <Header />
      <Modal />
      <Sidebar />
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  import Header from './components/Header.vue';
  import Modal from './components/Modal.vue';
  import Sidebar from './components/Sidebar.vue';
  import Footer from './components/Footer.vue';

  export default {
    name: 'app',
    components: {
      Modal,
      Header,
      Sidebar,
      Footer,
    },
    computed: {
      ...mapGetters(['pageBackgroundImage', 'textColor']),
      contentStyles() {
        return {
          background: this.pageBackgroundImage ? `url(${this.pageBackgroundImage})` : '#fff',
        };
      },
    },
  };
</script>

<style scoped>
  #app {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .content {
    flex: 1 0 auto
  }

  @media (max-width: 414px) {
    #app {
      height: 110%;
    }
  }
</style>
