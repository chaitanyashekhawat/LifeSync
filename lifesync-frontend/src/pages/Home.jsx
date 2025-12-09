import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to LifeSync</h1>
            <p>Sync your life, tasks, and goals in one place.</p>
            <div className="cta-buttons">
                <Link to="/signup" className="btn">Get Started</Link>
                <Link to="/login" className="btn btn-secondary">Login</Link>
            </div>
        </div>
    );
};

export default Home;
