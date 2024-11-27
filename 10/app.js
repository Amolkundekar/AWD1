const express = require('express');
const app = express();
const PORT = 3000;

// Dynamic URL Parameter Route
app.get('/user/:id', (req, res) => {
  const userId = req.params.id; // Extract dynamic URL parameter
  res.send(`User ID: ${userId}`);
});

// Route with Multiple Dynamic Parameters
app.get('/user/:id/book/:bookId', (req, res) => {
  const { id, bookId } = req.params; // Extract multiple parameters
  res.send(`User ID: ${id}, Book ID: ${bookId}`);
});

// Route with Query Strings
app.get('/search', (req, res) => {
  const { q, page, limit } = req.query; // Extract query parameters
  res.send(`Search Query: ${q || "N/A"}, Page: ${page || 1}, Limit: ${limit || 10}`);
});

// Route Combining Parameters and Query Strings
app.get('/user/:id/details', (req, res) => {
  const userId = req.params.id;
  const { includePosts, includeComments } = req.query;
  res.send(`User ID: ${userId}, Include Posts: ${includePosts}, Include Comments: ${includeComments}`);
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
