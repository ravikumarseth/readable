import React, { Component } from "react";
import * as ReadableAPI from "../utils/api";
import { connect } from "react-redux";
import { humanReadableTime } from "./../utils/helpers";
import { updateCommentVote, deleteComment, editComment } from "../actions";

class Comment extends Component {
  state = {
    edit: false,
    delete: false
  };
  updateCommentVote = (e, postID, commentID, changeType) => {
    e.preventDefault();
    this.props.updateCommentVote(postID, commentID, changeType);
  };
  commentDeletePrompt = e => {
    e.preventDefault();
    this.setState({
      delete: !this.state.delete
    });
  };
  deleteComment = (e, commentID, postID) => {
    e.preventDefault();
    this.props.deleteComment(commentID, postID);
    this.setState({
      delete: false
    });
  };
  commentEditPrompt = e => {
    e.preventDefault();
    this.setState({
      edit: !this.state.edit
    });
  };
  editComment = (e, postID, commentID) => {
    e.preventDefault();
    const commentBody = this.refs.commentText.value.trim();
    if (commentBody === this.props.comments[postID][commentID].body) {
      alert("Please change comment body for updating comment!");
    }
    if (
      commentBody &&
      commentBody !== this.props.comments[postID][commentID].body
    ) {
      this.setState({
        edit: false
      });
      const comment = {
        timestamp: Date.now(),
        id: commentID,
        body: commentBody
      };
      this.props.editComment(postID, comment);
    }
  };
  render() {
    const { comments, commentID, postID } = this.props;
    let comment = {};
    comment = comments && comments[postID] ? comments[postID][commentID] : null;
    return (
      <div>
        {comment && (
          <div>
            {!comment.deleted && (
              <div>
                <div>
                  {this.state.delete && (
                    <div className="commentDeleteHeader">
                      <h3>
                        {" "}
                        Do you want to delete this comment by {
                          comment.author
                        } ?{" "}
                      </h3>
                      <button
                        className="yesButton"
                        onClick={e => this.deleteComment(e, comment.id, postID)}
                      >
                        {" "}
                        Yes{" "}
                      </button>
                      <button
                        className="noButton"
                        onClick={this.commentDeletePrompt}
                      >
                        {" "}
                        No{" "}
                      </button>
                    </div>
                  )}
                  {this.state.edit && (
                    <div className="commentEditHeader">
                      <h3> {comment.author} </h3>
                      <form
                        onSubmit={e => this.editComment(e, postID, comment.id)}
                      >
                        <input
                          type="text"
                          placeholder="Write a comment..."
                          ref="commentText"
                          defaultValue={comment.body}
                          onChange={this.updateComment}
                        />
                        <button className="yesButton" type="submit">
                          {" "}
                          Done{" "}
                        </button>
                        <button
                          className="noButton"
                          type="button"
                          onClick={this.commentEditPrompt}
                        >
                          {" "}
                          Back{" "}
                        </button>
                      </form>
                    </div>
                  )}
                  {!this.state.delete &&
                    !this.state.edit && (
                      <div>
                        <div>
                          {!comment.parentDelted && (
                            <div className="comment">
                              <div className="commentHeader">
                                <div className="commentControls">
                                  <button
                                    onClick={e =>
                                      this.updateCommentVote(
                                        e,
                                        postID,
                                        comment.id,
                                        "upVote"
                                      )}
                                  >
                                    {" "}
                                    +{" "}
                                  </button>
                                  <p className="commentVoteScore">
                                    {" "}
                                    {comment.voteScore}{" "}
                                  </p>
                                  <button
                                    onClick={e =>
                                      this.updateCommentVote(
                                        e,
                                        postID,
                                        comment.id,
                                        "downVote"
                                      )}
                                  >
                                    {" "}
                                    -{" "}
                                  </button>
                                </div>
                                <div className="commentDetails">
                                  <div>
                                    <h3 className="commentAuthor">
                                      {" "}
                                      {comment.author}{" "}
                                    </h3>
                                    <p className="commentDate">
                                      {" "}
                                      {humanReadableTime(
                                        comment.timestamp
                                      )}{" "}
                                    </p>
                                  </div>
                                  <p className="commentBody">
                                    {" "}
                                    {comment.body}{" "}
                                  </p>
                                </div>
                                <div className="editDeleteButtons">
                                  <span
                                    onClick={this.commentEditPrompt}
                                    className="edit"
                                  >
                                    {" "}
                                    Edit{" "}
                                  </span>
                                  <span
                                    onClick={this.commentDeletePrompt}
                                    className="delete"
                                  >
                                    {" "}
                                    Delete{" "}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                          {comment.parentDelted && (
                            <h2> The post for this comment was deleted! </h2>
                          )}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ comments }) {
  return {
    comments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateCommentVote: (postID, commentID, changeType) => {
      ReadableAPI.voteComment(commentID, changeType)
        .then(() => dispatch(updateCommentVote(postID, commentID, changeType)))
        .catch(console.log);
    },
    deleteComment: (commentID, postID) => {
      ReadableAPI.deleteComment(commentID)
        .then(() => {
          dispatch(deleteComment(commentID, postID));
        })
        .catch(console.log);
    },
    editComment: (postID, comment) => {
      const commentObject = {
        timestamp: comment.timestamp,
        body: comment.body
      };
      ReadableAPI.editComment(comment.id, commentObject)
        .then(() => {
          dispatch(editComment(postID, comment));
        })
        .catch(console.log);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
