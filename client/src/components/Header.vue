<template>
  <header>
    <b-navbar class="header" toggleable="lg" type="dark" variant="danger">
      <h1 class="heading">
        <b-navbar-brand class="brand" href="/">FEMINISTACH</b-navbar-brand>
      </h1>
      <b-navbar-nav class="ml-auto" v-if="this.$route.path === '/'">
        <b-nav-form>
          <b-form-input
            v-model="filter"
            trim
            size="m"
            class="search-input"
            debounce="500"
            placeholder="Поиск"
            autocomplete="off">
          </b-form-input>
        </b-nav-form>
        <b-button
          class="button sort-button"
          variant="light"
          @click="toggleSorting"
          id="tooltip-target-1">
          <b-icon icon="filter"></b-icon>
        </b-button>
        <b-tooltip target="tooltip-target-1" triggers="hover">
          Сортировка постов по дате или по количеству ответов
        </b-tooltip>
        <router-link
          class="link"
          :to="'auth'"
        >
          <b-button
            variant="light"
            class="button"
          >
            <b-icon icon="lock"></b-icon>
          </b-button>
        </router-link>
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
        return this.updateFilter(value);
      },
    },
    methods: mapMutations(['updateFilter', 'toggleSorting']),
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
    margin-left: 20px;
  }

  .link {
    color: #5a6268;
    text-decoration: none;
  }


  @media (max-width: 414px) {
    .header {
      padding: 0 15px;
    }

    .brand {
      font-size: 18px;
    }

    .search-input {
      width: 150px;
      font-size: 12px;
    }

    .sort-button {
      display: none;
    }

    .link {
      display: none;
    }
  }
</style>
