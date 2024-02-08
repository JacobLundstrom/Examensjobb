//#region Get the input fields
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
//#endregion

//#region Select the output field
let MinProductCalc = document.getElementById('MinProductCalc');
let MinSaleCalc = document.getElementById('MinSaleCalc');
let ProfitProductCalc = document.getElementById('ProfitProductCalc'); // Output field for profit per product
//#endregion

//#region Calculate and display functions
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
//#endregion

// Utility function to calculate profit
function calculateProfit(salePrice, costPrice, shipping) {
    if (!isNaN(shipping) && shipping !==   0) {
        return (salePrice + shipping) - costPrice;
    } else {
        return salePrice - costPrice;
    }
}

// Utility function to calculate Klarna fee
function calculateKlarnaFee(salePrice) {
    return (salePrice *   0.0299) +   3.50;
}

// Utility function to calculate profit including Klarna fee
function calculateProfitWithKlarna(profit, klarnaFee) {
    return profit - klarnaFee;
}

// Utility function to calculate the number of products needed to break even
function calculateProductsForBreakEven(adsDay, profitWithKlarna) {
    return Math.ceil(adsDay / profitWithKlarna);
}

// Utility function to calculate total sales with shipping
function calculateTotalSalesWithShipping(salePrice, shipping) {
    return salePrice + shipping;
}

// Utility function to calculate monthly profit with Klarna fees
function calculateMonthlyProfitWithKlarna(totalSalesWithShipping, totalAdSpend, klarnaFee) {
    return totalSalesWithShipping - totalAdSpend - klarnaFee;
}

// Utility function to calculate daily profit
function calculateDailyProfit(monthlyProfit, daysInMonth) {
    return monthlyProfit / daysInMonth;
}

// Function to calculate the minimum products per day
function calculateMinProductsPerDay(costPrice, shipping, chargeKlarna, adsDay, salePrice) {
    let profit = calculateProfit(salePrice, costPrice, shipping);
    let klarnaFee = calculateKlarnaFee(salePrice);
    let profitWithKlarna = calculateProfitWithKlarna(profit, klarnaFee);
    let productsForBreakEven = calculateProductsForBreakEven(adsDay, profitWithKlarna);
    return { productsForBreakEven, profitWithKlarna };
}

// Function to calculate the minimum sales value per day
function calculateMinSalesValue(adsDay, salePrice, profitWithKlarna) {
    let actualProductsNeeded = adsDay / profitWithKlarna;
    let minSalesValue = actualProductsNeeded * salePrice;
    return minSalesValue;
}

// Function to calculate and display the result
function calculateAndDisplay() {
    let costPriceValue = parseFloat(costPrice.value);
    let shippingValue = parseFloat(shipping.value);
    let chargeKlarnaValue = parseFloat(chargeKlarna.value);
    let adsDayValue = parseFloat(adsDay.value);
    let salePriceValue = parseFloat(salePrice.value);

    
    let { productsForBreakEven, profitWithKlarna } = calculateMinProductsPerDay(costPriceValue, shippingValue, chargeKlarnaValue, adsDayValue, salePriceValue);
    let minSalesValue = calculateMinSalesValue(adsDayValue, salePriceValue, profitWithKlarna, shippingValue);
    let profitPerProduct = profitWithKlarna;
    

   //Format the results
    let resultProduct = productsForBreakEven.toString() + "st";
    let minSale = minSalesValue.toFixed(2) + " kr";
    let ProfitPerProduct = profitPerProduct.toFixed(2) + " kr";

    
    // Display the result in the output field
    ProfitProductCalc.innerText = ProfitPerProduct;
    MinProductCalc.innerText = resultProduct;
    MinSaleCalc.innerText = minSale;



    
    //#region Log to the console
    console.log("Cost Price:", costPriceValue);
    console.log("Sale Price:", salePriceValue);
    console.log("Shipping:", shippingValue);
    console.log("profit:", calculateProfit(salePriceValue, costPriceValue, shippingValue));
    console.log("klarna fee: ", calculateKlarnaFee(salePriceValue));
    console.log("profit with klarna: ", calculateProfitWithKlarna(calculateProfit(salePriceValue, costPriceValue, shippingValue), calculateKlarnaFee(salePriceValue)));
    console.log("products for break even: ", calculateProductsForBreakEven(adsDayValue, calculateProfitWithKlarna(calculateProfit(salePriceValue, costPriceValue, shippingValue), calculateKlarnaFee(salePriceValue))));
    console.log("actual products needed: ", calculateActualProductsNeeded(adsDayValue, calculateProfitWithKlarna(calculateProfit(salePriceValue, costPriceValue, shippingValue), calculateKlarnaFee(salePriceValue))));
    console.log("min sales value: ", calculateMinSalesValue(adsDayValue, salePriceValue, calculateProfitWithKlarna(calculateProfit(salePriceValue, costPriceValue, shippingValue))));
    console.log("min products per day: ", calculateMinProductsPerDay(costPriceValue, shippingValue, chargeKlarnaValue, adsDayValue, salePriceValue));
    console.log("products for break even: ", resultProduct);
    console.log("min sales value: ", minSale);
    //#endregion
}


calculateAndDisplay();
