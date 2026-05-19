import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import { ClipboardList, Loader2 } from 'lucide-react';

const Dashboard = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const tasksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        // Sort tasks client-side to avoid needing a Firestore composite index
        tasksData.sort((a, b) => {
          const timeA = a.createdAt?.toMillis() || 0;
          const timeB = b.createdAt?.toMillis() || 0;
          return timeB - timeA;
        });

        setTasks(tasksData);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching tasks:', err);
        setError('Failed to load tasks.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // Protected route
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar user={user} />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TaskForm userId={user.uid} />

        <div className="mt-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Your Tasks</h2>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-200">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 text-indigo-600 animate-spin mb-4" />
              <p className="text-slate-500">Loading your tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="bg-white rounded-lg border border-slate-200 border-dashed p-12 flex flex-col items-center justify-center text-center">
              <div className="bg-slate-100 p-4 rounded-full mb-4">
                <ClipboardList className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-1">No tasks yet</h3>
              <p className="text-slate-500">Get started by creating a new task above.</p>
            </div>
          ) : (
            <div className="flex flex-col space-y-3">
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
