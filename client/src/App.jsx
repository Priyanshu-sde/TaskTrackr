import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Todos from './components/Todos';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './index.css';


const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-light">
    <div className="text-center">
      <h1 className="mb-4 text-4xl font-bold">Welcome to Todo App</h1>
      <p className="mb-4 text-lg">Your ultimate tool to keep track of your tasks and stay organized.</p>
      <div className="mb-4">
        <Link to="/signup" className="btn btn-primary mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign Up</Link>
        <Link to="/signin" className="btn btn-secondary bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Sign In</Link>
      </div>
      <img src="./src/assets/homepage.png" alt="Todo App" className="img-fluid max-w-full h-auto" />
    </div>
    <footer className="mt-auto text-center py-4">
      <p className="text-muted text-gray-600">&copy; 2024 Todo App. All rights reserved.</p>
    </footer>
  </div>
);

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light flex justify-between items-center p-4">
          <Link className="navbar-brand text-xl font-bold" to="/">Todo App</Link>
          <div className="navbar-collapse flex-grow items-center">
            <ul className="navbar-nav flex space-x-4">
              {!token ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-lg" to="/signup">Sign Up</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-lg" to="/signin">Sign In</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-lg" to="/todos">My Todos</Link>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link btn btn-link text-lg" onClick={() => setToken('')}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
        <div className="mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={!token ? <SignUp /> : <Navigate to="/todos" />} />
            <Route path="/signin" element={!token ? <SignIn setToken={setToken} /> : <Navigate to="/todos" />} />
            <Route path="/todos" element={token ? <Todos token={token} /> : <Navigate to="/signin" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};


export default App;
