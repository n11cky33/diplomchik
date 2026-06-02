const fs = require('fs');
const mysql = require('mysql2/promise');

async function init() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQLHOST,
      port: process.env.MYSQLPORT,
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      database: process.env.MYSQLDATABASE,
      multipleStatements: true
    });

    const sql = fs.readFileSync('./schema.sql', 'utf8');

    await connection.query(sql);

    console.log('✅ Database schema applied successfully');

    await connection.end();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error applying schema:', err);
    process.exit(1);
  }
}

init();
