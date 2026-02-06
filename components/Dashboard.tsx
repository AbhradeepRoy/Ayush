
import React, { useEffect, useState } from 'react';
import { HealthState } from '../types';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { Droplets, Footprints, Moon, Brain, Info } from 'lucide-react';
import { getDailyHealthInsights } from '../services/geminiService';

interface DashboardProps {
  state: HealthState;
}

const Dashboard: React.FC<DashboardProps> = ({ state }) => {
  const [insights, setInsights] = useState<string>("Analyzing your latest patterns...");
  const lastLog = state.dailyLogs[state.dailyLogs.length - 1];
  
  // Calculate health score (simplified)
  const calculateScore = () => {
    if (!lastLog) return 0;
    let score = 50;
    if (lastLog.steps > 8000) score += 10;
    if (lastLog.sleep >= 7 && lastLog.sleep <= 9) score += 15;
    if (lastLog.water >= 2) score += 10;
    if (lastLog.mood === 'Happy') score += 15;
    return Math.min(score, 100);
  };

  useEffect(() => {
    const fetchInsights = async () => {
      const data = await getDailyHealthInsights(state.profile, state.dailyLogs);
      setInsights(data);
    };
    fetchInsights();
  }, [state.profile, state.dailyLogs]);

  const chartData = state.dailyLogs.slice(-7);

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Namaste, {state.profile.name}</h2>
          <p className="text-slate-500 dark:text-slate-400">Here's your wellness summary for today.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
          <div className="relative w-16 h-16">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="stroke-slate-100 dark:stroke-slate-700"
                strokeDasharray="100, 100"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="stroke-teal-500"
                strokeDasharray={`${calculateScore()}, 100`}
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-bold text-teal-600 dark:text-teal-400">
              {calculateScore()}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Health Score</p>
            <p className="text-xs text-slate-400">Keep it above 80!</p>
          </div>
        </div>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={Footprints} label="Steps" value={lastLog.steps.toString()} unit="steps" color="text-orange-500" bg="bg-orange-50 dark:bg-orange-900/20" />
        <MetricCard icon={Moon} label="Sleep" value={lastLog.sleep.toString()} unit="hrs" color="text-indigo-500" bg="bg-indigo-50 dark:bg-indigo-900/20" />
        <MetricCard icon={Droplets} label="Hydration" value={lastLog.water.toString()} unit="liters" color="text-blue-500" bg="bg-blue-50 dark:bg-blue-900/20" />
        <MetricCard icon={Brain} label="Mood" value={lastLog.mood} unit="" color="text-pink-500" bg="bg-pink-50 dark:bg-pink-900/20" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Charts */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Footprints className="text-orange-500" /> Activity Trends
            </h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" hide />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="steps" stroke="#f97316" fillOpacity={1} fill="url(#colorSteps)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* AI Insights Card */}
        <div className="bg-teal-600 dark:bg-teal-800 p-6 rounded-2xl shadow-lg text-white space-y-4">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            <h3 className="text-lg font-bold">AyushAI Insights</h3>
          </div>
          <div className="text-teal-50 text-sm leading-relaxed whitespace-pre-wrap">
            {insights}
          </div>
          <div className="pt-4 border-t border-teal-500/30">
            <p className="text-[10px] text-teal-200 uppercase tracking-wider font-bold">Disclaimer</p>
            <p className="text-[10px] text-teal-100/70">Not a medical diagnosis. Consult a doctor for health concerns.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard: React.FC<{ icon: any, label: string, value: string, unit: string, color: string, bg: string }> = ({ icon: Icon, label, value, unit, color, bg }) => (
  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center text-center transition-transform hover:scale-105">
    <div className={`${bg} p-2 rounded-lg mb-2`}>
      <Icon className={color} size={24} />
    </div>
    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">{label}</p>
    <div className="flex items-baseline gap-1">
      <span className="text-xl font-bold text-slate-800 dark:text-white">{value}</span>
      <span className="text-[10px] text-slate-400 uppercase font-bold">{unit}</span>
    </div>
  </div>
);

export default Dashboard;
