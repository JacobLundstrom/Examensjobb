//#region Get the input fields
let costPrice = document.getElementById('CostPrice');
let salePrice = document.getElementById('SalePrice');
let shipping = document.getElementById('Shipping');
let adsDay = document.getElementById('Ads-Day');
let totalSale = document.getElementById('TotalSale');
let totalAd = document.getElementById('TotalAd');
let accountantCost = document.getElementById('AccountantCost');
let shopifyCost = document.getElementById('ShopifyCost');
let bankCost = document.getElementById('BankCost');
let bookkeepingCost = document.getElementById('BookKeepingCost');
let otherCost = document.getElementById('OtherCost');
//#endregion

//#region Select the output field
let MinProductCalc = document.getElementById('MinProductCalc');
let MinSaleCalc = document.getElementById('MinSaleCalc');
let ProfitProductCalc = document.getElementById('ProfitProductCalc'); // Output field for profit per product
let ProfitDayCalc = document.getElementById('ProfitDayCalc'); // Output field for daily profit
let ProfitMonthCalc = document.getElementById('ProfitMonthCalc'); // Output field for monthly profit
let MomsProductCalc = document.getElementById('MomsProductCalc'); // Output field for moms per product
let ChargesMonthCalc = document.getElementById('ChargesMonthCalc');
//#endregion

// Utility function to calculate profit
function calculateProfit(salePrice, costPrice, shipping) {
    if (!isNaN(shipping) && shipping !==  0) {
        return (salePrice + shipping) - costPrice;
    } else {
        return salePrice - costPrice;
    }
}

// Utility function to calculate Klarna fee
function calculateKlarnaFee(salePrice) {
    return (salePrice *  0.0299) +  3.50;
}

// Utility function to calculate profit including Klarna fee
function calculateProfitWithKlarna(profit, klarnaFee) {
    return profit - klarnaFee;
}

