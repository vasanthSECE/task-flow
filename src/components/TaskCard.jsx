import React from 'react';
import { db } from '../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { Clock, CheckCircle2, CircleDashed } from 'lucide-react';

const statusConfig = {
  'Planned': {
    color: 'bg-slate-100 text-slate-700 border-slate-200',
    icon: CircleDashed,
    iconColor: 'text-slate-400'
  },
  'In Progress': {
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: Clock,
    iconColor: 'text-blue-500'
  },
  'Complete': {
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: CheckCircle2,
    iconColor: 'text-emerald-500'
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

  return (
    <div className={`p-4 rounded-lg border transition-all duration-200 shadow-sm hover:shadow-md ${config.color} bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
      <div className="flex items-start space-x-3">
        <StatusIcon className={`h-5 w-5 mt-0.5 shrink-0 ${config.iconColor}`} />
        <div>
          <h3 className={`font-medium ${task.status === 'Complete' ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
            {task.title}
          </h3>
          <p className="text-xs text-slate-500 mt-1 flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {formattedDate}
          </p>
        </div>
      </div>
      
      <div className="flex items-center self-end sm:self-auto">
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="text-sm bg-white border border-slate-300 rounded-md py-1.5 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm"
        >
          <option value="Planned">Planned</option>
          <option value="In Progress">In Progress</option>
          <option value="Complete">Complete</option>
        </select>
      </div>
    </div>
  );
};

export default TaskCard;
