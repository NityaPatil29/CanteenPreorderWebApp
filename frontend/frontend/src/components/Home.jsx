import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to Our Food Delivery App</h1>
      <Link to="/canteen1"><button>Canteen 1</button></Link>
      <Link to="/canteen2"><button>Canteen 2</button></Link>
      <Link to="/viewcart"><button>View Cart</button></Link>
    </div>
  );
};

export default Home;
