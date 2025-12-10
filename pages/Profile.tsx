import React, { useState } from 'react';
import { User, Settings, HelpCircle, LogOut, ChevronDown } from 'lucide-react';
import { FAQS } from '../constants';

const Profile: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleWhatsApp = () => {
    // Opens WhatsApp with the specific number in a new tab
    window.open('https://wa.me/5562999482529', '_blank');
  };

  const handleLogout = () => {
    localStorage.removeItem('ks_user');
    window.location.reload();
  };

  return (
    <div className="p-4 pb-24 h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-8 pt-4">
        <div className="w-24 h-24 bg-gradient-to-br from-ks-accent to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-xl ring-4 ring-ks-secondary">
          <User size={40} className="text-white" />
        </div>
        <h2 className="text-xl font-bold text-ks-text">Cliente KS</h2>
        <p className="text-ks-muted">Membro Ativo</p>
      </div>

      {/* Menu Options */}
      <div className="space-y-4 mb-8">
        <button className="w-full bg-ks-secondary p-4 rounded-xl flex items-center justify-between text-ks-text hover:bg-slate-800 transition-colors">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400">
              <Settings size={20} />
            </div>
            <span className="font-medium">Configurações da Conta</span>
          </div>
          <ChevronDown size={16} className="-rotate-90 text-ks-muted" />
        </button>
      </div>

      {/* FAQ Section */} 
      <div className="mb-8">
        <h3 className="text-lg font-bold text-ks-text mb-4 flex items-center gap-2">
          <HelpCircle size={20} className="text-ks-accent" /> Perguntas Frequentes
        </h3>
        <div className="space-y-3">
          {FAQS.map((faq, index) => (
            <div key={index} className="bg-ks-secondary rounded-xl overflow-hidden border border-slate-700">
              <button 
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full p-4 text-left flex justify-between items-center"
              >
                <span className="font-medium text-sm text-slate-200">{faq.question}</span>
                <ChevronDown size={16} className={`text-ks-muted transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === index && (
                <div className="p-4 pt-0 text-sm text-slate-400 leading-relaxed border-t border-slate-700/50 mt-2">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Agency Contact */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 text-center">
        <h3 className="font-bold text-white mb-2">KS-Tudo Digital</h3>
        <p className="text-sm text-slate-400 mb-4">
          Precisa de uma estratégia personalizada? Fale com nosso time de especialistas.
        </p>
        <button 
          onClick={handleWhatsApp}
          className="bg-ks-accent text-white px-6 py-3 rounded-xl font-bold w-full shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-colors"
        >
          Falar no WhatsApp
        </button>
      </div>
      
      <button 
        onClick={handleLogout}
        className="w-full mt-6 text-red-400 text-sm font-medium flex items-center justify-center gap-2 py-4"
      >
        <LogOut size={16} /> Sair do aplicativo
      </button>
    </div>
  );
};

export default Profile;