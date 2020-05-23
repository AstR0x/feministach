<template>
  <div>
    <div v-if="!data.title">
      <a class="comment-to-reply-id"
         v-for="commentId in data.commentsIdsToReplay"
         @click="highlightComment(commentId)"
         :href="`#${commentId}`"
         :key="commentId"
      >
        {{commentId.slice(-6).toUpperCase() + '\n'}}
      </a>
    </div>
    <div class="list-item-header">
      <time class="time">{{new Date(data.date).toLocaleTimeString()}}</time>
      <time class="date">{{new Date(data.date).toLocaleDateString()}}</time>
    </div>
    <div class="attached-files">
      <div>
        <img
          v-for="attachedFile in data.videos.concat(data.images)"
          :src="attachedFile.posterUrl"
          :key="attachedFile.url"
          @click="openModal(attachedFile)"
          class="attached-image"
          :class="{'video-poster': attachedFile.fileType === 'video'}"
          alt="прикреплённый файл" />
      </div>
    </div>
    <div v-if="data.title" class="title-container">
      <h2 class="title">{{data.title}}</h2>
    </div>
    <p class="content" :class="{'post-content': data.title}">{{data.content}}</p>
    <div class="footer">
      <div class="replying-ids">
        <a class="comment-to-reply-id"
           v-for="commentId in data.replyingCommentsIds"
           @click="highlightComment(commentId)"
           :href="`#${commentId}`"
           :key="commentId"
        >
          {{commentId.slice(-6).toUpperCase() + '\n'}}
        </a>
      </div>
      <p v-if="!data.title" class="id" @click="replyToComment(data.id)">
        {{data.id.slice(-8)}}
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Contents',
    props: ['data', 'highlightComment', 'replyToComment'],
    methods: {
      openModal({ url, fileType, width, height }) {
        this.$store.commit('updateModalData', {
          url,
          fileType,
          width,
          height,
        });
        this.$bvModal.show('modal');
      },
    },
  };
</script>

<style scoped>
  .comment-to-reply-id {
    color: var(--danger);
    padding-right: 4px;
    font-size: 12px;
  }

  .list-item-header {
    margin-top: 4px;
    display: flex;
    justify-content: space-between;
  }

  .time {
    font-size: 12px;
  }

  .date {
    font-size: 12px;
  }

  .attached-files {
    display: flex;
    flex-wrap: wrap;
  }

  .attached-image {
    max-height: 160px;
    vertical-align: top;
    margin: 10px 20px 0 0;
  }

  .video-poster {
    border: 1px #000 dashed;
  }

  .title-container {
    margin-top: 20px;
  }

  .content {
    margin-top: 20px;
    white-space: pre-wrap;
  }

  .footer {
    display: flex;
    justify-content: space-between;
  }

  .id {
    font-size: 16px;
    color: var(--danger);
    text-align: right;
  }

  .id:hover {
    color: var(--dark);
    cursor: pointer;
  }

  .post-content {
    width: 70%;
  }

  @media (max-width: 414px) {
    .attached-image {
      max-height: 100px;
      margin: 20px 20px 0 0;
    }

    .title {
      font-size: 22px;
    }

    .content {
      font-size: 14px;
    }

    .post-content {
      width: 100%;
      margin-top: 10px;
    }
  }
</style>
