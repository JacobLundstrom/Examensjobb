let costPrice = document.getElementById('CostPrice');
let salePrice = document.getElementById('SalePrice');
let shipping = document.getElementById('Shipping');
let chargeKlarna = document.getElementById('ChargeKlarna');
let adsDay = document.getElementById('Ads-Day');
let totalSale = document.getElementById('TotalSale');
let totalAd = document.getElementById('TotalAd');
let accountant = document.getElementById('Accountant');
let shopifyCost = document.getElementById('ShopifyCost');
let bankCost = document.getElementById('BankCost');
let tax = document.getElementById('Tax');
let otherCost = document.getElementById('OtherCost');

// Select the output field
let MinProductCalc = document.getElementById('MinProductCalc');
let MinSaleCalc = document.getElementById('MinSaleCalc');

// Add event listener to the input fields
costPrice.addEventListener('change', calculateAndDisplay);
salePrice.addEventListener('change', calculateAndDisplay);
shipping.addEventListener('change', calculateAndDisplay);
chargeKlarna.addEventListener('change', calculateAndDisplay);
adsDay.addEventListener('change', calculateAndDisplay);
totalSale.addEventListener('change', calculateAndDisplay);
totalAd.addEventListener('change', calculateAndDisplay);
accountant.addEventListener('change', calculateAndDisplay);
shopifyCost.addEventListener('change', calculateAndDisplay);
bankCost.addEventListener('change', calculateAndDisplay);
tax.addEventListener('change', calculateAndDisplay);
otherCost.addEventListener('change', calculateAndDisplay);



/*

function percentageToDecimal(percentage) {
    return percentage / 100;
}

function calculateCostWithoutVAT(costPrice, momsPercent) {
    return costPrice / (1 + momsPercent);
}

// Utility function to calculate revenue without VAT
function calculateRevenueWithoutVAT(salePrice, momsPercent) {
    return salePrice / (1 + momsPercent);
}

// Utility function to calculate profit without VAT
function calculateProfitWithoutVAT(revenueWithoutVAT, costWithoutVAT) {
    return revenueWithoutVAT - costWithoutVAT;
}
*/
// Utility function to calculate profit
function calculateProfit(salePrice, costPrice) {
    return salePrice - costPrice;
}

// Utility function to calculate Klarna fee
function calculateKlarnaFee(salePrice) {
    return (salePrice * 0.0299) + 3.50;}

// Utility function to calculate profit including Klarna fee
function calculateProfitWithKlarna(profit, klarnaFee) {
    return profit - klarnaFee;
}

// Utility function to calculate the number of products needed to break even
function calculateProductsForBreakEven(adsDay, profitWithKlarna) {
    return Math.ceil(adsDay / profitWithKlarna);
}

// Global variable to store the actual number of products needed to break even
 function calculateActualProductsNeeded(adsDay, profitWithKlarna) {
   return adsDay / profitWithKlarna;  
 }


// Function to calculate the minimum products per day
function calculateMinProductsPerDay(costPrice, shipping, chargeKlarna, adsDay, salePrice) {
    // Calculate profit
    let profit = calculateProfit(salePrice, costPrice);

    // Calculate Klarna fee
    let klarnaFee = calculateKlarnaFee(salePrice, chargeKlarna);

    // Calculate profit including Klarna fee
    let profitWithKlarna = calculateProfitWithKlarna(profit, klarnaFee);

    // Calculate the actual number of products needed to break even
    let productsForBreakEven = calculateProductsForBreakEven(adsDay, profitWithKlarna);

    // Return the number of products and profit with Klarna
    return { productsForBreakEven, profitWithKlarna };
}

// Function to calculate the minimum sales value per day
function calculateMinSalesValue(adsDay, salePrice, profitWithKlarna) {
    // Calculate the actual number of products needed to break even without rounding up
    let actualProductsNeeded = adsDay / profitWithKlarna;

    // Calculate the minimum sales value needed to cover all costs
    let minSalesValue = actualProductsNeeded * salePrice;

    // Return the minimum sales value
    return minSalesValue;
}


// Function to calculate and display the result
function calculateAndDisplay() {

    // Get the values of the input fields
    let costPriceValue = parseFloat(costPrice.value);
    let shippingValue = parseFloat(shipping.value);
    let chargeKlarnaValue = parseFloat(chargeKlarna.value);
    let adsDayValue = parseFloat(adsDay.value);
    let salePriceValue = parseFloat(salePrice.value);

    // Call the function with the input values
    let { productsForBreakEven, profitWithKlarna } = calculateMinProductsPerDay(costPriceValue, shippingValue, chargeKlarnaValue, adsDayValue, salePriceValue);
    let minSalesValue = calculateMinSalesValue(adsDayValue, salePriceValue, profitWithKlarna);

    let resultProduct = productsForBreakEven.toString() + "st";
    let minSale = minSalesValue.toFixed(2) + "kr";

    // Set the value of the output field
    MinProductCalc.innerText = resultProduct;
    MinSaleCalc.innerText = minSale;



    //is github updated?
}