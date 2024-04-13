const { JSDOM } = require('jsdom');
const { calculateProfit } = require('../calc');

// Skapa en falsk DOM-miljö
const dom = new JSDOM('<!DOCTYPE html><div id="CostPrice"></div><div id="SalePrice"></div><div id="Shipping"></div><div id="WishedProfit"></div>');

// Tilldela window och document till globala variabler i Node.js-miljön
global.window = dom.window;
global.document = dom.window.document;

test('calculateProfit calculates profit correctly', () => {
  // Arrange
  const salePrice = 200;
  const costPrice = 100;
  const shipping = 30;
  const expectedProfit = 130; // (200 + 30) - 100 = 130

  // Act
  const actualProfit = calculateProfit(salePrice, costPrice, shipping);

  // Assert
  expect(actualProfit).toBe(expectedProfit);
});
