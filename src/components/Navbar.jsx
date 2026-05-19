import React from 'react';
import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';
import { LogOut, CheckSquare } from 'lucide-react';

const Navbar = ({ user }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <CheckSquare className="h-6 w-6 text-indigo-600 mr-2" />
            <span className="font-bold text-xl text-slate-800">TaskFlow</span>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img 
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${user.email}`} 
                  alt="Profile" 
                  className="h-8 w-8 rounded-full border border-slate-200"
                  referrerPolicy="no-referrer"
                />
                <span className="text-sm font-medium text-slate-700 hidden sm:block">
                  {user.displayName || user.email}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-sm text-slate-500 hover:text-red-600 transition-colors bg-slate-50 hover:bg-red-50 px-3 py-1.5 rounded-md"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
