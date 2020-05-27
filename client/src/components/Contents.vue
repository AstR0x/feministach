<template>
  <div>
    <div v-if="!data.title">
      <a class="comment-to-reply-id"
         v-for="commentId in data.commentsIdsToReplay"
         @click="updateHighlightedCommentId(commentId)"
         :href="`#${commentId}`"
         :key="commentId"
      >
        {{getShortId(commentId)}}
      </a>
    </div>
    <div class="list-item-header">
      <time class="time">{{new Date(data.date).toLocaleTimeString()}}</time>
      <time class="date">{{new Date(data.date).toLocaleDateString()}}</time>
    </div>
    <div class="attached-files">
      <div>
        <img
          v-for="file in data.attachedFiles"
          :src="file.posterUrl"
          :key="file.url"
          @click="openModal(file)"
          class="attached-image"
          :class="{'video-poster': file.fileType === 'video'}"
          alt="прикреплённый файл" />
      </div>
    </div>
    <div v-if="data.title" class="title-container">
      <h2 class="title">{{data.title}}</h2>
    </div>
    <p class="content" :class="postContentClass">{{data.content}}</p>
    <div class="footer">
      <div class="replying-ids">
        <a class="comment-to-reply-id"
           v-for="commentId in data.replyingCommentsIds"
           @click="updateHighlightedCommentId(commentId)"
           :href="`#${commentId}`"
           :key="commentId"
        >
          {{getShortId(commentId)}}
        </a>
      </div>
      <p v-if="!data.title"
         @click="replyToComment(data.id)"
         class="id"
      >
        {{getShortId(data.id)}}
      </p>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex';

  export default {
    name: 'Contents',
    props: ['data'],
    computed: {
      ...mapGetters(['commentsIdsToReplay']),
      postContentClass() {
        return { 'post-content': Boolean(this.data.title) };
      },
    },
    methods: {
      ...mapMutations(['updateHighlightedCommentId']),
      openModal({ url, fileType, width, height }) {
        this.$store.commit('updateModalData', {
          url,
          fileType,
          width,
          height,
        });
        this.$bvModal.show('modal');
      },
      replyToComment(commentId) {
        const { $store, commentsIdsToReplay } = this;

        if (!commentsIdsToReplay.includes(commentId)) {
          $store.commit('updateCommentsIdsToReplay', [...commentsIdsToReplay, commentId]);
        }
      },
      getShortId(id) {
        return id.slice(-8);
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
    max-width: 160px;
    vertical-align: top;
    margin: 10px 20px 0 0;
  }

  .video-poster {
    border: 1px #000 dashed;
  }

  .title-container {
    margin-top: 24px;
  }

  .title {
    margin: 0;
    font-size: 24px;
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
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;
  }

  @media (max-width: 414px) {
    .attached-image {
      max-width: 130px;;
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
