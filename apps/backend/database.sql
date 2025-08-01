-- Mortgage Website Database Schema
-- Run this SQL in your PostgreSQL database

-- Create database (if not exists)
-- CREATE DATABASE mortgage_website;

-- Connect to the database first, then run these commands:

-- Applications table
CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    property_value VARCHAR(100) NOT NULL,
    property_type VARCHAR(50) DEFAULT 'residential',
    employment_status VARCHAR(50) DEFAULT 'employed',
    annual_income VARCHAR(100) NOT NULL,
    down_payment VARCHAR(100) NOT NULL,
    loan_amount VARCHAR(100),
    identification_file VARCHAR(255),
    income_proof_file VARCHAR(255),
    property_documents_file VARCHAR(255),
    bank_statements_file VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact form submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'unread',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pre-qualification quiz leads table
CREATE TABLE IF NOT EXISTS quiz_leads (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    annual_income VARCHAR(100) NOT NULL,
    employment_status VARCHAR(50) NOT NULL,
    credit_score VARCHAR(50) NOT NULL,
    down_payment VARCHAR(100) NOT NULL,
    monthly_debts VARCHAR(100) NOT NULL,
    eligible BOOLEAN NOT NULL,
    max_loan_amount VARCHAR(100),
    confidence VARCHAR(50),
    reason TEXT,
    recommendations TEXT[],
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(email);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_submissions(created_at);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_applications_updated_at 
    BEFORE UPDATE ON applications 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data (optional)
INSERT INTO applications (first_name, last_name, email, phone, property_value, annual_income, down_payment) 
VALUES 
('John', 'Doe', 'john.doe@example.com', '+1-555-123-4567', '$500,000', '$75,000', '$50,000'),
('Jane', 'Smith', 'jane.smith@example.com', '+1-555-987-6543', '$750,000', '$95,000', '$75,000')
ON CONFLICT DO NOTHING;

INSERT INTO contact_submissions (name, email, subject, message)
VALUES 
('Test User', 'test@example.com', 'General Inquiry', 'This is a test message')
ON CONFLICT DO NOTHING; 