import React from 'react';

interface ContactInformationProps {
  phone: string;
  website: string;
  address: string;
}

const ContactInformation: React.FC<ContactInformationProps> = ({ phone, website, address }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
      <p className="text-lg text-gray-600 mt-2"><span className="font-bold">Website:</span> <a href={website} className="text-teal-500 hover:underline">{website}</a></p>
      <p className="text-lg text-gray-600 mt-2"><span className="font-bold">Phone:</span> {phone}</p>
      <p className="text-lg text-gray-600 mt-2"><span className="font-bold">Address:</span> {address}</p>
    </div>
  );
};

export default ContactInformation;
