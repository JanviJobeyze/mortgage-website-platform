import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import ScrollToTop from './components/ScrollToTop';
import VoiceReader from './components/VoiceReader';
import SmartLoadingFallback from './components/SmartLoadingFallback';
import PageTracker from './components/PageTracker';
import { preloadAllLazyComponents } from './utils/preloadUtils';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import HomePurchase from './pages/HomePurchase';
import Refinancing from './pages/Refinancing';
import HomeEquity from './pages/HomeEquity';
import Calculator from './pages/Calculator';
import News from './pages/News';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Results from './pages/Results';
import LearningCentre from './pages/LearningCentre';
import Apply from './pages/apply';
import TestAPI from './pages/TestAPI';
import Privacy from './pages/privacy';
import Terms from './pages/terms';
import Accessibility from './pages/accessibility';
import EligibilityQuiz from './pages/EligibilityQuiz';
import FirstTimeHomeBuyer from './pages/FirstTimeHomeBuyer';
import './App.css';

// Lazy load components for code splitting
const Rates = lazy(() => import('./pages/Rates'));
const PreQualQuiz = lazy(() => import('./pages/PreQualQuiz'));
const ComponentDemo = lazy(() => import('./pages/ComponentDemo'));



// Prefetch utility function
const prefetchRoute = (path) => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = path;
  link.as = 'document';
  document.head.appendChild(link);
  
  // Clean up after a short delay
  setTimeout(() => {
    if (document.head.contains(link)) {
      document.head.removeChild(link);
    }
  }, 1000);
};

function App() {
  // Prefetch key routes and preload lazy components on app load
  useEffect(() => {
    // Prefetch the most important routes for better performance
    const keyRoutes = ['/rates', '/calculator', '/pre-qualify', '/apply'];
    
    // Use requestIdleCallback for better performance, fallback to setTimeout
    const schedulePrefetch = (callback) => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(callback);
      } else {
        setTimeout(callback, 1000);
      }
    };
    
    schedulePrefetch(() => {
      // Prefetch routes
      keyRoutes.forEach(route => {
        prefetchRoute(route);
      });
      
      // Preload lazy components in the background
      preloadAllLazyComponents();
    });
  }, []);

  return (
    <Router>
      <PageTracker />
      <ScrollToTop />
      <div className="min-h-screen bg-white flex flex-col">
        <Navigation />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/home-purchase" element={<HomePurchase />} />
            <Route path="/services/refinancing" element={<Refinancing />} />
            <Route path="/services/home-equity" element={<HomeEquity />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route 
              path="/rates" 
              element={
                <Suspense fallback={<SmartLoadingFallback componentName="Rates" />}>
                  <Rates />
                </Suspense>
              } 
            />
            <Route path="/news" element={<News />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route 
              path="/pre-qualify" 
              element={
                <Suspense fallback={<SmartLoadingFallback componentName="Quiz" />}>
                  <PreQualQuiz />
                </Suspense>
              } 
            />
            <Route path="/results" element={<Results />} />
            <Route path="/learning-centre" element={<LearningCentre />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/eligibility-quiz" element={<EligibilityQuiz />} />
            <Route path="/first-time-home-buyer" element={<FirstTimeHomeBuyer />} />
            <Route path="/test-api" element={<TestAPI />} />
            <Route 
              path="/component-demo" 
              element={
                <Suspense fallback={<SmartLoadingFallback componentName="Component Demo" />}>
                  <ComponentDemo />
                </Suspense>
              } 
            />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/accessibility" element={<Accessibility />} />
          </Routes>
        </main>
        <Footer />
        <ChatBot />
        <VoiceReader />
      </div>
    </Router>
  );
}

export default App;
