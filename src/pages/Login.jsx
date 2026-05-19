import React from 'react';
import { auth, provider } from '../firebase/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate, Navigate } from 'react-router-dom';
import { CheckSquare } from 'lucide-react';

const Login = ({ user }) => {
  const navigate = useNavigate();

  // If user is already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center">
          <CheckSquare className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          Welcome to TaskFlow
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Organize your work, effortlessly.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-100">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex justify-center py-2.5 px-4 border border-slate-300 rounded-md shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <img 
              className="h-5 w-5 mr-2" 
              src="https://www.svgrepo.com/show/475656/google-color.svg" 
              alt="Google logo" 
            />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
