import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HomeLogo from '../assets/HomeLogo.png';
import TwitterIcon from '../assets/Twitter.png';
import LinkedInIcon from '../assets/LinkedIn.png';
import LocationIcon from '../assets/Location.png';
import EmailIcon from '../assets/Email.png';
import ContactIcon from '../assets/Contact.png';

function Footer() {
  const { t } = useTranslation('common');
  
  // Get current year for copyright
  const currentYear = new Date().getFullYear();
  const startYear = 2023;
  const copyrightYear = currentYear === startYear ? startYear : `${startYear}–${currentYear}`;
  
  return (
    <>
      {/* Skip Link - Visually hidden but visible on focus */}
      <a 
        href="#main" 
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
      >
        Skip to content
      </a>
      
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
                <span className="ml-2 text-xl font-semibold">{t('footer.brandName')}</span>
              </div>
              <p className="text-gray-300 mb-4 max-w-md text-sm sm:text-base">
                {t('footer.companyDescription')}
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <img src={TwitterIcon} alt="Twitter" className="h-6 w-6" loading="lazy" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <img src={LinkedInIcon} alt="LinkedIn" className="h-6 w-6" loading="lazy" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                    {t('header.home')}
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                    {t('header.loanServices')}
                  </Link>
                </li>
                <li>
                  <Link to="/calculator" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                    {t('header.calculator')}
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                    {t('header.about')}
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                    {t('header.faq')}
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                    {t('header.contact')}
                  </Link>
                </li>
                <li>
                  <Link to="/first-time-home-buyer" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                    First-Time Home Buyer
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">{t('footer.contactInfo')}</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <img src={ContactIcon} alt="Phone" className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" loading="lazy" />
                  <span className="text-gray-300 text-sm sm:text-base">{t('footer.phone')}</span>
                </div>
                <div className="flex items-center">
                  <img src={EmailIcon} alt="Email" className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" loading="lazy" />
                  <span className="text-gray-300 text-sm sm:text-base break-all">{t('footer.email')}</span>
                </div>
                <div className="flex items-start">
                  <img src={LocationIcon} alt="Location" className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 mt-1 flex-shrink-0" loading="lazy" />
                  <div className="text-gray-300 text-sm sm:text-base">
                    <p>{t('footer.address.line1')}</p>
                    <p>{t('footer.address.line2')}</p>
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
                    <strong>{t('footer.compliance.nmlsId')}</strong> {t('footer.compliance.nmlsNumber')} | {t('footer.compliance.licensedBy')}{' '}
                    <a href="#" className="text-green-400 hover:text-green-300 underline">
                      {t('footer.compliance.financialConsumerAgency')}
                    </a>
                  </p>
                  <p>
                    {t('footer.compliance.mortgageBrokerage')}{' '}
                    <a href="#" className="text-green-400 hover:text-green-300 underline">
                      {t('footer.compliance.mortgageBrokeragesAct')}
                    </a>
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="text-xs sm:text-sm text-gray-400 font-semibold">
                    {t('footer.compliance.equalHousing')}
                  </span>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 leading-relaxed">
                <p className="mb-2">
                  <strong>{t('footer.importantNotice.title')}</strong> {t('footer.importantNotice.content')}
                </p>
                <p className="mb-2">
                  <strong>{t('footer.equalHousing.title')}</strong> {t('footer.equalHousing.content')}
                </p>
                <p>
                  <strong>{t('footer.privacy.title')}</strong> {t('footer.privacy.content')}{' '}
                  <a href="#" className="text-green-400 hover:text-green-300 underline">{t('footer.privacy.privacyPolicy')}</a> {t('footer.privacy.forDetails')}
                </p>
              </div>
            </div>

            {/* Copyright and Legal Links */}
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
                © {copyrightYear} {t('footer.copyright')}
              </p>
              <div className="mt-4 sm:mt-0 text-xs sm:text-sm text-gray-400 text-center sm:text-right">
                <div className="flex flex-wrap justify-center sm:justify-end gap-4">
                  <Link to="/privacy" className="text-green-400 hover:text-green-300 transition-colors">
                    Privacy Policy
                  </Link>
                  <Link to="/terms" className="text-green-400 hover:text-green-300 transition-colors">
                    Terms of Use
                  </Link>
                  <Link to="/accessibility" className="text-green-400 hover:text-green-300 transition-colors">
                    Accessibility
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer; 