const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

app.get('/api/info', (req, res) => {
  db.query('SELECT * FROM info LIMIT 1', (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(result[0]);
  });
});

app.post('/api/info', (req, res) => {
  const { description, link, timer, isVisible } = req.body;
  db.query(
    'UPDATE info SET description = ?, link = ?, timer = ?, isVisible = ? WHERE id = 1',
    [description, link, timer, isVisible],
    (err) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.sendStatus(200);
    }
  );
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
