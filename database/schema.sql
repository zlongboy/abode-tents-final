CREATE TABLE products (
    sku char(36),
    active tinyint,
    featured tinyint,
    brand varchar(255),
    name varchar(255),
    images json,
    url varchar(2000),
    price decimal(10,2),
    capacity int,
    season varchar(45),
    weight int,
    floor_area int,
    color varchar(45),
    score int,
    highlights json,
    keywords json,
PRIMARY KEY (sku))
;