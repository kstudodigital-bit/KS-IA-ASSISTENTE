import React, { useState } from 'react';
import { User, Mail, Calendar, ArrowRight } from 'lucide-react';

interface AuthProps {
  onLogin: (user: any) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.age) {
      onLogin(formData);
    }
  };

  return (
    <div className="min-h-screen bg-ks-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-ks-secondary p-8 rounded-2xl border border-slate-700 shadow-2xl animate-fade-in">
        <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-ks-accent rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
                <span className="text-2xl font-bold text-white">KS</span>
            </div>
          <h1 className="text-2xl font-bold text-ks-text mb-2">Bem-vindo(a)</h1>
          <p className="text-ks-muted text-sm text-center">Cadastre-se para acessar o assistente inteligente da KS-Tudo Digital</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-400 ml-1">Nome Completo</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-ks-muted" size={20} />
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-ks-accent focus:border-transparent outline-none transition-all placeholder-slate-600"
                placeholder="Seu nome"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-400 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-ks-muted" size={20} />
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-ks-accent focus:border-transparent outline-none transition-all placeholder-slate-600"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-400 ml-1">Idade</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 text-ks-muted" size={20} />
              <input
                type="number"
                required
                min="1"
                max="120"
                value={formData.age}
                onChange={e => setFormData({...formData, age: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-ks-accent focus:border-transparent outline-none transition-all placeholder-slate-600"
                placeholder="Sua idade"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-ks-accent hover:bg-ks-accentHover text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 mt-6 transition-transform active:scale-95"
          >
            Acessar Aplicativo <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;