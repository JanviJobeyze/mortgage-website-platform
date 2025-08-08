const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 5000;

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'mortgage_website',
  password: process.env.DB_PASSWORD || 'your_password',
  port: process.env.DB_PORT || 5432,
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
  } else {
    console.log('✅ Database connected successfully');
  }
});

app.use(express.json());
app.use(require('cors')());

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow only specific file types
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, JPEG, and PNG files are allowed.'), false);
    }
  }
});

// Configure multer for application form with multiple files
const applicationUpload = upload.fields([
  { name: 'identification', maxCount: 1 },
  { name: 'incomeProof', maxCount: 1 },
  { name: 'propertyDocuments', maxCount: 1 },
  { name: 'bankStatements', maxCount: 1 }
]);

/**
 * Sends confirmation emails to both the user and company
 * @param {Object} bookingData - Calendly webhook payload with booking details
 */
const sendConfirmationEmails = async (bookingData) => {
  try {
    // Extract booking information from Calendly webhook
    const {
      payload: {
        invitee: {
          name: inviteeName,
          email: inviteeEmail,
          questions_and_answers: qaData
        },
        event: {
          name: eventName,
          start_time: startTime,
          end_time: endTime
        }
      }
    } = bookingData;

    // Extract phone number from custom questions if available
    let phoneNumber = '';
    if (qaData && Array.isArray(qaData)) {
      const phoneQuestion = qaData.find(qa => 
        qa.question.toLowerCase().includes('phone') || 
        qa.question.toLowerCase().includes('number')
      );
      if (phoneQuestion) {
        phoneNumber = phoneQuestion.answer;
      }
    }

    // Format the appointment time
    const appointmentDate = new Date(startTime);
    const formattedDate = appointmentDate.toLocaleDateString('en-CA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const formattedTime = appointmentDate.toLocaleTimeString('en-CA', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });

    // Check if Gmail is configured (primary choice)
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.log('Gmail configuration missing. Using SendGrid fallback.');
      
      // Fallback to SendGrid if Gmail not configured
      if (!process.env.SENDGRID_API_KEY) {
        console.log('SendGrid API key not configured. Booking saved to database only.');
        return { success: true, message: 'Booking saved to database' };
      }

      const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      // Send email to user
      const userMailOptions = {
        from: process.env.EMAIL_USER,
        to: inviteeEmail,
        subject: `Confirmation: Your Mortgage Consultation on ${formattedDate}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1B5E20;">Your Mortgage Consultation is Confirmed!</h2>
            <p>Dear ${inviteeName},</p>
            <p>Your mortgage consultation has been successfully scheduled.</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #1B5E20;">Appointment Details</h3>
              <p><strong>Date:</strong> ${formattedDate}</p>
              <p><strong>Time:</strong> ${formattedTime}</p>
              <p><strong>Service:</strong> ${eventName}</p>
              ${phoneNumber ? `<p><strong>Phone:</strong> ${phoneNumber}</p>` : ''}
            </div>
            
            <p>Our mortgage specialist will contact you at the scheduled time. Please ensure you have the following documents ready:</p>
            <ul>
              <li>Government-issued photo ID</li>
              <li>Recent pay stubs or employment letter</li>
              <li>Bank statements (last 3 months)</li>
              <li>Tax returns (last 2 years)</li>
              <li>Any existing mortgage documents</li>
            </ul>
            
            <p>If you need to reschedule or have any questions, please contact us at ${process.env.COMPANY_EMAIL || 'appointments@ourcompany.com'}.</p>
            
            <p>Best regards,<br>MortgageLink Canada Team</p>
          </div>
        `
      };

      // Send email to company
      const companyMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.COMPANY_EMAIL || process.env.EMAIL_USER,
        subject: `New Appointment: ${inviteeName} - ${formattedDate}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1B5E20;">New Mortgage Consultation Appointment</h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #1B5E20;">Appointment Details</h3>
              <p><strong>Client Name:</strong> ${inviteeName}</p>
              <p><strong>Email:</strong> ${inviteeEmail}</p>
              ${phoneNumber ? `<p><strong>Phone:</strong> ${phoneNumber}</p>` : ''}
              <p><strong>Date:</strong> ${formattedDate}</p>
              <p><strong>Time:</strong> ${formattedTime}</p>
              <p><strong>Service:</strong> ${eventName}</p>
            </div>
            
            <p>This appointment was booked through the mortgage eligibility quiz on your website.</p>
            
            <p>Please prepare for this consultation and ensure all necessary materials are ready.</p>
          </div>
        `
      };

      // Send both emails
      await Promise.all([
        transporter.sendMail(userMailOptions),
        transporter.sendMail(companyMailOptions)
      ]);

      console.log('✅ Confirmation emails sent via nodemailer');
      return { success: true, message: 'Confirmation emails sent' };
    }

    // Use SendGrid as fallback if Gmail not configured
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Send email to user
    const userEmail = {
      to: inviteeEmail,
      from: process.env.COMPANY_EMAIL || 'appointments@ourcompany.com',
      subject: `Confirmation: Your Mortgage Consultation on ${formattedDate}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1B5E20;">Your Mortgage Consultation is Confirmed!</h2>
          <p>Dear ${inviteeName},</p>
          <p>Your mortgage consultation has been successfully scheduled.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1B5E20;">Appointment Details</h3>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${formattedTime}</p>
            <p><strong>Service:</strong> ${eventName}</p>
            ${phoneNumber ? `<p><strong>Phone:</strong> ${phoneNumber}</p>` : ''}
          </div>
          
          <p>Our mortgage specialist will contact you at the scheduled time. Please ensure you have the following documents ready:</p>
          <ul>
            <li>Government-issued photo ID</li>
            <li>Recent pay stubs or employment letter</li>
            <li>Bank statements (last 3 months)</li>
            <li>Tax returns (last 2 years)</li>
            <li>Any existing mortgage documents</li>
          </ul>
          
          <p>If you need to reschedule or have any questions, please contact us at ${process.env.COMPANY_EMAIL || 'appointments@ourcompany.com'}.</p>
          
          <p>Best regards,<br>MortgageLink Canada Team</p>
        </div>
      `
    };

    // Send email to company
    const companyEmail = {
      to: process.env.COMPANY_EMAIL || 'appointments@ourcompany.com',
      from: process.env.COMPANY_EMAIL || 'appointments@ourcompany.com',
      subject: `New Appointment: ${inviteeName} - ${formattedDate}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1B5E20;">New Mortgage Consultation Appointment</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1B5E20;">Appointment Details</h3>
            <p><strong>Client Name:</strong> ${inviteeName}</p>
            <p><strong>Email:</strong> ${inviteeEmail}</p>
            ${phoneNumber ? `<p><strong>Phone:</strong> ${phoneNumber}</p>` : ''}
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${formattedTime}</p>
            <p><strong>Service:</strong> ${eventName}</p>
          </div>
          
          <p>This appointment was booked through the mortgage eligibility quiz on your website.</p>
          
          <p>Please prepare for this consultation and ensure all necessary materials are ready.</p>
        </div>
      `
    };

    // Send both emails via SendGrid
    await Promise.all([
      sgMail.send(userEmail),
      sgMail.send(companyEmail)
    ]);

    console.log('✅ Confirmation emails sent via SendGrid');
    return { success: true, message: 'Confirmation emails sent' };

  } catch (error) {
    console.error('❌ Error sending confirmation emails:', error);
    return { success: false, error: error.message };
  }
};

