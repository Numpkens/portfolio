import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://gxoanfxlfuyiksrilqxx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4b2FuZnhsZnV5aWtzcmlscXh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzMDQ4NzUsImV4cCI6MjA1NTg4MDg3NX0.OQ7l44_HDXcc8J4N8NyKbSCJqCoKrsJij6dwjJ_TMVY';
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to log in a user
async function login() {
  console.log("Login function called"); // Debugging line
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const { user, error } = await supabase.auth.signIn({ email, password });
  if (error) {
    console.error("Login error: ", error);
    alert("Error: " + error.message);
  } else {
    console.log("Login successful. User:", user); // Debugging line
    alert("Login successful!");
    checkAuth(); // Update UI based on authentication state
  }
}

// Function to register a user
async function register() {
  console.log("Register function called"); // Debugging line
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  const { user, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    console.error("Registration error: ", error);
    alert("Error: " + error.message);
  } else {
    console.log("Registration successful. User:", user); // Debugging line
    alert("Registration successful! Please check your email to confirm.");
  }
}

// Function to check if user is logged in
async function checkAuth() {
  console.log("Checking authentication state..."); // Debugging line
  const { user, error } = await supabase.auth.getUser();
  if (user) {
    console.log("User is logged in:", user); // Debugging line
    document.getElementById("login-form").style.display = "none"; // Hide login form
    document.getElementById("blog-form").style.display = "block"; // Show blog form
  } else {
    console.log("User is not logged in"); // Debugging line
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
      <small>Posted by: ${post.user_id}</small>
    `;
    blogPostsContainer.appendChild(postElement);
  });
}

// Function to handle blog form submission
function submitPost(event) {
  event.preventDefault();
  const title = document.getElementById("post-title").value;
  const content = document.getElementById("post-content").value;
  addPost(title, content);
}

// Call displayPosts on page load to show all posts
displayPosts();