const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const expServer = express();
expServer.use(express.json());
expServer.use(cors());

const databaseConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
  });

  //ROUTES YOU BIMBO
  //Specifically register first. Check if the user is already in the DB. If so, tell them they're dumb or something.
  expServer.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
    databaseConnection.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], async (err, result) => {
      if (err) return res.status(500).json({ message: 'Nah mate couldn\'t find the database. Sanctus probably ran out of cash and had to take it down.' });
      if (result.length > 0) return res.status(400).json({ message: 'Yeah, that guy\'s already in there mate. Probably try another username or email I guess.' });
      const hashedPassword = await bcrypt.hash(password, 10);
      databaseConnection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword], 
        (err, result) => {
          if (err) return res.status(500).json({ message: 'Nah mate couldn\'t find the database. Sanctus probably ran out of cash and had to take it down.' });
          res.json({ message: 'You\'re on the list now mate. Watch what you do from here out.' });
        }
      );
    });
  });

  const PORT = 5000;
expServer.listen(PORT, () => console.log(`boop boop beep beep *digital signal over telephone cable noise* on ${PORT}. Bro imagine if I forgot to sanitize my inputs. That\'d be so funny.`));