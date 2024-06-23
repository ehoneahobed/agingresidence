"use client"
import React, { useState } from 'react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message || 'Failed to subscribe');
      if (res.ok) {
        setEmail('');
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setMessage('Failed to subscribe');
    }
  };

  return (
    <section className="py-12 bg-teal-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold">Join Our Newsletter</h2>
        <p className="mt-4 text-lg">Stay updated with the latest news and offers from our communities. Subscribe now!</p>
        <form className="mt-8 sm:flex sm:justify-center" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          />
          <button
            type="submit"
            className="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto px-5 py-3 bg-white text-teal-600 rounded-lg font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          >
            Subscribe
          </button>
        </form>
        {message && <p className="mt-4 text-lg">{message}</p>}
      </div>
    </section>
  );
};

export default Newsletter;
