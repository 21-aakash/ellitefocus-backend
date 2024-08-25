import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../components/context/AuthContext'; // Adjust the path as needed

function NewTodo() {
  const [description, setDescription] = useState('');
  const { user } = useAuth(); // Get user details from AuthContext

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('User not logged in');
      return;
    }
console.log(user.userId)
    axios.post(`/api/todos/user/${user.id}`, { description })
      .then(response => {
        toast.success('Todo created successfully');
        setTimeout(() => {
          window.location.href = '/index';
        }, 1000); // Redirect after 2 seconds
      })
      .catch(error => {
        console.error(error);
        toast.error('Error creating todo');
      });
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <a className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600" href="/index">
          <i className="bi bi-arrow-left-square-fill"></i> Back
        </a>
      </div>
      <div className="max-w-lg mx-auto bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Add a new Todo Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline"
          >
            <i className="bi bi-plus-square-fill"></i> Add Todo
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewTodo;
