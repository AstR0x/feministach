<template>
  <div class="post" :class="openedPostClass">
    <Contents :data="post" />
    <div class="post-footer" :class="postFooterReverseClass">
      <router-link
        class="link"
        v-if="!isOpened"
        :to="'opened/post/' + post.id">
        <b-button class="submit-button" :style="styles.button">
          Перейти к посту
        </b-button>
      </router-link>
      <div class="answer-amount">
        <span>Ответов: </span>
        <span :class="commentsAmountClass">{{post.comments.length}}</span>
        <span v-if="notReadCommentsAmount"
              class="new-comments-amount"
              :style="styles.newCommentsAmount"
        >
          {{`(+${notReadCommentsAmount})`}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  import Contents from './Contents.vue';

  export default {
    name: 'Post',
    components: {
      Contents,
    },
    data() {
      return {
        localStorageCommentsAmount: null,
        openedPostClass: null,
      };
    },
    props: ['post', 'isOpened'],
    computed: {
      ...mapGetters(['interfaceColor']),
      notReadCommentsAmount() {
        const { post, localStorageCommentsAmount } = this;

        return localStorageCommentsAmount
          ? post.comments.length - localStorageCommentsAmount
          : null;
      },
      commentsAmountClass() {
        const { localStorageCommentsAmount } = this;

        return {
          'all-comments-not-read': !localStorageCommentsAmount,
        };
      },
      postFooterReverseClass() {
        return { 'post-footer-reverse': Boolean(this.$route.params.id) };
      },
      styles() {
        return {
          button: {
            backgroundColor: this.interfaceColor,
            border: this.interfaceColor,
          },
          newCommentsAmount: {
            color: this.interfaceColor,
          },
        };
      },
    },
    methods: {
      handleClick(url, type) {
        this.$store.commit('updateModalData', {
          url,
          type,
        });
        this.$bvModal.show('modal');
      },
    },
    mounted() {
      this.localStorageCommentsAmount = localStorage.getItem(this.post.id) || null;

      this.openedPostClass = this.$route.params.id
        ? { 'opened-post': true }
        : { 'opened-post': false };
    },
    updated() {
      this.localStorageCommentsAmount = localStorage.getItem(this.post.id) || null;
    },
  };
</script>
<style scoped>
  .post {
    margin: 50px 0;
    padding: 20px;
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.2) 0 3px 3px -2px,
    rgba(0, 0, 0, 0.14) 0 3px 4px 0,
    rgba(0, 0, 0, 0.12) 0 1px 8px 0;
  }

  .opened-post {
    width: 100%;
  }

  .post-footer {
    display: flex;
    justify-content: space-between;
  }

  .post-footer-reverse {
    flex-direction: row-reverse;
  }

  .submit-button {
    font-size: 14px;
  }

  .answer-amount {
    padding-top: 10px;
    text-transform: uppercase;
  }

  .new-comments-amount {
    font-weight: bold;
  }

  .link {
    color: #fff;
    text-decoration: none;
  }

  @media (max-width: 414px) {
    .post {
      padding: 10px;
      display: block;
    }

    .submit-button {
      font-size: 12px;
    }

    .answer-amount {
      font-size: 14px;
    }
  }
</style>
