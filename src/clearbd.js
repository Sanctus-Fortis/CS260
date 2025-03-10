const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
  });

  async function dropAllTables() {
    try {
        const [tables] = await db.promise().query("SHOW TABLES");
        for (const table of tables) {
            const tableName = table[`Tables_in_${process.env.DB_NAME}`];
            await db.promise().query(`DROP TABLE IF EXISTS \`${tableName}\``);
            console.log(`Dropped table: ${tableName}`);
        }
        console.log("All tables dropped successfully!");
    } catch (err) {
        console.error("Error dropping tables:", err);
    } finally {
        db.end();
    }
}

dropAllTables();