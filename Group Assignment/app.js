
const express = require('express');
const { Client } = require('pg');
const cors = require('cors')

const app = express();
const port = 5500;

// Set up PostgreSQL connection
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'web',
  password: 'keron',
  port: 5432,
});

client.connect();
app.use(cors({origin: '*'}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static HTML and CSS files
app.use(express.static('public'));

// Handle form submissions
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  const insertQuery = 'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)';
  const values = [name, email, message];

  client.query(insertQuery, values, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error saving data' });
    } else {
      res.json({ message: 'Feedback received successfully!' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
