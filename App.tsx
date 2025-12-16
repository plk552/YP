import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSelection from './components/HeroSelection';
import PackageList from './components/PackageList';
import CustomBuilder from './components/CustomBuilder';
import SupportChat from './components/SupportChat';
import { Package, Purpose } from './types';
import { PRESET_PACKAGES } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'packages' | 'custom' | 'support'>('home');
  const [selectedPurpose, setSelectedPurpose] = useState<Purpose | null>(null);
  
  // Simple cart state: itemId -> quantity
  const [cart, setCart] = useState<{ [id: string]: number }>({});

  const handleSelectPurpose = (purpose: Purpose) => {
    setSelectedPurpose(purpose);
    setCurrentView('packages');
  };

  const handleAddToCart = (pkg: Package) => {
    // Break package into items and add to cart
    setCart(prev => {
      const newCart = { ...prev };
      pkg.items.forEach(itemId => {
        newCart[itemId] = (newCart[itemId] || 0) + 1;
      });
      return newCart;
    });
    // Navigate to custom builder to show the "cart"
    setCurrentView('custom');
  };

  const updateCartItem = (itemId: string, delta: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      const currentQty = newCart[itemId] || 0;
      const newQty = currentQty + delta;
      
      if (newQty <= 0) {
        delete newCart[itemId];
      } else {
        newCart[itemId] = newQty;
      }
      return newCart;
    });
  };

  const clearCart = () => setCart({});

  const cartCount = Object.values(cart).reduce((a: number, b: number) => a + b, 0);

  return (
    <div className="min-h-screen bg-brand-black text-white font-sans selection:bg-brand-accent selection:text-white">
      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        cartCount={cartCount}
      />

      {currentView === 'home' && (
        <HeroSelection 
          onSelectPurpose={handleSelectPurpose} 
          onAddToCart={handleAddToCart}
        />
      )}

      {currentView === 'packages' && selectedPurpose && (
        <PackageList 
          selectedPurpose={selectedPurpose} 
          packages={PRESET_PACKAGES}
          onAddToCart={handleAddToCart}
          onCustomize={() => setCurrentView('custom')}
          onBack={() => setCurrentView('home')}
        />
      )}
      
      {/* Fallback if user goes to packages via nav without selecting purpose */}
      {currentView === 'packages' && !selectedPurpose && (
        <HeroSelection 
          onSelectPurpose={handleSelectPurpose} 
          onAddToCart={handleAddToCart}
        />
      )}

      {currentView === 'custom' && (
        <CustomBuilder 
          cart={cart}
          onUpdateCart={updateCartItem}
          onClearCart={clearCart}
        />
      )}

      {currentView === 'support' && (
        <SupportChat />
      )}
    </div>
  );
};

export default App;