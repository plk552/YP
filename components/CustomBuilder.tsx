import React, { useState } from 'react';
import { EQUIPMENT_CATALOG } from '../constants';
import { EquipmentCategory, Equipment } from '../types';
import { Plus, Minus, ShoppingBag, Search, Loader2, CheckCircle, X } from 'lucide-react';

interface CustomBuilderProps {
  cart: { [itemId: string]: number };
  onUpdateCart: (itemId: string, delta: number) => void;
  onClearCart: () => void;
}

const CustomBuilder: React.FC<CustomBuilderProps> = ({ cart, onUpdateCart, onClearCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategory | 'All'>('All');
  const [checkoutStatus, setCheckoutStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [viewItem, setViewItem] = useState<Equipment | null>(null);

  const categories = ['All', ...Object.values(EquipmentCategory)];

  const filteredEquipment = selectedCategory === 'All'
    ? EQUIPMENT_CATALOG
    : EQUIPMENT_CATALOG.filter(e => e.category === selectedCategory);

  const calculateTotal = () => {
    let total = 0;
    Object.entries(cart).forEach(([id, qty]) => {
      const item = EQUIPMENT_CATALOG.find(e => e.id === id);
      if (item) total += item.pricePerDay * (qty as number);
    });
    return total;
  };

  const handleCheckout = () => {
    if (checkoutStatus !== 'idle') return;
    
    setCheckoutStatus('processing');

    // Simulate payment/order processing animation
    setTimeout(() => {
        setCheckoutStatus('success');

        // Reset state after showing success, do NOT redirect
        setTimeout(() => {
            setCheckoutStatus('idle');
            // Optionally clear cart here if desired, but user might want to keep it
            // onClearCart(); 
        }, 3000);
    }, 2000);
  };

  return (
    <>
      <div className="pt-36 pb-12 px-4 md:px-8 max-w-[1400px] mx-auto min-h-screen flex flex-col lg:flex-row gap-8 animate-fade-in">
        
        {/* Catalog Section */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Конструктор</h2>
              <p className="text-gray-500 text-sm">Выберите оборудование для своего проекта</p>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-surface rounded-full px-4 py-2 border border-white/10">
               <Search size={16} className="text-gray-500" />
               <input type="text" placeholder="Поиск..." className="bg-transparent border-none focus:outline-none text-sm text-white placeholder-gray-600 w-32" />
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-white/5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as EquipmentCategory | 'All')}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  selectedCategory === cat
                    ? 'bg-white text-black shadow-lg shadow-white/10 scale-105'
                    : 'bg-surface text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredEquipment.map((item) => {
               const qty = cart[item.id] || 0;
               return (
                <div key={item.id} className="bg-surface border border-white/5 rounded-2xl overflow-hidden group hover:border-indigo-500/30 transition-all duration-300 flex flex-col">
                  <div 
                    className="aspect-[4/3] bg-[#121212] relative overflow-hidden cursor-pointer"
                    onClick={() => setViewItem(item)}
                  >
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
                    <div className="absolute top-3 left-3 backdrop-blur-md bg-black/50 px-2 py-1 rounded text-[10px] font-bold text-white border border-white/10">
                      {item.category}
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="mb-4">
                      <h4 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors mb-2">{item.name}</h4>
                      {item.description && (
                        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{item.description}</p>
                      )}
                    </div>
                    
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-lg font-bold text-white">{item.pricePerDay} ₽</span>
                      
                      {qty > 0 ? (
                         <div className="flex items-center gap-1 bg-white rounded-lg p-1 shadow-lg shadow-white/10">
                           <button onClick={() => onUpdateCart(item.id, -1)} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 text-black transition-colors"><Minus size={14} /></button>
                           <span className="font-bold text-black text-sm w-6 text-center">{qty}</span>
                           <button onClick={() => onUpdateCart(item.id, 1)} className="w-7 h-7 flex items-center justify-center rounded-md bg-black text-white hover:bg-gray-800 transition-colors"><Plus size={14} /></button>
                         </div>
                      ) : (
                        <button 
                          onClick={() => onUpdateCart(item.id, 1)}
                          className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all"
                        >
                          <Plus size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cart Sidebar (Sticky) */}
        <div className="lg:w-96 w-full mt-8 lg:mt-0 relative">
          <div className="sticky top-40 glass rounded-[2rem] p-6 shadow-2xl shadow-black/50 border border-white/10 transition-all">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <ShoppingBag size={20} className="text-indigo-500" /> 
                Ваш заказ
              </h3>
              {Object.keys(cart).length > 0 && (
                <button onClick={onClearCart} className="text-xs font-medium text-red-500 hover:text-red-400 bg-red-500/10 px-3 py-1 rounded-full transition-colors">
                  Очистить
                </button>
              )}
            </div>

            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar mb-8">
              {Object.keys(cart).length === 0 ? (
                <div className="text-center py-12">
                   <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingBag size={24} className="text-gray-600" />
                   </div>
                   <p className="text-gray-500 text-sm">Корзина пуста</p>
                </div>
              ) : (
                Object.entries(cart).map(([id, qty]) => {
                  const item = EQUIPMENT_CATALOG.find(e => e.id === id);
                  if (!item) return null;
                  const quantity = qty as number;
                  return (
                    <div key={id} className="flex gap-3 bg-surface p-3 rounded-xl border border-white/5 group">
                      <img src={item.image} className="w-12 h-12 object-cover rounded-lg bg-gray-800" alt="" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-sm font-medium text-white leading-tight">{item.name}</span>
                          <span className="text-xs font-bold text-gray-400">{item.pricePerDay * quantity} ₽</span>
                        </div>
                        <div className="flex justify-between items-end">
                          <span className="text-[10px] text-gray-600">{item.pricePerDay} ₽ / шт</span>
                          <div className="flex items-center gap-2 bg-black rounded px-1.5 py-0.5 border border-white/10">
                            <button onClick={() => onUpdateCart(id, -1)} className="text-gray-500 hover:text-white"><Minus size={10} /></button>
                            <span className="text-white text-xs font-mono w-4 text-center">{quantity}</span>
                            <button onClick={() => onUpdateCart(id, 1)} className="text-gray-500 hover:text-white"><Plus size={10} /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10 bg-black/20 -mx-6 px-6 py-6 -mb-6 rounded-b-[2rem]">
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>Товары ({Object.keys(cart).length})</span>
                <span>{calculateTotal().toLocaleString('ru-RU')} ₽</span>
              </div>
               <div className="flex justify-between items-center text-sm text-gray-400">
                <span>Скидка</span>
                <span className="text-green-500">0 ₽</span>
              </div>
              <div className="flex justify-between items-end pt-2">
                <span className="text-white font-medium">Итого</span>
                <span className="text-3xl font-bold text-indigo-400">{calculateTotal().toLocaleString('ru-RU')} <span className="text-sm text-gray-500 font-normal">₽</span></span>
              </div>
              
              <button 
                onClick={handleCheckout}
                disabled={Object.keys(cart).length === 0 || checkoutStatus !== 'idle'}
                className={`w-full py-4 rounded-xl font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 ${
                    checkoutStatus === 'success' 
                      ? 'bg-green-500 text-white hover:bg-green-600' 
                      : 'bg-white text-black hover:bg-indigo-500 hover:text-white'
                } ${Object.keys(cart).length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {checkoutStatus === 'idle' && 'ОФОРМИТЬ АРЕНДУ'}
                {checkoutStatus === 'processing' && (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      ОБРАБОТКА...
                    </>
                )}
                {checkoutStatus === 'success' && (
                    <>
                      <CheckCircle size={18} />
                      УСПЕШНО!
                    </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Item Details Modal */}
      {viewItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setViewItem(null)} />
          
          <div className="relative bg-[#0f0f0f] w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 shadow-2xl flex flex-col animate-slide-up">
            <button 
              onClick={() => setViewItem(null)} 
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="h-64 w-full relative">
              <img src={viewItem.image} alt={viewItem.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] to-transparent"></div>
              <div className="absolute bottom-4 left-6">
                <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-xs font-bold uppercase tracking-wider mb-2">
                  {viewItem.category}
                </span>
                <h3 className="text-3xl font-bold text-white">{viewItem.name}</h3>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Описание</h4>
                <p className="text-gray-200 leading-relaxed text-lg">
                  {viewItem.description || "Для этого товара пока нет подробного описания, но мы гарантируем его отличное состояние и полную работоспособность."}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                 <div>
                    <span className="block text-sm text-gray-500 mb-1">Стоимость аренды</span>
                    <span className="text-3xl font-bold text-white">{viewItem.pricePerDay} ₽ <span className="text-sm font-normal text-gray-500">/ сутки</span></span>
                 </div>
                 
                 <div className="flex items-center gap-4">
                   {cart[viewItem.id] > 0 ? (
                      <div className="flex items-center gap-2 bg-white rounded-xl p-1.5 shadow-lg">
                         <button onClick={() => onUpdateCart(viewItem.id, -1)} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 text-black transition-colors"><Minus size={18} /></button>
                         <span className="font-bold text-black text-lg w-8 text-center">{cart[viewItem.id]}</span>
                         <button onClick={() => onUpdateCart(viewItem.id, 1)} className="w-10 h-10 flex items-center justify-center rounded-lg bg-black text-white hover:bg-gray-800 transition-colors"><Plus size={18} /></button>
                       </div>
                   ) : (
                      <button 
                        onClick={() => onUpdateCart(viewItem.id, 1)}
                        className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-indigo-500 hover:text-white transition-all shadow-lg"
                      >
                        Добавить в корзину
                      </button>
                   )}
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomBuilder;