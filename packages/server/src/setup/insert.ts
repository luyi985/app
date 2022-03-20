import { createPool, getSql } from './helpers';

const main = async () => {
  try {
    const pool = await createPool();
    if (!pool || !pool.query) throw new Error('Failed to get pool');
    const query = getSql('seed');
    await pool.query(query);
    const res = await pool.query(`SELECT * FROM customers`);
    console.log({ count: res.rowCount, rows: res.rows });
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

main();
