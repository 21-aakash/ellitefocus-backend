import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './context/AuthContext'; // Update the path as needed
import { useNavigate } from 'react-router-dom';

function Index() {
  const { user } = useAuth(); // Get user info from context
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // Redirect to login if no user is authenticated
      navigate('/login');
      return;
    }
    console.log("Fetching todos for user ID:", user.id);
    // Fetch todos for the logged-in user
    axios.get(`/api/todos/user/${user.id}`)
      .then(response => {
        setTodos(response.data);
        console.log("Todos received:", response.data);
      })
      .catch(error => {
        console.error(error);
        toast.error('Error fetching todos');
      });
  }, [user, navigate]); // Depend on user and navigate to refetch and redirect if necessary
  
  
  const handleDelete = (id) => {
    axios.delete(`/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
        toast.success('Todo deleted successfully');
      })
      .catch(error => {
        console.error(error);
        toast.error('Error deleting todo');
      });
  };

  return (
    <div className="container mx-auto bg-white p-8 h-screen">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold text-blue-800">Task Dashboard</h1>
          <h6 className="italic text-gray-700">Stay on track </h6>
        </div>
      </div>
      <hr className="my-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(todos) && todos.length > 0 ? (
          todos.map(item => (
            <div key={item.id} className={`p-6 bg-white rounded-lg shadow-md ${item.isComplete ? 'bg-green-100' : 'bg-yellow-100'}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">{item.description}</h2>
                <span className={`px-2 py-1 rounded-lg text-sm ${item.isComplete ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                  {item.isComplete ? 'Complete' : 'Incomplete'}
                </span>
              </div>
              <p className="text-gray-600">
                <strong>Created At:</strong> {new Date(item.createdAt).toLocaleString()}
              </p>
              <p className="text-gray-600">
                <strong>Updated At:</strong> {new Date(item.updatedAt).toLocaleString()}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <a className="text-blue-600 hover:text-blue-800" href={`/edit/${item.id}`}>
                  Edit
                </a>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-600">No Todos Found</p>
        )}
      </div>
      <a className="mt-8 inline-block bg-green-600 text-white px-4 py-2 rounded-lg" href="/create-todo">
        Create a Todo
      </a>
    </div>
  );
}

export default Index;
