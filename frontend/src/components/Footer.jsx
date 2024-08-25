import React from 'react';

function Footer() {
  return (
    <footer className="bg-blue-800 text-white p-8 mt-12">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between">
          {/* Company Info */}
          <div className="w-full sm:w-1/3 text-center sm:text-left mb-6">
            <h2 className="text-xl font-semibold mb-2">EliteFocus</h2>
            <p className="text-sm text-gray-400">Making life better with EliteFocus Task Assistant.</p>
            <p className="text-sm text-gray-400 mt-2">We focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
          </div>
          
          {/* Links */}
          <div className="w-full sm:w-1/3 text-center mb-6">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="w-full sm:w-1/3 text-center sm:text-right mb-6">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="text-sm text-gray-400">123, KaamKaaj Street, Tech City</p>
            <p className="text-sm text-gray-400">Email: support@kaamkaaj.com</p>
            <p className="text-sm text-gray-400">Phone: +1 (555) 123-4567</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <div className="flex justify-center mb-4">
            {/* Social Media Icons */}
            <a href="#" className="mx-2 text-gray-400 hover:text-white"><i className="fab fa-facebook fa-lg"></i></a>
            <a href="#" className="mx-2 text-gray-400 hover:text-white"><i className="fab fa-twitter fa-lg"></i></a>
            <a href="#" className="mx-2 text-gray-400 hover:text-white"><i className="fab fa-linkedin fa-lg"></i></a>
            <a href="#" className="mx-2 text-gray-400 hover:text-white"><i className="fab fa-instagram fa-lg"></i></a>
          </div>

          <p className="text-sm text-gray-400">&copy; 2024 KaamKaaj. All Rights Reserved.</p>
          <p className="text-sm text-gray-400 mt-2">Built with ♥ using React and Spring Boot</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
