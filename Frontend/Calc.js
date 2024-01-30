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

// Function to calculate the minimum products per day
function calculateMinProductsPerDay(costPrice, shipping, chargeKlarna, adsDay, salePrice) {

    // Convert percentages to decimal
    let momsPercent = 25.0 / 100; // 25% moms
    let klarnaAvgiftPercent = 2.99 / 100; // Convert percentage to decimal

    // Calculate cost without VAT
    let costWithoutVAT = costPrice / (1 + momsPercent);

    // Calculate revenue without VAT
    let revenueWithoutVAT = salePrice / (1 + momsPercent);

    // Calculate profit without VAT
    let profitWithoutVAT = revenueWithoutVAT - costWithoutVAT;

    // Calculate Klarna fee
    let klarnaFee = (salePrice * klarnaAvgiftPercent) + 3.50;

    // Calculate profit including Klarna fee
    let profitWithKlarna = profitWithoutVAT - klarnaFee;

    // Tax rate (40% tax)
   let taxRate = 40.0 / 100; // 40% tax

    // Calculate tax
    let tax = profitWithKlarna * taxRate;

    // Calculate number of products needed to break even
    let productsForBreakEven = Math.ceil(adsDay / profitWithKlarna);

    // Calculate total profit after marketing
    /*let totalProfitAfterMarketing = Math.ceil(productsForBreakEven * profitWithKlarna - adsDay);
*/

   /* let profit = salePrice - costPrice;
    let totalProfitAfterMarketing = Math.ceil(adsDay / profit);
    
*/

// Convert the number to a string and append "st"
let result = productsForBreakEven.toString() + "st";
    // Return the result
    return result;

    
}


function calculateMinSalesValue( costPrice, shipping, chargeKlarna, adsDay, salePrice, productsForBreakEven) {

    // Calculate the minimum sales value
    let minSalesValue = calculateMinProductsPerDay * salePrice;

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
    let ProductResult = calculateMinProductsPerDay(costPriceValue, shippingValue, chargeKlarnaValue, adsDayValue, salePriceValue);
    let SaleResult = calculateMinSalesValue(costPriceValue, shippingValue, chargeKlarnaValue, adsDayValue, salePriceValue);
    // Set the value of the output field
    MinProductCalc.innerText = ProductResult;
    MinSaleCalc.innerText = SaleResult;
}

/*
}


}

// Select the input fields
// Select the output fields
let minProductCalc = document.getElementById('MinProductCalc');
let profitDayCalc = document.getElementById('Profit/dayCalc');
let profitMonthCalc = document.getElementById('Profit/monthCalc');
let profitProductCalc = document.getElementById('Profit/productCalc');
let vatProductCalc = document.getElementById('Vat/productCalc');
let chargesMonthCalc = document.getElementById('Charges/monthCalc');
let taxProductCalc = document.getElementById('Tax/productCalc');
let monthlyCostCalc = document.getElementById('MonthlyCostCalc');


// Select the output field and the button
let outputField = document.getElementById('MinProductCalc');
let calculateButton = document.getElementById('calculateButton');

// Event listener for the button
calculateButton.addEventListener('click', calculateAndDisplay);







// Function to calculate and display the result
function calculateAndDisplay() {
    // Get the values of the input fields
    let costPriceValue = parseFloat(costPrice.value);
    let shippingValue = parseFloat(shipping.value);
    let chargeKlarnaValue = parseFloat(chargeKlarna.value);
    let adsDayValue = parseFloat(adsDay.value);
    let salePriceValue = parseFloat(salePrice.value);

    // Call the function with the input values
    let result = calculateMinProductsPerDay(costPriceValue, shippingValue, chargeKlarnaValue, adsDayValue, salePriceValue);

 
// Set the value of the output fields
minProductCalc.innerText = result;
profitDayCalc.innerText = profitDay;
profitMonthCalc.innerText = profitMonth;
profitProductCalc.innerText = profitProduct;
vatProductCalc.innerText = vatProduct;
chargesMonthCalc.innerText = chargesMonth;
taxProductCalc.innerText = taxProduct;
monthlyCostCalc.innerText = monthlyCost;


}





// Add event listeners to the input fields
costPrice.addEventListener('change', calculateAndDisplay);
shipping.addEventListener('change', calculateAndDisplay);
chargeKlarna.addEventListener('change', calculateAndDisplay);
adsDay.addEventListener('change', calculateAndDisplay);
salePrice.addEventListener('change', calculateAndDisplay);



function calculateMinProductsPerDay(costPrice, shipping, chargeKlarna, adsDay, salePrice) {
    // Convert percentages to decimal
    let momsPercent = 25.0 / 100; // 25% moms
    let klarnaAvgiftPercent = 2.99 / 100; // Convert percentage to decimal

    // Calculate cost without VAT
    let costWithoutVAT = costPrice / (1 + momsPercent);

    // Calculate revenue without VAT
    let revenueWithoutVAT = salePrice / (1 + momsPercent);

    // Calculate profit without VAT
    let profitWithoutVAT = revenueWithoutVAT - costWithoutVAT;

    // Calculate Klarna fee
    let klarnaFee = (salePrice * klarnaAvgiftPercent) + 3.50;

    // Calculate profit including Klarna fee
    let profitWithKlarna = profitWithoutVAT - klarnaFee;

    // Tax rate (40% tax)
    let taxRate = 40.0 / 100; // 40% tax

    // Calculate tax
    let tax = revenueWithoutVAT * taxRate;

    // Calculate number of products needed to break even
    let productsForBreakEven = Math.ceil(adsDay / profitWithKlarna);

    // Calculate total profit after marketing
    let totalProfitAfterMarketing = productsForBreakEven * profitWithKlarna - adsDay;


}
*/
