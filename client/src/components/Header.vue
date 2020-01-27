<template>
  <header>
    <b-navbar class="header" toggleable="lg" type="dark" variant="danger">
      <h1 class="heading"><b-navbar-brand href="/">FEMINISTACH</b-navbar-brand></h1>
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input
            @change="filterHandler"
            v-model="filter"
            size="sm"
            class="mr-sm-2"
            placeholder="Search">
          </b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>
  </header>
</template>

<script>
  export default {
    name: 'Header',
    date() {
      return {
        filter: '',
      };
    },
    methods: {
      filterHandler() {
        this.$emit('filter-posts', this.filter);
      },
    },
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
