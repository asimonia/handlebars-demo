"use strict";

let carInventory = require('./carLot'),
    eventStuff = require('./events'),
    Handlebars = require('hbsfy/runtime'),
    carTemplate = require('../templates/car-grid.hbs');

function populatePage (inventory) {
  // Grab the div we want to apppend the cards to
  let cards = document.getElementById("inventory-cards");
  

  let cardDiv = document.createElement("div"); 
  cardDiv.innerHTML = (carTemplate(inventory));
  cards.appendChild(cardDiv);

  // Now that the DOM is loaded, establish all the event listeners needed
  eventStuff();
}

// The Promises Way puts the callback responsibility on the caller
carInventory.loadInventory()
.then(
  function (inventoryFromLoadInventoryResolve) {
    populatePage(inventoryFromLoadInventoryResolve);
    console.log("carPromise", inventoryFromLoadInventoryResolve);
  },
  function (reason) {
    console.error('Something went wrong', reason);
  });
