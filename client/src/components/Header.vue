<template>
  <header>
    <b-navbar class="header" toggleable="lg" type="dark" variant="danger">
      <h1 class="heading"><b-navbar-brand href="/">FEMINISTACH</b-navbar-brand></h1>
      <b-navbar-nav class="ml-auto">
        <b-nav-form v-if="!this.$route.params.id" @submit.prevent>
          <b-form-input
            @input="filterPosts"
            size="sm"
            class="mr-sm-3"
            v-model="filter"
            placeholder="Поиск">
          </b-form-input>
        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>
  </header>
</template>

<script>
  import { mapMutations } from 'vuex';

  export default {
    name: 'Header',
    data() {
      return {
        filter: '',
      };
    },
    methods: mapMutations(['filterPosts']),
  };
</script>

<style scoped>
  .header {
    height: 80px;
    padding-left: 100px;
    padding-right: 100px;
    box-sizing: border-box;
  }

  .heading {
    margin-top: 8px;
    font-size: 18px;
  }
</style>
