# Gmail Setup for Calendly Integration

## 🎯 **Overview**
This guide sets up Gmail (Nodemailer) for sending Calendly appointment confirmation emails.

## 📋 **Step 1: Create .env File**

Create a file named `.env` in the `apps/backend/` directory with this content:

```bash
# Server Configuration
PORT=5000

# Database Configuration
DB_USER=postgres
DB_HOST=localhost
DB_NAME=mortgage_website
DB_PASSWORD=your_postgres_password_here
DB_PORT=5432

# Gmail Configuration (for Calendly emails)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
EMAIL_SERVICE=gmail
CONTACT_EMAIL=appointments@yourcompany.com
COMPANY_EMAIL=appointments@yourcompany.com
```

## 🔐 **Step 2: Get Gmail App Password**

### **Enable 2-Step Verification:**
1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Sign in with your Gmail account
3. Go to **Security** → **2-Step Verification**
4. Turn it **ON** if not already enabled

### **Generate App Password:**
1. Go to **Security** → **2-Step Verification** → **App passwords**
2. Select **"Mail"** from the dropdown
3. Click **"Generate"**
4. Copy the **16-character password** (no spaces)

## 📝 **Step 3: Update Your .env File**

Replace the placeholder values in your `.env` file:

```bash
# Replace with your actual Gmail address
EMAIL_USER=your-actual-email@gmail.com

# Replace with the 16-character app password you generated
EMAIL_PASSWORD=abcd efgh ijkl mnop

# Replace with your company email (can be same as Gmail for testing)
COMPANY_EMAIL=your-actual-email@gmail.com
CONTACT_EMAIL=your-actual-email@gmail.com
```

## 🧪 **Step 4: Test Gmail Configuration**

Run the test script to verify your Gmail setup:

```bash
cd apps/backend
node test-gmail.js
```

**Expected Output:**
```
🧪 Testing Gmail configuration...
✅ Test email sent successfully!
📧 Message ID: <message-id>
📬 Check your inbox for the test email
```

## ✅ **Step 5: Verify Setup**

If the test is successful, you'll receive a test email in your Gmail inbox. This confirms your setup is working.

## 🚀 **Step 6: Start the Server**

```bash
cd apps/backend
npm start
```

You should see:
```
✅ Database connected successfully
🚀 Server is running at http://localhost:5000
```

## 📧 **How It Works**

When someone books through Calendly:

1. **User books appointment** → Calendly sends webhook
2. **Server receives webhook** → Extracts appointment details
3. **Gmail sends emails** → User and company get confirmations

**Email Flow:**
- **User Email**: "Your appointment is confirmed for Jan 20th at 2:00 PM"
- **Company Email**: "New appointment: John Doe - Jan 20th at 2:00 PM"

## 🔧 **Troubleshooting**

### **Common Issues:**

**❌ "Invalid login" error:**
- Make sure 2-Step Verification is enabled
- Generate a new app password
- Check that EMAIL_PASSWORD has no extra spaces

**❌ "Less secure app access" error:**
- Use app passwords instead of regular password
- Make sure you're using the 16-character app password

**❌ "Authentication failed" error:**
- Verify your Gmail address is correct
- Check that app password is copied correctly
- Try generating a new app password

### **Test Commands:**

```bash
# Test Gmail configuration
node test-gmail.js

# Test server startup
npm start

# Test webhook endpoint
curl -X POST http://localhost:5000/calendly \
  -H "Content-Type: application/json" \
  -d '{
    "event_type": "invitee.created",
    "payload": {
      "invitee": {
        "name": "Test User",
        "email": "test@example.com"
      },
      "event": {
        "name": "Mortgage Consultation",
        "start_time": "2024-01-20T10:00:00Z"
      }
    }
  }'
```

## 📊 **Gmail Limits**

- **Daily Limit**: 500 emails per day
- **Rate Limit**: 20 emails per second
- **Perfect for**: Small to medium businesses

## 🔒 **Security Notes**

1. **Never commit .env file** to version control
2. **Use app passwords** instead of regular passwords
3. **Keep app passwords secure** and don't share them
4. **Monitor email sending** to avoid hitting limits

## ✅ **Success Checklist**

- [ ] Created `.env` file with Gmail settings
- [ ] Enabled 2-Step Verification on Google account
- [ ] Generated app password for Mail
- [ ] Updated `.env` with actual credentials
- [ ] Test email sent successfully
- [ ] Server starts without errors
- [ ] Webhook endpoint responds correctly

Your Gmail setup is now ready for Calendly integration! 🎉 