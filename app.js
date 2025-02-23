const { createClient } = require('@supabase/supabase-js'); // Ensure you import the library correctly
const supabaseUrl = 'YOUR_SUPABASE_URL'; // Replace with your Supabase URL
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'; // Replace with your Supabase Anon Key
const supabase = createClient(supabaseUrl, supabaseKey); // Initialize supabase

// Function to log in a user
async function login() {
  console.log("Login function called"); // Debugging line
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const { user, error } = await supabase.auth.signIn({ email, password });
  if (error) {
    console.error("Login error: ", error); // Log the error
    alert("Error: " + error.message);
  } else {
    alert("Login successful!");
    document.getElementById("login-form").style.display = "none"; // Hide login form
    document.getElementById("blog-form").style.display = "block"; // Show blog form
  }
}

// Function to check if user is logged in
async function checkAuth() {
  const { user, error } = await supabase.auth.getUser();
  if (user) {
    document.getElementById("login-form").style.display = "none"; // Hide login form
    document.getElementById("blog-form").style.display = "block"; // Show blog form
  } else {
    document.getElementById("login-form").style.display = "block"; // Show login form
    document.getElementById("blog-form").style.display = "none"; // Hide blog form
  }
}

// Call checkAuth on page load to check if user is logged in
checkAuth();

// Function to display blog posts
async function displayPosts() {
  const { data, error } = await supabase
    .from('blogPosts')
    .select('*');

  if (error) {
    console.error("Error fetching posts: ", error);
    return;
  }

  const blogPostsContainer = document.getElementById("blog-posts");
  blogPostsContainer.innerHTML = ""; // Clear existing posts

  // Loop through the fetched posts and display them
  data.forEach(post => {
    const postElement = document.createElement("div");
    postElement.className = "blog-post";
    postElement.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.content}</p>
      <small>Posted by User ID: ${post.user_id}</small>
    `;
    blogPostsContainer.appendChild(postElement);
  });
}

// Call displayPosts on page load to show all posts
displayPosts();