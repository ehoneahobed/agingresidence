import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p>
              We are dedicated to helping seniors find the best living communities that meet their needs and preferences.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <Link href="/" className="hover:text-teal-400">Home
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/about" className="hover:text-teal-400">About Us</Link>
              </li>
              <li className="mb-2">
                <Link href="/contact" className="hover:text-teal-400">Contact
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/privacy" className="hover:text-teal-400">Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul>
              <li className="mb-2">Email: info@agingresidence.com</li>
              <li className="mb-2">Phone: +1 234 567 890</li>
              <li className="mb-2">Address: 1234 Main St, Anytown, USA</li>
            </ul>
          </div>
          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-teal-400" aria-label="Facebook">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.437 9.878v-6.992H7.897v-2.886h2.54V9.76c0-2.508 1.492-3.89 3.777-3.89 1.095 0 2.239.195 2.239.195v2.46h-1.26c-1.243 0-1.632.771-1.632 1.562v1.876h2.773l-.443 2.886h-2.33v6.992C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="https://twitter.com" className="hover:text-teal-400" aria-label="Twitter">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M24 4.557a9.94 9.94 0 01-2.828.775 4.93 4.93 0 002.165-2.725c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 00-8.38 4.482C7.688 8.094 4.067 6.13 1.64 3.161c-.538.922-.847 1.993-.847 3.13 0 2.164 1.102 4.072 2.78 5.19a4.902 4.902 0 01-2.228-.616v.062a4.923 4.923 0 003.946 4.827 4.995 4.995 0 01-1.29.172c-.314 0-.615-.031-.916-.088a4.928 4.928 0 004.604 3.417 9.868 9.868 0 01-6.102 2.104c-.397 0-.79-.023-1.175-.067A13.94 13.94 0 007.548 22c9.058 0 14.01-7.504 14.01-14.009 0-.213 0-.426-.015-.637A10.025 10.025 0 0024 4.557z" />
                </svg>
              </a>
              <a href="https://instagram.com" className="hover:text-teal-400" aria-label="Instagram">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.331 3.608 1.306.975.975 1.244 2.242 1.306 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.331 2.633-1.306 3.608-.975.975-2.242 1.244-3.608 1.306-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.331-3.608-1.306-.975-.975-1.244-2.242-1.306-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.331-2.633 1.306-3.608.975-.975 2.242-1.244 3.608-1.306 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.258 0-3.667.014-4.947.072-1.285.059-2.528.34-3.507 1.319-.979.979-1.26 2.222-1.319 3.507-.058 1.28-.072 1.689-.072 4.947s.014 3.667.072 4.947c.059 1.285.34 2.528 1.319 3.507.979.979 2.222 1.26 3.507 1.319 1.28.058 1.689.072 4.947.072s3.667-.014 4.947-.072c1.285-.059 2.528-.34 3.507-1.319.979-.979 1.26-2.222 1.319-3.507.058-1.28.072-1.689.072-4.947s-.014-3.667-.072-4.947c-.059-1.285-.34-2.528-1.319-3.507-.979-.979-2.222-1.26-3.507-1.319-1.28-.058-1.689-.072-4.947-.072zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.124a3.962 3.962 0 110-7.924 3.962 3.962 0 010 7.924zm6.406-11.845a1.44 1.44 0 100-2.88 1.44 1.44 0 000 2.88z" />
                </svg>
              </a>
              <a href="https://linkedin.com" className="hover:text-teal-400" aria-label="LinkedIn">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.039-1.852-3.039-1.853 0-2.137 1.446-2.137 2.942v5.666h-3.554v-11.53h3.414v1.575h.048c.476-.9 1.635-1.85 3.366-1.85 3.596 0 4.257 2.367 4.257 5.448v6.357zm-15.856-13.287c-1.146 0-2.073-.929-2.073-2.073s.927-2.073 2.073-2.073 2.073.929 2.073 2.073-.929 2.073-2.073 2.073zm-1.779 13.287h3.557v-11.53h-3.557v11.53zm19.228-20.452h-18.447c-1.252 0-2.27 1.018-2.27 2.27v18.461c0 1.252 1.018 2.27 2.27 2.27h18.451c1.252 0 2.27-1.018 2.27-2.27v-18.461c-.003-1.252-1.018-2.27-2.274-2.27z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-400">&copy; 2024 Aging Residence. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
