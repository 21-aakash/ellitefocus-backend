import React , {useState, useEffect}from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Index from './components/Index';
import NewTodo from './components/NewTodo';
import EditTodo from './components/EditTodo';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Hero from './components/Hero'; // Import the Hero component
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/context/AuthContext'; // Import useAuth and AuthProvider
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// Component to check if the user is authenticated

import CustomCursor from './components/CustomCursor'


const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage to determine if user is authenticated
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false); // Set loading to false once the check is done
  }, []);

  // If loading, return null or a loading spinner
  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          {/* Navbar */}
          <CustomCursor />
          <Navbar />
          {/* Main Content */}
          <div className="flex-grow container mx-auto p-4"style={{ margin: '0', padding: '0', border: 'none' }} >
            <Routes>
              <Route path="/" element={<Hero/>} /> {/* Default hero section */}

              <Route path="/create-todo" element={<ProtectedRoute element={<NewTodo />} />} />
              <Route path="/index" element={<ProtectedRoute element={<Index />} />} />
              <Route path="/edit/:id" element={<ProtectedRoute element={<EditTodo />} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
          {/* Footer */}
         
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
