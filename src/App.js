import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EducationCertifications from './components/EducationCertifications';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Background from './components/Background';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="relative bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Background Component */}
        <Background />

        {/* Main Content */}
        <div className="relative z-10">
          <Navbar />
          {/* Home Section (Hero Component) */}
          <section id="home">
            <Hero />
          </section>
          {/* Education & Certifications Section */}
          <section id="education-certifications">
            <EducationCertifications />
          </section>
          {/* Skills Section */}
          <section id="skills">
            <Skills />
          </section>
          {/* Projects Section */}
          <section id="projects">
            <Projects />
          </section>
          {/* Contact Section */}
          <section id="contact">
            <Contact />
          </section>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;