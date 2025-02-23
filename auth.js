// Function to check login
function login() {
  const password = document.getElementById("password").value;
  if (password === PASSWORD) {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("blog-form").style.display = "block";
  } else {
    alert("Incorrect password!");
  }
}

// Function to add a new blog post
function addPost(title, content) {
  const newPost = { title, content, timestamp: new Date().toISOString() };
  blogPosts.push(newPost);
  localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
  displayPosts();
}

// Function to display blog posts
function displayPosts() {
  const blogPostsContainer = document.getElementById("blog-posts");
  blogPostsContainer.innerHTML = "";

  blogPosts.forEach((post, index) => {
    const postElement = document.createElement("div");
    postElement.classList.add("blog-post");
    postElement.innerHTML = `
      <h3>${post.title}</h3>
      <p>Published on: <em>${new Date(post.timestamp).toLocaleDateString()}</em></p>
      <p>${post.content}</p>
      <button onclick="deletePost(${index})">Delete</button>
    `;
    blogPostsContainer.appendChild(postElement);
  });
}

// Function to delete a blog post
function deletePost(index) {
  blogPosts.splice(index, 1);
  localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
  displayPosts();
}

// Handle form submission
document.getElementById("blog-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("post-title").value;
  const content = document.getElementById("post-content").value;
  addPost(title, content);
  document.getElementById("blog-form").reset();
});

// Load existing posts on page load
let blogPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];
displayPosts();