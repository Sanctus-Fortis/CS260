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
            ('Dagger', 5, 1, 1, 1),
            ('Shortsword', 7, 1, 1, 1),
            ('Arming Sword', 9, 1, 1, 1),
            ('Longsword', 14, 1, 1, 1),
            ('Greatsword', 18, 1, 1, 1),
            ('Handaxe', 8, 1, 1, 1),
            ('Battleaxe', 12, 1, 1, 1),
            ('Dane Axe', 20, 1, 1, 1),
            ('Club', 8, 1, 1, 1),
            ('Flanged mace', 12, 1, 1, 1),
            ('Morning star', 14, 1, 1, 1),
            ('Warhammer', 16, 1, 1, 1),
            ('Maul', 22, 1, 1, 1),
            ('Javelin', 10, 1, 1, 1),
            ('Shortspear', 12, 1, 1, 1),
            ('Longspear', 17, 1, 1, 1),
            ('Quarterstaff', 16, 1, 1, 1),
            ('Round Shield', 0, 1.1, 1, 1),
            ('Heater Shield', 0, 1.15, 1, 1),
            ('Kite Shield', 0, 1.2, 1, 1),
            ('Shortbow', 10, 1, 1, 1),
            ('Recurve Bow', 15, 1, 1, 1),
            ('Longbow', 18, 1, 1, 1),
            ('Crossbow', 12, 1, 1, 1),
            ('Sling', 8, 1, 1, 1),
            ('Bowgun', 1, 1, 1, 1),
            ('Focus Staff', 0, 1, 1, 1),
            ('Grimoire', 0, 1, 1.1, 1),
            ('Orb', 0, 1, 1, 1.1),
            ('Quartz', 1, 0, 1.1, 1),
            ('Gnarled Branch', 0, 1, 1, 1.1),
            ('Scripture', 0, 1, 1.1, 1),
            ('Holy Symbol', 0, 1, 1, 1.1)
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
            ('Common Clothing', 1.05, 1, 1),
            ('Gambeson', 1.3, 1, 1),
            ('Chain', 1.5, 1, 1),
            ('Brigandine', 1.7, 1, 1),
            ('Novice Mage Robes', .9, 1.2, 1.2),
            ('Adept Mage Robes', .9, 1.3, 1.3),
            ('Master Mage Robes', .9, 1.5, 1.5),
            ('Deacon Robes', 1.1, 1.1, 1.1),
        `);
        console.log("Initial data inserted into armor table!");
    } catch (err) {
        console.error("Error creating table or inserting data:", err);
    }

    try {
        await db.execute(`
            CREATE TABLE IF NOT EXISTS races (
                name VARCHAR(50) NOT NULL,
                strengthmod INT,
                dexteritymod INT,
                constitutionmod INT,
                intelligencemod INT,
                wisdommod INT,
                charismamod INT
            )
        `);

        // ('Human'),       1
        // ('Elf'),         2
        // ('Dwarf'),       3
        // ('Halfling'),    4
        // ('Half-Elf'),    5
        // ('Half-Orc'),    6
        // ('Half-Dwarf'),  7

        console.log("Races table created successfully!");
        await db.execute(`
            INSERT INTO races (name, strengthmod, dexteritymod, constitutionmod, intelligencemod, wisdommod, charismamod) VALUES
            ('Human', 0, 0, 0, 0, 0, 0),
            ('Elf', -1, 2, -1, 0, 0, 0),
            ('Dwarf', 1, -2, 1, 0, 0, 0),
            ('Halfling', -2, 4, -2, 0, 0, 0),
            ('Half-Elf', 0, 1, -1, 0, 0, 0),
            ('Half-Orc', 2, -1, 2, -1, -1, -1),
            ('Half-Dwarf, 1, -1, 0, 0, 0, 0),
        `);
        console.log("Initial data inserted into races table!");
    } catch (err) {
        console.error("Error creating table or inserting data:", err);
    }

    try {
        await db.execute(`
            CREATE TABLE IF NOT EXISTS classes (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL,
                level INT, NOT NULL,

            )
        `);

        // ('Bard'),    1
        // ('Cleric'),  2
        // ('Druid'),   3
        // ('Fighter'), 4
        // ('Mage'),    5
        // ('Paladin'), 6
        // ('Ranger'),  7
        // ('Thief'),   8

        console.log("Classes table created successfully!");
        await db.execute(`
            INSERT INTO races (name) VALUES
            ('Bard'),
            ('Cleric'),
            ('Druid'),
            ('Fighter'),
            ('Mage'),
            ('Paladin'),
            ('Ranger'),
            ('Thief'),
        `);
        console.log("Initial data inserted into classes table!");
    } catch (err) {
        console.error("Error creating table or inserting data:", err);
    }

    try {
        await db.execute(`
            CREATE TABLE IF NOT EXISTS proficiencies (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL,
            )
        `);

        // ('shortblade'),  1
        // ('longblade'),   2
        // ('axe'),         3
        // ('mace'),        4
        // ('spear'),       5
        // ('quarterstaff'), 6
        // ('shield'),      7
        // ('lightbow'),    8
        // ('bow'),         9
        // ('crossbow'),    10
        // ('sling'),       11
        // ('blowgun'),     12
        // ('mage'),        13
        // ('cleric'),      14
        // ('druid'),       15
        // ('lightarmor'),  16
        // ('mediumarmor'), 17
        // ('heavyarmor'),  18

        console.log("Proficiency table created successfully!");
        await db.execute(`
            INSERT INTO proficiencies (name) VALUES
            ('shortblade'),
            ('longblade'),
            ('axe'),
            ('mace'),
            ('spear'),
            ('quarterstaff'),
            ('shield'),
            ('lightbow'),
            ('bow'),
            ('crossbow'),
            ('sling'),
            ('blowgun'),
            ('mage'),
            ('cleric'),
            ('druid'),
            ('lightarmor'),
            ('mediumarmor'),
            ('heavyarmor'),
        `);
        console.log("Initial data inserted into proficiencies table!");
    } catch (err) {
        console.error("Error creating table or inserting data:", err);
    }

    try {
        await db.execute(`
            CREATE TABLE IF NOT EXISTS class_proficiencies (
                class_id INT,
                proficiency_id INT,
                PRIMARY KEY (class_id, proficiency_id),
                FOREIGN KEY (class_id) REFERENCES Class(id) ON DELETE CASCADE,
                FOREIGN KEY (proficiency_id) REFERENCES Proficiency(id) ON DELETE CASCADE
            )
        `);
        console.log("class_proficiencies table created successfully!");

        // ('Bard'),    shortblade, longblade, lightbow, crossbow, sling, lightarmor, mediumarmor
        // ('Cleric'),  mace, shield, sling, lightarmor, mediumarmor, cleric
        // ('Druid'),   mace, spear, sling, quarterstaff, lightarmor, druid
        // ('Fighter'), shortblade, longblade, axe, mace, spear, shield, lightbow, bow, crossbow, lightarmor, mediumarmor, heavyarmor
        // ('Mage'),    shortblade, quarterstaff, sling, mage
        // ('Paladin'), shortblade, longblade, axe, mace, spear, shield, lightarmor, mediumarmor, heavyarmor
        // ('Ranger'),  shortlbade, longblade, axe, lightbow, bow, crossbow, lightarmor, mediumarmor
        // ('Thief'),   shortblade, lightbow, crossbow, blowgun, lightarmor

        await db.execute(`
            INSERT INTO class_proficiencies (class_id, proficiency_id) VALUES
            (1, 1), (1, 2), (1, 8), (1, 10), (1, 11), (1, 16), (1, 17),

            (2, 4), (2, 7), (2, 11), (2, 16), (2, 17), (2, 14),

            (3, 4), (3, 5), (3, 11), (3, 6), (3, 16), (3, 15),

            (4, 1), (4, 2), (4, 3), (4, 4), (4, 5), (4, 7), (4, 8), (4, 9), (4, 10), (4, 16), (4, 17), (4, 18),

            (5, 1), (5, 6), (5, 11), (5, 13),

            (6, 1), (6, 2), (6, 3), (6, 4), (6, 5), (6, 7), (6, 16), (6, 17), (6, 18),

            (7, 1), (7, 2), (7, 3), (7, 8), (7, 9), (7, 10), (7, 16), (7, 17),
            
            (8, 1), (8, 8), (8, 10), (8, 12), (8, 16);

        `);
        console.log("Initial data inserted into class_proficiencies table!");
    } catch (err) {
        console.error("Error creating table or inserting data:", err);
    }
}

setupDatabase();
