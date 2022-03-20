import { faker } from '@faker-js/faker';
import { createPool } from './helpers';
import fs from 'fs';
import path from 'path';

const normaliszeName = (name: string): string =>
  name.toLowerCase().replace(/[\s\'\"]/g, '-');

export const seedContactQuest = (customerRows: any[]): string => {
  return `
\r\n
DELETE FROM contacts;
INSERT INTO contacts ("email", "countrycode", "mobile", "facebook", "twitter", "linkedin", "customer_id")
VALUES ${customerRows
    .map(
      (r) => `
  ('${faker.internet.email(r.name)}',
  '${faker.address.countryCode('alpha-3')}',
  '${faker.phone.phoneNumber('+61 04 ### ## ##')}',
  '${normaliszeName(r.name)}@facebook.com',
  '${normaliszeName(r.name)}@twitter.com',
  '${normaliszeName(r.name)}@linkedIn.com',
  ${r.id})
`
    )
    .join(',')}
  `;
};

const makeContactSeeds = async () => {
  try {
    const pool = await createPool();
    const customerRes = await pool?.query('select * from customers');
    const insertQuery = seedContactQuest(customerRes?.rows ?? []);
    fs.writeFileSync(
      path.join(process.cwd(), '/sql/contactSeeds.sql'),
      insertQuery
    );
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

makeContactSeeds();
