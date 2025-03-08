import React, { useState } from 'react';
import axios from 'axios';

const CreateTodo = ({ token }) => {
  const [title, setTitle] = useState('');

  const createTodo = async () => {
    const response = await axios.post('https://task-trackr-backend.vercel.app/newTodo', { title }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert(response.data.message);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card p-4">
        <h2 className="card-title">Create Todo</h2>
        <div className="form-group mb-3">
          <input 
            type="text" 
            placeholder="Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="form-control"
          />
        </div>
        <button onClick={createTodo} className="btn btn-primary">Create</button>
      </div>
    </div>
  );
};

export default CreateTodo;
