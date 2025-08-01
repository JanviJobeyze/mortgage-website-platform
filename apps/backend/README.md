# Backend API Server

This is the backend server for the mortgage website platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with the following variables:
```env
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_SERVICE=gmail
CONTACT_EMAIL=contact@yourcompany.com
```

3. Start the server:
```bash
npm start
```

## API Endpoints

### POST /api/apply
Handles mortgage application form submissions with file uploads.

**Request Body:**
- `firstName` (required): Applicant's first name
- `lastName` (required): Applicant's last name
- `email` (required): Applicant's email address
- `phone` (required): Applicant's phone number
- `propertyValue` (required): Property value
- `propertyType` (optional): Type of property
- `employmentStatus` (optional): Employment status
- `annualIncome` (required): Annual income
- `downPayment` (required): Down payment amount
- `loanAmount` (optional): Requested loan amount

**File Uploads:**
- `identification` (optional): Government ID document
- `incomeProof` (optional): Proof of income document
- `propertyDocuments` (optional): Property-related documents
- `bankStatements` (optional): Bank statements

**Response:**
```json
{
  "success": true,
  "message": "Application form submitted successfully"
}
```

### POST /api/contact
Handles contact form submissions.

### GET /api/rates
Returns all mortgage rates.

### GET /api/rates/filtered
Returns filtered mortgage rates based on query parameters.

## File Upload Configuration

- Maximum file size: 10MB per file
- Allowed file types: PDF, JPEG, PNG
- Files are stored in memory and sent via email

## Email Configuration

The server uses nodemailer to send application forms and contact submissions via email. Configure your email settings in the `.env` file.

For Gmail, you'll need to:
1. Enable 2-factor authentication
2. Generate an app password
3. Use the app password in EMAIL_PASSWORD

## Error Handling

The server includes comprehensive error handling for:
- File upload errors (size, type, count)
- Email authentication errors
- Network connection errors
- Validation errors

## Development

Run in development mode with auto-restart:
```bash
npm run dev
``` 