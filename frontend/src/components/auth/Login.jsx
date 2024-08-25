import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Update the path as needed
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
       console.log(localStorage.getItem('user'));
      const userDetails = response.data.user; // Assuming the response contains user data
      console.log("successs",userDetails);
       // Save user information to local storage
      
      login(userDetails); // Set authenticated state and user details
      toast.success('Login successful! Redirecting...', {
        position: "top-center",
        autoClose: 1000,
      });
      
       
      setTimeout(() => {
        navigate('/index'); // Redirect to home after showing toast
      }, 1000);
  
    } catch (error) {
      console.error('Error logging in:', error);
  
      if (error.response) {
        // Handle error response from the server
        const errorMessage = error.response.data?.error || 'Error logging in. Please try again.';
        toast.error(errorMessage, {
          position: "top-center",
        });
      } else {
        // Handle any other unexpected errors
        toast.error('An unexpected error occurred. Please try again later.', {
          position: "top-center",
        });
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center px-2"
          >
            {showPassword ? (
              <i className="fas fa-eye-slash"></i>
            ) : (
              <i className="fas fa-eye"></i>
            )}
          </button>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account? <a href="/register" className="text-blue-500">Register here</a>.
      </p>
    </div>
  );
}

export default Login;
