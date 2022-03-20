import path from 'path';
import fs from 'fs';
import { createPool, getSql } from './helpers';
import { Query } from 'pg';

const testDb = async () => {
  try {
    console.log('============TestDb============');
    const pool = await createPool();
    if (!pool || !pool.query) throw new Error('Failed to get pool');
    const query = getSql('test');
    await pool.query(query);
    const res = await pool.query('select * from playground');
    console.log(res.rows);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

testDb();
