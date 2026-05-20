import React from 'react';
import { db } from '../firebase/firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Clock, CheckCircle2, CircleDashed, Trash2, CalendarDays, AlertCircle } from 'lucide-react';

const statusConfig = {
  'Planned': {
    color: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    icon: CircleDashed,
    iconColor: 'text-slate-400 dark:text-slate-500'
  },
  'In Progress': {
    color: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50',
    icon: Clock,
    iconColor: 'text-blue-500 dark:text-blue-400'
  },
  'Complete': {
    color: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50',
    icon: CheckCircle2,
    iconColor: 'text-emerald-500 dark:text-emerald-400'
  }
};

const TaskCard = ({ task }) => {
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      const taskRef = doc(db, 'tasks', task.id);
      await updateDoc(taskRef, {
        status: newStatus
      });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDeleteTask = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      const taskRef = doc(db, 'tasks', task.id);
      await deleteDoc(taskRef);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };


  const config = statusConfig[task.status] || statusConfig['Planned'];
  const StatusIcon = config.icon;
  
  const formattedDate = task.createdAt?.toDate 
    ? new Intl.DateTimeFormat('en-US', { 
        month: 'short', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit' 
      }).format(task.createdAt.toDate())
    : 'Just now';

  let formattedDueDate = null;
  let isOverdue = false;
  if (task.dueDate) {
    const due = new Date(task.dueDate);
    formattedDueDate = new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: '2-digit' 
    }).format(due);
    if (due < new Date() && task.status !== 'Complete') {
      isOverdue = true;
    }
  }

  return (
    <div className={`p-4 rounded-lg border transition-all duration-200 shadow-sm hover:shadow-md ${config.color} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
      <div className="flex items-start space-x-3">
        <StatusIcon className={`h-5 w-5 mt-0.5 shrink-0 ${config.iconColor}`} />
        <div>
          <h3 className={`font-medium ${task.status === 'Complete' ? 'text-slate-500 dark:text-slate-500 line-through' : 'text-slate-800 dark:text-slate-100'}`}>
            {task.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {formattedDate}
            </p>
            {formattedDueDate && (
              <p className={`text-xs flex items-center ${isOverdue ? 'text-red-600 dark:text-red-400 font-medium' : 'text-slate-500 dark:text-slate-400'}`}>
                {isOverdue ? <AlertCircle className="h-3 w-3 mr-1" /> : <CalendarDays className="h-3 w-3 mr-1" />}
                Due: {formattedDueDate}
              </p>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center self-end sm:self-auto space-x-2">
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 rounded-md py-1.5 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm transition-colors"
        >
          <option value="Planned">Planned</option>
          <option value="In Progress">In Progress</option>
          <option value="Complete">Complete</option>
        </select>
        <button
          onClick={handleDeleteTask}
          className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-slate-700 rounded-md transition-colors"
          title="Delete task"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
