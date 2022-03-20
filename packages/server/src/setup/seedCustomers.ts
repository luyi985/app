import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';

const seedCustomerQuest = (numToMake: number): string => `
DELETE FROM customers;
INSERT INTO customers ("name", "nickname","title", "age", "profession", "company")
VALUES 
${new Array(numToMake)
  .fill('')
  .map(() => {
    const name = faker.name;

    return `(
    '${name.firstName().replace(/[',"]/g, '')} ${name
      .lastName()
      .replace(/[',"]/g, '')}',
    '${name.findName().replace(/[',"]/g, '')}',
    '${name.title().replace(/[',"]/g, '')}',
    ${10 + Math.floor(Math.random() * 50)},
    '${name.jobTitle().replace(/[',"]/g, '')}',
    '${faker.company.companyName().replace(/[',"]/g, '')}'
  )`;
  })
  .join(',')};
`;

const makeCustomerSeeds = () => {
  const numToMake = parseInt(process.argv.pop() ?? '10');
  if (isNaN(numToMake)) return;
  console.log(`To make ${numToMake} customer seeds`);
  const insertQuery = seedCustomerQuest(numToMake);
  fs.writeFileSync(
    path.join(process.cwd(), '/sql/customerSeeds.sql'),
    insertQuery
  );
};

makeCustomerSeeds();
