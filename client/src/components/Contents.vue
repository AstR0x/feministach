<template>
  <div>
    <div v-if="!data.title">
      <a class="reply-id"
         v-for="commentId in data.fromRepliesIds"
         @click="updateHighlightedCommentId(commentId)"
         :href="`#${commentId}`"
         :key="commentId"
         :style="styles.idColor"
      >
        {{getShortId(commentId)}}
      </a>
    </div>
    <div class="list-item-header">
      <time class="time">{{new Date(data.date).toLocaleTimeString()}}</time>
      <time class="date">{{new Date(data.date).toLocaleDateString()}}</time>
    </div>
    <div :style="styles.flexContainer">
      <div class="attached-files">
          <img
            v-for="file in data.attachedFiles"
            :src="file.posterUrl"
            :key="file.url"
            @click="openModal(file)"
            class="attached-file"
            :class="{'video-poster': file.fileType === 'video'}"
            alt="прикреплённый файл" />
      </div>
      <div v-if="data.title" class="title-container">
        <h2 class="title">{{data.title}}</h2>
      </div>
      <p class="content" :class="postContentClass">{{data.content}}</p>
    </div>
    <div class="footer">
      <div v-if="$route.params.id">
        <a class="reply-id"
           v-for="commentId in data.toRepliesIds"
           @click="updateHighlightedCommentId(commentId)"
           :href="`#${commentId}`"
           :key="commentId"
           :style="styles.idColor"
        >
          {{getShortId(commentId)}}
        </a>
      </div>
      <p v-if="$route.params.id"
         @click="replyToComment(data.id)"
         :style="styles.idColor"
         class="id">
        {{getShortId(data.id)}}
      </p>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex';

  import getShortId from '../utils/getShortId';

  export default {
    name: 'Contents',
    props: ['data'],
    computed: {
      ...mapGetters(['fromRepliesIds', 'interfaceColor']),
      postContentClass() {
        return {
          'post-content': Boolean(this.data.title),
        };
      },
      styles() {
        const { attachedFiles, title } = this.data;

        return {
          flexContainer: {
            display: attachedFiles.length === 1 && !title ? 'flex' : 'block',
          },
          idColor: {
            color: this.interfaceColor,
          },
        };
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
        const { $store, fromRepliesIds } = this;

        if (!fromRepliesIds.includes(commentId)) {
          $store.commit('updateFromRepliesIds', [...fromRepliesIds, commentId]);
        }
      },
      getShortId,
    },
  };
</script>

<style scoped>
  .reply-id {
    color: var(--danger);
    padding-right: 4px;
    font-size: 12px;
    text-decoration: none;
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

  .attached-file {
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

  .inline-block {
    display: inline-block;
  }

  @media (max-width: 414px) {
    .attached-file {
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
