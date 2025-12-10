import React from 'react';
import { ArrowRight, BarChart2, Zap, Target } from 'lucide-react';
import { Tab } from '../types';

interface HomeProps {
  onNavigate: (tab: Tab) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="p-4 space-y-6 pb-24 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-ks-accent to-blue-700 rounded-2xl p-6 shadow-lg text-white">
        <h2 className="text-2xl font-bold mb-2">Olá, Estrategista!</h2>
        <p className="text-blue-100 mb-4 text-sm">Pronto para escalar suas vendas hoje? Tire suas dúvidas com nossa IA.</p>
        <button 
          onClick={() => onNavigate(Tab.CHAT)}
          className="bg-white text-ks-accent px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-blue-50 transition-colors"
        >
          Iniciar Conversa <ArrowRight size={16} />
        </button>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-ks-text font-bold text-lg mb-4">Acesso Rápido</h3>
        <div className="grid grid-cols-2 gap-4">
          <div onClick={() => onNavigate(Tab.RESOURCES)} className="bg-ks-secondary p-4 rounded-xl border border-slate-700 hover:border-ks-accent transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center mb-3">
              <Zap size={20} />
            </div>
            <h4 className="font-semibold text-ks-text">Lançamentos</h4>
            <p className="text-xs text-ks-muted mt-1">Checklists essenciais</p>
          </div>
          <div onClick={() => onNavigate(Tab.RESOURCES)} className="bg-ks-secondary p-4 rounded-xl border border-slate-700 hover:border-ks-accent transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-green-500/20 text-green-400 rounded-lg flex items-center justify-center mb-3">
              <BarChart2 size={20} />
            </div>
            <h4 className="font-semibold text-ks-text">Tráfego Pago</h4>
            <p className="text-xs text-ks-muted mt-1">Dicas de otimização</p>
          </div>
        </div>
      </div>

      {/* Agency Services Promo */}
      <div className="bg-ks-secondary p-5 rounded-2xl border border-slate-700">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-ks-text font-bold mb-1">Escale sua Agência</h3>
            <p className="text-ks-muted text-sm mb-3">Precisa de um time completo? A KS-Tudo Digital tem a solução.</p>
          </div>
          <div className="bg-ks-accent/10 p-2 rounded-full">
            <Target className="text-ks-accent" size={24} />
          </div>
        </div>
        <button className="w-full py-2.5 rounded-lg border border-ks-accent text-ks-accent font-medium text-sm hover:bg-ks-accent/10 transition-colors">
          Conhecer Serviços
        </button>
      </div>
    </div>
  );
};

export default Home;