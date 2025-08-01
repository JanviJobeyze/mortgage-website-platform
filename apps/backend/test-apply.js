const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Test the /api/apply endpoint
async function testApplyEndpoint() {
  try {
    const formData = new FormData();
    
    // Add form fields
    formData.append('firstName', 'John');
    formData.append('lastName', 'Doe');
    formData.append('email', 'john.doe@example.com');
    formData.append('phone', '+1-555-123-4567');
    formData.append('propertyValue', '$500,000');
    formData.append('propertyType', 'residential');
    formData.append('employmentStatus', 'employed');
    formData.append('annualIncome', '$75,000');
    formData.append('downPayment', '$50,000');
    formData.append('loanAmount', '$450,000');
    
    // Add a test file (if you have one)
    // formData.append('identification', fs.createReadStream('./test-file.pdf'));
    
    console.log('Testing /api/apply endpoint...');
    console.log('Form data:', {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1-555-123-4567',
      propertyValue: '$500,000',
      propertyType: 'residential',
      employmentStatus: 'employed',
      annualIncome: '$75,000',
      downPayment: '$50,000',
      loanAmount: '$450,000'
    });
    
    const response = await fetch('http://localhost:5000/api/apply', {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders()
    });
    
    const result = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response:', result);
    
    if (result.success) {
      console.log('✅ Test passed! Application submitted successfully.');
    } else {
      console.log('❌ Test failed:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Test error:', error.message);
  }
}

// Test the rates endpoint as well
async function testRatesEndpoint() {
  try {
    console.log('\nTesting /api/rates endpoint...');
    
    const response = await fetch('http://localhost:5000/api/rates');
    const result = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Rates count:', result.data?.length || 0);
    
    if (result.success) {
      console.log('✅ Rates endpoint working!');
    } else {
      console.log('❌ Rates endpoint failed:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Rates test error:', error.message);
  }
}

// Run tests
async function runTests() {
  console.log('🚀 Starting API tests...\n');
  
  await testRatesEndpoint();
  await testApplyEndpoint();
  
  console.log('\n🏁 Tests completed!');
}

runTests(); 