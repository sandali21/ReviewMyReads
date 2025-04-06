import React, { useState, useEffect } from 'react';
import { useNavigate , useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import '../styles/my.css';
import { Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

function ReviewList(){
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(() => {
    axios.get('http://localhost:5000/reviews').then((response) => {
      setReviews(response.data);
    });
  }, []);

  const handleDelete = (e) => {
    
    Modal.confirm({
        title: 'Warning',
        icon: <ExclamationCircleOutlined />,
        content: 'Do you want to delete the review?',
        okText: 'Yes',
        cancelText: 'No',
        onOk: () => {
            axios.delete(`http://localhost:5000/reviews/${id}`)
            .then((response) => {
                console.log(response);
                message.success('Review Deleted!');
                navigate(`/`);
            })
            .catch((error) => {
                console.error('Error deleting post:', error);
            });
        },
        onCancel: () => {
            message.error('Post Deletion Cancelled!');
        },
    });
  };

  return (
    <div>
      <Header/>
      <div  className='reviews'>
      <h3>Book Reviews</h3>
      </div>
      <div  className='reviewlist'>
      <br/> 
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
