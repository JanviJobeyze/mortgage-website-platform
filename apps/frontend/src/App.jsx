import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import HomePurchase from './pages/HomePurchase';
import Refinancing from './pages/Refinancing';
import HomeEquity from './pages/HomeEquity';
import Calculator from './pages/Calculator';
import Rates from './pages/Rates';
import News from './pages/News';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import PreQualQuiz from './pages/PreQualQuiz';
import Results from './pages/Results';
import LearningCentre from './pages/LearningCentre';
import './App.css';

function App() {
  return (
    <Router>
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
            <Route path="/rates" element={<Rates />} />
            <Route path="/news" element={<News />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pre-qualify" element={<PreQualQuiz />} />
            <Route path="/results" element={<Results />} />
            <Route path="/learning-centre" element={<LearningCentre />} />
          </Routes>
        </main>
        <Footer />
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;
