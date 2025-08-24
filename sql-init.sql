CREATE SCHEMA IF NOT EXISTS desmiojo;

SET search_path TO desmiojo;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    login VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE
);

CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT,
    name VARCHAR(45),
    preparation_time_minutes INT,
    servings INT,
    preparation_method TEXT NOT NULL,
    ingredients TEXT,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE ON UPDATE CASCADE
);

---

INSERT INTO categories (name) VALUES
    ('Bolos e tortas doces'),
    ('Carnes'),
    ('Aves'),
    ('Peixes e frutos do mar'),
    ('Saladas, molhos e acompanhamentos'),
    ('Sopas'),
    ('Massas'),
    ('Bebidas'),
    ('Doces e sobremesas'),
    ('Lanches'),
    ('Prato Único'),
    ('Light'),
    ('Alimentação Saudável');
