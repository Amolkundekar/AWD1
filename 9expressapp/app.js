const express = require('express');
const app = express();
const PORT = 3000;

// Portfolio Data
const portfolioData = {
  name: "Your Name",
  title: "Software Developer",
  bio: "I am a passionate software developer skilled in creating dynamic and responsive web applications.",
  skills: ["HTML", "CSS", "JavaScript", "Node.js", "React", "MongoDB"],
  projects: [
    { name: "Project 1", description: "Description of Project 1", link: "#" },
    { name: "Project 2", description: "Description of Project 2", link: "#" },
    { name: "Project 3", description: "Description of Project 3", link: "#" },
  ],
};

// Single Route
app.get('/', (req, res) => {
  const { name, title, bio, skills, projects } = portfolioData;

  // HTML Response
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Portfolio</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          text-align: center;
          background-color: #f9f9f9;
          color: #333;
        }
        header {
          background-color: #4CAF50;
          color: white;
          padding: 20px 0;
        }
        section {
          padding: 20px;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          margin: 5px 0;
        }
        a {
          color: #4CAF50;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <header>
        <h1>${name}</h1>
        <h2>${title}</h2>
      </header>
      <section>
        <h3>About Me</h3>
        <p>${bio}</p>
      </section>
      <section>
        <h3>Skills</h3>
        <ul>
          ${skills.map(skill => `<li>${skill}</li>`).join('')}
        </ul>
      </section>
      <section>
        <h3>Projects</h3>
        <ul>
          ${projects.map(project => `
            <li>
              <strong>${project.name}</strong>: ${project.description} 
              <a href="${project.link}" target="_blank">View Project</a>
            </li>
          `).join('')}
        </ul>
      </section>
      <footer>
        <p>&copy; 2024 Your Name</p>
      </footer>
    </body>
    </html>
  `);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
