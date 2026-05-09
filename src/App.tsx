import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import MapSection from './components/MapSection';
import ForShipper from './components/ForShipper';
import ForPro from './components/ForPro';
import ForClient from './components/ForClient';
import Business from './components/Business';
import Funding from './components/Funding';
import Founders from './components/Founders';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-[#040810] min-h-screen font-sans antialiased">
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <MapSection />
        <ForShipper />
        <ForPro />
        <ForClient />
        <Business />
        <Funding />
        <Founders />
      </main>
      <Footer />
    </div>
  );
}
