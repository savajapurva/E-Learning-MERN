// test_routes.js
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Test functions
async function testRoutes() {
    console.log('Testing API Routes...\n');

    try {
        // Test GET all categories
        console.log('1. Testing GET /api/categories');
        const categoriesResponse = await axios.get(`${BASE_URL}/categories`);
        console.log('✅ Categories fetched successfully');
        console.log(`Found ${categoriesResponse.data.data.length} categories\n`);

        // Test GET all courses
        console.log('2. Testing GET /api/courses');
        const coursesResponse = await axios.get(`${BASE_URL}/courses`);
        console.log('✅ Courses fetched successfully');
        console.log(`Found ${coursesResponse.data.data.length} courses\n`);

        // Test search functionality
        console.log('3. Testing GET /api/categories/search?query=test');
        const searchResponse = await axios.get(`${BASE_URL}/categories/search?query=test`);
        console.log('✅ Search completed successfully');
        console.log(`Found ${searchResponse.data.data.length} matching categories\n`);

    } catch (error) {
        console.error('❌ Error testing routes:', error.response?.data || error.message);
    }
}

// Test authentication routes
async function testAuth() {
    console.log('Testing Authentication Routes...\n');

    try {
        // Test user registration
        const newUser = {
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            password2: 'password123'
        };

        console.log('1. Testing POST /api/users/register');
        const registerResponse = await axios.post(`${BASE_URL}/users/register`, newUser);
        console.log('✅ User registration test completed\n');

    } catch (error) {
        if (error.response?.status === 400 && error.response.data.email === 'Email already exists') {
            console.log('✅ User already exists (expected behavior)\n');
        } else {
            console.error('❌ Error testing auth:', error.response?.data || error.message);
        }
    }
}

// Run tests
async function runAllTests() {
    await testRoutes();
    await testAuth();
    console.log('All tests completed!');
}

// Export for use in other files
module.exports = { testRoutes, testAuth, runAllTests };

// Run tests if file is executed directly
if (require.main === module) {
    runAllTests();
}