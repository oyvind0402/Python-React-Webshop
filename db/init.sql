CREATE TABLE product (
    id INT AUTO_INCREMENT NOT NULL,
    brand VARCHAR(20) NOT NULL,
    name VARCHAR(20) NOT NULL,
    price INT NOT NULL,
    color VARCHAR(20) NOT NULL,
    operatingsystem VARCHAR(20) NOT NULL,
    storage INT NOT NULL,
    short_desc TEXT NOT NULL,
    long_desc TEXT NOT NULL,
    image LONGTEXT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE user (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    username VARCHAR(20) NOT NULL,
    password_salt VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(40) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (email)
);
    
INSERT INTO user (name, username, password_salt, password_hash, email) VALUES ('admin', 'admin', 'admin', 'admin', 'admin@admin.com');

-- INSERT INTO product HERE