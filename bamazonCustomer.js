//.. Require ..//
let inquirer = require('inquirer');
let mysql = require('mysql');
let itemPick = process.argv[0];
let amountPurchase = process.argv[0];
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
function askUser()/*A*/{
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
        name: 'quantity',
        message: 'How many are you purchasing?',
        filter: Number   
    }
]).then(function(answer) {/* B */
    connection.query('SELECT * FROM products', function(error, response){/* C */
        if (error){
            console.log('Error.. Error.. Beep Boop Bap');
            return;
        } else {
            let chosenItem;
            for (let i = 0; i < results.length; i++) {
                if (results[i].item_id === answer.choice) {
                    chosenItem = results[i];
                    console.log("Is this working?");
                }console.log("Is this working?");
            }console.log("Is this working?");
        }console.log("Is this working?");
        
    /* C */});
/* B */ });
/*A*/};


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
