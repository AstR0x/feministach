<template>
  <div class="post">
    <div class="post-header">
      <time class="time">{{new Date(post.date).toLocaleTimeString()}}</time>
      <time class="date">{{new Date(post.date).toLocaleDateString()}}</time>
    </div>
    <div class="attached-files">
      <div>
        <img
          class="image video-poster"
          v-for="file in post.videos"
          :src="file.posterUrl"
          @click="handleClick(file.url, file.fileType)"
          :key="file.url"
          alt="image" />
        <img
          class="image"
          v-for="file in post.images"
          :src="file.url"
          @click="handleClick(file.url, file.fileType)"
          :key="file.url"
          alt="image" />
      </div>
    </div>
    <div class="title-container"><h2 class="title">{{post.title}}</h2></div>
    <div class="content-container"><p>{{post.content}}</p></div>
    <div class="post-footer">
      <router-link
        class="link"
        v-if="!isOpened"
        :to="'opened/post/' + post._id"
      >
        <b-button
          class="submit-button"
          variant="danger"

        >
          Перейти к посту
        </b-button>
      </router-link>
      <span class="answer-amount">Ответов: {{post.comments.length}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Post',
    props: ['post', 'isOpened'],
    methods: {
      handleClick(url, type) {
        this.$store.commit('updateModalData', {
          url,
          type,
        });
        this.$bvModal.show('ory');
      },
    },
  };
</script>
<style scoped>
  .post {
    margin: 50px auto;
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

  .attached-files {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
  }

  .image {
    max-height: 150px;
    max-width: 200px;
    margin: 10px 30px 0 0;
  }

  .video-poster {
    border: 1px #000 dashed;
  }

  .title-container {
    margin-top: 18px;
  }

  .content-container {
    width: 60%;
    margin-top: 18px;
    font-size: 16px;
    white-space: pre-wrap;
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

  @media (max-width: 414px) {
    .time {
      font-size: 16px;
    }

    .date {
      font-size: 16px;
    }

    .title {
      font-size: 22px;
    }

    .content-container {
      width: 100%;
    }
  }
</style>
