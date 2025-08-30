import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <main className="home-content">
        <div className="hero-section">
          <h1>Welcome to LMS</h1>
          <p>Your one-stop platform for learning and growth</p>
          <Link to="/dashboard" className="cta-button">
            Go to Dashboard
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
