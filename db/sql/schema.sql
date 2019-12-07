CREATE TABLE Users (
    user_id INT NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    PRIMARY KEY (user_id)
);

CREATE TABLE Product (
    product_id INT NOT NULL,
    brand VARCHAR(255),
    model VARCHAR(255),
    price FLOAT,
    scale FLOAT,
    weight FLOAT,
    PRIMARY KEY (product_id)
);

CREATE TABLE Warehouse (
    warehouse_id INT NOT NULL,
    product_id INT NOT NULL,
    region VARCHAR(255),
    stock_level INT,
    shelf_number INT,
    PRIMARY KEY (warehouse_id),
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
);

CREATE TABLE Orders (
    order_id INT NOT NULL,
    user_id INT NOT NULL,
    is_payed BIT NOT NULL DEFAULT(0),
    date_ordered DATE,
    date_sent DATE,
    country VARCHAR(255),
    postal_code INT,
    post_office VARCHAR(255),
    street_address VARCHAR(255),
    street_number INT,
    additional_info VARCHAR(255),
    PRIMARY KEY (order_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Order_has_product (
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    order_count INT,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
);