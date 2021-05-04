CREATE TABLE product (
    id INT AUTO_INCREMENT NOT NULL,
    brand VARCHAR(20) NOT NULL,
    name VARCHAR(20) NOT NULL,
    price INT NOT NULL,
    color VARCHAR(20) NOT NULL,
    system VARCHAR(10) NOT NULL,
    memory INT NOT NULL,
    short_description TEXT NOT NULL,
    long_description TEXT NOT NULL,
    image VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE user (
    id INT AUTO_INCREMENT NOT NULL,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO user (username, password) VALUES ('admin', 'admin');

INSERT INTO product (name, description, price, brand, category, image) VALUES ('iPhone 12', 'This is a kind of phone', '12000', 'Apple', 'Phone', 'default-product-pic.png');
INSERT INTO product (name, description, price, brand, category, image) VALUES ('OnePlus 8 Pro', 'This is a kind of phone', '8999', 'OnePlus', 'Phone', 'default-product-pic.png');
INSERT INTO product (name, description, price, brand, category, image) VALUES ('OMEN by HP 17,3"', 'This is a laptop', '14000', 'HP', 'Laptop', 'default-product-pic.png');
