import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Todos = ({ token }) => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get('https://todo-backend-nine-delta.vercel.app/todos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(response.data);
    };

    fetchTodos();
  }, [token]);

  const createTodo = async () => {
    const response = await axios.post('https://todo-backend-nine-delta.vercel.app/newTodo', { title }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert(response.data.message);
    setTodos([...todos, response.data.todo]);
    setTitle('');
  };

  const updateTodo = async (id) => {
    const response = await axios.put(`https://todo-backend-nine-delta.vercel.app/${id}`, { title: newTitle }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTodos(todos.map(todo => todo._id === id ? response.data.todo : todo));
    setEditingTodoId(null);
    setNewTitle('');
  };

  const toggleDone = async (id, done) => {
    await axios.patch(`https://todo-backend-nine-delta.vercel.app/${id}/done`, { done: !done }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTodos(todos.map(todo => todo._id === id ? { ...todo, done: !done } : todo));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`https://todo-backend-nine-delta.vercel.app/todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTodos(todos.filter(todo => todo._id !== id));
  };

  const startEditing = (id, currentTitle) => {
    setEditingTodoId(id);
    setNewTitle(currentTitle);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card p-4 w-100" style={{ maxWidth: '600px' }}>
        <h2 className="card-title text-center">My Todos</h2>
        <div className="mb-4">
          <input 
            type="text" 
            placeholder="New Todo" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="form-control mb-2"
          />
          <button onClick={createTodo} className="btn btn-primary w-100">Add Todo</button>
        </div>
        <ul className="list-group">
          {todos.map(todo => (
            <li key={todo._id} className="list-group-item d-flex justify-content-between align-items-center">
              <input 
                type="checkbox" 
                checked={todo.done} 
                onChange={() => toggleDone(todo._id, todo.done)}
                className="form-check-input m-3"
              />
              {editingTodoId === todo._id ? (
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="form-control m-3"
                  onBlur={() => updateTodo(todo._id)}
                  autoFocus
                />
              ) : (
                <span 
                  className={`flex-grow-1 ${todo.done ? 'text-decoration-line-through' : ''} m-3`}
                  onClick={() => startEditing(todo._id, todo.title)}
                >
                  {todo.title}
                </span>
              )}
              <button 
                className="btn btn-danger btn-sm" 
                onClick={() => deleteTodo(todo._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todos;
