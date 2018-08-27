import React, { Component } from "react";
import * as ReadableAPI from "../utils/api";
import { connect } from "react-redux";
import {
  getComments,
  getPost,
  updatePostVote,
  addComment,
  deletePost
} from "../actions";
import { Link, Redirect } from "react-router-dom";
import Comment from "./Comment";
import { capitalize, humanReadableTime } from "./../utils/helpers";
import sortBy from "sort-by";
import uuidv4 from "uuid/v4";

class Post extends Component {
  state = {
    name: "",
    comment: "",
    delete: false,
    sortBy: "-timestamp"
  };
  componentDidMount() {
    if (!this.props.posts[this.props.postID]) {
      this.props.getPost(this.props.postID);
    }
    if (!this.props.comments[this.props.postID]) {
      this.props.getComments(this.props.postID);
    }
  }

  updatePostVote = (e, postID, changeType) => {
    e.preventDefault();
    this.props.updatePostVote(postID, changeType);
  };
  addComment = (e, postID) => {
    e.preventDefault();
    const name = this.state.name.trim();
    const comment = this.state.comment.trim();
    if (!name && comment) {
      this.refs.name.focus();
    } else if (name && !comment) {
      this.refs.comment.focus();
    } else if (!name && !comment) {
      this.refs.name.focus();
      alert("Please write comment before submitting!");
    } else {
      const commentObject = {
        parentId: postID,
        timestamp: Date.now(),
        body: comment,
        author: name,
        id: uuidv4()
      };
      this.props.addComment(postID, commentObject);
      this.setState({
        name: "",
        comment: ""
      });
      this.refs.name.focus();
    }
  };
  changeName = e => {
    const name = e.target.value;
    this.setState({
      name
    });
  };
  changeComment = e => {
    const comment = e.target.value;
    this.setState({
      comment
    });
  };
  deletePrompt = e => {
    e.preventDefault();
    this.setState({
      delete: !this.state.delete
    });
  };
  deletePost = (e, postID) => {
    this.props.deletePost(postID);
    this.setState({
      delete: false
    });
  };
  sort = (e, sortBy) => {
    e.preventDefault();
    this.setState({
      sortBy
    });
  };
  render() {
    const { posts, postID, comments } = this.props;
    const post = posts ? posts[postID] : null;
    return (
      <div className={!this.props.inList ? "postPage" : ""}>
        {!post && <div className="postNotFoundHeader">Post Not Found!!</div>}
        {post && (
          <div>
            {!post.deleted &&
              !this.state.delete && (
                <div>
                  <div className="postHeader">
                    <div className="postControls">
                      <button
                        onClick={e => {
                          this.updatePostVote(e, post.id, "upVote");
                        }}
                      >
                        {" "}
                        +{" "}
                      </button>
                      <p className="postVoteScore"> {post.voteScore} </p>
                      <button
                        onClick={e => {
                          this.updatePostVote(e, postID, "downVote");
                        }}
                      >
                        {" "}
                        -{" "}
                      </button>
                    </div>
                    <div className="postDetails">
                      <div>
                        {!this.props.inList && (
                          <p>
                            {" "}
                            <span className="postAuthor">
                              {" "}
                              {post.author}{" "}
                            </span>{" "}
                            - <span className="postTitle">
                              {" "}
                              {post.title}{" "}
                            </span>{" "}
                          </p>
                        )}
                        {this.props.inList && (
                          <p>
                            {" "}
                            <Link
                              to={"/posts/" + post.id}
                              className="postAuthor"
                            >
                              {" "}
                              <span> {post.author} </span> -{" "}
                              <span className="postTitle">
                                {" "}
                                {post.title}{" "}
                              </span>{" "}
                            </Link>{" "}
                          </p>
                        )}
                        <p className="postDate">
                          {" "}
                          {humanReadableTime(post.timestamp)}{" "}
                        </p>
                      </div>
                      {!this.props.inList && (
                        <p className="postBody"> {post.body} </p>
                      )}
                      <p className="numberComments">
                        {" "}
                        {comments && comments[postID]
                          ? comments[postID].length + " comments"
                          : "Unable to get comments"}{" "}
                      </p>
                    </div>
                    <div className="editDeleteButtons">
                      <span>
                        <Link
                          to={"/post/" + post.id + "/edit"}
                          className="edit"
                        >
                          {" "}
                          Edit{" "}
                        </Link>
                      </span>
                      <span onClick={this.deletePrompt} className="delete">
                        {" "}
                        Delete{" "}
                      </span>
                    </div>
                  </div>
                  {comments &&
                    comments[postID] &&
                    !this.props.inList && (
                      <div className="commentsList">
                        <div className="newComment">
                          {comments[postID].length > 0 && (
                            <div className="sortDiv">
                              <button onClick={e => this.sort(e, "-timestamp")}>
                                {" "}
                                ↑ Sort by Time{" "}
                              </button>
                              <button onClick={e => this.sort(e, "timestamp")}>
                                {" "}
                                ↓ Sort by Time{" "}
                              </button>
                              <button onClick={e => this.sort(e, "-voteScore")}>
                                {" "}
                                ↑ Sort by Vote Score{" "}
                              </button>
                              <button onClick={e => this.sort(e, "voteScore")}>
                                {" "}
                                ↓ Sort by Vote Score{" "}
                              </button>
                            </div>
                          )}
                          <div className="newCommentFormContainer">
                            <h2> Write a comment </h2>
                            <form onSubmit={e => this.addComment(e, postID)}>
                              <input
                                className="commentAuthorText"
                                type="text"
                                ref="name"
                                name="name"
                                placeholder="Name"
                                onChange={this.changeName}
                                value={this.state.name}
                              />
                              <input
                                className="commentBodyText"
                                type="text"
                                ref="comment"
                                name="comment"
                                placeholder="Write a comment..."
                                onChange={this.changeComment}
                                value={this.state.comment}
                              />
                              <input
                                type="submit"
                                className="commentSubmitButton"
                              />
                            </form>
                          </div>
                        </div>
                        {comments[postID]
                          .sort(sortBy(this.state.sortBy))
                          .map(comment => (
                            <Comment
                              key={comment.id + comment.author}
                              postID={postID}
                              commentID={comment.id}
                            />
                          ))}
                        {comments[postID].length === 0 && (
                          <h3 className="noComments">
                            {" "}
                            No comments just yet. Write first one!{" "}
                          </h3>
                        )}
                      </div>
                    )}
                </div>
              )}
            {post.deleted && <Redirect to="/" />}
            {this.state.delete && (
              <div className="postDeleteHeader">
                <h2> {capitalize(post.category)} Post </h2>
                <h3> {post.title} </h3>
                <h4>
                  {" "}
                  Do you really want to delete this post by {post.author} ?{" "}
                </h4>
                <button
                  className="yesButton"
                  onClick={e => this.deletePost(e, post.id)}
                >
                  {" "}
                  Yes{" "}
                </button>
                <button className="noButton" onClick={this.deletePrompt}>
                  {" "}
                  No{" "}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ posts, comments }) {
  let commentsArrayObject = {};
  const keys = Object.keys(comments);
  for (let i = 0; i < keys.length; i++) {
    commentsArrayObject[keys[i]] = [];
    const commentsKeys = Object.keys(comments[keys[i]]);
    for (let j = 0; j < commentsKeys.length; j++) {
      commentsArrayObject[keys[i]].push(comments[keys[i]][commentsKeys[j]]);
    }
  }
  return {
    posts,
    comments: commentsArrayObject
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getComments: postID => {
      ReadableAPI.fetchSinglePostComments(postID)
        .then(comments => {
          let commentsObject = {};
          commentsObject[postID] = {};
          for (let i = 0; i < comments.length; i++) {
            commentsObject[postID][comments[i].id] = comments[i];
          }
          dispatch(getComments(commentsObject));
        })
        .catch(console.log);
    },
    getPost: postID => {
      ReadableAPI.fetchSinglePost(postID)
        .then(post => {
          dispatch(getPost(post));
        })
        .catch(console.log);
    },
    updatePostVote: (postID, option) => {
      ReadableAPI.votePost(postID, option)
        .then(() => {
          dispatch(updatePostVote(postID, option));
        })
        .catch(console.log);
    },
    addComment: (postID, comment) => {
      dispatch(
        addComment(postID, {
          ...comment,
          voteScore: 1,
          deleted: false,
          parentDelete: false
        })
      );
      ReadableAPI.addComment(comment)
        .then(() => {})
        .catch(console.log);
    },
    deletePost: postID => {
      ReadableAPI.deletePost(postID)
        .then(() => {
          dispatch(deletePost(postID));
        })
        .catch(console.log);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
