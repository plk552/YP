import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, CheckCircle, HelpCircle } from 'lucide-react';

const SupportChat: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleFakeSend = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('sent');
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  const handleLinkClick = () => {
    // Intentionally doing nothing/no redirect as requested
    console.log("Support button clicked");
  };

  return (
    <div className="pt-36 pb-12 px-6 max-w-7xl mx-auto min-h-screen animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Центр Поддержки</h1>
        <p className="text-gray-400 text-lg">Мы всегда на связи, чтобы помочь вам с выбором техники</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div onClick={handleLinkClick} className="block glass p-8 rounded-3xl border border-white/10 hover:border-indigo-500/30 transition-all group cursor-pointer hover:bg-white/5 active:scale-95">
            <div className="flex items-center gap-6 mb-4">
              <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-colors text-indigo-400">
                <Phone size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Горячая линия</h3>
                <p className="text-gray-500">Круглосуточно, без выходных</p>
              </div>
            </div>
            <p className="text-3xl font-bold text-white tracking-tight">8 (800) 555-35-35</p>
          </div>

          <div onClick={handleLinkClick} className="block glass p-8 rounded-3xl border border-white/10 hover:border-indigo-500/30 transition-all group cursor-pointer hover:bg-white/5 active:scale-95">
            <div className="flex items-center gap-6 mb-4">
              <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors text-purple-400">
                <Mail size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Email</h3>
                <p className="text-gray-500">Нажмите, чтобы написать</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-white tracking-tight break-all">aleksander.sandro23@gmail.com</p>
          </div>

          <div className="glass p-8 rounded-3xl border border-white/10 hover:border-indigo-500/30 transition-all group">
             <div className="flex items-center gap-6 mb-4">
              <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-colors text-green-400">
                <MapPin size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Главный офис</h3>
                <p className="text-gray-500">Пункт выдачи и возврата</p>
              </div>
            </div>
            <p className="text-lg text-white">Москва, ул. Тверская 1, БЦ "Премьер"</p>
            <p className="text-sm text-gray-500 mt-1">Пн-Вс: 10:00 - 22:00</p>
          </div>
        </div>

        {/* Static Contact Form */}
        <div className="glass rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <h2 className="text-2xl font-bold text-white mb-6 relative z-10">Напишите нам</h2>
          
          {formStatus === 'sent' ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-fade-in">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={40} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Сообщение отправлено!</h3>
              <p className="text-gray-400">Менеджер свяжется с вами в течение 15 минут.</p>
            </div>
          ) : (
            <form onSubmit={handleFakeSend} className="space-y-6 relative z-10">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 ml-1">Имя</label>
                  <input type="text" required className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none focus:bg-surface transition-all" placeholder="Иван" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 ml-1">Телефон</label>
                  <input type="tel" required className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none focus:bg-surface transition-all" placeholder="+7 (999)..." />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-400 ml-1">Тема обращения</label>
                <select className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none focus:bg-surface transition-all appearance-none cursor-pointer">
                  <option>Помощь с подбором техники</option>
                  <option>Вопрос по заказу</option>
                  <option>Сотрудничество</option>
                  <option>Другое</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400 ml-1">Сообщение</label>
                <textarea required rows={4} className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none focus:bg-surface transition-all resize-none" placeholder="Опишите вашу задачу..."></textarea>
              </div>

              <button 
                type="submit" 
                disabled={formStatus === 'sending'}
                className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
              >
                {formStatus === 'sending' ? (
                  <span className="animate-pulse">Отправка...</span>
                ) : (
                  <>
                    Отправить сообщение <Send size={20} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* FAQ Preview */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <HelpCircle size={24} className="text-indigo-500" />
          Частые вопросы
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { q: "Нужен ли залог?", a: "Да, для новых клиентов предусмотрен залог. Для постоянных клиентов доступна аренда без залога." },
            { q: "Есть ли доставка?", a: "Мы доставляем технику по Москве в пределах МКАД за 500₽. При заказе от 10000₽ — бесплатно." },
            { q: "Как считать сутки?", a: "Одни сутки аренды — это 24 часа с момента получения техники." }
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl bg-surface border border-white/5 hover:bg-white/5 transition-colors">
              <h3 className="font-bold text-white mb-3 text-lg">{item.q}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportChat;