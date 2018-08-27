import React, { Component } from "react";
import * as ReadableAPI from "../utils/api";
import { connect } from "react-redux";
import { getAllPosts } from "../actions";
import { Link } from "react-router-dom";
import Post from "./Post";
import sortBy from "sort-by";

class CategoryPosts extends Component {
  state = {
    sortBy: "timestamp"
  };
  componentDidMount() {
    this.props.getAllPosts(this.props.category);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.props.getAllPosts(this.props.category);
    }
  }
  sort = (e, sortBy) => {
    e.preventDefault();
    this.setState({
      sortBy
    });
  };
  render() {
    const { posts } = this.props;
    return (
      <div className="categoryPost">
        <p className="newPost">
          <Link to="/post/add_post" className="addPostButton">
            {" "}
            Make a New Post{" "}
          </Link>
        </p>
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
        {posts &&
          posts
            .sort(sortBy(this.state.sortBy))
            .map(post => <Post key={post.id} postID={post.id} inList={true} />)}
      </div>
    );
  }
}

function mapStateToProps({ posts, comments }) {
  let postsArray = [];
  let keys = posts ? Object.keys(posts) : [];
  for (let i = 0; i < keys.length; i++) {
    postsArray.push(posts[keys[i]]);
  }
  postsArray.sort(sortBy("-timestamp"));
  return {
    posts: postsArray,
    comments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllPosts: category => {
      ReadableAPI.getAllCategoryWisePosts(category)
        .then(posts => {
          let postsObject = {};
          for (let i = 0; i < posts.length; i++) {
            postsObject[posts[i].id] = posts[i];
          }
          dispatch(getAllPosts(postsObject));
        })
        .catch(console.log);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPosts);
