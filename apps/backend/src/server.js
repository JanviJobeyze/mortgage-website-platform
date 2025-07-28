const express = require('express');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(require('cors')());

// Mock mortgage rates data
const mortgageRates = [
  {
    id: 1,
    lender: { 
      name: 'RBC Royal Bank', 
      type: 'Major Bank',
      logo: 'RBC',           // ✅ Added
      color: 'bg-blue-600'   // ✅ Added
    },
    rate: 2.89,
    apr: 3.12,              // ✅ Added
    term: '5 Years',
    type: 'Fixed',
    purpose: 'Home Purchase',
    provinces: ['Ontario', 'Alberta', 'British Columbia'],
    change: -0.15,          // ✅ Added
    isTrending: 'down',     // ✅ Added
    features: ['No prepayment penalty', 'Cashback available', 'Portable mortgage'] // ✅ Added
  },
  {
    id: 2,
    lender: {
      name: 'First National',
      logo: 'FN',
      type: 'Monoline',
      color: 'bg-red-600'
    },
    rate: 2.79,
    apr: 3.05,
    term: '5 Years',
    type: 'Variable',
    change: 0.10,
    features: ['Prime - 1.35%', 'No frills mortgage', 'Flexible payments'],
    isTrending: 'up',
    provinces: ['All Provinces', 'Ontario', 'Manitoba', 'Saskatchewan'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 3,
    lender: {
      name: 'Scotiabank',
      logo: 'SC',
      type: 'Major Bank',
      color: 'bg-blue-800'
    },
    rate: 2.95,
    apr: 3.18,
    term: '5 Years',
    type: 'Fixed',
    change: -0.05,
    features: ['Prepayment privileges', 'Rate guarantee', 'Online banking'],
    isTrending: 'down',
    provinces: ['All Provinces', 'British Columbia', 'Alberta', 'Quebec'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 4,
    lender: {
      name: 'TD Canada Trust',
      logo: 'TD',
      type: 'Major Bank',
      color: 'bg-green-600'
    },
    rate: 2.99,
    apr: 3.22,
    term: '5 Years',
    type: 'Fixed',
    change: 0.00,
    features: ['Flexible payment options', 'Mobile app access', 'Branch support'],
    isTrending: 'stable',
    provinces: ['All Provinces', 'Ontario', 'Quebec', 'Nova Scotia'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 5,
    lender: {
      name: 'CIBC',
      logo: 'CIBC',
      type: 'Major Bank',
      color: 'bg-red-700'
    },
    rate: 3.05,
    apr: 3.28,
    term: '5 Years',
    type: 'Variable',
    change: 0.15,
    features: ['Prime - 1.25%', 'Online tools', '24/7 support'],
    isTrending: 'up',
    provinces: ['All Provinces', 'Ontario', 'Alberta', 'British Columbia'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 6,
    lender: {
      name: 'BMO',
      logo: 'BMO',
      type: 'Major Bank',
      color: 'bg-blue-500'
    },
    rate: 3.12,
    apr: 3.35,
    term: '5 Years',
    type: 'Fixed',
    change: -0.08,
    features: ['Prepayment options', 'Rate protection', 'Digital banking'],
    isTrending: 'down',
    provinces: ['All Provinces', 'Ontario', 'Quebec', 'Manitoba'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 7,
    lender: {
      name: 'National Bank',
      logo: 'NB',
      type: 'Major Bank',
      color: 'bg-purple-600'
    },
    rate: 2.85,
    apr: 3.08,
    term: '5 Years',
    type: 'Fixed',
    change: -0.20,
    features: ['Competitive rates', 'Quick approval', 'Bilingual support'],
    isTrending: 'down',
    provinces: ['All Provinces', 'Quebec', 'Ontario', 'New Brunswick'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 8,
    lender: {
      name: 'Desjardins',
      logo: 'DJ',
      type: 'Credit Union',
      color: 'bg-green-700'
    },
    rate: 2.92,
    apr: 3.15,
    term: '5 Years',
    type: 'Variable',
    change: 0.05,
    features: ['Member benefits', 'Local service', 'Competitive rates'],
    isTrending: 'up',
    provinces: ['All Provinces', 'Quebec', 'Ontario'],
    lastUpdated: '2024-01-15'
  }
];

app.get('/', (req, res) => {
  res.send('✅ Backend API is working!');
});

// GET /api/rates - Returns all mortgage rates
app.get('/api/rates', (req, res) => {
  try {
    // Simulate some network delay
    setTimeout(() => {
      res.json({
        success: true,
        data: mortgageRates,
        total: mortgageRates.length,
        lastUpdated: new Date().toISOString()
      });
    }, 500);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch mortgage rates',
      message: error.message
    });
  }
});

// GET /api/rates/filtered - Returns filtered mortgage rates
app.get('/api/rates/filtered', (req, res) => {
  try {
    const { province, type, term, lenderType } = req.query;
    let filteredRates = [...mortgageRates];

    // Filter by province
    if (province && province !== 'All Provinces') {
      filteredRates = filteredRates.filter(rate => 
        rate.provinces.includes(province)
      );
    }

    // Filter by mortgage type
    if (type && type !== 'All Types') {
      filteredRates = filteredRates.filter(rate => 
        rate.type.toLowerCase() === type.toLowerCase()
      );
    }

    // Filter by term
    if (term && term !== 'All Terms') {
      filteredRates = filteredRates.filter(rate => 
        rate.term === term
      );
    }

    // Filter by lender type
    if (lenderType && lenderType !== 'All Lenders') {
      filteredRates = filteredRates.filter(rate => 
        rate.lender.type.toLowerCase().includes(lenderType.toLowerCase())
      );
    }

    // Simulate some network delay
    setTimeout(() => {
      res.json({
        success: true,
        data: filteredRates,
        total: filteredRates.length,
        filters: { province, type, term, lenderType },
        lastUpdated: new Date().toISOString()
      });
    }, 300);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch filtered mortgage rates',
      message: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
