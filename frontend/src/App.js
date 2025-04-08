import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReviewList from './components/ReviewList';
import ReviewForm from './components/ReviewForm';
import EditReview from './components/EditReview';


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<ReviewList />} />
      <Route path="/add" element={<ReviewForm />} />
      <Route path="/edit/:id" element={<EditReview />} />
    </Routes>
  </Router>
);

export default App;
