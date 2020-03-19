<template>
  <header>
    <b-navbar class="header" toggleable="lg" type="dark" variant="danger">
      <h1 class="heading"><b-navbar-brand href="/">FEMINISTACH</b-navbar-brand></h1>
      <b-navbar-nav class="ml-auto" v-if="this.$route.path === '/'">
        <b-nav-form>
          <b-form-input
            v-model="filter"
            trim
            size="m"
            class="mr-sm-3"
            debounce="500"
            placeholder="Поиск">
          </b-form-input>
        </b-nav-form>
        <b-button
          variant="light"
          class="button"
        >
          <router-link
            class="link"
            :to="'auth'"
          >
            <b-icon icon="lock"></b-icon>
          </router-link>
        </b-button>
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
    watch: {
      filter(value) {
        return this.filterPosts(value);
      },
    },
    methods: mapMutations(['filterPosts']),
  };
</script>

<style scoped>
  .header {
    height: 80px;
    padding: 0 100px;
    box-sizing: border-box;
  }

  .heading {
    margin-top: 8px;
    font-size: 18px;
  }

  .button {
    height: 37px;
  }

  .link {
    color: #5a6268;
    text-decoration: none;
  }
</style>
