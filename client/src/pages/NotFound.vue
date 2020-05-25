<template>
  <div class="container">
    <h1 class="not-found">404 Not Found</h1>
    <img class="icon" src="../../static/icons/Not-Found.svg" alt="not-found-icon">
  </div>
</template>

<script>
  export default {
    name: 'NotFound',
  };
</script>

<style scoped>
  .container {
    text-align: center;
    margin-top: 10%;
  }

  .icon {
    margin-top: 50px;
    width: 25%;
  }

  @media (max-width: 414px) {
    .container {
      text-align: center;
      margin-top: 30%;
    }

    .not-found {
      font-size: 24px;
    }

    .icon {
      margin-top: 20px;
      width: 45%;
    }
  }
</style>
