const AUTH = process.env.AUTH_KEY;
const URL = "http://localhost:3001";
const headers = {
  Authorization: AUTH,
  Accept: "application/json"
};

// get all categories
export function getAllCategories() {
  return fetch(`${URL}/categories`, {
    headers
  }).then(res => res.json());
}

// get posts for any specific category or get all posts by passing 'All' as category
export function getAllCategoryWisePosts(category) {
  if (category === "All") {
    return fetch(`${URL}/posts`, {
      headers
    }).then(res => res.json());
  } else {
    return fetch(`${URL}/${category}/posts`, {
      headers
    }).then(res => res.json());
  }
}

// get post details for specific postID
export function fetchSinglePost(postID) {
  return fetch(`${URL}/posts/${postID}`, {
    headers
  }).then(res => res.json());
}

// get all comments of any single post
export function fetchSinglePostComments(postID) {
  return fetch(`${URL}/posts/${postID}/comments`, {
    headers
  }).then(res => res.json());
}

// add a post
export function addPost(post) {
  return fetch(`${URL}/posts`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  });
}

// vote on a post
export function votePost(postID, option) {
  return fetch(`${URL}/posts/${postID}`, {
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      option
    })
  }).then(res => res.json());
}

// edit a post
export function editPost(postID, post) {
  return fetch(`${URL}/posts/${postID}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  }).then(res => res.json());
}

// delete a post and all comments marked parentDeleted
export function deletePost(postID) {
  return fetch(`${URL}/posts/${postID}`, {
    method: "DELETE",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    }
  }).then(res => res.json());
}

// add a comment
export function addComment(comment) {
  return fetch(`${URL}/comments/`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
  });
}

// get a single comment with commentID
export function fetchSingleComment(commentID) {
  return fetch(`${URL}/comments/${commentID}`, {
    headers: {
      ...headers,
      "Content-Type": "application/json"
    }
  }).then(res => res.json());
}

// vote on a comment
export function voteComment(commentID, option) {
  return fetch(`${URL}/comments/${commentID}`, {
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      option
    })
  }).then(res => res.json());
}

// delete a comment
export function deleteComment(commentID) {
  return fetch(`${URL}/comments/${commentID}`, {
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    method: "DELETE"
  }).then(res => res.json());
}

// edit a comment
export function editComment(commentID, comment) {
  return fetch(`${URL}/comments/${commentID}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
  }).then(res => res.json());
}
