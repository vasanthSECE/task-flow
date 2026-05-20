import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Analytics from '../components/Analytics';
import useTasks from '../hooks/useTasks';
import { Loader2, TrendingUp, PieChart as PieChartIcon } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const COLORS = ['#10b981', '#3b82f6', '#64748b']; // Emerald (Complete), Blue (In Progress), Slate (Planned)

const AnalyticsPage = ({ user }) => {
  const { tasks, loading, error } = useTasks(user);

  // Protected route
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Data processing for charts
  const getStatusData = () => {
    const completed = tasks.filter(t => t.status === 'Complete').length;
    const inProgress = tasks.filter(t => t.status === 'In Progress').length;
    const planned = tasks.filter(t => t.status === 'Planned').length;

    return [
      { name: 'Complete', value: completed },
      { name: 'In Progress', value: inProgress },
      { name: 'Planned', value: planned },
    ];
  };

  // Get tasks created by day (last 7 days)
  const getTimelineData = () => {
    const timeline = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      const count = tasks.filter(t => {
        if (!t.createdAt) return false;
        const taskDate = t.createdAt.toDate();
        return taskDate.getDate() === d.getDate() && taskDate.getMonth() === d.getMonth();
      }).length;

      timeline.push({ date: dateStr, tasks: count });
    }
    return timeline;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans transition-colors">
      <Navbar user={user} />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Task Analytics</h1>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-lg mb-6 border border-red-200 dark:border-red-800/50">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-indigo-600 dark:text-indigo-400 animate-spin mb-4" />
            <p className="text-slate-500 dark:text-slate-400">Loading analytics...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 border-dashed p-12 flex flex-col items-center justify-center text-center transition-colors">
            <PieChartIcon className="h-12 w-12 text-slate-400 dark:text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">Not enough data</h3>
            <p className="text-slate-500 dark:text-slate-400">Create some tasks to see your analytics here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <Analytics tasks={tasks} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Status Pie Chart */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
                <div className="flex items-center mb-6">
                  <PieChartIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Status Breakdown</h2>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getStatusData()}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {getStatusData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', borderColor: '#475569', color: '#fff', borderRadius: '0.5rem' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Timeline Bar Chart */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
                <div className="flex items-center mb-6">
                  <TrendingUp className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Tasks Created (Last 7 Days)</h2>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getTimelineData()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.2} vertical={false} />
                      <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis allowDecimals={false} tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', borderColor: '#475569', color: '#fff', borderRadius: '0.5rem' }}
                        cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }}
                      />
                      <Bar dataKey="tasks" fill="#6366f1" radius={[4, 4, 0, 0]} name="Tasks" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AnalyticsPage;
