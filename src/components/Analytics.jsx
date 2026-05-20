import React from 'react';
import { CheckCircle2, CircleDashed, Clock, ListTodo } from 'lucide-react';

const Analytics = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'Complete').length;
  const planned = tasks.filter(t => t.status === 'Planned').length;
  const inProgress = tasks.filter(t => t.status === 'In Progress').length;
  
  // Calculate completion percentage
  const progressPercent = total === 0 ? 0 : Math.round((completed / total) * 100);

  const stats = [
    { label: 'Total Tasks', value: total, icon: ListTodo, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/30' },
    { label: 'Completed', value: completed, icon: CheckCircle2, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/30' },
    { label: 'In Progress', value: inProgress, icon: Clock, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/30' },
    { label: 'Planned', value: planned, icon: CircleDashed, color: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-50 dark:bg-slate-800' }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 mb-6 transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Daily Analytics</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-slate-500 dark:text-slate-400">Progress</span>
          <span className="font-bold text-indigo-600 dark:text-indigo-400">{progressPercent}%</span>
        </div>
      </div>
      
      <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full mb-6 overflow-hidden">
        <div 
          className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className={`${stat.bg} rounded-lg p-4 flex items-center space-x-3 transition-colors`}>
            <stat.icon className={`h-8 w-8 ${stat.color}`} />
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{stat.value}</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
