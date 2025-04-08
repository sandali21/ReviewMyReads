import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import '../styles/my.css';
import addreview from '../images/img2.png';

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    rating: 1,
    reviewText: '',
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post('http://localhost:5000/reviews', formData)
      .then(() => {
        alert('New Review Added!');
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
    <Header/>
    <div className= 'addform'>
      <div> 
          <img src={addreview} alt='' className='img'/>
      </div>
      <div className='form'>
        <form onSubmit={handleSubmit}>
          <h3> Add Review </h3> <br/>
          <div className="mb-3">
            <label className="form-label">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Author:</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Rating:</label>
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="form-control"
              required
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Review:</label>
            <textarea
              name="reviewText"
              value={formData.reviewText}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" style={{backgroundColor:'Blue', color:'white'}} className='btn'> Add </button> 
        </form>
      </div>
      </div>
    </div>
  );
};

export default ReviewForm;
