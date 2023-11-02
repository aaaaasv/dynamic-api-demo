const DOMAIN = ""; // Replace with your API URL

document.getElementById("postForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const title = event.target.title.value;
  const content = event.target.content.value;

  fetch(`${DOMAIN}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  })
    .then((response) => response.json())
    .then(fetchPosts);
});

function deletePost(postId) {
  // Optimistically remove the post from the DOM
  const postElementToDelete = document.querySelector(`button[data-id="${postId}"]`);
  if (postElementToDelete) {
    postElementToDelete.closest("div").remove();
  }

  // Send delete request to the server
  fetch(`${DOMAIN}/posts/${postId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.log("There was a problem with the delete fetch operation:", error.message);
      // If there's an error, fetch posts again to ensure UI is in sync with server data
      fetchPosts();
    });
}

document.getElementById("posts").addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-post")) {
    const postId = event.target.getAttribute("data-id");
    deletePost(postId);
  }
});

function formatTimestamp(unixTimestamp) {
  // Convert the UNIX timestamp from seconds to milliseconds
  const date = new Date(unixTimestamp * 1000);
  // Extract date parts
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based in JS
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();

  // Construct a formatted string
  return `${day}/${month}/${year} ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
}

function fetchPosts() {
  fetch(`${DOMAIN}/posts`)
    .then((response) => response.json())
    .then((data) => {
      const postsDiv = document.getElementById("posts");
      postsDiv.innerHTML = data
        .map(
          (post) => `
            <div class="post-container">
                <div class="post-header">
                    <h3>${post.title}</h3>
                    <small>${formatTimestamp(post.timestamp)}</small>
                </div>
                <p>${post.content}</p>
                <button class="delete-post" data-id="${post.id}">Delete</button>
            </div>
        `
        )
        .join("");
    });
}

fetchPosts();
