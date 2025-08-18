const nodemailer = require('nodemailer');
require('dotenv').config();

// Test Gmail configuration
async function testGmail() {
  try {
    console.log('🧪 Testing Gmail configuration...');
    
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Test email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself for testing
      subject: 'Test Email - Calendly Integration',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1B5E20;">Gmail Test Successful! 🎉</h2>
          <p>Your Gmail configuration is working correctly.</p>
          <p><strong>From:</strong> ${process.env.EMAIL_USER}</p>
          <p><strong>To:</strong> ${process.env.EMAIL_USER}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <hr>
          <p><em>This email confirms your Gmail setup is ready for Calendly integration.</em></p>
        </div>
      `
    };

    // Send test email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Test email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    console.log('📬 Check your inbox for the test email');
    
  } catch (error) {
    console.error('❌ Gmail test failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check your EMAIL_USER and EMAIL_PASSWORD in .env file');
    console.log('2. Make sure 2-Step Verification is enabled on your Google account');
    console.log('3. Generate a new app password if needed');
    console.log('4. Check that your Gmail account allows "less secure app access"');
  }
}

// Run the test
testGmail(); 