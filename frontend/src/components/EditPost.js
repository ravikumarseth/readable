import React, { Component } from "react";
import { capitalize, humanReadableTime } from "./../utils/helpers";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getPost, editPost } from "../actions";
import * as ReadableAPI from "../utils/api";

class EditPost extends Component {
  state = {
    redirect: false
  };
  componentDidMount() {
    if (!this.props.posts[this.props.postID]) {
      this.props.getPost(this.props.postID);
    }
  }

  editPost = e => {
    e.preventDefault();
    const title = this.refs.title;
    const body = this.refs.body;
    if (
      title.value !== this.props.posts[this.props.postID].title ||
      body.value !== this.props.posts[this.props.postID].body
    ) {
      if (!body.value.trim()) {
        body.focus();
      }
      if (!title.value.trim()) {
        title.focus();
      }
      if (title.value.trim() && body.value.trim()) {
        const post = {
          body: body.value.trim(),
          title: title.value.trim()
        };
        this.props.editPost(this.props.postID, post);
        this.setState({
          redirect: true
        });
      }
    } else {
      alert("Change title or body for updating post!");
    }
  };

  render() {
    const { posts, postID } = this.props;
    const post = posts ? posts[postID] : null;
    return (
      <div className="editPostPage">
        {!this.state.redirect && (
          <div>
            {!post && <div>Post Not Found!!</div>}
            {post && (
              <div>
                <h2 className="postCategory">
                  {" "}
                  {capitalize(post.category)} Post{" "}
                </h2>
                <form onSubmit={this.editPost} className="newPost">
                  <h3 className="postAuthor"> {post.author} </h3>
                  <p className="postDate">
                    {" "}
                    {humanReadableTime(post.timestamp)}{" "}
                  </p>
                  <input
                    ref="title"
                    type="text"
                    placeholder="Post Title"
                    defaultValue={post.title}
                  />
                  <textarea
                    ref="body"
                    defaultValue={post.body}
                    placeholder="Post Content"
                  />
                  <button className="editButton" type="submit">
                    {" "}
                    Edit Post{" "}
                  </button>
                  <Link to="" className="cancelButton">
                    {" "}
                    Cancel{" "}
                  </Link>
                </form>
              </div>
            )}
          </div>
        )}
        {this.state.redirect && <Redirect to="/" />}
      </div>
    );
  }
}

const mapStateToProps = ({ posts }) => ({
  posts
});

const mapDispatchToProps = dispatch => ({
  getPost: postID => {
    ReadableAPI.fetchSinglePost(postID)
      .then(post => {
        dispatch(getPost(post));
      })
      .catch(console.log);
  },
  editPost: (postID, post) => {
    ReadableAPI.editPost(postID, post)
      .then(dispatch(editPost(postID, post)))
      .catch(console.log);
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditPost)
);
