//.. Require ..//
let inquirer = require('inquirer');
let mysql = require('mysql');
//... Create a connection to the  SQL database ..//
let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '@Rebirth03',
    database: 'Bamazon'
});

//.. Connect to server and database ..//
connection.connect(function(error) {
    if (error){
        console.log(error);
    }
    displayInventory();
});

//.. Create the Function that will display the table created using SQL ..//
function displayInventory(){
    connection.query('SELECT * FROM products', function(error, response) {
        if (error) {
            console.log(error);
        } else {
            for (let i = 0; i < response.length; i++){
                console.log('---------------------');
                console.log('Item #: ' + response[i].item_id);
                console.log('Item: ' + response[i].product_name);
                console.log('Department: ' + response[i].department_name);
                console.log('Price: ' + response[i].price);
                console.log('Stock: ' + response[i].in_stock);
            }
            askUser();
        }
    });
};

//..This function will prompt the user to choose an item and purchase quantity
function askUser() {
    inquirer.prompt([{
        type: 'input',
        name: 'item_id',
        message: 'Use your items ID number to identify the product you want to purchase',
        choice: function () {
            let choiceArray = [];
            for (let i = 0; i < response.length; i++){
                choiceArray.push(results[i].item_id);
            }
            return choiceArray;
        }
    },
    {
        type: 'input',
        name: 'amount',
        message: 'How many are you purchasing?',
        filter: Number   
    }
]).then(function(answer) {
    
    let itemPicked = input.item_id;
    let amount = input.amount;
    let query = 'SELECT * FROM products WHERE = ?';
    connection.query(query, {item_id: answer.product_name}, function(error,response){
        if (error) throw error;
        let available = response[0].in_stock;
        let cost = response[0].price;
        let pick = response[0].item_id;
        if (available >= answer.amount) {
            completePurchase(in_stock,price,answer.item_id, answer.amount);
        } else console.log('Sorry, we are out of stock!');
    });
    let completePurchase = function(in_stock, item_id,){
        let updateInventory = in_stock - amount;
        let purchasePrice = price * amount;
        let query = 'UPDATE products SET ? WHERE ?';
        connection.query(query, [{
            in_stock: updateInventory,
            item_id: itemPicked,
        }], function(error, response) {
            if (error) throw error;
            console.log('We are all set!');
            console.log('You have me charged for the amount of' + purchasePrice);
        });
    };
});
};





















/* A. function askUser(){}; 
    // a. function checkInventory();
        `if there isnt enough prevent order and ALERT
        `if there is next function runs 
    // b. function placeBid();
            `which item 
            `how many
    // c. function checkBid();
            `if the bid is higher than the last
            `run updateInventory, and ALERT customer cost 
            `else terminate transaction
    d. function updateInventory(){};
    */