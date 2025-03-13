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

  expServer.post('/api/saveadventurer', authenticateToken, async (req, res) => {
    const { name, data, associated_user } = req.body;

    if (!name || !data || !associated_user) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    databaseConnection.query('INSERT INTO adventurers (name, data, associated_user) VALUES (?, ?, ?)',
      [name, data, associated_user], 
      (err, result) => {
        if (err) return res.status(500).json({ message: 'Database decided you aren\'t cool enough or something. Try some sunglasses?' });
        res.json({ message: 'You\'re on the list now mate. Watch what you do from here out.' });
      }
    );
  });

  //Get Races and convert to JSON
  //Contains name of the race (elf, dwarf, human, ect) and their associated stat modifiers
  expServer.get('/api/races', async (req, res) => {
    try {
        const [rows] = await databaseConnection.promise().query('SELECT * FROM races');
        res.json(rows);
    } catch (err) {
        console.error('Error fetching races:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Get Classes and convert to JSON
//Contaings name of the class and associated proficiencies
expServer.get('/api/classes', async (req, res) => {
    try {
        const [rows] = await databaseConnection.promise().query('SELECT * FROM classes');
        res.json(rows);
    } catch (err) {
        console.error('Error fetching classes:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Get Weapons and convert to JSON
//Contains name of the weapon, damage values and associated proficiency
expServer.get('/api/weapons', async (req, res) => {
    try {
        const [rows] = await databaseConnection.promise().query('SELECT * FROM weapons');
        res.json(rows);
    } catch (err) {
        console.error('Error fetching weapons:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get specific weapon by name
expServer.get('/api/weapons/:name', async (req, res) => {
  const { name } = req.params;
  try {
      const [rows] = await databaseConnection.promise().query('SELECT * FROM weapons WHERE name = ?', [name]);
      if (rows.length === 0) {
          return res.status(404).json({ error: 'Weapon not found' });
      }
      res.json(rows[0]);
  } catch (err) {
      console.error('Error fetching weapon:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


expServer.get('/api/classprof', async (req, res) => {
  try {
      const [rows] = await databaseConnection.promise().query('SELECT * FROM class_proficiencies');
      res.json(rows);
  } catch (err) {
      console.error('Error fetching class proficiencies:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

expServer.get('/api/proficiencies', async (req, res) => {
  try {
      const [rows] = await databaseConnection.promise().query('SELECT * FROM proficiencies');
      res.json(rows);
  } catch (err) {
      console.error('Error fetching proficiencies:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Get Armor and convert to JSON
//Contains name of the armor and armor values as well as magic modifiers when applicable also associated proficiencies.
expServer.get('/api/armor', async (req, res) => {
    try {
        const [rows] = await databaseConnection.promise().query('SELECT * FROM armor');
        res.json(rows);
    } catch (err) {
        console.error('Error fetching armor:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get specific armor by name
expServer.get('/api/armor/:name', async (req, res) => {
  const { name } = req.params;
  try {
      const [rows] = await databaseConnection.promise().query('SELECT * FROM armor WHERE name = ?', [name]);
      if (rows.length === 0) {
          return res.status(404).json({ error: 'Armor not found' });
      }
      res.json(rows[0]);
  } catch (err) {
      console.error('Error fetching armor:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

  const PORT = 5000;
expServer.listen(PORT, () => console.log(`boop boop beep beep *digital signal over telephone cable noise* on ${PORT}. Bro imagine if I forgot to sanitize my inputs. That\'d be so funny.`));