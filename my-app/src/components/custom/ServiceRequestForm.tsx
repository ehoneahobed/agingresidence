import React, { useState } from 'react';

interface ServiceRequestFormProps {
  listingId: number;
  onSubmitSuccess: (message: string) => void;
  onSubmitError: (message: string) => void;
}

const ServiceRequestForm: React.FC<ServiceRequestFormProps> = ({ listingId, onSubmitSuccess, onSubmitError }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    zipCode: '',
    phone: '',
    careNeeded: '',
    relationToResident: '',
    moveInDate: '',
    budget: '',
  });
  const [formError, setFormError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/service-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          listingId,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit service request');
      }

      onSubmitSuccess('Your request has been submitted successfully.');
      setFormError(null);
      setFormData({
        fullName: '',
        email: '',
        zipCode: '',
        phone: '',
        careNeeded: '',
        relationToResident: '',
        moveInDate: '',
        budget: '',
      });
    } catch (error: any) {
      onSubmitError(error.message);
      setFormError(error.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Find the Perfect Assisted Living Community</h2>
      <p className="text-gray-600 mb-4">Connect with top-rated assisted living facilities. Fill out the form below to get started!</p>
      {formError && <p className="text-red-500">{formError}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
          <input type="text" id="full-name" name="fullName" value={formData.fullName} onChange={handleInputChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="zip-code" className="block text-sm font-medium text-gray-700">Zip Code <span className="text-red-500">*</span></label>
            <input type="text" id="zip-code" name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="care-needed" className="block text-sm font-medium text-gray-700">Care Needed</label>
            <select id="care-needed" name="careNeeded" value={formData.careNeeded} onChange={handleInputChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm">
              <option value="">Select Care Needed</option>
              <option value="assistedLiving">Assisted Living</option>
              <option value="memoryCare">Memory Care</option>
              <option value="independentLiving">Independent Living</option>
              <option value="nursingHome">Nursing Home</option>
              <option value="respiteCare">Respite Care</option>
              <option value="hospiceCare">Hospice Care</option>
            </select>
          </div>
          <div>
            <label htmlFor="relation-to-resident" className="block text-sm font-medium text-gray-700">Relation to Resident</label>
            <select id="relation-to-resident" name="relationToResident" value={formData.relationToResident} onChange={handleInputChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm">
              <option value="">Select Relation</option>
              <option value="self">Self</option>
              <option value="spouse">Spouse</option>
              <option value="child">Child</option>
              <option value="otherRelative">Other Relative</option>
              <option value="friend">Friend</option>
              <option value="professional">Professional</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="move-in-date" className="block text-sm font-medium text-gray-700">Expected Move-in Date</label>
            <input type="date" id="move-in-date" name="moveInDate" value={formData.moveInDate} onChange={handleInputChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget</label>
            <select id="budget" name="budget" value={formData.budget} onChange={handleInputChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm">
              <option value="">Select Budget</option>
              <option value="lessThan5000">Less than $5000</option>
              <option value="5000to10000">$5000 to $10000</option>
              <option value="10000to15000">$10000 to $15000</option>
              <option value="15000to20000">$15000 to $20000</option>
              <option value="moreThan20000">More than $20000</option>
            </select>
          </div>
        </div>
        <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Submit</button>
      </form>
    </div>
  );
};

export default ServiceRequestForm;