// POST /calendly - Handle Calendly webhook for invitee.created event
app.post('/calendly', async (req, res) => {
  try {
    const { event_type, payload } = req.body;

    // Verify this is an invitee.created event
    if (event_type !== 'invitee.created') {
      return res.status(200).json({ 
        success: true, 
        message: 'Webhook received but not an invitee.created event' 
      });
    }

    console.log('📅 Calendly webhook received:', {
      event_type,
      invitee_name: payload.invitee.name,
      invitee_email: payload.invitee.email,
      event_name: payload.event.name,
      start_time: payload.event.start_time
    });

    // Send confirmation emails
    const emailResult = await sendConfirmationEmails(req.body);

    if (emailResult.success) {
      console.log('✅ Appointment confirmation processed successfully');
      res.status(200).json({
        success: true,
        message: 'Appointment confirmation processed successfully'
      });
    } else {
      console.error('❌ Failed to send confirmation emails:', emailResult.error);
      res.status(500).json({
        success: false,
        error: 'Failed to send confirmation emails'
      });
    }

  } catch (error) {
    console.error('❌ Error processing Calendly webhook:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error processing webhook'
    });
  }
});

// Mock mortgage rates data
const mortgageRates = [
  {
    id: 1,
    lender: { 
      name: 'RBC Royal Bank', 
      type: 'Major Bank',
      logo: 'RBC',           
      color: 'bg-blue-600'   
    },
    rate: 2.89,
    apr: 3.12,             
    term: '5 Years',
    type: 'Fixed',
    purpose: 'Home Purchase',
    provinces: ['Ontario', 'Alberta', 'British Columbia'],
    change: -0.15,          
    isTrending: 'down',   
    features: ['No prepayment penalty', 'Cashback available', 'Portable mortgage'] 
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
  },
  {
    id: 9,
    lender: {
      name: 'HSBC Canada',
      logo: 'HSBC',
      type: 'International Bank',
      color: 'bg-red-800'
    },
    rate: 2.75,
    apr: 2.98,
    term: '5 Years',
    type: 'Fixed',
    change: -0.25,
    features: ['Global banking', 'Competitive rates', 'International transfers'],
    isTrending: 'down',
    provinces: ['All Provinces', 'Ontario', 'British Columbia', 'Alberta'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 10,
    lender: {
      name: 'Laurentian Bank',
      logo: 'LB',
      type: 'Regional Bank',
      color: 'bg-blue-700'
    },
    rate: 3.08,
    apr: 3.31,
    term: '5 Years',
    type: 'Variable',
    change: 0.12,
    features: ['Personal service', 'Flexible terms', 'Quick processing'],
    isTrending: 'up',
    provinces: ['All Provinces', 'Quebec', 'Ontario'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 11,
    lender: {
      name: 'Alterna Savings',
      logo: 'AS',
      type: 'Credit Union',
      color: 'bg-green-500'
    },
    rate: 2.88,
    apr: 3.11,
    term: '5 Years',
    type: 'Fixed',
    change: -0.10,
    features: ['Member-owned', 'Competitive rates', 'Local focus'],
    isTrending: 'down',
    provinces: ['All Provinces', 'Ontario'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 12,
    lender: {
      name: 'Coast Capital Savings',
      logo: 'CCS',
      type: 'Credit Union',
      color: 'bg-blue-600'
    },
    rate: 2.95,
    apr: 3.18,
    term: '5 Years',
    type: 'Variable',
    change: 0.08,
    features: ['Member benefits', 'Digital banking', 'Competitive rates'],
    isTrending: 'up',
    provinces: ['All Provinces', 'British Columbia'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 13,
    lender: {
      name: 'Vancity',
      logo: 'VC',
      type: 'Credit Union',
      color: 'bg-green-600'
    },
    rate: 2.82,
    apr: 3.05,
    term: '5 Years',
    type: 'Fixed',
    change: -0.18,
    features: ['Community focus', 'Sustainable banking', 'Competitive rates'],
    isTrending: 'down',
    provinces: ['All Provinces', 'British Columbia'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 14,
    lender: {
      name: 'Servus Credit Union',
      logo: 'SCU',
      type: 'Credit Union',
      color: 'bg-purple-500'
    },
    rate: 2.90,
    apr: 3.13,
    term: '5 Years',
    type: 'Variable',
    change: 0.03,
    features: ['Member-owned', 'Local service', 'Competitive rates'],
    isTrending: 'up',
    provinces: ['All Provinces', 'Alberta'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 15,
    lender: {
      name: 'ATB Financial',
      logo: 'ATB',
      type: 'Provincial Bank',
      color: 'bg-orange-600'
    },
    rate: 2.78,
    apr: 3.01,
    term: '5 Years',
    type: 'Fixed',
    change: -0.22,
    features: ['Alberta-focused', 'Competitive rates', 'Local expertise'],
    isTrending: 'down',
    provinces: ['All Provinces', 'Alberta'],
    lastUpdated: '2024-01-15'
  }
];

app.get('/', (req, res) => {
  res.send('✅ Backend API is working!');
});

// POST /api/contact - Handle contact form submissions
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required: name, email, subject, message'
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address'
      });
    }

    // Save to database
    const query = `
      INSERT INTO contact_submissions (name, email, subject, message)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;

    const values = [name, email, subject, message];
    const result = await pool.query(query, values);
    const contactId = result.rows[0].id;

    console.log(`✅ Contact submission saved to database with ID: ${contactId}`);

    // Check if email configuration is set up
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.log('Email configuration missing. Using database storage only.');
      return res.json({
        success: true,
        message: 'Contact form submitted successfully and saved to database',
        contactId: contactId
      });
    }

    // Create transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
      subject: `Contact Form: ${subject} (ID: ${contactId})`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Contact ID:</strong> ${contactId}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Sent from your mortgage website contact form</em></p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Contact form submitted successfully and saved to database',
      contactId: contactId
    });

  } catch (error) {
    // Log the full error server-side
    console.error('Contact form error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      command: error.command
    });
    
    // Check for specific error types
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        error: 'Email authentication failed. Please check your email credentials.'
      });
    }
    
    if (error.code === 'ECONNECTION') {
      return res.status(500).json({
        success: false,
        error: 'Email service connection failed. Please check your internet connection.'
      });
    }
    
    // Return a generic error to the client
    res.status(500).json({
      success: false,
      error: 'Failed to send contact form. Please try again later.'
    });
  }
});

// POST /api/apply - Handle mortgage application form submissions with file uploads
app.post('/api/apply', applicationUpload, async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      propertyValue, 
      propertyType, 
      employmentStatus, 
      annualIncome, 
      downPayment, 
      loanAmount 
    } = req.body;
    const files = req.files;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !propertyValue || !annualIncome || !downPayment) {
      return res.status(400).json({
        success: false,
        error: 'Required fields missing: firstName, lastName, email, phone, propertyValue, annualIncome, downPayment'
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address'
      });
    }

    // Save to database
    const query = `
      INSERT INTO applications (
        first_name, last_name, email, phone, property_value, property_type, 
        employment_status, annual_income, down_payment, loan_amount,
        identification_file, income_proof_file, property_documents_file, bank_statements_file
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING id
    `;

    const values = [
      firstName,
      lastName,
      email,
      phone,
      propertyValue,
      propertyType || 'residential',
      employmentStatus || 'employed',
      annualIncome,
      downPayment,
      loanAmount || null,
      files?.identification?.[0]?.originalname || null,
      files?.incomeProof?.[0]?.originalname || null,
      files?.propertyDocuments?.[0]?.originalname || null,
      files?.bankStatements?.[0]?.originalname || null
    ];

    const result = await pool.query(query, values);
    const applicationId = result.rows[0].id;

    console.log(`✅ Application saved to database with ID: ${applicationId}`);

    // Check if email configuration is set up
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.log('Email configuration missing. Using database storage only.');
      return res.json({
        success: true,
        message: 'Application form submitted successfully and saved to database',
        applicationId: applicationId
      });
    }

    // Create transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
      subject: `New Mortgage Application: ${firstName} ${lastName} (ID: ${applicationId})`,
      html: `
        <h2>New Mortgage Application</h2>
        <p><strong>Application ID:</strong> ${applicationId}</p>
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        
        <h3>Property Information</h3>
        <p><strong>Property Value:</strong> ${propertyValue}</p>
        <p><strong>Property Type:</strong> ${propertyType}</p>
        
        <h3>Financial Information</h3>
        <p><strong>Employment Status:</strong> ${employmentStatus}</p>
        <p><strong>Annual Income:</strong> ${annualIncome}</p>
        <p><strong>Down Payment:</strong> ${downPayment}</p>
        <p><strong>Requested Loan Amount:</strong> ${loanAmount || 'Not specified'}</p>
        
        <hr>
        <h3>Attached Documents:</h3>
        ${files ? Object.keys(files).map(field => {
          const fieldFiles = files[field];
          if (fieldFiles && fieldFiles.length > 0) {
            const fieldName = field.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());
            return `<p><strong>${fieldName}:</strong><br>${fieldFiles.map(f => f.originalname).join(', ')}</p>`;
          }
          return '';
        }).join('') : '<p>No documents attached</p>'}
        <hr>
        <p><em>Sent from your mortgage website application form</em></p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Application form submitted successfully and saved to database',
      applicationId: applicationId
    });

  } catch (error) {
    // Log the full error server-side
    console.error('Application form error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      command: error.command
    });
    
    // Check for specific error types
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        error: 'Email authentication failed. Please check your email credentials.'
      });
    }
    
    if (error.code === 'ECONNECTION') {
      return res.status(500).json({
        success: false,
        error: 'Email service connection failed. Please check your internet connection.'
      });
    }
    
    // Return a generic error to the client
    res.status(500).json({
      success: false,
      error: 'Failed to send application form. Please try again later.'
    });
  }
});

