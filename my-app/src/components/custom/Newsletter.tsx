import React from 'react';

const Newsletter: React.FC = () => {
  return (
    <section className="py-12 bg-teal-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold">Join Our Newsletter</h2>
        <p className="mt-4 text-lg">Stay updated with the latest news and offers from our communities. Subscribe now!</p>
        <form className="mt-8 sm:flex sm:justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-5 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          />
          <button
            type="submit"
            className="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto px-5 py-3 bg-white text-teal-600 rounded-lg font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
