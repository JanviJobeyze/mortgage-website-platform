
import T1Photo from '../assets/T1.png';
import T2Photo from '../assets/T2.png';
import T3Photo from '../assets/T3.png';
import StarIcon from '../assets/Star.png';
import CorrectIcon from '../assets/Correct.png';
import { useEffect } from 'react';

function About() {

  // SEO Meta Tags for About Page
  useEffect(() => {
    // Store original meta tags
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const originalOgTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
    const originalOgDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content');
    const originalOgUrl = document.querySelector('meta[property="og:url"]')?.getAttribute('content');
    const originalTwitterTitle = document.querySelector('meta[name="twitter:title"]')?.getAttribute('content');
    const originalTwitterDescription = document.querySelector('meta[name="twitter:description"]')?.getAttribute('content');
    
    // Set About page specific meta tags
    document.title = "About Our Team | Licensed Mortgage Professionals in Canada";
    
    // Update description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Meet our team of licensed mortgage professionals with expertise across Canada. Emily Rodriguez, Jessica Thompson, and Michael Anderson provide expert mortgage guidance for first-time buyers, refinancing, and commercial lending.');
    }
    
    // Update keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'mortgage team Canada, licensed mortgage brokers, Emily Rodriguez mortgage broker, Jessica Thompson mortgage specialist, Michael Anderson commercial mortgages, FSRA licensed, NMLS certified, Ontario mortgage team, BC mortgage specialists, mortgage professionals Canada');
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'About Our Team | Licensed Mortgage Professionals in Canada');
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Meet our team of licensed mortgage professionals with expertise across Canada. Expert guidance for first-time buyers, refinancing, and commercial lending.');
    }
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', window.location.href);
    }
    
    // Add og:type for About page
    let ogType = document.querySelector('meta[property="og:type"]');
    if (!ogType) {
      ogType = document.createElement('meta');
      ogType.setAttribute('property', 'og:type');
      document.head.appendChild(ogType);
    }
    ogType.setAttribute('content', 'profile');
    
    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', 'About Our Team | Licensed Mortgage Professionals in Canada');
    }
    
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', 'Meet our team of licensed mortgage professionals with expertise across Canada. Expert guidance for first-time buyers, refinancing, and commercial lending.');
    }
    
    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href);
    
    // Add structured data for Organization/Team
    let structuredData = document.querySelector('#about-structured-data');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.setAttribute('type', 'application/ld+json');
      structuredData.setAttribute('id', 'about-structured-data');
      document.head.appendChild(structuredData);
    }
    
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "MortgageLink Canada",
      "url": window.location.origin,
      "description": "Licensed mortgage brokerage serving Canadian families with expert guidance and trusted solutions",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "CA"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Canada"
      },
      "serviceType": "Mortgage Broker",
      "employee": [
        {
          "@type": "Person",
          "name": "Emily Rodriguez",
          "jobTitle": "Senior Mortgage Broker",
          "description": "With over 15 years in mortgage lending, Emily specializes in first-time home buyers and complex financing solutions across Ontario and Quebec.",
          "knowsAbout": ["First-Time Buyers", "Quebec Mortgages", "Complex Financing"],
          "identifier": "NMLS# 123456"
        },
        {
          "@type": "Person",
          "name": "Jessica Thompson",
          "jobTitle": "Mortgage Specialist",
          "description": "Jessica brings 8 years of experience in residential mortgages and refinancing, with expertise in BC and Alberta markets.",
          "knowsAbout": ["Refinancing", "Investment Properties", "BC Mortgages"],
          "identifier": "NMLS# 234567"
        },
        {
          "@type": "Person",
          "name": "Michael Anderson",
          "jobTitle": "Commercial Mortgage Advisor",
          "description": "Michael focuses on commercial lending and business mortgages, helping entrepreneurs and investors achieve their property goals.",
          "knowsAbout": ["Commercial Lending", "Business Mortgages", "Investment Strategy"],
          "identifier": "NMLS# 345678"
        }
      ],
      "hasCredential": [
        "FSRA Licensed",
        "OSFI Approved", 
        "NMLS Certified",
        "EHO Member"
      ]
    };
    
    structuredData.textContent = JSON.stringify(organizationSchema);
    
    // Cleanup function to restore original meta tags when component unmounts
    return () => {
      document.title = originalTitle;
      
      if (originalDescription && metaDescription) {
        metaDescription.setAttribute('content', originalDescription);
      }
      
      if (originalOgTitle && ogTitle) {
        ogTitle.setAttribute('content', originalOgTitle);
      }
      
      if (originalOgDescription && ogDescription) {
        ogDescription.setAttribute('content', originalOgDescription);
      }
      
      if (originalOgUrl && ogUrl) {
        ogUrl.setAttribute('content', originalOgUrl);
      }
      
      if (originalTwitterTitle && twitterTitle) {
        twitterTitle.setAttribute('content', originalTwitterTitle);
      }
      
      if (originalTwitterDescription && twitterDescription) {
        twitterDescription.setAttribute('content', originalTwitterDescription);
      }
      
      // Remove About page specific elements
      const aboutStructuredData = document.querySelector('#about-structured-data');
      if (aboutStructuredData) {
        aboutStructuredData.remove();
      }
    };
  }, []);

  // Team members data
  const teamMembers = [
    {
      name: "Emily Rodriguez",
      title: "Senior Mortgage Broker",
      nmls: "NMLS# 123456",
      photo: T1Photo,
      bio: "With over 15 years in mortgage lending, Emily specializes in first-time home buyers and complex financing solutions across Ontario and Quebec.",
      specialties: ["First-Time Buyers", "Quebec Mortgages", "Complex Financing"]
    },
    {
      name: "Jessica Thompson",
      title: "Mortgage Specialist",
      nmls: "NMLS# 234567",
      photo: T2Photo,
      bio: "Jessica brings 8 years of experience in residential mortgages and refinancing, with expertise in BC and Alberta markets.",
      specialties: ["Refinancing", "Investment Properties", "BC Mortgages"]
    },
    {
      name: "Michael Anderson",
      title: "Commercial Mortgage Advisor",
      nmls: "NMLS# 345678",
      photo: T3Photo,
      bio: "Michael focuses on commercial lending and business mortgages, helping entrepreneurs and investors achieve their property goals.",
      specialties: ["Commercial Lending", "Business Mortgages", "Investment Strategy"]
    }
  ];

  // Awards and certifications data
  const awards = [
    {
      title: "Top Mortgage Broker 2023",
      organization: "Canadian Mortgage Awards",
      year: "2023",
      description: "Recognized for outstanding customer service and loan volume"
    },
    {
      title: "Excellence in Customer Service",
      organization: "Mortgage Professionals Canada",
      year: "2022",
      description: "Award for maintaining 98% customer satisfaction rating"
    },
    {
      title: "Licensed Mortgage Broker",
      organization: "FSRA Ontario",
      year: "2020-2025",
      description: "Full regulatory compliance and licensing across Ontario"
    },
    {
      title: "Certified Mortgage Specialist",
      organization: "Canadian Institute of Mortgage Brokers",
      year: "2021",
      description: "Advanced certification in mortgage lending practices"
    }
  ];

  return (
    <div className="min-h-screen">
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-1000 { animation-delay: 1.0s; }
        .animation-delay-1200 { animation-delay: 1.2s; }
        .animation-delay-1400 { animation-delay: 1.4s; }
        .animation-delay-1600 { animation-delay: 1.6s; }
        .animation-delay-1800 { animation-delay: 1.8s; }
        .animation-delay-2000 { animation-delay: 2.0s; }
        .animation-delay-2200 { animation-delay: 2.2s; }
        .animation-delay-2400 { animation-delay: 2.4s; }
        .animation-delay-2600 { animation-delay: 2.6s; }
        .animation-delay-2800 { animation-delay: 2.8s; }
        .animation-delay-3000 { animation-delay: 3.0s; }
        .animation-delay-3200 { animation-delay: 3.2s; }
        .animation-delay-3400 { animation-delay: 3.4s; }
        .animation-delay-3600 { animation-delay: 3.6s; }
        .animation-delay-3800 { animation-delay: 3.8s; }
        .animation-delay-4000 { animation-delay: 4.0s; }
        .animation-delay-4200 { animation-delay: 4.2s; }
        .animation-delay-4400 { animation-delay: 4.4s; }
        .animation-delay-4600 { animation-delay: 4.6s; }
        .animation-delay-4800 { animation-delay: 4.8s; }
      `}</style>

      {/* Hero Section */}
      <section className="bg-[#C8E6C9] py-8 sm:py-12 md:py-16 px-4 animate-fade-in">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-[#FFE0B2] text-[#E65100] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium inline-flex items-center w-fit mb-6 animate-fade-in animation-delay-200">
            <img src={StarIcon} alt="Star" className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            <span className="whitespace-nowrap">Licensed & Regulated Mortgage Professionals</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#374151] leading-tight mb-6 animate-fade-in animation-delay-400">
            About <span className="text-[#1B5E20]">Our Team</span>
          </h1>
          
          <p className="text-[#374151] text-base sm:text-lg max-w-3xl mx-auto leading-relaxed animate-fade-in animation-delay-600">
            We're a team of licensed mortgage professionals dedicated to helping Canadian families 
            achieve their homeownership dreams with expert guidance and competitive rates.
          </p>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4 bg-[#FFFFFF] animate-fade-in animation-delay-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in animation-delay-1000">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#212121] mb-4">Our Story</h2>
            <p className="text-[#757575] text-sm sm:text-base max-w-2xl mx-auto">
              Founded on the principle that every Canadian deserves access to excellent mortgage advice
            </p>
          </div>

          {/* Mission, Vision, Values Grid */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {/* Mission Card */}
              <div className="bg-[#FFFFFF] rounded-lg shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300 animate-fade-in animation-delay-1200">
                <div className="text-center mb-6">
                  <div className="bg-[#1B5E20] text-[#FFFFFF] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#212121] mb-4">Our Mission</h3>
                </div>
                <p className="text-[#757575] leading-relaxed text-sm sm:text-base text-center">
                  To provide exceptional mortgage services that empower Canadian families to achieve their 
                  homeownership goals. We combine industry expertise with personalized service to ensure 
                  every client receives the best possible mortgage solution tailored to their unique needs 
                  and financial circumstances.
                </p>
              </div>

              {/* Vision Card */}
              <div className="bg-[#FFFFFF] rounded-lg shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300 animate-fade-in animation-delay-1400">
                <div className="text-center mb-6">
                  <div className="bg-[#FF6F00] text-[#FFFFFF] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#212121] mb-4">Our Vision</h3>
                </div>
                <p className="text-[#757575] leading-relaxed text-sm sm:text-base text-center">
                  To be Canada's most trusted mortgage brokerage, known for our integrity, expertise, and 
                  commitment to client success. We envision a future where every Canadian has access to 
                  transparent, competitive mortgage solutions that help build stronger communities and 
                  brighter financial futures.
                </p>
              </div>

              {/* Values Card */}
              <div className="bg-[#FFFFFF] rounded-lg shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300 md:col-span-2 lg:col-span-1 animate-fade-in animation-delay-1600">
                <div className="text-center mb-6">
                  <div className="bg-[#E65100] text-[#FFFFFF] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#212121] mb-4">Our Values</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <img src={CorrectIcon} alt="Checkmark" className="w-4 h-4 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-[#212121] mb-1 text-sm">Integrity</h4>
                      <p className="text-[#757575] text-xs">Honest, transparent advice in every interaction</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <img src={CorrectIcon} alt="Checkmark" className="w-4 h-4 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-[#212121] mb-1 text-sm">Excellence</h4>
                      <p className="text-[#757575] text-xs">Continuous improvement and professional growth</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <img src={CorrectIcon} alt="Checkmark" className="w-4 h-4 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-[#212121] mb-1 text-sm">Client-First</h4>
                      <p className="text-[#757575] text-xs">Your success is our primary focus</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <img src={CorrectIcon} alt="Checkmark" className="w-4 h-4 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-[#212121] mb-1 text-sm">Innovation</h4>
                      <p className="text-[#757575] text-xs">Embracing technology for better service</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-8 md:py-12 px-4 bg-[#E8F5E8] animate-fade-in animation-delay-1800">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-10 animate-fade-in animation-delay-2000">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#212121] mb-3">Meet Our Team</h2>
            <p className="text-[#757575] text-sm md:text-base max-w-2xl mx-auto">
              Licensed mortgage professionals with expertise across Canada's major markets
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {teamMembers.map((member, index) => {
              const delayClass = index === 0 ? 'animation-delay-2200' : index === 1 ? 'animation-delay-2400' : 'animation-delay-2600';
              return (
                <div key={index} className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#E5E7EB]/50 h-full flex flex-col animate-fade-in ${delayClass}`}>
                {/* Decorative Background Element */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#1B5E20]/5 to-[#FF6F00]/5 rounded-full -translate-y-10 translate-x-10"></div>
                
                <div className="relative p-4 md:p-5 flex flex-col flex-1">
                  {/* Profile Header */}
                  <div className="text-center mb-4">
                    <div className="relative inline-block mb-3">
                      <div className="w-16 h-16 md:w-18 md:h-18 rounded-full overflow-hidden shadow-lg ring-2 ring-white mx-auto">
                        <img 
                          src={member.photo} 
                          alt={member.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Active Status Indicator */}
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#1B5E20] rounded-full flex items-center justify-center shadow-md">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    
                    <h3 className="text-lg md:text-xl font-bold text-[#212121] mb-1">
                      {member.name}
                    </h3>
                    <p className="text-[#1B5E20] font-semibold text-sm mb-2">
                      {member.title}
                    </p>
                    
                    {/* NMLS Badge */}
                    <div className="inline-flex items-center bg-gradient-to-r from-[#FFE0B2] to-[#FFF3E0] text-[#E65100] px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {member.nmls}
                    </div>
                  </div>
                  
                  {/* Content Area - takes available space */}
                  <div className="flex-1 flex flex-col">
                    {/* Bio Section */}
                    <div className="mb-4">
                      <p className="text-[#757575] text-sm leading-relaxed text-center">
                        {member.bio}
                      </p>
                    </div>
                    
                    {/* Specialties Section */}
                    <div className="mb-4 flex-1">
                      <div className="flex items-center justify-center mb-3">
                        <div className="w-2 h-2 bg-[#1B5E20] rounded-full mr-2"></div>
                        <h4 className="font-semibold text-[#212121] text-sm">Areas of Expertise</h4>
                      </div>
                      <div className="flex flex-wrap gap-1.5 justify-center">
                        {member.specialties.map((specialty, specIndex) => (
                          <span 
                            key={specIndex} 
                            className="inline-flex items-center bg-gradient-to-r from-[#E8F5E8] to-[#F1F8E9] text-[#1B5E20] px-2.5 py-1 rounded-lg text-xs font-medium border border-[#1B5E20]/10"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  

                </div>
              </div>
            );
            })}
          </div>
        </div>
      </section>

      {/* Awards & Certifications Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4 bg-[#FFFFFF] animate-fade-in animation-delay-2800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in animation-delay-3000">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#212121] mb-4">Awards & Certifications</h2>
            <p className="text-[#757575] text-sm sm:text-base max-w-2xl mx-auto">
              Recognition for excellence in mortgage services and professional achievements
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {awards.map((award, index) => {
              // Alternate between green and orange accent colors
              const isEven = index % 2 === 0;
              const accentColor = isEven ? '#1B5E20' : '#FF6F00';
              const lightAccent = isEven ? '#E8F5E8' : '#FFF3E0';
              const darkAccent = isEven ? '#2E7D32' : '#E65100';
              const delayClasses = ['animation-delay-3200', 'animation-delay-3400', 'animation-delay-3600', 'animation-delay-3800'];
              const delayClass = delayClasses[index] || 'animation-delay-3800';
              
              return (
                <div key={index} className={`group relative animate-fade-in ${delayClass}`}>
                  {/* Main Card */}
                  <div className="relative bg-white rounded-lg border-l-4 sm:border-l-8 border-[#F5F5F5] hover:border-l-8 shadow-md hover:shadow-xl transition-all duration-300 pl-4 sm:pl-8 pr-4 sm:pr-6 py-4 sm:py-6 lg:py-8" 
                       style={{ 
                         borderLeftColor: isEven ? '#1B5E20' : '#FF6F00' 
                       }}>
                    
                    {/* Content */}
                    <div className="space-y-4">
                      {/* Award Title with Year */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#212121] leading-tight group-hover:text-[#1B5E20] transition-colors duration-300">
                          {award.title}
                        </h3>
                        <span className="text-[#757575] text-sm sm:text-base font-medium self-start sm:self-auto">
                          {award.year}
                        </span>
                      </div>
                      
                      {/* Organization with elegant typography */}
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#E5E7EB] hidden sm:block"></div>
                        <p className="text-sm sm:text-base lg:text-lg font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full"
                           style={{ 
                             color: accentColor,
                             backgroundColor: lightAccent 
                           }}>
                          {award.organization}
                        </p>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#E5E7EB] hidden sm:block"></div>
                      </div>
                      
                      {/* Description with elegant styling */}
                      <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b opacity-30 rounded-full"
                             style={{ 
                               background: `linear-gradient(to bottom, ${accentColor}, ${darkAccent})` 
                             }}>
                        </div>
                        <blockquote className="pl-6 text-[#757575] text-base leading-relaxed italic">
                          "{award.description}"
                        </blockquote>
                      </div>
                    </div>
                    
                
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance & Regulatory Section */}
      <section className="py-16 px-4 bg-[#F8F9FA] animate-fade-in animation-delay-4000">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in animation-delay-4200">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#212121] mb-4">Compliance & Regulation</h2>
            <p className="text-[#757575] text-lg max-w-3xl mx-auto leading-relaxed">
              Fully licensed and regulated mortgage professionals ensuring the highest standards of service and compliance
            </p>
          </div>
          
          {/* Certifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 animate-fade-in animation-delay-4400">
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-[#212121] mb-3">FSRA Licensed</h3>
              <p className="text-[#757575] text-sm mb-4">Ontario's Financial Services Regulatory Authority</p>
              <div className="bg-[#E8F5E8] rounded-md p-3">
                <span className="text-[#1B5E20] font-medium text-sm">Full Regulatory Compliance</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-[#212121] mb-3">OSFI Approved</h3>
              <p className="text-[#757575] text-sm mb-4">Office of the Superintendent of Financial Institutions</p>
              <div className="bg-[#E8F5E8] rounded-md p-3">
                <span className="text-[#1B5E20] font-medium text-sm">Federal Regulatory Oversight</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-[#212121] mb-3">NMLS Certified</h3>
              <p className="text-[#757575] text-sm mb-4">Nationwide Mortgage Licensing System</p>
              <div className="bg-[#E8F5E8] rounded-md p-3">
                <span className="text-[#1B5E20] font-medium text-sm">Nationwide Licensing</span>
              </div>
            </div>
          </div>
          
          {/* Additional Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 animate-fade-in animation-delay-4600">
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h4 className="text-base font-semibold text-[#212121] mb-2">EHO Member</h4>
              <p className="text-[#757575] text-sm">Equal Housing Opportunity</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h4 className="text-base font-semibold text-[#212121] mb-2">Insured & Bonded</h4>
              <p className="text-[#757575] text-sm">$1M Professional Coverage</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h4 className="text-base font-semibold text-[#212121] mb-2">MPC Member</h4>
              <p className="text-[#757575] text-sm">Mortgage Professionals Canada</p>
            </div>
          </div>
          
          {/* Commitment Section */}
          <div className="bg-white rounded-lg shadow-sm p-8 animate-fade-in animation-delay-4800">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-[#212121] mb-4">Our Commitment to Excellence</h3>
              <p className="text-[#757575] text-base max-w-3xl mx-auto">
                We maintain the highest standards of professional conduct and regulatory compliance
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-[#1B5E20] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-base font-semibold text-[#212121] mb-1">Full Regulatory Compliance</h4>
                    <p className="text-[#757575] text-sm leading-relaxed">Licensed across all provinces we serve with complete regulatory adherence</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-[#1B5E20] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-base font-semibold text-[#212121] mb-1">Continuing Education</h4>
                    <p className="text-[#757575] text-sm leading-relaxed">Regular training and certification updates to maintain expertise</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-[#1B5E20] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-base font-semibold text-[#212121] mb-1">Privacy Protection</h4>
                    <p className="text-[#757575] text-sm leading-relaxed">PIPEDA compliant data handling and client information security</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-[#1B5E20] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-base font-semibold text-[#212121] mb-1">Ethical Standards</h4>
                    <p className="text-[#757575] text-sm leading-relaxed">Adherence to industry best practices and professional ethics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About; 