// Utility function to calculate the number of products needed to break even
function calculateProductsForBreakEven(dailyExpenses, profitWithKlarna) {
    return Math.ceil(dailyExpenses / profitWithKlarna);
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

// Function to calculate VAT
function calculateVAT(salePrice) {
    // Calculate the VAT for the product
    let momsAmount = salePrice /  1.25;
    return momsAmount;
}

// Function to calculate the minimum products per day
function calculateMinProductsPerDay(costPrice, shipping, salePrice) {
    let profit = calculateProfit(salePrice, costPrice, shipping);
    let klarnaFee = calculateKlarnaFee(salePrice);
    let profitWithKlarna = calculateProfitWithKlarna(profit, klarnaFee);
    
    // Calculate the daily portion of the monthly costs
    let dailyMonthlyCharges = calculateTotalMonthlyCharges() /  30;
    
    // Calculate the total daily expenses
    let totalDailyExpenses = dailyMonthlyCharges + parseFloat(adsDay.value);
    
    // Calculate the number of products needed to cover the total daily expenses
    let productsForBreakEven = calculateProductsForBreakEven(totalDailyExpenses, profitWithKlarna);
    
    return { productsForBreakEven, profitWithKlarna };
}

// Function to calculate the minimum sales value per day
function calculateMinSalesValue(totalDailyExpenses, salePrice, profitWithKlarna) {
    // Calculate the number of products needed to cover the total daily expenses
    let actualProductsNeeded = totalDailyExpenses / profitWithKlarna;
    
    // Calculate the minimum sales value
    let minSalesValue = actualProductsNeeded * salePrice;

    console.log("actualminproducts:", actualProductsNeeded);
    console.log("totaldailyexpenses:", totalDailyExpenses);
    console.log("profitwithklarna:", profitWithKlarna);
    return minSalesValue;
}

// Function to calculate the total monthly charges
function calculateTotalMonthlyCharges() {
    let accountantCostValue = parseFloat(accountantCost.value) ||  0;
    let shopifyCostValue = parseFloat(shopifyCost.value) ||   0;
    let bankCostValue = parseFloat(bankCost.value) ||   0;
    let bookkeepingCostValue = parseFloat(bookkeepingCost.value) ||   0;
    let otherCostValue = parseFloat(otherCost.value) ||   0;

    let totalMonthlyCharges = accountantCostValue + shopifyCostValue + bankCostValue + bookkeepingCostValue + otherCostValue;
    return totalMonthlyCharges;
}



// Function to calculate and display the result
function calculateAndDisplay() {
    let costPriceValue = parseFloat(costPrice.value);
    let shippingValue = parseFloat(shipping.value);
    let salePriceValue = parseFloat(salePrice.value);
    let totalSaleValue = parseFloat(totalSale.value);
    let totalAdValue = parseFloat(totalAd.value);


    let profit = calculateProfit(salePriceValue, costPriceValue, shippingValue);
    let klarnaFee = calculateKlarnaFee(salePriceValue);
    let profitWithKlarna = calculateProfitWithKlarna(profit, klarnaFee);
    
    // Calculate the daily portion of the monthly costs
    let dailyMonthlyCharges = calculateTotalMonthlyCharges() /   30;
    
    // Calculate the total daily expenses
    let totalDailyExpenses = dailyMonthlyCharges + parseFloat(adsDay.value);
    
    // Calculate the minimum products per day and minimum sales value per day
    let productsForBreakEven = calculateProductsForBreakEven(totalDailyExpenses, profitWithKlarna);
    let minSalesValue = calculateMinSalesValue(totalDailyExpenses, salePriceValue, profitWithKlarna);
    
    let momsValue = calculateVAT(salePriceValue);
    let totalMonthlyCharges = calculateTotalMonthlyCharges();

    // Calculate the total sales with shipping (if applicable)
    let totalSalesWithShipping = calculateTotalSalesWithShipping(totalSaleValue, shippingValue);

    // Calculate the monthly profit with Klarna fees
    let monthlyProfit = calculateMonthlyProfitWithKlarna(totalSalesWithShipping, totalAdValue, klarnaFee);

    // Calculate the daily profit
    let daysInMonth =   30;   
    let dailyProfit = calculateDailyProfit(monthlyProfit, daysInMonth);



    // Format the results with NaN handling to 0 instead
    let resultProduct = isNaN(productsForBreakEven) ? "0 st" : productsForBreakEven.toString() + " st";
    let minSale = isNaN(minSalesValue) ? "0 kr" : minSalesValue.toFixed(2) + " kr";
    let ProfitPerProduct = isNaN(profitWithKlarna) ? "0 kr" : profitWithKlarna.toFixed(2) + " kr";
    let ProfitPerDay = isNaN(dailyProfit) ? "0 kr" : dailyProfit.toFixed(2) + " kr";
    let ProfitPerMonth = isNaN(monthlyProfit) ? "0 kr" : monthlyProfit.toFixed(2) + " kr";
    let MomsPerProduct = isNaN(momsValue) ? "0 kr" : momsValue.toFixed(2) + " kr";
    let totalMonthlyChargesFormatted = isNaN(totalMonthlyCharges) ? "0 kr" : totalMonthlyCharges.toFixed(2) + " kr";


    // Display the result in the output field
    ProfitProductCalc.innerText = ProfitPerProduct;
    MinProductCalc.innerText = resultProduct;
    MinSaleCalc.innerText = minSale;
    ProfitDayCalc.innerText = ProfitPerDay;
    ProfitMonthCalc.innerText = ProfitPerMonth;
    MomsProductCalc.innerText = MomsPerProduct;
    ChargesMonthCalc.innerText = totalMonthlyChargesFormatted;

    // Log to the console for debugging

    console.log("Profit Per Product:", ProfitPerProduct);
    console.log("daily expenses:", totalDailyExpenses);
    console.log("Profit with Klarna:", profitWithKlarna);
    console.log("daily Monthly Charges:", dailyMonthlyCharges);
    console.log("Minimum Products Per Day:", resultProduct);
    console.log("Minimum Sales Value:", minSale);
    console.log("Daily Profit:", ProfitPerDay);
    console.log("Monthly Profit:", ProfitPerMonth);
    console.log("Moms Per Product:", MomsPerProduct);
    console.log("Monthly Charges:", totalMonthlyChargesFormatted);
    console.log("min Sales Value:", minSalesValue);
}

// Event listeners to trigger the calculation when input values change
costPrice.addEventListener('change', calculateAndDisplay);
salePrice.addEventListener('change', calculateAndDisplay);
shipping.addEventListener('change', calculateAndDisplay);
adsDay.addEventListener('change', calculateAndDisplay);
totalSale.addEventListener('change', calculateAndDisplay);
totalAd.addEventListener('change', calculateAndDisplay);
accountantCost.addEventListener('change', calculateAndDisplay);
shopifyCost.addEventListener('change', calculateAndDisplay);
bankCost.addEventListener('change', calculateAndDisplay);
bookkeepingCost.addEventListener('change', calculateAndDisplay);
otherCost.addEventListener('change', calculateAndDisplay);

// Initial calculation
calculateAndDisplay();

