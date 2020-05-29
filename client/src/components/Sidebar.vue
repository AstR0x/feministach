<template>
  <b-sidebar width="230px" backdrop id="sidebar" title="МЕНЮ" right shadow>
    <div class="container">
      <b-dropdown class="dropdown" right variant="dark" text="Задний фон">
        <b-dropdown-item
          v-for="image in backgroundImages"
          :key="image.name"
          @click="updatePageBackgroundImage(image.url)">
          {{image.name}}
        </b-dropdown-item>
      </b-dropdown>
      <b-dropdown
        class="dropdown"
        text="Цвет интерфейса"
        variant="dark"
        right>
        <b-dropdown-item
          v-for="color in colors"
          :key="color.name"
          @click="updateInterfaceColor(color.value)">
          {{color.name}}
        </b-dropdown-item>
      </b-dropdown>
      <b-form-select
        class="select-sorting-input"
        v-model="selected"
        :options="options">
      </b-form-select>
    </div>
  </b-sidebar>
</template>

<script>
  import { backgroundImages, colors } from '../constants';

  export default {
    name: 'Sidebar',
    data() {
      return {
        colors,
        backgroundImages,
        selected: null,
        options: [
          {
            value: null,
            text: 'Сортировка постов',
          },
          {
            value: 'byDate',
            text: 'По дате',
          },
          {
            value: 'byComments',
            text: 'По количеству ответов',
          }],
      };
    },
    methods: {
      updatePageBackgroundImage(image) {
        const design = JSON.parse(localStorage.getItem('design'));

        localStorage.setItem('design', JSON.stringify({
          ...design,
          pageBackgroundImage: image,
        }));

        this.$store.commit('updatePageBackgroundImage', image);
      },
      updateInterfaceColor(color) {
        const design = JSON.parse(localStorage.getItem('design'));

        localStorage.setItem('design', JSON.stringify({
          ...design,
          interfaceColor: color,
        }));

        this.$store.commit('updateInterfaceColor', color);
      },
    },
    watch: {
      selected() {
        const selected = this.selected;

        if (selected) {
          this.$store.commit('updateSorting', selected);
        }
      },
    },
  };
</script>

<style scoped>
  .container {
    text-align: center;
  }

  .dropdown {
    width: 185px;
    margin-top: 10px;
  }

  .select-sorting-input {
    margin-top: 10px;
    width: 185px;
  }
</style>
