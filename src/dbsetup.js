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
                reductionmod FLOAT
                castingspeedmod FLOAT
                castingcostmod FLOAT
            )
        `);
        console.log("Weapons table created successfully!");
        await db.execute(`
            INSERT INTO weapons (name, damage, reductionmod, castingspeedmod, castingcostmod) VALUES
            ('dagger', 5, 1, 1, 1),
            ('shortsword', 7, 1, 1, 1),
            ('arming sword', 9, 1, 1, 1),
            ('longsword', 14, 1, 1, 1),
            ('greatsword', 18, 1, 1, 1),
            ('handaxe', 8, 1, 1, 1),
            ('battleaxe', 12, 1, 1, 1),
            ('dane axe', 20, 1, 1, 1),
            ('club', 8, 1, 1, 1),
            ('flanged mace', 12, 1, 1, 1),
            ('morning star', 14, 1, 1, 1),
            ('warhammer', 16, 1, 1, 1),
            ('maul', 22, 1, 1, 1),
            ('javelin', 10, 1, 1, 1),
            ('shortspear', 12, 1, 1, 1),
            ('longspear', 17, 1, 1, 1),
            ('quarterstaff', 16, 1, 1, 1),
            ('round shield', 0, 20, 1, 1),
            ('heater shield', 0, 15, 1, 1),
            ('kite shield', 0, 35, 1, 1),
            ('shortbow', 10, 1, 1, 1),
            ('recurve bow', 15, 1, 1, 1),
            ('longbow', 18, 1, 1, 1),
            ('crossbow', 12, 1, 1, 1),
            ('sling', 8, 1, 1, 1),
            ('blowgun', 1, 1, 1, 1),
            ('focus staff', 0, 1, 1, 1),
            ('grimoire', 0, 1, 1.1, 1),
            ('orb', 0, 1, 1, 1.1),
            ('quartz', 1, 0, 1.1, 1),
            ('gnarled branch', 0, 1, 1, 1.1),
            ('scripture', 0, 1, 1.1, 1),
            ('holy symbol', 0, 1, 1, 1.1)
        `);
        console.log("Initial data inserted into weapons table!");
    } catch (err) {
        console.error("Error creating table or inserting data:", err);
    }

    try {
        await db.execute(`
            CREATE TABLE IF NOT EXISTS armor (
                name VARCHAR(50) NOT NULL,
                reductionmod FLOAT
                castingspeedmod FLOAT
                castingcostmod FLOAT
            )
        `);
        console.log("Armor table created successfully!");
        await db.execute(`
            INSERT INTO armor (name, reductionmod, castingspeedmod, castingcostmod) VALUES
            ('common clothing', 1.05, 1, 1),
            ('gambeson', 1.3, 1, 1),
            ('chain', 1.5, 1, 1),
            ('brigandine', 1.7, 1, 1),
            ('novice mage robes', .9, 1.2, 1.2),
            ('adept mage robes', .9, 1.3, 1.3),
            ('master mage robes', .9, 1.5, 1.5),
            ('deacon robes', 1.1, 1.1, 1.1),
        `);
        console.log("Initial data inserted into weapons table!");
    } catch (err) {
        console.error("Error creating table or inserting data:", err);
    }
}

setupDatabase();
