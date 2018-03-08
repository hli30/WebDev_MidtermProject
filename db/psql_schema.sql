DROP TABLE IF EXISTS customer CASCADE
DROP TABLE IF EXISTS restaurant CASCADE
DROP TABLE IF EXISTS order CASCADE
DROP TABLE IF EXISTS owner CASCADE
DROP TABLE IF EXISTS menu CASCADE
DROP TABLE IF EXISTS food CASCADE

CREATE TABLE customer {
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone_number VARCHAR(24) NOT NULL,
  address VARCHAR(100) NOT NULL,
  email VARCHAR(50)
};

CREATE TABLE restaurant {
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  phone_number VARCHAR(24) NOT NULL,
  address VARCHAR(100) NOT NULL,
  country,
  province
  email VARCHAR(50),
  menu_id INT REFERENCES menu(id)
};

CREATE TABLE order {
  id SERIAL PRIMARY KEY,
  restaurant_id INT REFERENCES restaurant(id),
  customer_id INT REFERENCES customer(id)
};

CREATE TABLE owner {
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone_number VARCHAR(24) NOT NULL,
  address VARCHAR(100) NOT NULL,
  email VARCHAR(50),
  restaurant_id INT REFERENCES restaurant(id)
};

CREATE TABLE menu {
  id SERIAL PRIMARY KEY,
  food_id INT REFERENCES food(id)
};

CREATE TABLE food {
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price INT NOT NULL,
  cook_time INT NOT NULL
};

CREATE TABLE tax {
  id SERIAL PRIMARY KEY,
  country,
  province,
  tax INT
};