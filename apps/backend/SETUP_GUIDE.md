# PostgreSQL Database Setup Guide

## **Step 1: Install PostgreSQL**

### **Windows:**
1. Download from: https://www.postgresql.org/download/windows/
2. Install with default settings
3. Remember the password you set for the `postgres` user

### **macOS:**
```bash
brew install postgresql
brew services start postgresql
```

### **Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

## **Step 2: Create Database**

1. **Open PostgreSQL command line:**
   ```bash
   psql -U postgres
   ```

2. **Create database:**
   ```sql
   CREATE DATABASE mortgage_website;
   ```

3. **Connect to the database:**
   ```sql
   \c mortgage_website
   ```

4. **Run the schema file:**
   ```bash
   psql -U postgres -d mortgage_website -f database.sql
   ```

## **Step 3: Configure Environment Variables**

Create a `.env` file in the `apps/backend` directory:

```env
# Server Configuration
PORT=5000

# Database Configuration
DB_USER=postgres
DB_HOST=localhost
DB_NAME=mortgage_website
DB_PASSWORD=your_postgres_password
DB_PORT=5432

# Email Configuration (Optional)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_SERVICE=gmail
CONTACT_EMAIL=contact@yourcompany.com
```

## **Step 4: Install Dependencies**

```bash
cd apps/backend
npm install
```

## **Step 5: Test the Setup**

1. **Start the server:**
   ```bash
   npm start
   ```

2. **Check database connection:**
   - Look for "✅ Database connected successfully" in console

3. **Test the API:**
   - Submit a form from the frontend
   - Check the database for stored data

## **Step 6: Verify Data Storage**

### **Check Applications:**
```sql
SELECT * FROM applications ORDER BY created_at DESC;
```

### **Check Contact Submissions:**
```sql
SELECT * FROM contact_submissions ORDER BY created_at DESC;
```

### **Check Statistics:**
```sql
SELECT 
  COUNT(*) as total_applications,
  COUNT(CASE WHEN created_at >= NOW() - INTERVAL '7 days' THEN 1 END) as recent_applications
FROM applications;
```

## **Database Schema Overview**

### **Applications Table:**
- `id`: Unique identifier
- `first_name`, `last_name`: Applicant name
- `email`, `phone`: Contact information
- `property_value`, `property_type`: Property details
- `employment_status`, `annual_income`: Financial information
- `down_payment`, `loan_amount`: Loan details
- `*_file`: File names for uploaded documents
- `status`: Application status (pending, approved, rejected)
- `created_at`, `updated_at`: Timestamps

### **Contact Submissions Table:**
- `id`: Unique identifier
- `name`, `email`: Contact information
- `subject`, `message`: Message content
- `status`: Message status (unread, read, replied)
- `created_at`: Timestamp

### **Quiz Leads Table:**
- `id`: Unique identifier
- `first_name`, `last_name`, `email`: Personal information
- `annual_income`, `employment_status`, `credit_score`: Financial profile
- `down_payment`, `monthly_debts`: Financial details
- `eligible`: Boolean indicating eligibility
- `max_loan_amount`, `confidence`, `reason`: Eligibility results
- `recommendations`: Array of recommendations
- `status`: Lead status (new, contacted, converted)
- `created_at`: Timestamp

## **Admin API Endpoints**

### **View All Applications:**
```
GET http://localhost:5000/api/admin/applications
```

### **View All Contact Submissions:**
```
GET http://localhost:5000/api/admin/contacts
```

### **View All Quiz Leads:**
```
GET http://localhost:5000/api/admin/leads
```

### **Submit Quiz Results:**
```
POST http://localhost:5000/api/lead
```

### **View Dashboard Statistics:**
```
GET http://localhost:5000/api/admin/stats
```

## **Troubleshooting**

### **Database Connection Issues:**
1. Check if PostgreSQL is running
2. Verify database credentials in `.env`
3. Ensure database exists
4. Check firewall settings

### **Permission Issues:**
```sql
-- Grant permissions if needed
GRANT ALL PRIVILEGES ON DATABASE mortgage_website TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
```

### **Reset Database:**
```sql
DROP DATABASE IF EXISTS mortgage_website;
CREATE DATABASE mortgage_website;
\c mortgage_website
-- Run database.sql again
```

## **Backup and Restore**

### **Backup:**
```bash
pg_dump -U postgres mortgage_website > backup.sql
```

### **Restore:**
```bash
psql -U postgres mortgage_website < backup.sql
```

## **Security Notes**

1. **Change default password** for production
2. **Use environment variables** for sensitive data
3. **Limit database access** to necessary users only
4. **Regular backups** for data protection
5. **Monitor database logs** for suspicious activity 