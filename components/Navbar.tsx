import React from 'react';
import { LayoutGrid, ShoppingBag, HeadphonesIcon, Home } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'packages' | 'custom' | 'support';
  setCurrentView: (view: 'home' | 'packages' | 'custom' | 'support') => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView, cartCount }) => {
  const navItemClass = (view: string) => 
    `flex items-center gap-3 px-6 py-3 rounded-full text-base font-medium transition-all duration-300 ${
      currentView === view 
        ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)] transform scale-105' 
        : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`;

  return (
    <div className="fixed top-8 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="glass rounded-full px-8 py-4 flex items-center justify-between w-full max-w-6xl shadow-2xl shadow-black/80 border border-white/10 backdrop-blur-xl">
        <div 
          className="text-white cursor-pointer flex items-center gap-1 hover:opacity-80 transition-opacity mr-12"
          onClick={() => setCurrentView('home')}
        >
          <div className="px-2 py-1 border-2 border-white flex items-center justify-center bg-transparent">
             <span className="text-xl font-bold uppercase tracking-wider font-display leading-none">FRAME</span>
          </div>
          <span className="hidden sm:block text-xl font-bold tracking-wider uppercase font-display leading-none">RATE</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button onClick={() => setCurrentView('home')} className={navItemClass('home')}>
            <Home size={20} />
            <span className="hidden lg:inline">Главная</span>
          </button>
          <button onClick={() => setCurrentView('packages')} className={navItemClass('packages')}>
            <LayoutGrid size={20} />
            <span className="hidden lg:inline">Тарифы</span>
          </button>
          <button onClick={() => setCurrentView('custom')} className={navItemClass('custom')}>
            <ShoppingBag size={20} />
            <span className="hidden lg:inline">Конструктор</span>
            {cartCount > 0 && (
              <span className="bg-indigo-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center ml-1 shadow-lg shadow-indigo-500/40">
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={() => setCurrentView('support')} className={navItemClass('support')}>
            <HeadphonesIcon size={20} />
            <span className="hidden lg:inline">Поддержка</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;