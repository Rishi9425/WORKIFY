import React from 'react';
import { FiUploadCloud } from 'react-icons/fi';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-blue-600 py-16">
      <div className="container mx-auto px-4 text-center">
        <FiUploadCloud className="mx-auto text-white w-16 h-16 mb-4" />
        <h2 className="text-4xl font-bold text-white">Welcome to Your Dashboard</h2>
        <p className="mt-4 text-lg text-gray-200">
          Manage file uploads and track job statuses in real time with ease.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
