-- Active: 1698794587395@@127.0.0.1@3306

-- CREATE TABLE users (
--     id TEXT PRIMARY KEY UNIQUE NOT NULL,
--     name TEXT NOT NULL,
--     email TEXT UNIQUE NOT NULL,
--     password TEXT NOT NULL,
--     created_at TEXT DEFAULT (DATETIME()) NOT NULL
-- );

-- CREATE TABLE accounts (
--     id TEXT PRIMARY KEY UNIQUE NOT NULL,
--     owner_id TEXT NOT NULL,
--     balance REAL DEFAULT (0) NOT NULL,
--     created_at TEXT DEFAULT (DATETIME()) NOT NULL,
--     FOREIGN KEY (owner_id) REFERENCES users (id)
--       ON UPDATE CASCADE
--       ON DELETE CASCADE
-- );

-- INSERT INTO users (id, name, email, password)
-- VALUES
-- 	('u001', 'Fulano', 'fulano@email.com', 'fulano123'),
-- 	('u002', 'Beltrana', 'beltrana@email.com', 'beltrana00');

-- INSERT INTO accounts (id, owner_id)
-- VALUES
-- 	('a001', 'u001'),
-- 	('a002', 'u002');
CREATE TABLE users (
  id text UNIQUE PRIMARY KEY NOT NULL,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  role text NOT NULL,
  created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

CREATE TABLE posts (
  id text UNIQUE PRIMARY KEY NOT NULL,
  creator_id text NOT NULL,
  content text NOT NULL,
  likes integer NOT NULL,
  dislikes integer NOT NULL,
  created_at TEXT DEFAULT (DATETIME()) NOT NULL,
  updated_at TEXT DEFAULT (DATETIME()) NOT NULL
);

CREATE TABLE likes_dislikes (
  user_id text NOT NULL,
  post_id text NOT NULL,
  like integer NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (post_id) REFERENCES posts (id)
  ON UPDATE CASCADE
      ON DELETE CASCADE
);

