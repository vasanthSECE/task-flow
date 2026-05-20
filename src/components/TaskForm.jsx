import React, { useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { PlusCircle } from 'lucide-react';

const TaskForm = ({ userId }) => {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => { 
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true); 
    setError('');

    try {
      await addDoc(collection(db, 'tasks'), {
        title: title.trim(),
        status: 'Planned',
        createdAt: serverTimestamp(),
        userId: userId
      });
      setTitle('');
    } catch (err) {
      console.error('Error adding task:', err);
      setError('Failed to add task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 rounded-md border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={!title.trim() || isSubmitting}
          className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="animate-pulse">Adding...</span>
          ) : (
            <>
              <PlusCircle className="h-5 w-5 mr-2" />
              <span>Add Task</span>
            </>
          )}
        </button>
      </form>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default TaskForm;
