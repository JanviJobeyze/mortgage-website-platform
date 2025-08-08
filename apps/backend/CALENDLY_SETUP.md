# Calendly Integration Setup Guide

## Overview
This integration connects your mortgage eligibility quiz with Calendly for automated appointment booking and confirmation emails.

## Frontend Changes ✅
- **File**: `apps/frontend/src/pages/EligibilityQuiz.jsx`
- **Lines 147-162**: Replaced `handleBookConsultation` with Calendly integration
- **Added**: `openScheduler()` function that opens Calendly popup with pre-filled user data

## Backend Changes ✅
- **File**: `apps/backend/src/server.js`
- **Added**: `sendConfirmationEmails()` function (lines 50-200)
- **Added**: `POST /calendly` webhook endpoint (lines 202-240)
- **Added**: SendGrid dependency to `package.json`

## Configuration Required

### 1. Environment Variables
Add these to your `.env` file:

```bash
# SendGrid (Recommended for production)
SENDGRID_API_KEY=your-sendgrid-api-key
COMPANY_EMAIL=appointments@ourcompany.com

# Nodemailer (Fallback)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_SERVICE=gmail
CONTACT_EMAIL=appointments@ourcompany.com
```

### 2. Calendly Setup
1. **Replace the Calendly URL** in `EligibilityQuiz.jsx` line 95:
   ```javascript
   url: 'https://calendly.com/your-link/30min', // Replace with your actual link
   ```

2. **Set up Calendly Webhook**:
   - Go to Calendly Dashboard → Integrations → Webhooks
   - Add webhook URL: `https://yourdomain.com/calendly`
   - Select event: `invitee.created`
   - Save the webhook

### 3. Install Dependencies
```bash
cd apps/backend
npm install
```

## How It Works

### 1. User Flow
1. User completes eligibility quiz
2. Clicks "Book Consultation" 
3. Calendly popup opens with pre-filled name/email
4. User selects appointment time
5. Calendly sends webhook to your server
6. Server sends confirmation emails to user and company

### 2. Email Flow
- **User Email**: Confirmation with appointment details and document checklist
- **Company Email**: Notification of new appointment with client details
- **Fallback**: Uses nodemailer if SendGrid not configured

### 3. Error Handling
- Graceful fallback if Calendly widget fails to load
- Network error handling with user-friendly messages
- Email sending failures logged but don't crash the UI

## Testing

### Test the Integration
1. Complete the eligibility quiz
2. Fill in contact information
3. Click "Book Consultation"
4. Verify Calendly popup opens with pre-filled data
5. Book a test appointment
6. Check that confirmation emails are sent

### Test the Webhook
```bash
curl -X POST http://localhost:5000/calendly \
  -H "Content-Type: application/json" \
  -d '{
    "event_type": "invitee.created",
    "payload": {
      "invitee": {
        "name": "Test User",
        "email": "test@example.com",
        "questions_and_answers": []
      },
      "event": {
        "name": "Mortgage Consultation",
        "start_time": "2024-01-20T10:00:00Z",
        "end_time": "2024-01-20T10:30:00Z"
      }
    }
  }'
```

## Security Notes
- Webhook endpoint accepts any POST request (add authentication if needed)
- Email credentials should be stored securely
- Consider rate limiting for webhook endpoint in production

## Troubleshooting

### Common Issues
1. **Calendly popup doesn't open**: Check browser console for errors
2. **Emails not sending**: Verify SendGrid API key or nodemailer credentials
3. **Webhook not receiving**: Check Calendly webhook URL and server logs
4. **Pre-filled data missing**: Verify Calendly link supports pre-fill parameters

### Debug Steps
1. Check browser console for JavaScript errors
2. Check server logs for webhook and email errors
3. Verify environment variables are loaded correctly
4. Test webhook endpoint with curl command above 