"use strict";

let carInventory = require('./carLot'),
    eventStuff = require('./events'),
    Handlebars = require('hbsfy/runtime'),
    carTemplate = require('../templates/car-grid.hbs');

Handlebars.registerPartial("navbar", require('../templates/partials/nav-bar.hbs'));

Handlebars.registerHelper("increment", (value) => parseInt(value) + 1);

function populatePage (inventory) {
  // Make a new div to stick the rendered html into
  let newDiv = document.createElement("div");
  newDiv.innerHTML = carTemplate(inventory);
  $("#inventory-cards").append(newDiv);

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
