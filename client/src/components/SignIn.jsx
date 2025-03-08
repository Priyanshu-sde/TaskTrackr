import React, { useState } from 'react';
import axios from 'axios';

const SignIn = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signin = async () => {
    const response = await axios.post('https://task-trackr-backend.vercel.app/signin', { email, password });
    setToken(response.data.token);
    alert(response.data.message);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card p-4">
        <h2 className="card-title">Sign In</h2>
        <div className="form-group mb-3">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="form-control"
          />
        </div>
        <div className="form-group mb-3">
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="form-control"
          />
        </div>
        <button onClick={signin} className="btn btn-primary">Sign In</button>
      </div>
    </div>
  );
};

export default SignIn;
