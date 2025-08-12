import React, { useState } from "react";
import Sidebar from './components/Sidebar/Sidebar'
import Content from './components/Main/Content'
// import LandingPage from './components/LandingPage'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CTA from './components/CTA'
import Footer from './components/Footer'
import AIFeatures from "./components/AIFeatures";
import Contact from "./components/Contact";

const App = () => {
  const [started, setStarted] = useState(false);
  return (
    <>
      {!started ? (
        <div className="flex w-full flex-col min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-slate-800 text-white">
          <Navbar />
          <Hero onGetStarted={() => setStarted(true)} />
          <AIFeatures/>
          <CTA />
          <Contact/>
          <Footer />
        </div>
      ) : (
        <div className="flex w-full min-h-screen">
          <Sidebar />
          <Content />
        </div>
      )}
    </>
  );
};

export default App