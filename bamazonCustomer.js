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
        filter: Number
    },
    {
        type: 'input',
        name: 'amount',
        message: 'How many are you purchasing?',
        filter: Number   
    }
]).then(function(answer){
    //.. place order
});
}

















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
d. function updateInventory(){};*/