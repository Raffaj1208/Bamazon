   CREATE DATABASE Bamazon;

   USE Bamazon;
   
   CREATE TABLE products (
       item_id INTEGER NOT NULL,
       product_name VARCHAR(20) NOT NULL,
       department_name VARCHAR(20) NOT NULL,
       price INTEGER NOT NULL,
       in_stock INTEGER NOT NULL,
       PRIMARY KEY (item_id)
   );
