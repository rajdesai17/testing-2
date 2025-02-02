import React, { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'react-hot-toast';

const BookingForm = ({ tourId, tourName, maxPeople, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    leaderName: '',
    email: '',
    phone: '',
    numberOfPeople: '1'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.phone || !formData.leaderName) {
      toast.error('Please fill all required fields');
      return;
    }

    if (parseInt(formData.numberOfPeople) > maxPeople) {
      toast.error(`Maximum ${maxPeople} people allowed for this tour`);
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Book Tour: {tourName}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Leader Name</label>
            <input
              type="text"
              value={formData.leaderName}
              onChange={(e) => setFormData(prev => ({ ...prev, leaderName: e.target.value }))}
              className="w-full p-2 border rounded-lg focus:border-orange-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full p-2 border rounded-lg focus:border-orange-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full p-2 border rounded-lg focus:border-orange-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Number of People</label>
            <input
              type="number"
              min="1"
              max={maxPeople}
              value={formData.numberOfPeople}
              onChange={(e) => setFormData(prev => ({ ...prev, numberOfPeople: e.target.value }))}
              className="w-full p-2 border rounded-lg focus:border-orange-500 outline-none"
              required
            />
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;