CREATE TABLE product (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(20) NOT NULL,
    price INT NOT NULL,
    brand VARCHAR(20) NOT NULL,
    category VARCHAR(20) NOT NULL,
    stock INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE user (
    id INT AUTO_INCREMENT NOT NULL,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO user (username, password) VALUES ('admin', 'admin');