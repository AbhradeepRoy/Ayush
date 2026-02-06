
import React, { useState } from 'react';
import { HealthState, DailyLog } from '../types';
import { CheckCircle2, Droplets, Moon, Footprints, Smile, Utensils } from 'lucide-react';

interface DailyTrackerProps {
  state: HealthState;
  addDailyLog: (log: DailyLog) => void;
}

const DailyTracker: React.FC<DailyTrackerProps> = ({ state, addDailyLog }) => {
  const [formData, setFormData] = useState<DailyLog>({
    date: new Date().toISOString().split('T')[0],
    sleep: 8,
    water: 2,
    steps: 5000,
    mood: 'Happy',
    diet: '',
    symptoms: ''
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDailyLog(formData);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
      <div className="px-8 py-6 bg-teal-600 text-white">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <ClipboardCheck className="w-6 h-6" /> Daily Health Log
        </h2>
        <p className="text-teal-100 text-sm opacity-90">Track your vitals to get better AI insights.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Moon className="w-4 h-4 text-indigo-500" /> Sleep (hours)
            </label>
            <input 
              type="number" 
              step="0.5"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              value={formData.sleep}
              onChange={(e) => setFormData({...formData, sleep: parseFloat(e.target.value)})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-500" /> Water Intake (L)
            </label>
            <input 
              type="number" 
              step="0.1"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              value={formData.water}
              onChange={(e) => setFormData({...formData, water: parseFloat(e.target.value)})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Footprints className="w-4 h-4 text-orange-500" /> Steps Count
            </label>
            <input 
              type="number" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              value={formData.steps}
              onChange={(e) => setFormData({...formData, steps: parseInt(e.target.value)})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Smile className="w-4 h-4 text-pink-500" /> Current Mood
            </label>
            <select 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              value={formData.mood}
              onChange={(e) => setFormData({...formData, mood: e.target.value as any})}
            >
              <option>Happy</option>
              <option>Neutral</option>
              <option>Sad</option>
              <option>Stressed</option>
              <option>Tired</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <Utensils className="w-4 h-4 text-emerald-500" /> Diet & Nutrition
          </label>
          <textarea 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none transition-all min-h-[80px]"
            placeholder="What did you eat today?"
            value={formData.diet}
            onChange={(e) => setFormData({...formData, diet: e.target.value})}
          />
        </div>

        <button 
          type="submit"
          className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group"
        >
          {success ? (
            <>
              <CheckCircle2 className="animate-bounce" /> Log Saved!
            </>
          ) : (
            <>
              Save Daily Data
            </>
          )}
        </button>
      </form>
    </div>
  );
};

import { ClipboardCheck } from 'lucide-react';
export default DailyTracker;
