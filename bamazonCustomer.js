let inquirer = require('inquirer');
let table = require('cli-table2');
let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@Rebirth03',
    database: 'bamazon_db',
    port: 3306
});
connection.connect(function(error){
    if (error) {
        console.log(error);
    }
    display();
});

let display = function() {
    connection.query('SELECT * FROM products', function(error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log('-----------------------------');
            console.log('-----------------------------');
            console.log(' Welcome to Bamazon!!');
            console.log('------------------------------');
            console.log('Feel free to browse through our inventory!');
            var Table = require('cli-table2');
 
// instantiate
var table = new Table({
    head: ['Id','Description','Department','Cost','Available'],
    colWidths: [10,15,15,7,7],
    colAligns: ['center','left','right'],
    style: {
        head: ['aqua'],
        compact: true
    }
});
        }
        for (let i = 0; i < response.length; i++){
            table.push([
        (response[i].item_id),
        (response[i].product_name),
        (response[i].department_name),
        (response[i].price),
        (response[i].in_stock),])
        }
        console.log(table.toString());
        shop();
    });
};

//..
let shop = function(){
    inquirer.prompt({
        name: 'item_id',
        type: 'input',
        message: 'What item would you like to purchase?'
    }).then(function(answer1) {
        let selection = answer1.item_id;
        connection.query('SELECT * FROM products WHERE item_id = ?', selection, function(error,response) {
            if (error){
                console.log(error);
            }
            if (response === 0) {
                console.log('Use your items Id to select it');
                shop();
            }
            else {
                inquirer.prompt({
                    name: 'quantity',
                    type: 'input',
                    message: 'How many are you purchasing?'
                }).then(function(answer2) {
                    let quantity = answer2.quantity;
                    if (quantity > response[0].in_stock) {
                        console.log('We apologize but it looks like we only have ' + response[0].in_stock + ' available');
                        shop();
                    }
                    else {
                        console.log('Your purchase: ' + response[0].product_name);
                        console.log('Your total is: ' + quantity * response[0].price);
                        let newStock = response[0].in_stock - quantity;
                        connection.query('UPDATE products SET in_stock = ?', newStock,/* 'WHERE item_id = ?', response[0].item_id,*/ function(error, response) {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                console.log('Your order has been processed');
                                console.log('Thank you for choosing Bamazon');
                                connection.end();
                            }
                        })
                    }
                });
            }
        });
    });
};
