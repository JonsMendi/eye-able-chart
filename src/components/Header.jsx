import React from 'react';
import logo from '../assets/eye-able-logo.jpeg';

/**
 * This function renders the header with the Eye-Able logo, description and the access to is own website.
 */
function Header() {
  return (
    <header className="flex justify-between items-center bg-black p-4">
      <div className="flex items-center bg-black">
        <a
          href="https://eye-able.com/en/"
          className="bg-black"
          target="_blank"
          alt="link to eye-able website"
          rel="noreferrer"
        >
          <img src={logo} alt="Eye-Able logo" className="h-8 mr-2 bg-black" />
        </a>
        <h1 className="text-white font-bold text-lg bg-black">
          Eye Able - Challenge
        </h1>
      </div>
    </header>
  );
}

export default Header;
