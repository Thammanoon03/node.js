const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
const port = 5000;

app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'tickets_db' 
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

app.use(bodyParser.json());


app.post('/api/tickets', (req, res) => {
    const { title, description, contactInfo } = req.body;
  
    const defaultContactInfo = contactInfo || 'No contact info provided';
  
    const sql = 'INSERT INTO tickets (title, description, contact_info) VALUES (?, ?, ?)';
    connection.query(sql, [title, description, defaultContactInfo], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Ticket created successfully', id: results.insertId });
    });
  });
  

app.put('/api/tickets/:id', (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  const sql = 'UPDATE tickets SET status = ?, updated_time = NOW() WHERE id = ?';
  connection.query(sql, [status, id], (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'Ticket updated successfully' });
  });
});

app.get('/api/tickets', (req, res) => {
  const { status, sortBy } = req.query;
  
  let sql = 'SELECT * FROM tickets';
  let conditions = [];

  if (status) {
      conditions.push(`status = ${connection.escape(status)}`);
  }

  if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
  }

  if (sortBy) {
      sql += ` ORDER BY ${sortBy}`;
  }

  connection.query(sql, (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.status(200).json(results);
  });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
