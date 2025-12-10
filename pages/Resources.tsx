import React, { useState } from 'react';
import { ARTICLES, CHECKLISTS } from '../constants';
import { CheckSquare, FileText, ChevronRight } from 'lucide-react';
import { Checklist } from '../types';

const Resources: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'articles' | 'checklists'>('articles');
  const [expandedChecklist, setExpandedChecklist] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (itemId: string) => {
    setCheckedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  return (
    <div className="p-4 h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar pb-24">
      {/* Sub-tabs */}
      <div className="flex bg-ks-secondary p-1 rounded-xl mb-6">
        <button
          onClick={() => setActiveTab('articles')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'articles' ? 'bg-ks-accent text-white shadow' : 'text-ks-muted'
          }`}
        >
          Artigos & Dicas
        </button>
        <button
          onClick={() => setActiveTab('checklists')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'checklists' ? 'bg-ks-accent text-white shadow' : 'text-ks-muted'
          }`}
        >
          Checklists
        </button>
      </div>

      {activeTab === 'articles' ? (
        <div className="grid gap-4">
          {ARTICLES.map((article) => (
            <div key={article.id} className="bg-ks-secondary rounded-xl overflow-hidden border border-slate-700 shadow-md">
              <div className="h-32 overflow-hidden relative">
                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-ks-primary/80 text-xs px-2 py-1 rounded backdrop-blur-sm text-white">
                  {article.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-ks-text mb-1">{article.title}</h3>
                <p className="text-sm text-ks-muted line-clamp-2">{article.summary}</p>
                <button className="mt-3 text-ks-accent text-sm font-medium flex items-center gap-1">
                  Ler artigo <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {CHECKLISTS.map((checklist) => (
            <div key={checklist.id} className="bg-ks-secondary rounded-xl border border-slate-700 overflow-hidden">
              <div 
                className="p-4 flex items-center justify-between cursor-pointer bg-slate-800/50"
                onClick={() => setExpandedChecklist(expandedChecklist === checklist.id ? null : checklist.id)}
              >
                <div>
                  <h3 className="font-bold text-ks-text">{checklist.title}</h3>
                  <p className="text-xs text-ks-muted">{checklist.description}</p>
                </div>
                <ChevronRight 
                  size={20} 
                  className={`text-ks-muted transition-transform ${expandedChecklist === checklist.id ? 'rotate-90' : ''}`} 
                />
              </div>
              
              {expandedChecklist === checklist.id && (
                <div className="p-4 border-t border-slate-700 bg-ks-secondary">
                  {checklist.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 mb-3 last:mb-0">
                      <div 
                        onClick={() => toggleCheck(item.id)}
                        className={`w-5 h-5 rounded border cursor-pointer flex items-center justify-center transition-colors ${
                          checkedItems[item.id] ? 'bg-green-500 border-green-500' : 'border-slate-500'
                        }`}
                      >
                        {checkedItems[item.id] && <CheckSquare size={14} className="text-white" />}
                      </div>
                      <span className={`text-sm ${checkedItems[item.id] ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                  <div className="mt-4 pt-4 border-t border-slate-700/50">
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${(checklist.items.filter(i => checkedItems[i.id]).length / checklist.items.length) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-right mt-1 text-slate-400">
                      {checklist.items.filter(i => checkedItems[i.id]).length} de {checklist.items.length} completos
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Resources;