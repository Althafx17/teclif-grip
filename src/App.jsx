import Header from './components/Header';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import Services from './components/Services';
import Experience from './components/Experience';
import Values from './components/Values';
import Process from './components/Process';
import CtaBand from './components/CtaBand';
import Booking from './components/Booking';
import Footer from './components/Footer';
import StickyCta from './components/StickyCta';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Ticker />
        <Services />
        <Experience />
        <Values />
        <Process />
        <CtaBand />
        <Booking />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
