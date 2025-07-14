import React from 'react';
import { Link } from 'react-router-dom';
import HomeLogo from '../assets/HomeLogo.png';
import TwitterIcon from '../assets/Twitter.png';
import LinkedInIcon from '../assets/LinkedIn.png';
import LocationIcon from '../assets/Location.png';
import EmailIcon from '../assets/Email.png';
import ContactIcon from '../assets/Contact.png';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-3 lg:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src={HomeLogo} 
                alt="MortgageLink Canada" 
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-semibold">MortgageLink Canada</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md text-sm sm:text-base">
              Licensed mortgage brokerage serving Canadian families with 
              expert guidance and trusted solutions. Get pre-approved, 
              refinance, or find your dream home with us.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <img src={TwitterIcon} alt="Twitter" className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <img src={LinkedInIcon} alt="LinkedIn" className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                  Loan Services
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                  Calculator
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                  About
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <img src={ContactIcon} alt="Phone" className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm sm:text-base">1-800-MORTGAGE</span>
              </div>
              <div className="flex items-center">
                <img src={EmailIcon} alt="Email" className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm sm:text-base break-all">info@mortgagelink.ca</span>
              </div>
              <div className="flex items-start">
                <img src={LocationIcon} alt="Location" className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 mt-1 flex-shrink-0" />
                <div className="text-gray-300 text-sm sm:text-base">
                  <p>123 Bay Street, Suite 1000</p>
                  <p>Toronto, ON M5J 2J1</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8">
          {/* Compliance Information */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-0">
                <p className="mb-1">
                  <strong>NMLS ID:</strong> #123456 | Licensed by the{' '}
                  <a href="#" className="text-green-400 hover:text-green-300 underline">
                    Financial Consumer Agency of Canada
                  </a>
                </p>
                <p>
                  Mortgage brokerage license in all provinces. Licensed under the{' '}
                  <a href="#" className="text-green-400 hover:text-green-300 underline">
                    Mortgage Brokerages, Lenders and Administrators Act
                  </a>
                </p>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-2" aria-hidden="true">🏠</span>
                <span className="text-xs sm:text-sm text-gray-400 font-semibold">
                  Equal Housing Opportunity
                </span>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 leading-relaxed">
              <p className="mb-2">
                <strong>Important Notice:</strong> This is not a commitment to lend. Rates, program terms and conditions are subject to change without notice. 
                Not all applicants will qualify. Property and conditions apply. All loans subject to underwriting approval.
              </p>
              <p className="mb-2">
                <strong>Equal Housing Opportunity:</strong> We are committed to providing equal housing opportunities regardless of race, color, religion, sex, 
                national origin, familial status, or disability. We comply with the Canadian Human Rights Act and provincial human rights legislation.
              </p>
              <p>
                <strong>Privacy:</strong> We are committed to protecting your privacy. View our{' '}
                <a href="#" className="text-green-400 hover:text-green-300 underline">Privacy Policy</a> for details on how we collect, use, and protect your information.
              </p>
            </div>
          </div>

          {/* Copyright and Legal Links */}
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              © 2024 MortgageLink Canada. All rights reserved. Licensed brokerage.
            </p>
            <div className="mt-4 sm:mt-0 text-xs sm:text-sm text-gray-400 text-center sm:text-right">
              <span>Privacy Policy | Terms of Service | Licensing</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 