import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../components/context/AuthContext'; // Adjust the path as needed

function EditTodo() {
  const { id } = useParams();
  const [description, setDescription] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const { user } = useAuth(); // Get user details from AuthContext

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`/api/todos/${id}`);
        const { description, isComplete } = response.data;
        console.log(response.data);
        console.log(description);
        console.log(isComplete);
        setDescription(description);
        setIsComplete(isComplete);
      } catch (error) {
        console.error('Error fetching todo item:', error);
        if (error.response) {
          toast.error(`Error: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
          toast.error('No response received from server');
        } else {
          toast.error('Error fetching todo item');
        }
      }
    };

    fetchTodo();
  }, [id]);

  const updateTodo = (id, description, isComplete, user) => {
    axios.put(`/api/todos/${id}`, { description, isComplete, userId: user.id })
      .then(response => {
        toast.success('Todo updated successfully');
        setTimeout(() => {
          window.location.href = '/index'; // Adjust the path as needed
        }, 1000); // Redirect after 1 second
      })
      .catch(error => {
        console.error('Error updating todo:', error);
        toast.error('Error updating todo');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('User not logged in');
      return;
    }

    updateTodo(id, description, isComplete, user);
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
        <h2 className="text-2xl font-semibold mb-6">Edit Todo Item</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
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
          <div className="mb-4 flex items-center">
            <input
              className="form-check-input h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              type="checkbox"
              id="inputIsComplete"
              checked={isComplete}
              onChange={(e) => setIsComplete(e.target.checked)}
            />
            <label className="ml-2 block text-gray-700 text-sm font-bold" htmlFor="inputIsComplete">
              Completed?
            </label>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline"
          >
            <i className="bi bi-plus-square-fill"></i> Update Todo
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditTodo;
