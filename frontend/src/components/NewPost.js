import React, { Component } from "react";
import { capitalize } from "./../utils/helpers";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getAllCategories, addPost } from "../actions";
import * as ReadableAPI from "../utils/api";
import uuidv4 from "uuid/v4";

class NewPost extends Component {
  state = {
    redirect: false
  };
  componentDidMount() {
    if (!this.props.categories.length) {
      this.props.getAllCategories();
    }
  }

  addPost = e => {
    e.preventDefault();
    const name = this.refs.name;
    const title = this.refs.title;
    const category = this.refs.category;
    const body = this.refs.body;
    if (!body.value.trim()) {
      body.focus();
    }
    if (category.value === "disabled") {
      category.focus();
    }
    if (!title.value.trim()) {
      title.focus();
    }
    if (!name.value.trim()) {
      name.focus();
    }
    if (
      name.value.trim() &&
      title.value.trim() &&
      category.value !== "disabled" &&
      body.value.trim()
    ) {
      const post = {
        author: name.value.trim(),
        body: body.value.trim(),
        timestamp: Date.now(),
        title: title.value.trim(),
        category: category.value,
        id: uuidv4()
      };
      this.props.addPost(post);
      this.setState({
        redirect: true
      });
    }
  };

  render() {
    const { categories } = this.props;
    return (
      <div className="newPostPage">
        {!this.state.redirect && (
          <form className="newPost" onSubmit={this.addPost}>
            <input ref="name" type="text" placeholder="Author's Name" />
            <input ref="title" type="text" placeholder="Post Title" />
            <select ref="category" defaultValue="disabled">
              <option disabled name="disabled" value="disabled">
                {" "}
                -- Select Category --{" "}
              </option>
              {categories.map(category => (
                <option
                  key={category.name}
                  value={category.name}
                  name={category.name}
                >
                  {" "}
                  {capitalize(category.name)}{" "}
                </option>
              ))}
            </select>
            <textarea ref="body" placeholder="Post Content" />
            <button className="createPost" type="submit">
              Create Post
            </button>
          </form>
        )}
        {this.state.redirect && <Redirect to="/" />}
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => ({
  categories
});

const mapDispatchToProps = dispatch => ({
  getAllCategories: () => {
    ReadableAPI.getAllCategories()
      .then(categories => {
        dispatch(getAllCategories(categories.categories));
      })
      .catch(console.log);
  },
  addPost: post => {
    ReadableAPI.addPost(post).catch(console.log);
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewPost)
);
