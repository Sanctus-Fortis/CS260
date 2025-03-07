const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
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

// Middleware to check for token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

  //ROUTES YOU BIMBO
  //Specifically register first. Check if the user is already in the DB. If so, tell them they're dumb or something.
  expServer.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
    databaseConnection.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], async (err, result) => {
      if (err) return res.status(500).json({ message: 'Nah mate couldn\'t find the database. Sanctus probably ran out of cash and had to take it down.' });
      if (result.length > 0) return res.status(400).json({ message: 'Yeah, that guy\'s already in there mate. Probably try another username or email I guess.' });
      const hashedPassword = await bcrypt.hash(password, 10);
      databaseConnection.query('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
        [username, email, hashedPassword], 
        (err, result) => {
          if (err) return res.status(500).json({ message: 'Database decided you aren\'t cool enough or something. Try some sunglasses?' });
          res.json({ message: 'You\'re on the list now mate. Watch what you do from here out.' });
        }
      );
    });
  });

  //Login. Copilot says I should call the user dumb here which I find funny since I just did that above. No originality from bots.
  expServer.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    databaseConnection.query('SELECT * FROM users WHERE username = ?', [username], async (err, result) => {
      if (err) return res.status(500).json({ message: 'Nah mate couldn\'t find the database. Sanctus probably ran out of cash and had to take it down.' });
      if (result.length === 0) return res.status(400).json({ message: 'Yeah, that guy\'s not in there mate. Probably try another username I guess.' });
      const user = result[0];
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) return res.status(400).json({ message: 'Password\'s wrong mate. Try again.' });
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  });

  const PORT = 5000;
expServer.listen(PORT, () => console.log(`boop boop beep beep *digital signal over telephone cable noise* on ${PORT}. Bro imagine if I forgot to sanitize my inputs. That\'d be so funny.`));