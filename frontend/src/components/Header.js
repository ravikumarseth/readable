import React, { Component } from "react";
import { capitalize } from "./../utils/helpers";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as ReadableAPI from "./../utils/api";
import { getAllCategories } from "./../actions";

class Header extends Component {
  componentDidMount() {
    if (!this.props.categories.length) {
      this.props.getAllCategories();
    }
  }

  render() {
    const { category, categories } = this.props;

    return (
      <div className="header">
        <h2> {capitalize(category)} Posts </h2>
        <ul>
          <li>
            <Link to="/"> All </Link>
          </li>
          {categories.map(category => (
            <li key={category.name}>
              <Link to={"/" + category.path}>{capitalize(category.name)}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllCategories: () => {
      ReadableAPI.getAllCategories()
        .then(categories => {
          dispatch(getAllCategories(categories.categories));
        })
        .catch(console.log);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
