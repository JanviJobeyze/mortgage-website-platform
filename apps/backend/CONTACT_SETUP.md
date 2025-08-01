# Contact Form Email Setup

## Environment Variables Required

Create a `.env` file in the backend directory with the following variables:

```env
# Email Configuration for Contact Form
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
CONTACT_EMAIL=contact@yourmortgagecompany.com

# Server Configuration
PORT=5000
```

## Gmail Setup Instructions

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password in `EMAIL_PASSWORD`

## Alternative Email Services

You can use other email services by changing `EMAIL_SERVICE`:
- `outlook` for Outlook/Hotmail
- `yahoo` for Yahoo Mail
- `sendgrid` for SendGrid
- `mailgun` for Mailgun

## Testing the Endpoint

Test with curl:
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Test Message",
    "message": "This is a test message from the contact form."
  }'
```

## Security Notes

- Never commit your `.env` file to version control
- Use app passwords instead of your main password
- Consider rate limiting for production use
- Validate and sanitize all input data 