// navbar

import Link from "next/link";
import React from "react";


const NavBar: React.FC = () => {
    return (
        <nav className="flex items-center justify-between p-4 shadow-md bg-white">
          <div className="flex items-center pl-24">
            {/* <img src="#" alt="Aging Residence Logo" className="h-8 mr-2" /> */}
            <span className="text-xl font-bold text-gray-900">Aging Residence</span>
          </div>
          <div className="flex items-center pr-24 space-x-4">
            <Link href="/" className="text-gray-900 hover:text-primary">Home
            </Link>
            <Link href="#" className="text-gray-900 hover:text-primary">All Listings</Link>
            <Link href="#" className="text-gray-900 hover:text-primary">Categories</Link>
            {/* <div className="relative group">
              <button className="text-gray-900 hover:text-red-500">Categories</button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg">
                <Link href="#" className="block px-4 py-2 text-gray-900 hover:bg-gray-100">Page 1</Link>
                <Link href="#" className="block px-4 py-2 text-gray-900 hover:bg-gray-100">Page 2</Link>
              </div>
            </div>
            <div className="relative group">
              <button className="text-gray-900 hover:text-red-500">Cities</button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg">
                <Link href="/city1" className="block px-4 py-2 text-gray-900 hover:bg-gray-100">City 1</Link>
                <Link href="/city2" className="block px-4 py-2 text-gray-900 hover:bg-gray-100">City 2              </Link>
              </div>
            </div> */}
            {/* <div className="relative group">
              <button className="text-gray-900 hover:text-primary">Experiences</button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg">
                <Link href="/experience1" className="block px-4 py-2 text-gray-900 hover:bg-gray-100">Experience 1</Link>
                <Link href="/experience2" className="block px-4 py-2 text-gray-900 hover:bg-gray-100">Experience 2
                </Link>
              </div>
            </div> */}
          </div>
          {/* <div className="flex items-center space-x-4">
            <div className="text-red-500 cursor-pointer">
              <span>Cart (0)</span>
            </div>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              Explore experiences
            </button>
          </div> */}
        </nav>
      );
};

export default NavBar;