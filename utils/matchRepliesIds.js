const matchRepliesIds = (fromRepliesIds, post, commentId) => {
  fromRepliesIds.forEach(fromReplayId => {
    if (fromReplayId === post.id) {
      post.toRepliesIds.push(commentId);
    } else {
      const foundComment = post.comments.find(comment => comment.id === fromReplayId);
      foundComment.toRepliesIds.push(commentId);
    }
  });
};

module.exports = matchRepliesIds;
