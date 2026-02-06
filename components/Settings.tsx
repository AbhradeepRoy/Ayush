
import React from 'react';
import { HealthState, UserProfile } from '../types';
import { INDIAN_LANGUAGES, ACTIVITY_LEVELS } from '../constants';
import { Moon, Sun, User, Globe, Activity } from 'lucide-react';

interface SettingsProps {
  state: HealthState;
  updateProfile: (profile: UserProfile) => void;
  toggleTheme: () => void;
}

const Settings: React.FC<SettingsProps> = ({ state, updateProfile, toggleTheme }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold">App Settings</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <User className="text-teal-500" />
            <h3 className="font-bold">User Profile</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Display Name</label>
              <input 
                className="w-full mt-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent"
                value={state.profile.name}
                onChange={(e) => updateProfile({...state.profile, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Age</label>
                <input 
                  type="number"
                  className="w-full mt-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent"
                  value={state.profile.age}
                  onChange={(e) => updateProfile({...state.profile, age: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Weight (kg)</label>
                <input 
                  type="number"
                  className="w-full mt-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent"
                  value={state.profile.weight}
                  onChange={(e) => updateProfile({...state.profile, weight: parseInt(e.target.value)})}
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                <Activity size={14} /> Lifestyle
              </label>
              <select 
                className="w-full mt-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent"
                value={state.profile.lifestyle}
                onChange={(e) => updateProfile({...state.profile, lifestyle: e.target.value as any})}
              >
                {ACTIVITY_LEVELS.map(level => <option key={level}>{level}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="text-blue-500" />
              <h3 className="font-bold">Language & Region</h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">AyushAI will talk to you in this language.</p>
            <select 
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent"
              value={state.profile.language}
              onChange={(e) => updateProfile({...state.profile, language: e.target.value})}
            >
              {INDIAN_LANGUAGES.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
            </select>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold mb-4">Appearance</h3>
            <button 
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <span className="flex items-center gap-3">
                {state.theme === 'light' ? <Sun className="text-yellow-500" /> : <Moon className="text-indigo-400" />}
                <span className="font-medium">{state.theme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
              </span>
              <div className={`w-12 h-6 rounded-full relative transition-colors ${state.theme === 'dark' ? 'bg-teal-500' : 'bg-slate-300'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${state.theme === 'dark' ? 'left-7' : 'left-1'}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl border border-red-100 dark:border-red-900/50">
        <h3 className="text-red-600 dark:text-red-400 font-bold mb-2">Privacy & Data</h3>
        <p className="text-xs text-red-500/80 mb-4 leading-relaxed">
          Your health data is stored locally in this session. Clearing browser data will reset your profile. 
          AyushAI uses end-to-end encrypted API calls for generating insights.
        </p>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition-colors">
          Delete All Health Data
        </button>
      </div>
    </div>
  );
};

export default Settings;
