<template>
  <div class="post">
    <div class="post-header">
      <time class="time">{{new Date(post.date).toLocaleTimeString()}}</time>
      <time class="date">{{new Date(post.date).toLocaleDateString()}}</time>
    </div>
    <div class="images">
      <div class="image-container" v-for="url in post.imagesUrls" :key="url">
        <img
          v-b-modal="url"
          :src="url"
          class="image"
          alt="image" />
        <b-modal :id="url" size="lg" centered hide-header hide-footer>
          <div class="large-image-container">
            <img
              :src="url"
              class="large-image"
              alt="image" />
          </div>
        </b-modal>
      </div>
    </div>
    <div class="title-container"><h2>{{post.title}}</h2></div>
    <div class="content-container"><p>{{post.content}}</p></div>
    <div>
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
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Post',
    props: ['post', 'isOpened'],
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

  .images {
    margin-top: 30px;
    display: flex;
  }

  .image-container {
    width: 25%;
  }

  .image {
    max-width: 90%;
  }

  .large-image-container {
    text-align: center;
  }

  .large-image {
    width: 100%;
  }

  .time {
    font-size: 22px;
  }

  .date {
    display: block;
    font-size: 22px;
  }

  .title-container {
    margin-top: 18px;
  }

  .content-container {
    margin-top: 18px;
  }

  .submit-button {
    margin-top: 18px;
  }

  .link {
    color: #fff;
    text-decoration: none;
  }
</style>
