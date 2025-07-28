# Mortgage Rates API

This is the backend API for the mortgage rates comparison platform.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### GET /api/rates
Returns all available mortgage rates.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "lender": {
        "name": "RBC Royal Bank",
        "logo": "RBC",
        "type": "Major Bank",
        "color": "bg-blue-600"
      },
      "rate": 2.89,
      "apr": 3.12,
      "term": "5 Years",
      "type": "Fixed",
      "change": -0.15,
      "features": ["No prepayment penalty", "Cashback available"],
      "isTrending": "down",
      "provinces": ["All Provinces", "Ontario", "Alberta"],
      "lastUpdated": "2024-01-15"
    }
  ],
  "total": 8,
  "lastUpdated": "2024-01-15T10:30:00.000Z"
}
```

### GET /api/rates/filtered
Returns filtered mortgage rates based on query parameters.

**Query Parameters:**
- `province` (optional): Filter by province
- `type` (optional): Filter by mortgage type (Fixed/Variable)
- `term` (optional): Filter by term length
- `lenderType` (optional): Filter by lender type

**Example:**
```
GET /api/rates/filtered?province=Ontario&type=Fixed
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "total": 3,
  "filters": {
    "province": "Ontario",
    "type": "Fixed"
  },
  "lastUpdated": "2024-01-15T10:30:00.000Z"
}
```

## Data Structure

Each mortgage rate object contains:
- `id`: Unique identifier
- `lender`: Lender information (name, logo, type, color)
- `rate`: Interest rate percentage
- `apr`: Annual Percentage Rate
- `term`: Mortgage term (e.g., "5 Years")
- `type`: Mortgage type ("Fixed" or "Variable")
- `change`: Rate change from previous period
- `features`: Array of mortgage features
- `isTrending`: Rate trend ("up", "down", "stable")
- `provinces`: Available provinces for this rate
- `lastUpdated`: Last update timestamp

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error description",
  "message": "Detailed error message"
}
```

## Development

The API includes simulated network delays to mimic real-world conditions:
- `/api/rates`: 500ms delay
- `/api/rates/filtered`: 300ms delay 