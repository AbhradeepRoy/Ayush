
import React from 'react';
import { 
  LayoutDashboard, 
  MessageCircle, 
  ClipboardCheck, 
  History, 
  Settings, 
  HeartPulse 
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: any) => void;
  theme: 'light' | 'dark';
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, theme }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'chat', label: 'Coach', icon: MessageCircle },
    { id: 'tracker', label: 'Daily Log', icon: ClipboardCheck },
    { id: 'medical', label: 'History', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      {/* Top Bar */}
      <header className="fixed top-0 w-full bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 z-50 h-16 flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center gap-2">
          <HeartPulse className="text-teal-500 w-8 h-8" />
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">AyushAI</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold">
            U
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-20 pb-24 md:pb-8 md:pl-24 lg:pl-64 px-4 min-h-screen transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      {/* Sidebar (Desktop) / Bottom Nav (Mobile) */}
      <nav className="fixed bottom-0 md:top-16 md:left-0 w-full md:w-24 lg:w-64 bg-white dark:bg-slate-800 border-t md:border-t-0 md:border-r border-slate-200 dark:border-slate-700 h-16 md:h-[calc(100vh-64px)] z-40 flex md:flex-col justify-around md:justify-start py-2 md:py-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col md:flex-row items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-teal-600 bg-teal-50 dark:bg-teal-900/20' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] md:text-sm font-medium lg:block hidden">{item.label}</span>
              <span className="text-[10px] md:hidden">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
