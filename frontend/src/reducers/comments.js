import {
  GET_COMMENTS_FOR_POST,
  UPDATE_COMMENT_VOTE,
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT
} from "../actions";

const comments = (state = {}, action) => {
  switch (action.type) {
    case GET_COMMENTS_FOR_POST:
      return {
        ...state,
        ...action.comments
      };
    case UPDATE_COMMENT_VOTE:
      let score = state[action.postID][action.commentID].voteScore;
      return {
        ...state,
        [action.postID]: {
          ...state[action.postID],
          [action.commentID]: {
            ...state[action.postID][action.commentID],
            voteScore: score + (action.changeType === "upVote" ? 1 : -1)
          }
        }
      };
    case ADD_COMMENT:
      return {
        ...state,
        [action.postID]: {
          ...state[action.postID],
          [action.comment.id]: {
            ...action.comment
          }
        }
      };
    case DELETE_COMMENT:
      return {
        ...state,
        [action.postID]: {
          ...state[action.postID],
          [action.commentID]: {
            ...state[action.postID][action.commentID],
            deleted: true
          }
        }
      };
    case EDIT_COMMENT:
      return {
        ...state,
        [action.postID]: {
          ...state[action.postID],
          [action.comment.id]: {
            ...state[action.postID][action.comment.id],
            timestamp: action.comment.timestamp,
            body: action.comment.body
          }
        }
      };
    default:
      return state;
  }
};

export default comments;
