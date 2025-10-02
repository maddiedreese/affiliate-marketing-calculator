// Simple test file to verify calculator logic
// Run with: node test/calculator.test.js

// Test calculation functions
function calculateEarnings(price, percentage, quantity = 1) {
  const singleItemEarning = (price * percentage) / 100;
  const totalEarnings = singleItemEarning * quantity;
  return { singleItemEarning, totalEarnings };
}

function calculateItemsNeeded(targetIncome, price, percentage) {
  const singleItemEarning = (price * percentage) / 100;
  const itemsNeeded = Math.ceil(targetIncome / singleItemEarning);
  return { singleItemEarning, itemsNeeded };
}

// Test cases
function runTests() {
  console.log('🧪 Running Affiliate Calculator Tests...\n');

  // Test 1: Basic earnings calculation
  const test1 = calculateEarnings(100, 10, 5); // $100 item, 10% commission, 5 sales
  console.log('Test 1 - Basic Earnings:');
  console.log(`  Item Price: $100, Commission: 10%, Quantity: 5`);
  console.log(`  Per Item: $${test1.singleItemEarning}, Total: $${test1.totalEarnings}`);
  console.log(`  Expected: $10 per item, $50 total`);
  console.log(`  ✅ ${test1.singleItemEarning === 10 && test1.totalEarnings === 50 ? 'PASS' : 'FAIL'}\n`);

  // Test 2: Items needed calculation
  const test2 = calculateItemsNeeded(1000, 50, 20); // $1000 target, $50 item, 20% commission
  console.log('Test 2 - Items Needed:');
  console.log(`  Target: $1000, Item Price: $50, Commission: 20%`);
  console.log(`  Per Item: $${test2.singleItemEarning}, Items Needed: ${test2.itemsNeeded}`);
  console.log(`  Expected: $10 per item, 100 items needed`);
  console.log(`  ✅ ${test2.singleItemEarning === 10 && test2.itemsNeeded === 100 ? 'PASS' : 'FAIL'}\n`);

  // Test 3: Decimal calculations
  const test3 = calculateEarnings(99.99, 15.5, 3); // $99.99 item, 15.5% commission, 3 sales
  console.log('Test 3 - Decimal Calculations:');
  console.log(`  Item Price: $99.99, Commission: 15.5%, Quantity: 3`);
  console.log(`  Per Item: $${test3.singleItemEarning.toFixed(2)}, Total: $${test3.totalEarnings.toFixed(2)}`);
  console.log(`  Expected: $15.50 per item, $46.49 total`);
  console.log(`  ✅ ${Math.abs(test3.singleItemEarning - 15.49845) < 0.01 && Math.abs(test3.totalEarnings - 46.49535) < 0.01 ? 'PASS' : 'FAIL'}\n`);

  // Test 4: Edge case - very small commission
  const test4 = calculateEarnings(1000, 0.1, 1); // $1000 item, 0.1% commission, 1 sale
  console.log('Test 4 - Small Commission:');
  console.log(`  Item Price: $1000, Commission: 0.1%, Quantity: 1`);
  console.log(`  Per Item: $${test4.singleItemEarning}, Total: $${test4.totalEarnings}`);
  console.log(`  Expected: $1 per item, $1 total`);
  console.log(`  ✅ ${test4.singleItemEarning === 1 && test4.totalEarnings === 1 ? 'PASS' : 'FAIL'}\n`);

  // Test 5: High commission
  const test5 = calculateEarnings(100, 50, 2); // $100 item, 50% commission, 2 sales
  console.log('Test 5 - High Commission:');
  console.log(`  Item Price: $100, Commission: 50%, Quantity: 2`);
  console.log(`  Per Item: $${test5.singleItemEarning}, Total: $${test5.totalEarnings}`);
  console.log(`  Expected: $50 per item, $100 total`);
  console.log(`  ✅ ${test5.singleItemEarning === 50 && test5.totalEarnings === 100 ? 'PASS' : 'FAIL'}\n`);

  console.log('🎉 All tests completed!');
}

// Run the tests
runTests();
