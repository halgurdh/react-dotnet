import React, { useState } from "react";
import Constants from "./utilities/Constants";
import PostCreateForm from "./components/PostCreateForm";
import PostUpdateForm from "./components/PostUpdateForm";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const [showUpdatePostForm, setShowUpdatePostForm] = useState(null);

  function getPosts() {
    const url = Constants.API_URL_GET_ALL_POSTS;

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((postsFromServer) => {
        console.log(postsFromServer);
        setPosts(postsFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          {showCreatePostForm === false && showUpdatePostForm === null && (
            <div>
              <h1>ASP.NET + React</h1>
              <div className="mt-5">
                <button
                  onClick={getPosts}
                  className="btn btn-dark btn-lg w-100"
                >
                  Get Posts
                </button>
                <button
                  onClick={() => setShowCreatePostForm(true)}
                  className="btn btn-secondary btn-lg w-100 mt-4"
                >
                  Create new Post
                </button>
              </div>
            </div>
          )}

          {posts.length > 0 &&
            showCreatePostForm === false &&
            showUpdatePostForm === null &&
            renderPostsTable()}

          {showCreatePostForm && (
            <PostCreateForm onPostCreated={onPostCreated} />
          )}

          {showUpdatePostForm && (
            <PostUpdateForm
              post={showUpdatePostForm}
              onPostUpdated={onPostUpdated}
            />
          )}
        </div>
      </div>
    </div>
  );

  function renderPostsTable() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">PostId (PK)</th>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
              <th scope="col">CRUD</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.postId}>
                <th scope="row">{post.postId}</th>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>
                  <button
                    onClick={() => setShowUpdatePostForm(post)}
                    className="btn btn-dark btn-lg mx-3 my-3"
                  >
                    Update
                  </button>
                  <button className="btn btn-secondary btn-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={() => setPosts([])}
          className="btn btn-dark btn-lg w-100"
        >
          Empty Array
        </button>
      </div>
    );
  }

  function onPostCreated(createdPost) {
    setShowCreatePostForm(false);

    if (createdPost === null) {
      return;
    } else {
      alert(`Post created!: "${createdPost.title}"`);
    }
  }

  function onPostUpdated(updatedPost) {
    setShowUpdatePostForm(null);

    if (updatedPost === null) {
      return;
    }

    let postsCopy = [...posts];

    const index = postsCopy.findIndex((postsCopyPost, currentIndex) => {
      if (postsCopyPost.postId === updatedPost.postId) {
        return true;
      }
    });

    if (index !== -1) {
      postsCopy[index] = updatedPost;
    }

    setPosts(postsCopy);

    alert(`Post updated: title "${updatedPost.title}"}`);
  }
}
