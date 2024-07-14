// AppraisalForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Layouts/AppraisalForm.css';
import apiService from './apiServiceAppraisal';

const AppraisalForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    photo: null,
    priceEstimate: '',
    status: 'waiting_admin',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, photo: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('itemName', formData.itemName);
    data.append('description', formData.description);
    data.append('photo', formData.photo);
    data.append('priceEstimate', formData.priceEstimate);
    data.append('status', formData.status);

    try {
      await apiService.createRequest(1, data);  // Assuming userId = 1 for example
      alert('Appraisal form submitted successfully!');
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="form-container">
      <h1>Jewelry Appraisal Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Item Name:
          <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} required />
        </label>
        <label>Description:
          <textarea name="description" value={formData.description} onChange={handleChange} rows={4} required />
        </label>
        <label>Upload Photo:
          <input type="file" accept="image/*" onChange={handleFileChange} required />
        </label>
        <label>Price Estimate:
          <input type="text" name="priceEstimate" value={formData.priceEstimate} onChange={handleChange} required />
        </label>
        <label>Status:
          <select name="status" value={formData.status} onChange={handleChange} required>
            <option value="waiting_admin">Waiting for Admin</option>
            <option value="waiting_seller">Waiting for Seller Confirmation</option>
          </select>
        </label>
        <div className="form-actions">
          <button type="submit">Submit Appraisal</button>
          <button type="button" onClick={() => navigate('/')}>Cancel</button>
        </div>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default AppraisalForm;
