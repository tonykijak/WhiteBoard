CREATE TABLE users (
id SERIAL PRIMARY KEY,
name VARCHAR NOT NULL,
password VARCHAR
);

CREATE TABLE conversations (
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id)
)

CREATE TABLE messages (
id SERIAL PRIMARY KEY,
user SERIAL REFERENCES users(id),
conversation_id SERIAL REFERENCES conversations(id),
text TEXT NOT NULL,
date DATE NOT NULL,
);