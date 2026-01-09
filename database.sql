CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50),
  email VARCHAR(100),
  password VARCHAR(255),
  points INT DEFAULT 0
);

CREATE TABLE accounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  platform VARCHAR(20),
  profile_url TEXT
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  follower_id INT,
  followed_id INT,
  platform VARCHAR(20),
  status ENUM('pending','done') DEFAULT 'pending'
);
