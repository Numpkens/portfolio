// Initialize Supabase
const { createClient } = supabase;
const supabaseUrl = 'YOUR_SUPABASE_URL'; // Replace with your Supabase URL
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'; // Replace with your Supabase Anon Key
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to log in a user
async function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const { user, error } = await supabase.auth.signIn({ email, password });
  if (error) {
    alert("Error: " + error.message);
  } else {
    alert("Login successful!");
    document.getElementById("login-form").style.display = "none"; // Hide login form
    document.getElementById("blog-form").style.display = "block"; // Show blog form
    displayPosts(); // Load existing posts
  }
}

// Function to submit a new blog post
async function submitPost(event) {
  event.preventDefault(); // Prevent page reload
  const title = document.getElementById("post-title").value;
  const content = document.getElementById("post-content").value;

  const { data, error } = await supabase
    .from('blogPosts')
    .insert([{ title, content, user_id: supabase.auth.user().id }]); // Store user ID

  if (error) {
    alert("Error adding post: " + error.message);
  } else {
    alert("Blog post published successfully!");
    displayPosts(); // Refresh the posts
    document.getElementById("blog-form").reset(); // Clear the form
  }
}

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
