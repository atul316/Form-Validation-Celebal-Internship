import React from 'react';
import { useLocation } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const { formData } = location.state;

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-600 p-4">
      <div className="w-full max-w-lg bg-slate-300 p-8 shadow-lg rounded-xl">
        <h2 className="text-3xl font-bold mb-6 text-green-500">Form Submitted Successfully!</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-red-500 underline mb-2">Submitted Data :</h3>
          <ul>
            {Object.entries(formData).map(([key, value]) => (
              <li key={key} className="text-gray-700">
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Success;