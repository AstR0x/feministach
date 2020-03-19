<template>
  <div class="container">
    <h1 class="heading">Форма авторизации администратора</h1>
    <b-form class="form" @submit.prevent="onSubmit" @reset.prevent="onReset">
      <b-form-group
      >
        <b-form-input
          v-model="form.email"
          type="email"
          required
          placeholder="Адрес почты"
        ></b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-input
          v-model="form.password"
          required
          placeholder="Пароль"
        ></b-form-input>
      </b-form-group>
      <div class="buttons-container">
        <b-button class="button" type="submit" variant="primary">Войти</b-button>
        <b-button class="button" type="reset" variant="danger">Сбросить</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
  export default {
    name: 'Auth',
    data() {
      return {
        form: {
          email: '',
          password: '',
        },
      };
    },
    methods: {
      onReset() {
        this.email = '';
        this.password = '';
      },
      onSubmit() {
        const email = this.form.email;
        const password = this.form.password;
        this.$store.dispatch('auth', { email, password });
      },
    },
  };
</script>

<style scoped>
  .container {
    width: 350px;
    margin: 150px auto;
  }

  .heading {
    text-align: center;
    font-size: 32px;
  }

  .form {
    margin: 80px auto;
    width: 300px;
  }

  .buttons-container {
    display: flex;
    justify-content: space-between;
  }

  .button {
    width: 100px;
  }
</style>
