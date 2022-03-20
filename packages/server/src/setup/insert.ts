import { createPool, getSql } from './helpers';

const main = async () => {
  try {
    const toInsert = process.argv.pop() as string;
    const pool = await createPool();
    if (!pool || !pool.query) throw new Error('Failed to get pool');
    if (!['customer', 'contact'].includes(toInsert)) return;
    const query = getSql(`${toInsert}Seeds`);
    await pool.query(query);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

main();
