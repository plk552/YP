import React, { useState } from 'react';
import { Package, Purpose, Equipment } from '../types';
import { EQUIPMENT_CATALOG } from '../constants';
import { Check, Plus, ArrowRight, Zap, X, Info, ArrowLeft } from 'lucide-react';

interface PackageListProps {
  selectedPurpose: Purpose;
  packages: Package[];
  onAddToCart: (pkg: Package) => void;
  onCustomize: () => void;
  onBack: () => void;
}

const PackageList: React.FC<PackageListProps> = ({ selectedPurpose, packages, onAddToCart, onCustomize, onBack }) => {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const filteredPackages = packages.filter(p => p.purpose === selectedPurpose);

  const getEquipmentItems = (ids: string[]): Equipment[] => {
    return ids.map(id => EQUIPMENT_CATALOG.find(e => e.id === id)).filter(e => !!e) as Equipment[];
  };

  const openModal = (pkg: Package) => setSelectedPackage(pkg);
  const closeModal = () => setSelectedPackage(null);

  return (
    <>
      <div className="pt-36 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen animate-fade-in">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8 gap-6">
          <div className="w-full lg:w-auto">
            <span className="text-indigo-400 text-sm font-semibold tracking-wider uppercase mb-2 block">Готовые решения</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">{selectedPurpose}</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <button 
                onClick={onBack}
                className="flex-1 sm:flex-none justify-center group flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 hover:border-indigo-500/50 hover:bg-white/5 transition-all text-sm font-medium text-gray-300 hover:text-white"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Назад на главную</span>
            </button>

            <button 
                onClick={onCustomize}
                className="flex-1 sm:flex-none justify-center group flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 hover:border-indigo-500/50 hover:bg-white/5 transition-all text-sm font-medium text-gray-300 hover:text-white"
            >
                <span>Собрать свой набор</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.length > 0 ? (
            filteredPackages.map((pkg, idx) => (
              <div 
                key={pkg.id} 
                onClick={() => openModal(pkg)}
                className="glass-card rounded-[2rem] p-8 flex flex-col relative overflow-hidden group transition-all duration-500 cursor-pointer hover:bg-white/[0.03]"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Zap size={120} className="text-indigo-500 -rotate-12 translate-x-8 -translate-y-8" />
                </div>

                <div className="relative z-10 flex-grow">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{pkg.title}</h3>
                  <p className="text-gray-400 text-sm mb-8 leading-relaxed">{pkg.description}</p>
                  
                  <div className="mb-8">
                     <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-white tracking-tight">{pkg.discountedPrice.toLocaleString('ru-RU')} ₽</span>
                      <span className="text-sm text-gray-500">/ день</span>
                     </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="mt-1 w-4 h-4 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                          <Check size={10} className="text-indigo-400" />
                        </div>
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mb-8 pt-6 border-t border-white/5">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-3">Нажмите для просмотра состава</p>
                    <div className="flex flex-wrap gap-2">
                      {getEquipmentItems(pkg.items).slice(0, 3).map((item, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-md bg-white/5 text-xs text-gray-300 border border-white/5">{item.name}</span>
                      ))}
                      {pkg.items.length > 3 && (
                        <span className="px-3 py-1.5 rounded-md bg-white/5 text-xs text-gray-300 border border-white/5">+{pkg.items.length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={(e) => { e.stopPropagation(); onAddToCart(pkg); }}
                  className="relative z-10 w-full py-4 rounded-xl bg-white text-black font-bold text-sm tracking-wide hover:bg-indigo-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-white/5"
                >
                  <Plus size={16} />
                  АРЕНДОВАТЬ СЕЙЧАС
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
              <p className="text-gray-400 mb-4">Для этой категории пока нет готовых пресетов.</p>
              <button 
                onClick={onCustomize}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-medium transition-colors"
              >
                Перейти в конструктор
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Package Detail Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeModal} />
          
          <div className="relative bg-[#0f0f0f] w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl border border-white/10 shadow-2xl flex flex-col animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div>
                <h3 className="text-2xl font-bold text-white">{selectedPackage.title}</h3>
                <p className="text-gray-400 text-sm">Полный состав оборудования</p>
              </div>
              <button onClick={closeModal} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
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
                onClick={() => { onAddToCart(selectedPackage); closeModal(); }}
                className="px-8 py-3 rounded-xl bg-white text-black font-bold hover:bg-indigo-500 hover:text-white transition-colors"
              >
                Добавить в корзину
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PackageList;