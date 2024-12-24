import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Button} from '@mui/base/Button';
import '../styles/my.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <nav className='header'>
      <Button className='btn btn-info' onClick={() => navigate('/')} style={{float:'left'}}> Back </Button>
      <Button className='btn btn-success' onClick={() => navigate('/add')} style={{float:'right'}}> Add Review </Button>
    </nav>
  );
};

export default Header;
