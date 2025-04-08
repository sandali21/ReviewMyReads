import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import '../styles/my.css';

function ReviewList(){
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/reviews').then((response) => {
      setReviews(response.data);
    });
  }, []);

  const handleDelete = (reviewId) => {
    axios.delete(`http://localhost:5000/reviews/${reviewId}`)
      .then(() => {
        setReviews((prev) => prev.filter((rev) => rev.id !== reviewId));
        alert('Review Deleted!');
        navigate('/');
    })
    .catch((error) => {
      console.error('Error deleting review:', error);
    });
  };
  

  return (
    <div>
      <Header/>
      <div  className='reviews'>
      <h3>Book Reviews</h3>
      </div>
      <div  className='reviewlist'>
      {reviews.length === 0 ? (
        <p> No reviews available. Add some to get started! </p>
      ) : (reviews.map((review) => (
        <div key={review.id} className = 'reviewBox'>
          <h5>{review.title}</h5> 
          <p> <em> by {review.author} </em></p>
          <span className='rate'>{review.rating} </span> <span className='star'> &#9733; </span> 
          <p>{review.reviewText}</p>
          <p> Date: {new Date(review.dateAdded).toISOString().split('T')[0]} </p>
          <button onClick={() => navigate(`/edit/${review.id}`)} className='btn btn-warning'>Edit</button>
          <button onClick={() => handleDelete(review.id)} className='btn btn-danger' style ={{float:'right'}}>Delete</button>
        </div>
      ))
      )}
      </div>
    </div>
  );
};

export default ReviewList;
