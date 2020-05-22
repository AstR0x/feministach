<template>
  <div class="post">
   <Contents :data="post" />
    <div class="post-footer">
      <router-link
        class="link"
        v-if="!isOpened"
        :to="'opened/post/' + post._id"
      >
        <b-button class="submit-button" variant="danger">
          Перейти к посту
        </b-button>
      </router-link>
      <div class="answer-amount">
        <span >Ответов: {{post.comments.length}}</span>
        <span v-if="getNewCommentsAmount(post._id, post.comments.length)"
              class="new-comments-amount">
         (+{{getNewCommentsAmount(post._id, post.comments.length)}})
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import Contents from './Contents.vue';

  export default {
    name: 'Post',
    components: {
      Contents,
    },
    props: ['post', 'isOpened'],
    methods: {
      handleClick(url, type) {
        this.$store.commit('updateModalData', {
          url,
          type,
        });
        this.$bvModal.show('ory');
      },
      getNewCommentsAmount(id, allCommentsLength) {
        if (localStorage.getItem(id)) {
          return allCommentsLength - localStorage.getItem(id);
        }

        return null;
      },
    },
  };
</script>
<style scoped>
  .post {
    background: #fff;
    margin: 50px auto;
    padding: 30px;
    box-shadow: rgba(0, 0, 0, 0.2) 0 3px 3px -2px,
    rgba(0, 0, 0, 0.14) 0 3px 4px 0,
    rgba(0, 0, 0, 0.12) 0 1px 8px 0;
  }

  .post-footer {
    display: flex;
    justify-content: space-between;
  }

  .answer-amount {
    padding-top: 10px;
    text-transform: uppercase;
  }

  .new-comments-amount {
    color: var(--danger);
    font-weight: bold;
  }

  .link {
    color: #fff;
    text-decoration: none;
  }

  @media (max-width: 414px) {
    .post {
      padding: 10px;
    }

    .submit-button {
      font-size: 12px;
    }

    .answer-amount {
      font-size: 14px;
      font-weight: bold;
    }
  }
</style>
