const db = require('./db');

async function setupDatabase() {
    try {
        await db.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("Users table created successfully!");
    } catch (err) {
        console.error("Error creating table:", err);
    }

    try {
        await db.execute(`
            CREATE TABLE IF NOT EXISTS adventurers (
                name VARCHAR(50) NOT NULL,
                data NVARCHAR(MAX) NOT NULL,
                associated_user VARCHAR(50) NOT NULL 
            )
        `);
        console.log("Adventurers table created successfully!");
    } catch (err) {
        console.error("Error creating table:", err);
    }

    try {
        await db.execute(`
            CREATE TABLE IF NOT EXISTS weapons (
                name VARCHAR(50) NOT NULL,
                damage INT
                reduction FLOAT
                castingspeedmod FLOAT
                castingcostmod FLOAT
            )
        `);
        console.log("Weapons table created successfully!");

        // Insert initial data into weapons table
        await db.execute(`
            INSERT INTO weapons (name, damage) VALUES
            ('dagger', 5, 0),
            ('shortsword', 7, 0),
            ('armingsword', 9, 0),
            ('longsword', 14, 0),
            ('greatsword', 18, 0),
            ('handaxe', 8, 0),
            ('battleaxe', 12, 0),
            ('daneaxe', 20, 0),
            ('club', 8, 0),
            ('flangedmace', 12, 0),
            ('morningstar', 14, 0),
            ('warhammer', 16, 0),
            ('maul', 22, 0),
            ('javelin', 10, 0),
            ('shortspear', 12, 0),
            ('longspear', 17, 0),
            ('quarterstaff', 16, 0),
            ('roundshield', 0, 20),
            ('heatershield', 0, 15),
            ('kiteshield', 0, 35),
            ('shortbow', 10, 0),
            ('recurvebow', 15, 0),
            ('longbow', 18, 0),
            ('crossbow', 12, 0),
            ('sling', 8, 0),
            ('blowgun', 1, 0),
            ('focusstaff', 0, 0),
            ('grimoire', 0, 0),
            ('orb', 0, 0),
            ('quartz', 0, 0),
            ('gnarledbranch', 0, 0),
            ('scripture', 0, 0),
            ('holysymbol', 0, 0),
        `);
        console.log("Initial data inserted into weapons table!");
    } catch (err) {
        console.error("Error creating table or inserting data:", err);
    }
}

setupDatabase();
