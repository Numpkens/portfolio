// Array to store blog posts
let blogPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];

// Function to display blog posts
function displayPosts() {
  const blogPostsContainer = document.getElementById("blog-posts");
  blogPostsContainer.innerHTML = ""; // Clear existing posts

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

// Function to add a new blog post
function addPost(title, content) {
  const newPost = {
    title,
    content,
    timestamp: new Date().toISOString(), // Add a timestamp
  };
  blogPosts.push(newPost);
  localStorage.setItem("blogPosts", JSON.stringify(blogPosts)); // Save to localStorage
  displayPosts();
}

// Function to delete a blog post
function deletePost(index) {
  blogPosts.splice(index, 1);
  localStorage.setItem("blogPosts", JSON.stringify(blogPosts)); // Update localStorage
  displayPosts();
}

// Handle form submission
document.getElementById("blog-form").addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent page reload
  const title = document.getElementById("post-title").value;
  const content = document.getElementById("post-content").value;
  addPost(title, content);
  document.getElementById("blog-form").reset(); // Clear the form
});

// Display existing posts on page load
displayPosts();