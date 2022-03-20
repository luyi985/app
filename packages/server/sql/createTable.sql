DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS playground;
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- SELECT uuid_generate_v4();


CREATE TABLE playground (
   id SERIAL PRIMARY KEY,
   name VARCHAR(100),
   age INT CHECK(age > 0)
);

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    nickname VARCHAR(100),
    title VARCHAR(50),
    age INT,
    profession VARCHAR(50),
    company VARCHAR(50),
    CONSTRAINT age_positive CHECK (age > 0)
);
 
CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    countryCode VARCHAR(3),
    mobile VARCHAR(25),
    facebook VARCHAR(100),
    twitter VARCHAR(100),
    linkedIn VARCHAR(100),
    customer_id INT NOT NULL,
    UNIQUE(email),
    CONSTRAINT fk_constraint_customer_id
        FOREIGN KEY (customer_id)
        REFERENCES customers(id)
        ON DELETE CASCADE
);
 