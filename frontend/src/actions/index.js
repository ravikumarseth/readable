export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const GET_COMMENTS_FOR_POST = "GET_COMMENTS_FOR_POST";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const GET_SINGLE_POST = "GET_SINGLE_POST";
export const UPDATE_POST_VOTE = "UPDATE_POST_VOTE";
export const UPDATE_COMMENT_VOTE = "UPDATE_COMMENT_VOTE";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";

export const getAllCategories = categories => ({
  type: GET_ALL_CATEGORIES,
  categories
});

export const getAllPosts = posts => ({
  type: GET_ALL_POSTS,
  posts
});

export const getComments = comments => ({
  type: GET_COMMENTS_FOR_POST,
  comments
});

export const getPost = post => ({
  type: GET_SINGLE_POST,
  post
});

export const updatePostVote = (postID, changeType) => ({
  type: UPDATE_POST_VOTE,
  postID,
  changeType
});
export const updateCommentVote = (postID, commentID, changeType) => ({
  type: UPDATE_COMMENT_VOTE,
  postID,
  commentID,
  changeType
});
export const addComment = (postID, comment) => ({
  type: ADD_COMMENT,
  postID,
  comment
});
export const editPost = (postID, post) => ({
  type: EDIT_POST,
  postID,
  post
});

export const deletePost = postID => ({
  type: DELETE_POST,
  postID
});

export const deleteComment = (commentID, postID) => ({
  type: DELETE_COMMENT,
  commentID,
  postID
});

export const editComment = (postID, comment) => ({
  type: EDIT_COMMENT,
  postID,
  comment
});
