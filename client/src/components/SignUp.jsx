import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const signup = async () => {
    const response = await axios.post('https://todo-backend-nine-delta.vercel.app/signup', { name, email, password });
    alert(response.data.message);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card p-4">
        <h2 className="card-title">Sign Up</h2>
        <div className="form-group mb-3">
          <input 
            type="text" 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="form-control"
          />
        </div>
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
        <button onClick={signup} className="btn btn-primary">Sign Up</button>
      </div>
    </div>
  );
};

export default SignUp;
