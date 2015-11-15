'use strict';

// Connect to the Bitfinex Exchange and build the order book in real-time
// by connecting to the Websocket API and filterging inital callback Data


var WebSocket = require('ws');

// clc is used to make the console log output colorful, for testing
var clc = require('cli-color');

// Run the book building function
bookBuilder();

function bookBuilder() {

   // Asign address for Bitfinex API Websocket
   var ws = new WebSocket('wss://api2.bitfinex.com:3000/ws');
   var book = [];
   var count;
   var price;
   var amount;

   // Open connection to Bitfinex BTCUSD order book Websocket
   ws.on('open', function open() {
      ws.send(JSON.stringify({
         "event": "subscribe",
         "channel": "book",
         "pair": "BTCUSD",
         "prec": "P0"
      }));
   });

   // Get data from Bitfinex, then build an orderbook Object 
   ws.on('message', function(data) {
      var data = JSON.parse(data);
      
      // bitcoin price
      var price = data[1];
      
      // number of orders at this price
      var count = data[2];
      
      // amount of BTC available at this price ( negative means Ask, positive Bid )
      var amount = data[3];

      if (!price) {} else {
         if (price === null) {} else {
            
            // To avoid adding inital book snapshot
            if (price.length > 10) {} else {
               
               // Remove empty orders
               if (count = 0) {
                  book.splice(price);
               } else {
                  book[price] = amount;
               }
            }
         }
      }
      console.log(book);
   });
};
