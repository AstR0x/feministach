<template>
  <header>
    <b-navbar class="header" :style="headerBackgroundStyle" type="dark" toggleable="lg">
      <h1 class="heading">
        <b-navbar-brand href="/">Feministach</b-navbar-brand>
      </h1>
      <b-navbar-nav class="ml-auto">
        <template v-if="this.$route.path === '/'">
          <b-nav-form @submit.prevent>
            <b-form-input
              v-model="filter"
              type="text"
              trim
              size="m"
              class="search-input"
              debounce="500"
              placeholder="Поиск"
              autocomplete="off">
            </b-form-input>
          </b-nav-form>
        </template>
        <b-button class="button" variant="light" v-b-toggle.sidebar>
          <b-icon icon="list"></b-icon>
        </b-button>
      </b-navbar-nav>
    </b-navbar>
  </header>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex';

  export default {
    name: 'Header',
    data() {
      return {
        filter: '',
      };
    },
    watch: {
      filter(value) {
        return this.updateFilter(value);
      },
    },
    computed: {
      ...mapGetters(['interfaceColor']),
      headerBackgroundStyle() {
        return { backgroundColor: this.interfaceColor || null };
      },
    },
    methods: mapMutations(['updateFilter']),
  };
</script>

<style scoped>
  .header {
    height: 80px;
    padding: 0 100px;
    box-sizing: border-box;
  }

  .heading {
    text-transform: uppercase;
    margin-top: 8px;
    font-size: 18px;
  }

  .button {
    height: 37px;
    margin-left: 20px;
  }

  @media (max-width: 414px) {
    .header {
      height: 75px;
      padding: 0 15px;
    }

    .search-input {
      display: none;
    }

    .button {
      width: 50px;
    }
  }
</style>