// Error handling middleware for multer
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'File size too large. Maximum file size is 10MB.'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        error: 'Too many files uploaded.'
      });
    }
    return res.status(400).json({
      success: false,
      error: 'File upload error: ' + error.message
    });
  }
  
  if (error.message && error.message.includes('Invalid file type')) {
    return res.status(400).json({
      success: false,
      error: 'Invalid file type. Only PDF, JPEG, and PNG files are allowed.'
    });
  }
  
  next(error);
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

// GET /api/admin/applications - Get all applications (admin endpoint)
app.get('/api/admin/applications', async (req, res) => {
  try {
    const query = `
      SELECT * FROM applications 
      ORDER BY created_at DESC
    `;
    
    const result = await pool.query(query);
    
    res.json({
      success: true,
      data: result.rows,
      total: result.rows.length
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch applications'
    });
  }
});

// GET /api/admin/contacts - Get all contact submissions (admin endpoint)
app.get('/api/admin/contacts', async (req, res) => {
  try {
    const query = `
      SELECT * FROM contact_submissions 
      ORDER BY created_at DESC
    `;
    
    const result = await pool.query(query);
    
    res.json({
      success: true,
      data: result.rows,
      total: result.rows.length
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contact submissions'
    });
  }
});

// GET /api/admin/stats - Get dashboard statistics
app.get('/api/admin/stats', async (req, res) => {
  try {
    const applicationsQuery = 'SELECT COUNT(*) as total FROM applications';
    const contactsQuery = 'SELECT COUNT(*) as total FROM contact_submissions';
    const leadsQuery = 'SELECT COUNT(*) as total FROM quiz_leads';
    const recentApplicationsQuery = `
      SELECT COUNT(*) as total FROM applications 
      WHERE created_at >= NOW() - INTERVAL '7 days'
    `;
    const recentContactsQuery = `
      SELECT COUNT(*) as total FROM contact_submissions 
      WHERE created_at >= NOW() - INTERVAL '7 days'
    `;
    const recentLeadsQuery = `
      SELECT COUNT(*) as total FROM quiz_leads 
      WHERE created_at >= NOW() - INTERVAL '7 days'
    `;
    
    const [applicationsResult, contactsResult, leadsResult, recentAppsResult, recentContactsResult, recentLeadsResult] = await Promise.all([
      pool.query(applicationsQuery),
      pool.query(contactsQuery),
      pool.query(leadsQuery),
      pool.query(recentApplicationsQuery),
      pool.query(recentContactsQuery),
      pool.query(recentLeadsQuery)
    ]);
    
    res.json({
      success: true,
      data: {
        totalApplications: parseInt(applicationsResult.rows[0].total),
        totalContacts: parseInt(contactsResult.rows[0].total),
        totalLeads: parseInt(leadsResult.rows[0].total),
        recentApplications: parseInt(recentAppsResult.rows[0].total),
        recentContacts: parseInt(recentContactsResult.rows[0].total),
        recentLeads: parseInt(recentLeadsResult.rows[0].total)
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics'
    });
  }
});

// POST /api/lead - Handle pre-qualification quiz submissions
app.post('/api/lead', async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      annualIncome, 
      employmentStatus, 
      creditScore, 
      downPayment, 
      monthlyDebts,
      eligible,
      maxLoanAmount,
      confidence,
      reason,
      recommendations
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !annualIncome || !employmentStatus || 
        !creditScore || !downPayment || !monthlyDebts || eligible === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Required fields missing: firstName, lastName, email, annualIncome, employmentStatus, creditScore, downPayment, monthlyDebts, eligible'
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address'
      });
    }

    // Save to database
    const query = `
      INSERT INTO quiz_leads (
        first_name, last_name, email, annual_income, employment_status, 
        credit_score, down_payment, monthly_debts, eligible, max_loan_amount,
        confidence, reason, recommendations
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING id
    `;

    const values = [
      firstName,
      lastName,
      email,
      annualIncome,
      employmentStatus,
      creditScore,
      downPayment,
      monthlyDebts,
      eligible,
      maxLoanAmount || null,
      confidence || null,
      reason || null,
      recommendations || []
    ];

    const result = await pool.query(query, values);
    const leadId = result.rows[0].id;

    console.log(`✅ Quiz lead saved to database with ID: ${leadId}`);

    // Check if email configuration is set up
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.log('Email configuration missing. Using database storage only.');
      return res.json({
        success: true,
        message: 'Quiz results submitted successfully and saved to database',
        leadId: leadId
      });
    }

    // Create transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
      subject: `New Pre-Qualification Lead: ${firstName} ${lastName} (ID: ${leadId})`,
      html: `
        <h2>New Pre-Qualification Quiz Lead</h2>
        <p><strong>Lead ID:</strong> ${leadId}</p>
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        
        <h3>Financial Information</h3>
        <p><strong>Annual Income:</strong> ${annualIncome}</p>
        <p><strong>Employment Status:</strong> ${employmentStatus}</p>
        <p><strong>Credit Score:</strong> ${creditScore}</p>
        <p><strong>Down Payment:</strong> ${downPayment}</p>
        <p><strong>Monthly Debts:</strong> ${monthlyDebts}</p>
        
        <h3>Eligibility Results</h3>
        <p><strong>Eligible:</strong> ${eligible ? 'Yes' : 'No'}</p>
        ${maxLoanAmount ? `<p><strong>Max Loan Amount:</strong> ${maxLoanAmount}</p>` : ''}
        ${confidence ? `<p><strong>Confidence:</strong> ${confidence}</p>` : ''}
        ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
        
        ${recommendations && recommendations.length > 0 ? `
        <h3>Recommendations</h3>
        <ul>
          ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
        ` : ''}
        
        <hr>
        <p><em>Sent from your mortgage website pre-qualification quiz</em></p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Quiz results submitted successfully and saved to database',
      leadId: leadId
    });

  } catch (error) {
    // Log the full error server-side
    console.error('Quiz lead error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      command: error.command
    });
    
    // Check for specific error types
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        error: 'Email authentication failed. Please check your email credentials.'
      });
    }
    
    if (error.code === 'ECONNECTION') {
      return res.status(500).json({
        success: false,
        error: 'Email service connection failed. Please check your internet connection.'
      });
    }
    
    // Return a generic error to the client
    res.status(500).json({
      success: false,
      error: 'Failed to submit quiz results. Please try again later.'
    });
  }
});

// GET /api/admin/leads - Get all quiz leads (admin endpoint)
app.get('/api/admin/leads', async (req, res) => {
  try {
    const query = `
      SELECT * FROM quiz_leads 
      ORDER BY created_at DESC
    `;
    
    const result = await pool.query(query);
    
    res.json({
      success: true,
      data: result.rows,
      total: result.rows.length
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch quiz leads'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
