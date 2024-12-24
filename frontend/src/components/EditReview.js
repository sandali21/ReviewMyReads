import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import '../styles/my.css';
import { message } from 'antd';
import editreview from '../images/img2.png';

const ReviewForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState();
  const [reviewText, setReviewText] = useState("");
  const [dateAdded, setDateAdded] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/reviews/${id}`).then((data) => {
        console.log(data);
        const dateString = data.data[0].dateAdded;
        const dateObject = new Date(dateString);
        const formatDate = dateObject.toISOString().split('T')[0];

        setTitle(data.data[0].title);
        setAuthor(data.data[0].author);
        setRating(data.data[0].rating);
        setReviewText(data.data[0].reviewText);
        setDateAdded(formatDate);
        console.log(data)
      });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const editReview = {
        title:title,
        author:author,
        rating:rating,
        reviewText:reviewText,
        dateAdded:dateAdded
    };
    console.log(editReview);
    
    try {
        axios.put(`http://localhost:5000/reviews/${id}`, editReview);
        message.success('Review Updated!');
        navigate('/');
        
    } catch (error) {
        message.error('Failed!');
        console.log(error.message);
    }
  };

  return (
    <div>
    <Header/>
    <div clssName= 'addform'>
    <div> 
        <img src={editreview} alt='' className='img'/>
    </div>
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <h3> Edit Review </h3> <br/>
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => {
                setTitle(e.target.value);
            }}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Author:</label>
          <input
            type="text"
            name="author"
            value={author}
            onChange={(e) => {
                setAuthor(e.target.value);
            }}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Rating:</label>
          <select
            name="rating"
            value={rating}
            onChange={(e) => {
                setRating(e.target.value);
            }}
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
            value={reviewText}
            onChange={(e) => {
                setReviewText(e.target.value);
            }}
            className="form-control"
            required
          />
        </div>
        <button type="submit" style={{backgroundColor: 'Orange', color:'white'}} className='btn'> Update </button> 
      </form>
      </div>
      </div>
    </div>
  );
};

export default ReviewForm;
