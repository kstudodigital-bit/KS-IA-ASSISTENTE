import React, { useState, useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import TabBar from './components/TabBar';
import Home from './pages/Home';
import ChatPage from './pages/ChatPage';
import Resources from './pages/Resources';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import { Tab } from './types';

const AppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.HOME);

  const renderContent = () => {
    switch (currentTab) {
      case Tab.HOME:
        return <Home onNavigate={setCurrentTab} />;
      case Tab.CHAT:
        return <ChatPage />;
      case Tab.RESOURCES:
        return <Resources />;
      case Tab.PROFILE:
        return <Profile />;
      default:
        return <Home onNavigate={setCurrentTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-ks-primary text-ks-text font-sans selection:bg-ks-accent selection:text-white">
      <Header />
      
      <main className="pt-20 pb-4 max-w-md mx-auto min-h-screen bg-ks-primary relative shadow-2xl overflow-hidden border-x border-slate-800/50">
        {renderContent()}
      </main>

      <div className="max-w-md mx-auto fixed bottom-0 left-0 right-0">
        <TabBar currentTab={currentTab} onTabChange={setCurrentTab} />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('ks_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: any) => {
    localStorage.setItem('ks_user', JSON.stringify(userData));
    setUser(userData);
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;