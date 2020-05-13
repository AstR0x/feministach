<template>
  <div id="app">
    <Modal></Modal>
    <Header></Header>
    <router-view />
  </div>
</template>

<script>
  import Header from './components/Header.vue';
  import Modal from './components/Modal.vue';

  export default {
    name: 'app',
    components: {
      Modal,
      Header,
    },
  };
</script>
