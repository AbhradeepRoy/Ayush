
import React, { useState, useEffect } from 'react';
import { UserProfile, DailyLog, ChatMessage, HealthState } from './types';
import { DEFAULT_PROFILE, INITIAL_DAILY_LOGS } from './constants';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import HealthChat from './components/HealthChat';
import DailyTracker from './components/DailyTracker';
import MedicalHistory from './components/MedicalHistory';
import Settings from './components/Settings';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'chat' | 'tracker' | 'medical' | 'settings'>('dashboard');
  const [state, setState] = useState<HealthState>({
    profile: DEFAULT_PROFILE,
    dailyLogs: INITIAL_DAILY_LOGS,
    messages: [
      { id: '1', role: 'model', text: 'Hello! I am your personal health coach. How can I help you today?', timestamp: new Date() }
    ],
    theme: 'light'
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (state.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [state.theme]);

  const updateProfile = (profile: UserProfile) => {
    setState(prev => ({ ...prev, profile }));
  };

  const addDailyLog = (log: DailyLog) => {
    setState(prev => ({ ...prev, dailyLogs: [...prev.dailyLogs, log] }));
  };

  const addMessage = (msg: ChatMessage) => {
    setState(prev => ({ ...prev, messages: [...prev.messages, msg] }));
  };

  const toggleTheme = () => {
    setState(prev => ({ ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard state={state} />;
      case 'chat':
        return <HealthChat state={state} addMessage={addMessage} />;
      case 'tracker':
        return <DailyTracker state={state} addDailyLog={addDailyLog} />;
      case 'medical':
        return <MedicalHistory state={state} updateProfile={updateProfile} />;
      case 'settings':
        return <Settings state={state} updateProfile={updateProfile} toggleTheme={toggleTheme} />;
      default:
        return <Dashboard state={state} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} theme={state.theme}>
      {renderContent()}
    </Layout>
  );
};

export default App;
