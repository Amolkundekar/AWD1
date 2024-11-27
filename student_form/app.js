const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/studentDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define the Student Schema and Model
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    grade: String,
});

const Student = mongoose.model('Student', studentSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes

// GET route to display the form
app.get('/', (req, res) => {
    res.render('form');
});

// POST route to handle form submission
app.post('/submit', async (req, res) => {
    try {
        const student = new Student({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            grade: req.body.grade,
        });

        await student.save(); // Save to MongoDB
        res.send('Student details submitted successfully!');
    } catch (err) {
        if (err.code === 11000) { // Handle duplicate key error
            res.status(400).send('Duplicate entry: A student with this email already exists.');
        } else {
            console.error(err);
            res.status(500).send('Error saving student details.');
        }
    }
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
