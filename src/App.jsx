import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import Home from './pages/Home';
import AIVision from './pages/AIVision';
import NexusOS from './pages/NexusOS';
// import BioInfrastructure from './pages/BioInfrastructure';
import SupplyChain from './pages/SupplyChain';
import MetalRecovery from './pages/MetalRecovery';
import Partners from './pages/Partners';

function App() {
  return (
    <Router>
      <ParticleBackground />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai-vision" element={<AIVision />} />
          <Route path="/nexus" element={<NexusOS />} />
          {/* <Route path="/bio-infrastructure" element={<BioInfrastructure />} /> */}
          <Route path="/supply-chain" element={<SupplyChain />} />
          <Route path="/metal-recovery" element={<MetalRecovery />} />
          <Route path="/partners" element={<Partners />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
