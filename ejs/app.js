
// npm i express ejs
const express = require('express');
const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Middleware to serve static files (if needed)
app.use(express.static('public'));

// Sample data
const users = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 22 },
];

const posts = [
    { id: 1, title: 'Learning EJS', author: 'Alice' },
    { id: 2, title: 'Dynamic HTML with Node.js', author: 'Bob' },
];

// Routes
app.get('/', (req, res) => {
    res.render('index', { users, posts });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
