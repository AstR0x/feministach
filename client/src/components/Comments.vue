<template>
  <div class="comments-container">
    <h3 class="comments-heading">Комментарии</h3>
    <ul class="comments">
      <li v-for="comment in comments" :key="comment">
        <div class="comment">
          <div class="comment-header">
            <time class="time">{{new Date(comment.date).toLocaleTimeString()}}</time>
            <time class="date">{{new Date(comment.date).toLocaleDateString()}}</time>
          </div>
          <p class="content">{{comment.content}}</p></div>
      </li>
    </ul>
    <form class="form" @submit.prevent="addComment">
      <b-form-input
        type="text"
        placeholder="Новый комментарий"
        value="newComment"
        v-model="newComment"
      />
      <b-button
        class="submit-button"
        type="submit"
        variant="danger"
      >
        Ответить
      </b-button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'Comments',
    props: ['comments'],
    data() {
      return {
        newComment: '',
      };
    },
    methods: {
      addComment() {
        this.comments.push({ content: this.newComment });

        return fetch(`/posts/${this.$route.params.id}`, {
          method: 'PATCH',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ comments: this.comments }),
        });
      },
    },
  };
</script>

<style scoped>
  .comments-container {
    max-width: 50%;
    margin: 30px;
  }

  .comments-heading {
    font-size: 24px;
  }

  .comments {
    padding: 0;
  }

  li {
    list-style: none;
  }

  .comment {
    display: inline-block;
    padding: 10px 15px 30px 15px;
    margin-top: 25px;

    box-shadow: rgba(0, 0, 0, 0.1) 0 3px 3px -2px,
    rgba(0, 0, 0, 0.05) 0 3px 4px 0,
    rgba(0, 0, 0, 0.04) 0 1px 8px 0;

    border-radius: 4px;
  }

  .comment-header {
    display: flex;
    justify-content: space-between;
  }

  .time {
    font-size: 12px;
  }

  .date {
    margin-left: 250px;
    font-size: 12px;
  }

  .content {
    margin-top: 20px;
  }

  .form {
    width: 80%;
    display: flex;
    margin-top: 50px;
  }

  .submit-button {
    margin-left: 20px;
  }
</style>
