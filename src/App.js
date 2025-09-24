import React from 'react';
import Header from './components/Header';
import Gallery from './components/Gallery';
import Structure from './components/Structure';
import Schedule from './components/Schedule';
import Messages from './components/Messages';
import Footer from './components/Footer';
import './App.css'; // Kita akan membuat file ini nanti

function App() {
  return (
    <div className="bg-white min-h-screen text-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <section id="gallery" className="my-12">
          <Gallery />
        </section>
        <div className="flex flex-col lg:flex-row gap-8 my-12">
          <section id="structure" className="lg:w-1/2">
            <Structure />
          </section>
          <section id="schedule" className="lg:w-1/2">
            <Schedule />
          </section>
        </div>
        <section id="messages" className="my-12">
          <Messages />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
