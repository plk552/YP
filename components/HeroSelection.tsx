import React, { useState } from 'react';
import { Package, Purpose, Equipment } from '../types';
import { Smartphone, Youtube, Heart, Briefcase, Plane, ArrowRight, Search, Sparkles, Loader2, Video, Clapperboard, Plus, Check, X } from 'lucide-react';
import { PRESET_PACKAGES, EQUIPMENT_CATALOG } from '../constants';

interface HeroSelectionProps {
  onSelectPurpose: (purpose: Purpose) => void;
  onAddToCart: (pkg: Package) => void;
}

const HeroSelection: React.FC<HeroSelectionProps> = ({ onSelectPurpose, onAddToCart }) => {
  const [prompt, setPrompt] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const popularPackages = PRESET_PACKAGES.filter(p => p.isPopular);

  const purposes = [
    { id: Purpose.TikTok, icon: <Smartphone size={28} />, label: 'TikTok & Reels', desc: 'Вертикальный контент', color: 'group-hover:text-pink-500', bg: 'group-hover:bg-pink-500/10', border: 'group-hover:border-pink-500/50' },
    { id: Purpose.YouTube, icon: <Youtube size={28} />, label: 'YouTube', desc: 'Интервью и блоги', color: 'group-hover:text-red-500', bg: 'group-hover:bg-red-500/10', border: 'group-hover:border-red-500/50' },
    { id: Purpose.Wedding, icon: <Heart size={28} />, label: 'Свадьба', desc: 'Love story и банкет', color: 'group-hover:text-purple-500', bg: 'group-hover:bg-purple-500/10', border: 'group-hover:border-purple-500/50' },
    { id: Purpose.Commercial, icon: <Briefcase size={28} />, label: 'Продакшн', desc: 'Реклама и клипы', color: 'group-hover:text-blue-500', bg: 'group-hover:bg-blue-500/10', border: 'group-hover:border-blue-500/50' },
    { id: Purpose.Cinema, icon: <Clapperboard size={28} />, label: 'Кино', desc: 'Большой экран', color: 'group-hover:text-amber-500', bg: 'group-hover:bg-amber-500/10', border: 'group-hover:border-amber-500/50' },
  ];

  const handleSmartSearch = async () => {
    if (!prompt.trim()) return;
    setIsAnalyzing(true);
    
    // Simulate thinking delay for effect
    setTimeout(() => {
      const lower = prompt.toLowerCase();
      let detectedPurpose = Purpose.YouTube; // Fallback

      if (lower.includes('tik') || lower.includes('reels') || lower.includes('тик') || lower.includes('вертикал') || lower.includes('сторис')) detectedPurpose = Purpose.TikTok;
      else if (lower.includes('wedding') || lower.includes('свадьб') || lower.includes('невест') || lower.includes('love')) detectedPurpose = Purpose.Wedding;
      else if (lower.includes('travel') || lower.includes('путеш') || lower.includes('трип') || lower.includes('дрон') || lower.includes('горы') || lower.includes('море')) detectedPurpose = Purpose.Travel;
      else if (lower.includes('event') || lower.includes('меропр') || lower.includes('концерт') || lower.includes('клуб')) detectedPurpose = Purpose.Event;
      else if (lower.includes('cinema') || lower.includes('кино') || lower.includes('фильм') || lower.includes('сериал')) detectedPurpose = Purpose.Cinema;
      else if (lower.includes('ad') || lower.includes('реклам') || lower.includes('promo') || lower.includes('промо')) detectedPurpose = Purpose.Commercial;

      setIsAnalyzing(false);
      onSelectPurpose(detectedPurpose);
    }, 800);
  };

  const getEquipmentNames = (ids: string[]) => {
    return ids.map(id => {
      const eq = EQUIPMENT_CATALOG.find(e => e.id === id);
      return eq ? eq.name : 'Item';
    });
  };

  const getEquipmentItems = (ids: string[]): Equipment[] => {
    return ids.map(id => EQUIPMENT_CATALOG.find(e => e.id === id)).filter(e => !!e) as Equipment[];
  };

  return (
    <div className="min-h-screen bg-background pt-36 pb-20 px-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[128px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center animate-fade-in">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-gray-300 mb-4 shadow-lg shadow-black/20">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Онлайн бронирование 24/7
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.05]">
            Аренда техники <br />
            <span className="text-gradient-primary">нового поколения</span>
          </h1>
          
          {/* Smart Input (Local Logic) */}
          <div className="relative max-w-2xl mx-auto w-full mt-10 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-40 group-hover:opacity-70 transition duration-500 blur-lg"></div>
            <div className="relative bg-[#0F0F0F] rounded-2xl p-2 flex items-center border border-white/10 shadow-2xl">
              <div className="pl-4 text-indigo-400">
                <Sparkles size={24} />
              </div>
              <input 
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSmartSearch()}
                placeholder="Напишите цель (например: снять клип в горах)..."
                className="w-full bg-transparent border-none text-white px-4 py-4 focus:outline-none placeholder-gray-500 text-lg"
              />
              <button 
                onClick={handleSmartSearch}
                disabled={isAnalyzing || !prompt.trim()}
                className="bg-white text-black rounded-xl px-6 py-3 font-bold hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isAnalyzing ? <Loader2 size={20} className="animate-spin" /> : <ArrowRight size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full mb-24">
          {purposes.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => onSelectPurpose(p.id)}
              className={`group relative flex flex-col items-center p-6 h-56 rounded-[2rem] border border-white/5 bg-surface transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${p.border}`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex-1 flex flex-col items-center justify-center gap-4">
                <div className={`p-4 rounded-2xl bg-white/5 text-gray-400 transition-colors duration-300 ${p.bg} ${p.color}`}>
                  {p.icon}
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-white mb-1">{p.label}</h3>
                  <p className="text-xs text-gray-500 font-medium">{p.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Popular Tariffs Section */}
        <div className="w-full">
           <div className="flex items-center gap-3 mb-10">
              <div className="p-2 bg-indigo-500 rounded-lg">
                <Video size={24} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Популярные тарифы</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {popularPackages.slice(0, 3).map((pkg) => (
                <div 
                    key={pkg.id} 
                    onClick={() => setSelectedPackage(pkg)}
                    className="group relative bg-[#0F0F0F] rounded-[2rem] border border-white/10 hover:border-indigo-500/30 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col cursor-pointer"
                >
                   <div className="p-8 flex-1">
                      <div className="flex justify-between items-start mb-4">
                         <span className="bg-white/10 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{pkg.purpose}</span>
                         {pkg.isPopular && <span className="text-amber-400"><Sparkles size={16} fill="currentColor" /></span>}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{pkg.title}</h3>
                      <p className="text-gray-400 text-sm mb-6 line-clamp-2">{pkg.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {getEquipmentNames(pkg.items).slice(0, 3).map((name, i) => (
                           <span key={i} className="text-xs bg-black border border-white/10 px-2 py-1 rounded text-gray-300">{name}</span>
                        ))}
                        {pkg.items.length > 3 && <span className="text-xs bg-black border border-white/10 px-2 py-1 rounded text-gray-300">+{pkg.items.length - 3}</span>}
                      </div>

                      <div className="space-y-2 mb-8">
                        {pkg.features.slice(0, 2).map((f, i) => (
                           <div key={i} className="flex items-center gap-2">
                              <Check size={14} className="text-indigo-400" />
                              <span className="text-sm text-gray-400">{f}</span>
                           </div>
                        ))}
                      </div>
                   </div>

                   <div className="p-6 border-t border-white/5 bg-white/5 flex items-center justify-between group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-colors">
                      <div>
                         <span className="block text-xs text-gray-500 group-hover:text-indigo-200">Стоимость аренды</span>
                         <span className="text-xl font-bold text-white">{pkg.discountedPrice.toLocaleString()} ₽</span>
                      </div>
                      <button 
                         onClick={(e) => { e.stopPropagation(); onAddToCart(pkg); }}
                         className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform"
                      >
                         <Plus size={20} />
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Modal */}
        {selectedPackage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedPackage(null)} />
          
          <div className="relative bg-[#0f0f0f] w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl border border-white/10 shadow-2xl flex flex-col animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div>
                <h3 className="text-2xl font-bold text-white">{selectedPackage.title}</h3>
                <p className="text-gray-400 text-sm">Полный состав оборудования</p>
              </div>
              <button onClick={() => setSelectedPackage(null)} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {getEquipmentItems(selectedPackage.items).map(item => (
                   <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-colors">
                      <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-black">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-xs text-indigo-400 font-bold mb-1 uppercase tracking-wider">{item.category}</span>
                        <h4 className="text-lg font-bold text-white leading-tight mb-2">{item.name}</h4>
                        {item.description && <p className="text-xs text-gray-400">{item.description}</p>}
                      </div>
                   </div>
                 ))}
              </div>
            </div>

            <div className="p-6 border-t border-white/10 bg-surface flex justify-between items-center">
              <div>
                <span className="text-gray-400 text-xs">Итоговая стоимость</span>
                <div className="text-3xl font-bold text-white">{selectedPackage.discountedPrice.toLocaleString('ru-RU')} ₽ <span className="text-sm font-normal text-gray-500">/ день</span></div>
              </div>
              <button 
                onClick={() => { onAddToCart(selectedPackage); setSelectedPackage(null); }}
                className="px-8 py-3 rounded-xl bg-white text-black font-bold hover:bg-indigo-500 hover:text-white transition-colors"
              >
                Добавить в корзину
              </button>
            </div>
          </div>
        </div>
      )}

      </div>
    </div>
  );
};

export default HeroSelection;