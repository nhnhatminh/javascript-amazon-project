import pool from './db.js';

async function testConnection() {
  try {
    // const [rows] = pool.query('SELECT COUNT(*) AS total FROM products');
    const queryResult = await pool.query('SELECT COUNT(*) AS total FROM products');
    const [rows] = queryResult;


    console.log('✅ Connected to MySQL successfully!');
    console.log(`Total products in database now: ${rows[0].total}`);

    process.exit();

  } catch (error) {
    console.error('❌ Database  connection failed!');
    console.error('Error details: ', error.message);

    process.exit();
  }
}

testConnection();
