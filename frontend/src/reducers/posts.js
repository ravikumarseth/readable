import {
  GET_ALL_POSTS,
  GET_SINGLE_POST,
  UPDATE_POST_VOTE,
  EDIT_POST,
  DELETE_POST
} from "./../actions";

const categories = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...action.posts
      };
    case GET_SINGLE_POST:
      return {
        ...state,
        [action.post.id]: action.post
      };
    case UPDATE_POST_VOTE:
      let score = state[action.postID].voteScore;
      return {
        ...state,
        [action.postID]: {
          ...state[action.postID],
          voteScore: score + (action.changeType === "upVote" ? +1 : -1)
        }
      };
    case EDIT_POST:
      return {
        ...state,
        [action.postID]: {
          ...state[action.postID],
          title: action.post.title,
          body: action.post.body
        }
      };
    case DELETE_POST:
      return {
        ...state,
        [action.postID]: {
          ...state[action.postID],
          deleted: true
        }
      };
    default:
      return state;
  }
};

export default categories;
