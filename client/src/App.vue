<template>
  <div id="app">
      <div class="content">
        <Header></Header>
        <Modal></Modal>
        <router-view />
      </div>
    <Footer />
  </div>
</template>

<script>
  import Header from './components/Header.vue';
  import Modal from './components/Modal.vue';
  import Footer from './components/Footer.vue';

  export default {
    name: 'app',
    components: {
      Modal,
      Header,
      Footer,
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
    background: url('../static/images/geometry.png');
  }

  .content {
    flex: 1 0 auto
  }
</style>
