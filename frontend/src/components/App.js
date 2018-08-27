import React, { Component } from "react";
import CategoryPosts from "./CategoryPosts";
import { Route, Link } from "react-router-dom";
import Header from "./Header";
import Post from "./Post";
import NewPost from "./NewPost";
import EditPost from "./EditPost";

class App extends Component {
  render() {
    return (
      <div>
        <h1>
          {" "}
          <Link to="/"> Ugly Readable App </Link>{" "}
        </h1>
        <Route
          exact
          path="/:category"
          render={({ match }) => (
            <div>
              <Header category={match.params.category} />
              <CategoryPosts category={match.params.category} />
            </div>
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <Header category="All" />
              <CategoryPosts category="All" />
            </div>
          )}
        />
        <Route
          exact
          path="/posts/:postID"
          render={({ match }) => (
            <Post postID={match.params.postID} inList={false} />
          )}
        />
        <Route exact path="/post/add_post" component={NewPost} />
        <Route
          exact
          path="/post/:postID/edit"
          render={({ match }) => <EditPost postID={match.params.postID} />}
        />
      </div>
    );
  }
}

export default App;
