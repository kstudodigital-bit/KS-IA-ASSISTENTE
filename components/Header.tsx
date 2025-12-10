import React from 'react';
import { Menu, Bell } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-ks-secondary/95 backdrop-blur-sm border-b border-slate-700 flex items-center justify-between px-4 z-50">
      <button className="text-ks-muted hover:text-ks-text">
        <Menu size={24} />
      </button>
      <div className="flex flex-col items-center">
        <h1 className="text-lg font-bold text-ks-text tracking-wide">KS Digital Helper</h1>
        <span className="text-[10px] text-ks-accent font-semibold tracking-wider uppercase">KS-Tudo Digital</span>
      </div>
      <button className="text-ks-muted hover:text-ks-text relative">
        <Bell size={24} />
        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
    </header>
  );
};

export default Header;