import React from 'react';
import { Home, MessageSquare, BookOpen, User } from 'lucide-react';
import { Tab } from '../types';

interface TabBarProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const TabBar: React.FC<TabBarProps> = ({ currentTab, onTabChange }) => {
  const getTabClass = (tab: Tab) => 
    `flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
      currentTab === tab ? 'text-ks-accent' : 'text-ks-muted hover:text-ks-text'
    }`;

  return (
    <nav className="fixed bottom-0 left-0 w-full h-16 bg-ks-secondary border-t border-slate-700 pb-safe flex items-center justify-around z-50 shadow-lg">
      <button onClick={() => onTabChange(Tab.HOME)} className={getTabClass(Tab.HOME)}>
        <Home size={24} />
        <span className="text-[10px] mt-1 font-medium">Início</span>
      </button>
      <button onClick={() => onTabChange(Tab.CHAT)} className={getTabClass(Tab.CHAT)}>
        <MessageSquare size={24} />
        <span className="text-[10px] mt-1 font-medium">Chat IA</span>
      </button>
      <button onClick={() => onTabChange(Tab.RESOURCES)} className={getTabClass(Tab.RESOURCES)}>
        <BookOpen size={24} />
        <span className="text-[10px] mt-1 font-medium">Recursos</span>
      </button>
      <button onClick={() => onTabChange(Tab.PROFILE)} className={getTabClass(Tab.PROFILE)}>
        <User size={24} />
        <span className="text-[10px] mt-1 font-medium">Perfil</span>
      </button>
    </nav>
  );
};

export default TabBar;