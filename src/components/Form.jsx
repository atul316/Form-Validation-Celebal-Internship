import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    countryCode: '',
    phone: '',
    country: '',
    region: '',
    city: '',
    pan: '',
    aadhar: '',
  });
  const [errors, setErrors] = useState({});
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (val) => {
    setFormData({ ...formData, phone: val });
  };

  const handleCountryChange = (val) => {
    setFormData({ ...formData, country: val, region: '', city: '' });
  };

  const handleRegionChange = (val) => {
    setFormData({ ...formData, region: val, city: '' });
  };
  
  const handleCityChange = (val) => {
    setFormData({ ...formData, city: val });
  };

  const validate = (field, value) => {
    let error = '';

    if (field === 'firstName' && (!value || value.length < 3 || /\d/.test(value))) {
      error = 'First name must be at least 3 characters and not contain numbers';
    }
    if (field === 'lastName' && (!value || value.length < 3 || /\d/.test(value))) {
      error = 'Last name must be at least 3 characters and not contain numbers';
    }
    if (field === 'username' && (!value || value.length < 3)) {
      error = 'Username must be at least 3 characters';
    }
    if (field === 'email' && (!value || !/\S+@\S+\.\S+/.test(value))) {
      error = 'Email address is invalid';
    }
    if (
      field === 'password' &&
      (!value ||
        !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(value))
    ) {
      error =
        'Password must contain at least one uppercase, at least one lowercase, at least one number, and at least one special character';
    }
    if (field === 'phone' && (!value || value.length < 10 || value.length > 15)) {
      error = 'Phone number must be between 10 and 15 digits';
    }
    if (field === 'country' && !value) {
      error = 'Country is required';
    }
    if (field === 'region' && !value) {
      error = 'Region is required';
    }
    if (field === 'city' && !value) {
      error = 'city is required';
    }
    if (field === 'pan' && (!value || !/[A-Z0-9]{10}/.test(value))) {
      error = 'PAN must be a combination of uppercase characters and numbers';
    }
    if (field === 'aadhar' && (!value || !/^\d{12}$/.test(value))) {
      error = 'Aadhar number must be exactly 12 digits';
    }

    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    return error === '';
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validate(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.keys(formData).every((field) => validate(field, formData[field]));
    if (isValid) {
      navigate('/success', { state: { formData } });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-slate-600">
      <form className="w-full max-w-lg p-8 rounded-lg shadow-lg bg-slate-300" onSubmit={handleSubmit}>
        <h2 className="mb-6 text-3xl font-bold text-green-500 underline">Registration Form</h2>
        {[
          { name: 'firstName', label: 'First Name' },
          { name: 'lastName', label: 'Last Name' },
          { name: 'username', label: 'Username' },
          { name: 'email', label: 'Email' },
          //{ name: 'password', label: 'Password', type: passwordShown ? 'text' : 'password' },
          //{ name: 'pan', label: 'Pan No.' },
          //{ name: 'aadhar', label: 'Aadhar No.' },
        ].map(({ name, label, type = 'text' }) => (
          <div key={name} className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor={name}>
              {label}
            </label>
            <input
              type={type}
              name={name}
              id={name}
              value={formData[name]}
              onChange={handleChange}
              onBlur={handleBlur}
              onInput={(e) => {
                if (name === 'aadhar') {
                  e.target.value = e.target.value.replace(/\D/g, '');
                }
              }}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors[name] ? 'border-red-500' : ''
              }`}
            />
            {errors[name] && <p className="text-xs italic text-red-500">{errors[name]}</p>}
          </div>
        ))}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              type={passwordShown ? 'text' : 'password'}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.password ? 'border-red-500' : ''
              }`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 py-2"
              onClick={togglePasswordVisibility}
            >
              {passwordShown ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && <p className="text-xs italic text-red-500">{errors.password}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="phone">
            Phone No.
          </label>
          <div className="flex">
            <PhoneInput
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              defaultCountry="IN"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.phone ? 'border-red-500' : ''
              }`}
            />
          </div>
          {errors.phone && <p className="text-xs italic text-red-500">{errors.phone}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="country">
            Country
          </label>
          <CountryDropdown
            value={formData.country}
            onChange={(val) => handleCountryChange(val)}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.country ? 'border-red-500' : ''
            }`}
          />
          {errors.country && <p className="text-xs italic text-red-500">{errors.country}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="region">
            Region
          </label>
          <RegionDropdown
            country={formData.country}
            value={formData.region}
            onChange={(val) => handleRegionChange(val)}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.region ? 'border-red-500' : ''
            }`}
            disableWhenEmpty={true}
          />
          {errors.region && <p className="text-xs italic text-red-500">{errors.region}</p>}
        </div>
        <div>
        {[
          { name: 'pan', label: 'Pan No.' },
          { name: 'aadhar', label: 'Aadhar No.' },
        ].map(({ name, label, type = 'text' }) => (
          <div key={name} className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor={name}>
              {label}
            </label>
            <input
              type={type}
              name={name}
              id={name}
              value={formData[name]}
              onChange={handleChange}
              onBlur={handleBlur}
              onInput={(e) => {
                if (name === 'aadhar') {
                  e.target.value = e.target.value.replace(/\D/g, '');
                }
              }}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors[name] ? 'border-red-500' : ''
              }`}
            />
            {errors[name] && <p className="text-xs italic text-red-500">{errors[name]}</p>}
          </div>
        ))}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={Object.keys(errors).some((key) => errors[key])}
            className="px-4 py-2 font-bold text-white bg-red-400 rounded hover:bg-green-500 focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
