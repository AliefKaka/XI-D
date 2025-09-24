import React from 'react';

const Footer = () => {
  const socialMediaLink = "https://www.instagram.com/xi.dcarehealth?igsh=MWNwaWlwODRyNXVudg==";

  return (
    <footer className="bg-secondary-blue text-white py-6 mt-12">
      <div className="container mx-auto text-center">
        <p className="mb-2">Dibuat oleh: <span className="font-bold">ALIEF KAKA</span></p>
        <p className="mb-4">Dikelola oleh: <span className="font-semibold">Siswa XI-D Kesehatan</span></p>
        <a 
          href={socialMediaLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-white hover:underline transition-all duration-300"
        >
          Follow kami di Instagram
        </a>
      </div>
    </footer>
  );
};

export default Footer;
