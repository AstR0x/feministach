<template>
  <div class="post">
    <div class="post-header">
      <time class="time">{{new Date(post.date).toLocaleTimeString()}}</time>
      <time class="date">{{new Date(post.date).toLocaleDateString()}}</time>
    </div>
    <div class="images-container">
      <ModalImages :images="post.images" />
    </div>
    <div class="title-container"><h2>{{post.title}}</h2></div>
    <div class="content-container"><p>{{post.content}}</p></div>
    <div class="post-footer">
      <b-button
        class="submit-button"
        variant="danger"
        v-if="!isOpened"
      >
        <router-link
          class="link"
          :to="'opened-post/' + post._id"
        >
          Перейти к посту
        </router-link>
      </b-button>
      <span class="answer-amount">Ответов: {{post.comments.length}}</span>
    </div>
  </div>
</template>

<script>
  import ModalImages from './ModalImages.vue';

  export default {
    name: 'Post',
    props: ['post', 'isOpened'],
    components: {
      ModalImages,
    },
  };
</script>
<style scoped>
  .post {
    margin: 100px auto;
    padding: 30px;
    box-shadow: rgba(0, 0, 0, 0.2) 0 3px 3px -2px,
    rgba(0, 0, 0, 0.14) 0 3px 4px 0,
    rgba(0, 0, 0, 0.12) 0 1px 8px 0;
  }

  .post-header {
    display: flex;
    justify-content: space-between;
  }

  .time {
    font-size: 22px;
  }

  .date {
    display: block;
    font-size: 22px;
  }

  .images-container {
    width: 40%;
  }

  .title-container {
    margin-top: 18px;
  }

  .content-container {
    width: 60%;
    margin-top: 18px;
    font-size: 16px;
  }

  .post-footer {
    display: flex;
    justify-content: space-between;
  }

  .answer-amount {
    padding-top: 10px;
    text-transform: uppercase;
  }

  .link {
    color: #fff;
    text-decoration: none;
  }
</style>
