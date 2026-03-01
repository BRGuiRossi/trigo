import React, { useState, useEffect, useMemo } from 'react';
import { 
  Pizza, 
  ShoppingCart, 
  Clock, 
  MapPin, 
  ChevronRight, 
  Plus, 
  Minus, 
  Trash2, 
  CheckCircle, 
  ChefHat, 
  Truck, 
  Package,
  X,
  Smartphone,
  CreditCard,
  QrCode,
  RefreshCw,
  ExternalLink,
  Settings2,
  AlertCircle,
  Zap,
  CupSoda,
  TrendingUp,
  Sparkles,
  Gift,
  Coffee,
  BatteryCharging,
  IceCream
} from 'lucide-react';

// --- DADOS MOCK / CONSTANTES ---

const ALL_INGREDIENTS = [
  { id: 'i1', name: 'Molho de Tomate', price: 2.00, category: 'base' },
  { id: 'i2', name: 'Mozzarella', price: 4.00, category: 'base' },
  { id: 'i3', name: 'Manjericão Fresco', price: 2.00, category: 'base' },
  { id: 'i4', name: 'Calabresa', price: 5.00, category: 'base' },
  { id: 'i5', name: 'Cebola', price: 2.00, category: 'base' },
  { id: 'i6', name: 'Azeitonas Pretas', price: 2.50, category: 'base' },
  { id: 'i7', name: 'Fiambre', price: 4.50, category: 'base' },
  { id: 'i8', name: 'Ovos', price: 3.00, category: 'base' },
  { id: 'i9', name: 'Ervilhas', price: 2.00, category: 'base' },
  { id: 'i10', name: 'Gorgonzola', price: 6.00, category: 'base' },
  { id: 'i11', name: 'Parmesão', price: 5.00, category: 'base' },
  { id: 'i12', name: 'Provolone', price: 5.00, category: 'base' },
  { id: 'i13', name: 'Frango', price: 5.50, category: 'base' },
  { id: 'i14', name: 'Catupiry', price: 6.00, category: 'base' },
  { id: 'i15', name: 'Bacon', price: 5.50, category: 'extra' },
  { id: 'i16', name: 'Milho', price: 2.50, category: 'extra' },
  { id: 'i17', name: 'Oregãos', price: 1.00, category: 'base' },
];

const PIZZA_FLAVORS = [
  { 
    id: 'f1', 
    name: 'Margherita Especial', 
    description: 'Mozzarella premium, fatias de tomate selecionadas e o aroma inconfundível do manjericão fresco.', 
    price_sm: 35, price_md: 45, price_lg: 55, 
    imageUrl: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=1200&q=80',
    defaults: ['i1', 'i2', 'i3']
  },
  { 
    id: 'f2', 
    name: 'Calabresa Premium', 
    description: 'Calabresa defumada artesanal crocante, cebola roxa em anéis e azeitonas pretas.', 
    price_sm: 38, price_md: 48, price_lg: 58, 
    imageUrl: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=1200&q=80',
    defaults: ['i1', 'i2', 'i4', 'i5', 'i6']
  },
  { 
    id: 'f3', 
    name: 'Portuguesa de Verdade', 
    description: 'Fiambre premium, ovos cozidos no ponto, cebola, ervilhas frescas e mozzarella.', 
    price_sm: 42, price_md: 52, price_lg: 62, 
    imageUrl: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=1200&q=80',
    defaults: ['i1', 'i2', 'i7', 'i8', 'i5', 'i9', 'i6']
  },
  { 
    id: 'f4', 
    name: 'Quattro Formaggi', 
    description: 'O blend perfeito: Mozzarella, o picante do Gorgonzola, a textura do Parmesão e o toque do Provolone.', 
    price_sm: 45, price_md: 55, price_lg: 65, 
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
    defaults: ['i1', 'i2', 'i10', 'i11', 'i12']
  },
  { 
    id: 'f5', 
    name: 'Frango com Catupiry', 
    description: 'Frango desfiado suculento, temperado com ervas finas e o legítimo requeijão Catupiry.', 
    price_sm: 40, price_md: 50, price_lg: 60, 
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80',
    defaults: ['i1', 'i2', 'i13', 'i14', 'i17']
  },
];

const DRINKS = [
  { id: 'd1', name: 'Coca-Cola 2L', price: 14.00, size: '2L', bestValue: true, icon: '🥤' },
  { id: 'd2', name: 'Guaraná 2L', price: 12.00, size: '2L', bestValue: true, icon: '🥤' },
  { id: 'd3', name: 'Coca-Cola 600ml', price: 8.50, size: '600ml', bestValue: false, icon: '🍼' },
  { id: 'd4', name: 'Cheque-Mate 473ml', price: 12.00, size: '473ml', bestValue: true, icon: '🥤' },
  { id: 'd5', name: 'Sumo de Laranja 1L', price: 15.00, size: '1L', bestValue: false, icon: '🍊' },
  { id: 'd6', name: 'Água Mineral 500ml', price: 4.00, size: '500ml', bestValue: false, icon: '💧' },
];

const ESSENTIAL_ITEMS = [
  { id: 'e5', name: 'Brownie de Chocolate', price: 12.00, category: 'Doces & Sobremesas', icon: '🍫' },
  { id: 'e6', name: 'Cookie Choco-Chip', price: 8.00, category: 'Doces & Sobremesas', icon: '🍪' },
  { id: 'e7', name: 'Mini Churros (6 un.)', price: 18.00, category: 'Doces & Sobremesas', icon: '🥨' },
  { id: 'e8', name: 'Breadsticks Nutella', price: 22.00, category: 'Doces & Sobremesas', icon: '🥖' },
  { id: 'g1', name: 'KitKat ao Leite', price: 6.50, category: 'Guloseimas & Chocolates', icon: '🍫' },
  { id: 'g2', name: 'Ferrero Rocher (3 un)', price: 15.00, category: 'Guloseimas & Chocolates', icon: '✨' },
  { id: 'g3', name: 'Caixa de Bis Tradicional', price: 12.00, category: 'Guloseimas & Chocolates', icon: '📦' },
  { id: 'g4', name: 'M&Ms Amendoim 45g', price: 9.00, category: 'Guloseimas & Chocolates', icon: '🔴' },
  { id: 's1', name: 'Açaí Tradicional 500ml', price: 24.00, category: 'Sorvetes & Açaí', icon: '🟣' },
  { id: 's2', name: 'Pote Sorvete 1.5L', price: 32.00, category: 'Sorvetes & Açaí', icon: '🍦' },
  { id: 's3', name: 'Picolé de Fruta', price: 7.00, category: 'Sorvetes & Açaí', icon: '🍭' },
  { id: 't1', name: 'Cabo iPhone (Lightning)', price: 35.00, category: 'Conveniência & Tech', icon: '🔌' },
  { id: 't2', name: 'Cabo USB-C Universal', price: 30.00, category: 'Conveniência & Tech', icon: '📱' },
  { id: 't3', name: 'Carregador de Parede', price: 45.00, category: 'Conveniência & Tech', icon: '⚡' },
  { id: 'e17', name: 'Lenços Umedecidos', price: 3.50, category: 'Handy', icon: '🧼' },
  { id: 'e1', name: 'Maionese de Alho', price: 4.50, category: 'Molhos Gourmet', icon: '🧄' },
  { id: 'e2', name: 'Mel com Pimenta', price: 6.00, category: 'Molhos Gourmet', icon: '🌶️' },
  { id: 'e9', name: 'Pão de Alho Especial', price: 15.00, category: 'Acompanhamentos', icon: '🍞' },
  { id: 'e10', name: 'Pão de Queijo (8 un)', price: 14.00, category: 'Acompanhamentos', icon: '🧀' },
  { id: 'e20', name: 'Sachet de Antiácido', price: 4.00, category: 'Handy', icon: '💊' },
];

const SIZES = [
  { id: 'sm', name: 'Pequena', slices: 4, label: 'S' },
  { id: 'md', name: 'Média', slices: 8, label: 'M' },
  { id: 'lg', name: 'Grande', slices: 12, label: 'L' },
];

const CRUSTS = [
  { id: 'std', name: 'Padrão', price: 0 },
  { id: 'thin', name: 'Fina & Crocante', price: 0 },
  { id: 'stuffed', name: 'Borda Catupiry', price: 12 },
  { id: 'stuffed_choc', name: 'Borda Chocolate', price: 15 },
];

const STATUS_STEPS = [
  { id: 'placed', label: 'Recebido', icon: <Package size={18}/> },
  { id: 'preparing', label: 'Preparo', icon: <ChefHat size={18}/> },
  { id: 'baking', label: 'Forno', icon: <Clock size={18}/> },
  { id: 'delivering', label: 'Entrega', icon: <Truck size={18}/> },
  { id: 'delivered', label: 'Concluído', icon: <CheckCircle size={18}/> },
];

// --- COMPONENTES ---

const Header = ({ cartCount, onOpenCart, onViewKDS, activeView }) => (
  <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex justify-between items-center shadow-sm">
    <div className="flex items-center gap-2 cursor-pointer active:scale-95 transition-transform" onClick={() => window.location.reload()}>
      <div className="bg-red-500 p-2 rounded-xl text-white shadow-lg shadow-red-200">
        <Pizza size={20} className="sm:w-6 sm:h-6" />
      </div>
      <h1 className="font-bold text-lg sm:text-xl tracking-tight text-gray-800">Top<span className="text-red-500">Pizza</span></h1>
    </div>
    <div className="flex gap-2 sm:gap-3">
      <button onClick={onViewKDS} className={`p-2.5 rounded-full transition-colors ${activeView === 'kds' ? 'bg-red-100 text-red-600' : 'text-gray-500 hover:bg-gray-100'}`}>
        <ChefHat size={20} className="sm:w-5 sm:h-5" />
      </button>
      <button onClick={onOpenCart} className="relative p-2.5 text-gray-500 hover:bg-gray-100 rounded-full transition-colors active:scale-90">
        <ShoppingCart size={20} className="sm:w-5 sm:h-5" />
        {cartCount > 0 && (
          <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  </header>
);

const UnifiedIngredientSelector = ({ sideLabel, flavor, ingredientQuantities, onUpdateQuantity }) => {
  const defaultIds = flavor.defaults || [];
  const removedDefaultsCount = defaultIds.filter(id => (ingredientQuantities[id] || 0) === 0).length;
  const currentFreebiesCount = Object.keys(ingredientQuantities).filter(id => 
    !defaultIds.includes(id) && 
    (ingredientQuantities[id] || 0) > 0 && 
    (ALL_INGREDIENTS.find(i => i.id === id)?.price || 0) < 3.0
  ).length;
  const availableSwaps = Math.max(0, removedDefaultsCount - currentFreebiesCount);

  return (
    <div className="space-y-4 bg-gray-50 p-4 rounded-3xl border border-gray-100">
      <div className="flex justify-between items-center px-1">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{sideLabel} Customização</p>
        {availableSwaps > 0 && (
          <div className="flex items-center gap-1 text-[9px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-lg border border-green-100">
            <Zap size={10}/> {availableSwaps} TROCA GRÁTIS DISPONÍVEL
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <p className="text-[9px] font-bold text-gray-400 uppercase ml-1">Ingredientes Incluídos (Não / Normal / Extra)</p>
        <div className="flex flex-wrap gap-2">
          {defaultIds.map(id => {
            const ing = ALL_INGREDIENTS.find(i => i.id === id);
            const qty = ingredientQuantities[id] ?? 1;
            return (
              <button
                key={id}
                onClick={() => onUpdateQuantity(id, (qty + 1) % 3)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full border text-[11px] font-bold transition-all relative ${
                  qty === 0 ? 'bg-red-50 border-red-100 text-red-400 opacity-60' : 
                  qty === 2 ? 'bg-red-500 border-red-500 text-white shadow-md' : 
                  'bg-white border-gray-200 text-gray-700'
                }`}
              >
                {qty === 0 ? `Sem ${ing.name}` : qty === 2 ? `Extra ${ing.name}` : ing.name}
                {qty === 2 && <span className="ml-1 opacity-80 text-[9px] font-black">+${ing.price}</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-[9px] font-bold text-gray-400 uppercase ml-1">Sugestões de Extras</p>
        <div className="grid grid-cols-2 gap-2">
          {ALL_INGREDIENTS.filter(i => !defaultIds.includes(i.id)).map(ing => {
            const qty = ingredientQuantities[ing.id] ?? 0;
            const isEligibleForSwap = availableSwaps > 0 && ing.price < 3.0 && qty === 0;
            return (
              <button
                key={ing.id}
                onClick={() => onUpdateQuantity(ing.id, (qty + 1) % 3)}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all active:scale-95 ${
                  qty > 0 ? 'bg-gray-800 border-gray-800 text-white shadow-lg' : 
                  isEligibleForSwap ? 'blink-green-suggested' : 'bg-white border-gray-100 text-gray-600'
                }`}
              >
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold truncate">{ing.name}</span>
                  {qty > 0 && <span className="text-[9px] opacity-70 italic">{qty}x Porção</span>}
                </div>
                <div className="flex flex-col items-end">
                   <span className={`text-[9px] font-black ${qty > 0 ? 'text-white' : isEligibleForSwap ? 'text-green-600' : 'text-red-500'}`}>
                    {isEligibleForSwap ? 'GRÁTIS' : `+$${ing.price.toFixed(2)}`}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const EssentialsPicker = ({ onFinish }) => {
  const [selectedExtras, setSelectedExtras] = useState({});
  const updateQty = (id, delta) => setSelectedExtras(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) }));
  const total = Object.entries(selectedExtras).reduce((sum, [id, qty]) => {
    const item = ESSENTIAL_ITEMS.find(e => e.id === id);
    return sum + (item.price * qty);
  }, 0);

  const categoryOrder = ['Doces & Sobremesas', 'Guloseimas & Chocolates', 'Sorvetes & Açaí', 'Conveniência & Tech', 'Molhos Gourmet', 'Acompanhamentos', 'Handy'];
  const activeCategories = Array.from(new Set(ESSENTIAL_ITEMS.map(e => e.category))).sort((a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b));

  const handleDone = () => {
    const chosenItems = Object.entries(selectedExtras).filter(([id, qty]) => qty > 0).map(([id, qty]) => {
      const item = ESSENTIAL_ITEMS.find(e => e.id === id);
      return { id: `extra-${Date.now()}-${id}`, type: 'extra-item', name: item.name, details: item.category, price: item.price * qty, quantity: qty, image: item.icon };
    });
    onFinish(chosenItems);
  };

  return (
    <div className="fixed inset-0 z-[130] bg-white flex flex-col md:max-w-xl md:mx-auto animate-in slide-in-from-bottom duration-300">
      <div className="px-6 py-6 border-b bg-white z-10 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="text-yellow-500" size={20}/>
          <h2 className="text-2xl font-black text-gray-800 uppercase italic tracking-tighter leading-none">O toque final</h2>
        </div>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Sobremesas, Guloseimas e Conveniência</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8 scrollbar-hide">
        {activeCategories.map(cat => (
          <section key={cat} className="space-y-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] border-l-4 border-red-500 pl-2 ml-1">{cat}</h3>
            <div className="grid grid-cols-1 gap-3">
              {ESSENTIAL_ITEMS.filter(item => item.category === cat).map(item => {
                const qty = selectedExtras[item.id] || 0;
                return (
                  <div key={item.id} className={`p-4 rounded-3xl border-2 transition-all flex items-center justify-between ${qty > 0 ? 'border-red-500 bg-red-50/20' : 'border-gray-100 bg-white'}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-gray-50">
                        {item.category === 'Conveniência & Tech' ? <BatteryCharging size={24} className="text-blue-500"/> : item.icon}
                      </div>
                      <div>
                        <h4 className="font-black text-gray-800 text-sm uppercase leading-none">{item.name}</h4>
                        <p className="text-red-500 font-black text-xs mt-1.5">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
                      <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red-500"><Minus size={16}/></button>
                      <span className="w-4 text-center font-black text-sm">{qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 rounded-xl bg-red-500 flex items-center justify-center text-white"><Plus size={16}/></button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
        <div className="py-4 text-center">
          <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest italic flex items-center justify-center gap-2"><Gift size={12}/> Enviamos guardanapos por padrão em todos os pedidos</p>
        </div>
      </div>

      <div className="p-6 border-t bg-white space-y-4 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
        <div className="flex justify-between items-center px-2">
          <span className="text-gray-400 font-black text-xs uppercase tracking-widest">Total Adicional</span>
          <span className="text-2xl font-black text-gray-800 tracking-tighter">${total.toFixed(2)}</span>
        </div>
        <div className="flex gap-3">
          <button onClick={() => onFinish([])} className="flex-1 bg-gray-100 text-gray-500 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest active:scale-95 transition-all">Pular</button>
          <button onClick={handleDone} className="flex-[2] bg-gray-800 text-white py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2">Finalizar Pedido <ChevronRight size={18}/></button>
        </div>
      </div>
    </div>
  );
};

const DrinkPicker = ({ pizzaSize, onFinish }) => {
  const [selectedDrinks, setSelectedDrinks] = useState({});
  const suggestedId = pizzaSize === 'lg' ? 'd1' : 'd3';
  const updateDrinkQty = (id, delta) => setSelectedDrinks(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) }));
  const total = Object.entries(selectedDrinks).reduce((sum, [id, qty]) => {
    const drink = DRINKS.find(d => d.id === id);
    return sum + (drink.price * qty);
  }, 0);

  const handleDone = () => {
    const chosenItems = Object.entries(selectedDrinks).filter(([id, qty]) => qty > 0).map(([id, qty]) => {
      const drink = DRINKS.find(d => d.id === id);
      return { id: `drink-${Date.now()}-${id}`, type: 'drink', name: drink.name, details: drink.size, price: drink.price * qty, quantity: qty, image: drink.icon };
    });
    onFinish(chosenItems);
  };

  return (
    <div className="fixed inset-0 z-[120] bg-white flex flex-col md:max-w-xl md:mx-auto animate-in slide-in-from-bottom duration-300">
      <div className="px-6 py-6 border-b">
        <h2 className="text-2xl font-black text-gray-800 uppercase italic leading-none">Bebida Gelada?</h2>
        <p className="text-gray-400 text-xs font-bold mt-2 uppercase tracking-widest">Uma pizza {pizzaSize === 'lg' ? 'Grande' : 'quente'} pede algo fresco</p>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {DRINKS.map(drink => {
          const isSuggested = drink.id === suggestedId;
          const qty = selectedDrinks[drink.id] || 0;
          return (
            <div key={drink.id} className={`p-4 rounded-3xl border-2 transition-all flex items-center justify-between ${isSuggested ? 'border-red-100 bg-red-50/30' : 'border-gray-100 bg-white'}`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-gray-50">{drink.icon}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-gray-800 text-sm uppercase">{drink.name}</h4>
                    {drink.bestValue && <span className="bg-green-100 text-green-700 text-[8px] font-black px-1.5 py-0.5 rounded-full flex items-center gap-0.5"><TrendingUp size={10}/> MELHOR CUSTO</span>}
                  </div>
                  <p className="text-red-500 font-black text-xs">${drink.price.toFixed(2)}</p>
                  {isSuggested && <p className="text-[9px] font-black text-gray-400 uppercase mt-1">Ideal para o teu pedido</p>}
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
                <button onClick={() => updateDrinkQty(drink.id, -1)} className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red-500"><Minus size={16}/></button>
                <span className="w-4 text-center font-black text-sm">{qty}</span>
                <button onClick={() => updateDrinkQty(drink.id, 1)} className="w-8 h-8 rounded-xl bg-red-500 flex items-center justify-center text-white"><Plus size={16}/></button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-6 border-t bg-white space-y-4 pb-safe">
        <div className="flex justify-between items-center px-2">
          <span className="text-gray-400 font-black text-xs uppercase tracking-widest">Total de Bebidas</span>
          <span className="text-2xl font-black text-gray-800 tracking-tighter">${total.toFixed(2)}</span>
        </div>
        <div className="flex gap-3">
          <button onClick={() => onFinish([])} className="flex-1 bg-gray-100 text-gray-500 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest active:scale-95 transition-all">Pular</button>
          <button onClick={handleDone} className="flex-[2] bg-red-600 text-white py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-red-200 active:scale-95 transition-all flex items-center justify-center gap-2">Próximo: Doces <ChevronRight size={18}/></button>
        </div>
      </div>
    </div>
  );
};

const PizzaBuilder = ({ initialFlavor, onAddToCart, onClose }) => {
  const [size, setSize] = useState(SIZES[1]);
  const [crust, setCrust] = useState(CRUSTS[0]);
  const [isHalfAndHalf, setIsHalfAndHalf] = useState(false);
  const [flavor1, setFlavor1] = useState(initialFlavor || PIZZA_FLAVORS[0]);
  const [flavor2, setFlavor2] = useState(PIZZA_FLAVORS[1]);
  const [quantitiesA, setQuantitiesA] = useState({});
  const [quantitiesB, setQuantitiesB] = useState({});
  const [step, setStep] = useState('pizza');
  const [pendingItems, setPendingItems] = useState([]);

  useEffect(() => {
    const initA = {};
    flavor1.defaults.forEach(id => initA[id] = 1);
    setQuantitiesA(initA);
  }, [flavor1]);

  useEffect(() => {
    const initB = {};
    flavor2.defaults.forEach(id => initB[id] = 1);
    setQuantitiesB(initB);
  }, [flavor2]);

  const updateQuantity = (side, id, qty) => {
    const setter = side === 'A' ? setQuantitiesA : setQuantitiesB;
    setter(prev => ({ ...prev, [id]: qty }));
  };

  const calculatePriceForSide = (quantities, flavor, weight = 1) => {
    let extraCost = 0;
    let swapCredits = flavor.defaults.filter(id => (quantities[id] || 0) === 0).length;
    const sortedIngs = Object.keys(quantities).map(id => ({ id, qty: quantities[id], ing: ALL_INGREDIENTS.find(i => i.id === id) })).filter(item => item.qty > 0).sort((a, b) => b.ing.price - a.ing.price);

    sortedIngs.forEach(item => {
      const isDefault = flavor.defaults.includes(item.id);
      if (isDefault) {
        if (item.qty === 2) extraCost += item.ing.price;
      } else {
        for (let i = 0; i < item.qty; i++) {
          if (swapCredits > 0 && item.ing.price < 3.0) swapCredits--;
          else extraCost += item.ing.price;
        }
      }
    });
    return extraCost * weight;
  };

  const totalPrice = useMemo(() => {
    let basePrice = isHalfAndHalf ? Math.max(flavor1[`price_${size.id}`], flavor2[`price_${size.id}`]) : flavor1[`price_${size.id}`];
    return basePrice + crust.price + calculatePriceForSide(quantitiesA, flavor1) + (isHalfAndHalf ? calculatePriceForSide(quantitiesB, flavor2) : 0);
  }, [size, flavor1, flavor2, isHalfAndHalf, crust, quantitiesA, quantitiesB]);

  const handlePizzaFinish = () => {
    const generateSummary = (quantities, flavor) => {
      const parts = [];
      Object.entries(quantities).forEach(([id, qty]) => {
        const ing = ALL_INGREDIENTS.find(i => i.id === id);
        const isDefault = flavor.defaults.includes(id);
        if (isDefault && qty === 0) parts.push(`Sem ${ing.name}`);
        if (isDefault && qty === 2) parts.push(`Extra ${ing.name}`);
        if (!isDefault && qty > 0) parts.push(`${qty}x Extra ${ing.name}`);
      });
      return parts.join(', ');
    };

    const item = { 
      id: `pizza-${Date.now()}`, 
      type: 'pizza', 
      name: isHalfAndHalf ? `1/2 ${flavor1.name} + 1/2 ${flavor2.name}` : flavor1.name, 
      details: `${size.name}, ${crust.name}. ${generateSummary(quantitiesA, flavor1)}${isHalfAndHalf ? ` | Lado B: ${generateSummary(quantitiesB, flavor2)}` : ''}`, 
      price: totalPrice, 
      imageUrl: flavor1.imageUrl, 
      imageUrl2: flavor2.imageUrl,
      sizeId: size.id, 
      quantity: 1 
    };
    setPendingItems([item]);
    setStep('drinks');
  };

  if (step === 'drinks') return <DrinkPicker pizzaSize={size.id} onFinish={d => { setPendingItems(p => [...p, ...d]); setStep('essentials'); }} />;
  if (step === 'essentials') return <EssentialsPicker onFinish={e => { onAddToCart([...pendingItems, ...e]); onClose(); }} />;

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col md:max-w-xl md:mx-auto md:shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
      {/* Imagem Hero que ocupa todo o topo do diálogo */}
      <div className="relative w-full h-64 sm:h-80 overflow-hidden bg-gray-100 flex-shrink-0 shadow-lg">
        {isHalfAndHalf ? (
          <div className="flex w-full h-full">
            <div className="w-1/2 h-full relative overflow-hidden">
              <img src={flavor1.imageUrl} className="absolute inset-0 w-[200%] h-full object-cover max-w-none" alt={flavor1.name} />
              <div className="absolute top-4 left-4 bg-red-500/90 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-sm">Lado A</div>
            </div>
            <div className="w-1/2 h-full relative overflow-hidden border-l-2 border-white/50">
              <img src={flavor2.imageUrl} className="absolute inset-0 w-[200%] h-full object-cover max-w-none -translate-x-1/2" alt={flavor2.name} />
              <div className="absolute top-4 right-4 bg-red-500/90 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-sm text-right">Lado B</div>
            </div>
          </div>
        ) : (
          <img src={flavor1.imageUrl} className="w-full h-full object-cover transition-all duration-700" alt={flavor1.name} />
        )}
        
        {/* Botão Fechar flutuante sobre a imagem */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors backdrop-blur-md z-20">
          <X size={24}/>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8 pb-32 scrollbar-hide">
        <section>
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-4">1. Tamanho e Fatias</label>
          <div className="grid grid-cols-3 gap-3">
            {SIZES.map(s => (
              <button key={s.id} onClick={() => setSize(s)} className={`p-4 rounded-3xl border-2 transition-all flex flex-col items-center active:scale-95 ${size.id === s.id ? 'border-red-500 bg-red-50 text-red-600 shadow-sm' : 'border-gray-100'}`}>
                <span className="text-xl font-black">{s.label}</span>
                <span className="text-[10px] font-bold opacity-70">{s.slices} Fat.</span>
              </button>
            ))}
          </div>
          <button onClick={() => setIsHalfAndHalf(!isHalfAndHalf)} className={`mt-4 w-full p-4 rounded-2xl border-2 border-dashed flex items-center justify-between transition-all ${isHalfAndHalf ? 'border-red-500 bg-red-50 text-red-600 shadow-sm' : 'border-gray-200 text-gray-400'}`}>
            <div className="flex items-center gap-2"><Pizza size={20}/><span className="text-sm font-black uppercase">Meio-a-Meio</span></div>
            {isHalfAndHalf ? <CheckCircle size={20}/> : <Plus size={20}/>}
          </button>
        </section>

        <section className="space-y-8">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block">2. Sabores & Ingredientes</label>
          <div className="space-y-4">
            <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">{isHalfAndHalf ? 'Lado A' : 'Sabor Principal'}</p>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4">
              {PIZZA_FLAVORS.map(f => (
                <button key={f.id} onClick={() => { setFlavor1(f); setQuantitiesA(f.defaults.reduce((a,v) => ({ ...a, [v]: 1}), {})); }} className={`flex-shrink-0 px-5 py-3 rounded-full border text-xs font-black whitespace-nowrap transition-all active:scale-95 ${flavor1.id === f.id ? 'bg-gray-800 text-white border-gray-800 shadow-md' : 'bg-white text-gray-600 border-gray-200'}`}>{f.name}</button>
              ))}
            </div>
            <UnifiedIngredientSelector sideLabel={isHalfAndHalf ? "Lado A" : "Geral"} flavor={flavor1} ingredientQuantities={quantitiesA} onUpdateQuantity={(id, q) => updateQuantity('A', id, q)} />
          </div>
          {isHalfAndHalf && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
               <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Lado B</p>
               <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4">
                {PIZZA_FLAVORS.map(f => (
                  <button key={f.id} onClick={() => { setFlavor2(f); setQuantitiesB(f.defaults.reduce((a,v) => ({ ...a, [v]: 1}), {})); }} className={`flex-shrink-0 px-5 py-3 rounded-full border text-xs font-black whitespace-nowrap transition-all active:scale-95 ${flavor2.id === f.id ? 'bg-gray-800 text-white border-gray-800 shadow-md' : 'bg-white text-gray-600 border-gray-200'}`}>{f.name}</button>
                ))}
              </div>
              <UnifiedIngredientSelector sideLabel="Lado B" flavor={flavor2} ingredientQuantities={quantitiesB} onUpdateQuantity={(id, q) => updateQuantity('B', id, q)} />
            </div>
          )}
        </section>

        <section>
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-3">3. Borda & Massa</label>
          <div className="grid grid-cols-1 gap-2">
            {CRUSTS.map(c => (
              <button key={c.id} onClick={() => setCrust(c)} className={`p-4 rounded-3xl border flex justify-between items-center transition-all active:scale-[0.98] ${crust.id === c.id ? 'border-red-500 bg-red-50' : 'bg-white border-gray-100'}`}>
                <span className="text-sm font-black text-gray-700 uppercase italic">{c.name}</span>
                <span className="text-[10px] font-black text-red-600 bg-white px-3 py-1.5 rounded-xl border border-red-100">{c.price > 0 ? `+$${c.price}` : 'GRÁTIS'}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="p-4 border-t bg-white flex flex-col gap-4 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-end px-2">
          <div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none mb-1">Total da Pizza</p>
            <p className="text-3xl font-black text-gray-800 tracking-tighter">${totalPrice.toFixed(2)}</p>
          </div>
        </div>
        <button onClick={handlePizzaFinish} className="w-full bg-red-500 text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-red-200 active:scale-95 transition-all flex items-center justify-center gap-2">Escolher Bebidas e Doces <ChevronRight size={20}/></button>
      </div>
    </div>
  );
};

const CartModal = ({ items, onRemove, onCheckout, onClose }) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  return (
    <div className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-t-[3rem] sm:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in slide-in-from-bottom duration-300">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
          <h2 className="text-xl font-black flex items-center gap-2 tracking-tighter uppercase leading-none"><ShoppingCart size={22} className="text-red-500"/> Seu Carrinho</h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full active:scale-90 transition-all"><X size={20}/></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">
          {items.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="flex gap-4 p-5 bg-gray-50 rounded-[2.5rem] border border-gray-100 relative group animate-in fade-in duration-300">
              <div className="w-14 h-14 bg-white rounded-3xl flex items-center justify-center text-3xl shadow-sm border border-white overflow-hidden">
                {item.type === 'pizza' ? (
                   <img src={item.imageUrl} className="w-full h-full object-cover" alt={item.name} />
                ) : (
                   <div className="flex items-center justify-center w-full h-full">
                     {item.details === 'Conveniência & Tech' ? <BatteryCharging className="text-blue-500" size={24}/> : <span>{item.image}</span>}
                   </div>
                )}
              </div>
              <div className="flex-1 min-w-0 pr-6">
                <h4 className="font-black text-gray-800 text-sm truncate uppercase tracking-tighter leading-none mb-1">{item.quantity > 1 ? `${item.quantity}x ` : ''}{item.name}</h4>
                <p className="text-[9px] text-gray-500 font-bold italic leading-tight line-clamp-2">{item.details}</p>
                <p className="text-sm font-black text-red-600 mt-2">${item.price.toFixed(2)}</p>
              </div>
              <button onClick={() => onRemove(item.id)} className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 active:scale-90 transition-all"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
        <div className="p-8 border-t bg-white pb-safe space-y-6">
          <div className="flex justify-between items-center px-2">
            <span className="text-gray-400 font-black text-xs uppercase tracking-[0.2em]">Total a Pagar</span>
            <span className="text-3xl font-black text-gray-800 tracking-tighter leading-none">${total.toFixed(2)}</span>
          </div>
          <button onClick={onCheckout} className="w-full bg-red-600 text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-red-100 flex items-center justify-center gap-3 active:scale-[0.98] transition-all">Confirmar Pedido</button>
        </div>
      </div>
    </div>
  );
};

const KDSView = ({ orders, onUpdateStatus, onSyncIFood }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const handleSync = async () => { setIsSyncing(true); await new Promise(r => setTimeout(r, 1200)); onSyncIFood(); setIsSyncing(false); };
  return (
    <div className="p-4 space-y-6 max-w-7xl mx-auto pb-24">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-gray-800 tracking-tighter flex items-center gap-3 italic uppercase"><div className="bg-red-500 text-white p-2 rounded-2xl"><ChefHat size={24}/></div> Cozinha Central</h2>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Pipeline de Pedidos Ativos</p>
        </div>
        <button onClick={handleSync} disabled={isSyncing} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#ea1d2c] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-90 active:scale-95 disabled:opacity-50 transition-all shadow-xl shadow-red-100"><RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''}/> Sync iFood</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map(order => (
          <div key={order.id} className={`bg-white rounded-[3rem] shadow-sm border overflow-hidden flex flex-col transition-all hover:shadow-xl ${order.source === 'ifood' ? 'border-red-100 ring-4 ring-red-50/50' : 'border-gray-100'}`}>
            <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black text-xs shadow-sm ${order.source === 'ifood' ? 'bg-[#ea1d2c]' : 'bg-red-500'}`}>{order.source === 'ifood' ? 'iF' : 'DR'}</div>
                <div><h4 className="font-black text-gray-800 text-xs">ORD-{order.id.toString().slice(-4)}</h4><p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">{order.source === 'ifood' ? 'iFood' : 'App'}</p></div>
              </div>
              <div className="text-[9px] font-black text-gray-400 uppercase">{new Date(order.id).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            </div>
            <div className="p-6 flex-1 space-y-3 bg-white/50">
              {order.items.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm"><p className="text-xs font-black text-gray-800 uppercase italic mb-1 leading-none">{item.quantity > 1 ? `${item.quantity}x ` : ''}{item.name}</p><p className="text-[9px] text-gray-400 font-bold leading-tight line-clamp-2">{item.details}</p></div>
              ))}
            </div>
            <div className="p-4 border-t bg-gray-50/50 flex gap-2 overflow-x-auto scrollbar-hide">
              {STATUS_STEPS.map((step, idx) => {
                const currentIdx = STATUS_STEPS.findIndex(s => s.id === order.status);
                const isPast = currentIdx > idx;
                const isCurrent = currentIdx === idx;
                return (<button key={step.id} onClick={() => onUpdateStatus(order.id, step.id)} className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all border ${isCurrent ? 'bg-red-500 text-white border-red-500 shadow-xl' : isPast ? 'bg-green-100 text-green-700 border-green-200' : 'bg-white text-gray-400 border-gray-100'}`}>{isPast ? <CheckCircle size={14}/> : step.icon}{step.label}</button>);
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---

export default function App() {
  const [view, setView] = useState('menu');
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);
  const [initialFlavor, setInitialFlavor] = useState(null);

  const addToCart = (items) => setCart(prev => [...prev, ...items]);
  const removeFromCart = (id) => setCart(cart.filter(i => i.id !== id));

  const handleCheckout = () => {
    const newOrder = { id: Date.now(), source: 'direct', items: [...cart], status: 'placed', timestamp: new Date() };
    setAllOrders([newOrder, ...allOrders]);
    setActiveOrder(newOrder);
    setCart([]);
    setIsCartOpen(false);
    setView('tracking');
  };

  const syncIFoodOrders = () => {
    const iFoodOrder = { id: Date.now() + 1, source: 'ifood', items: [{ id: 'if-1', name: 'Margherita Duplo Queijo (L)', details: 'Massa Tradicional. Double Mozzarella. Extra Bacon.', price: 65.50, imageUrl: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=1200&q=80', quantity: 1 }], status: 'placed', timestamp: new Date() };
    setAllOrders(prev => [iFoodOrder, ...prev]);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setAllOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    if (activeOrder && activeOrder.id === orderId) setActiveOrder(prev => ({ ...prev, status: newStatus }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 sm:pb-0 font-sans text-gray-900 overflow-x-hidden selection:bg-red-100">
      <Header cartCount={cart.length} onOpenCart={() => setIsCartOpen(true)} onViewKDS={() => setView(view === 'kds' ? 'menu' : 'kds')} activeView={view} />

      <main className="animate-in fade-in duration-700">
        {view === 'menu' && (
          <div className="max-w-7xl mx-auto p-4 sm:p-12 space-y-12 pb-32">
            <div className="bg-red-500 rounded-[3rem] sm:rounded-[5rem] p-8 sm:p-24 text-white flex flex-col lg:flex-row items-center justify-between overflow-hidden relative shadow-2xl shadow-red-200">
              <div className="relative z-10 space-y-8 text-center lg:text-left max-w-2xl">
                <span className="bg-white/20 px-5 py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] border border-white/20 backdrop-blur-md italic">A Melhor Pizza da Região</span>
                <h2 className="text-4xl sm:text-7xl font-black leading-[1.0] tracking-tighter italic uppercase">Sabor que <br/><span className="text-yellow-300 italic">Surpreende.</span></h2>
                <p className="text-red-50 font-medium text-base sm:text-xl leading-relaxed opacity-90 max-w-sm mx-auto lg:mx-0">Menu imersivo com fotografia real e montador inteligente.</p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                  <button onClick={() => { setInitialFlavor(null); setIsBuilderOpen(true); }} className="bg-white text-red-600 px-12 py-5 rounded-[2.5rem] font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-red-700/20">Ver Cardápio</button>
                  <div className="flex items-center gap-3 bg-black/10 px-8 py-4 rounded-[2rem] backdrop-blur-md border border-white/10"><Clock size={24} className="text-yellow-300"/><span className="font-black text-sm uppercase tracking-widest italic">35 MINS</span></div>
                </div>
              </div>
              <div className="hidden lg:block text-[320px] drop-shadow-2xl select-none pointer-events-none opacity-20 rotate-12">🍕</div>
            </div>

            <section className="space-y-10">
              <h3 className="text-3xl sm:text-5xl font-black text-gray-800 tracking-tighter uppercase italic px-2 leading-none">Nossas Pizzas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {PIZZA_FLAVORS.map(flavor => (
                  <div key={flavor.id} className="bg-white rounded-[3rem] border border-gray-100 p-8 shadow-sm hover:shadow-2xl transition-all group flex flex-col relative overflow-hidden">
                    <div className="w-full aspect-square bg-gray-200 rounded-[2.5rem] flex items-center justify-center mb-10 group-hover:scale-105 transition-all duration-700 relative overflow-hidden shadow-inner">
                       <img src={flavor.imageUrl} className="absolute inset-0 w-full h-full object-cover" alt={flavor.name} />
                    </div>
                    <div className="flex-1 space-y-3">
                      <h4 className="font-black text-2xl text-gray-800 tracking-tighter uppercase italic leading-none">{flavor.name}</h4>
                      <p className="text-[11px] text-gray-400 font-bold leading-relaxed">{flavor.description}</p>
                    </div>
                    <button onClick={() => { setInitialFlavor(flavor); setIsBuilderOpen(true); }} className="mt-10 w-full bg-gray-50 text-gray-800 py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 group-hover:bg-red-500 group-hover:text-white transition-all shadow-sm">Customizar</button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {view === 'kds' && <KDSView orders={allOrders.filter(o => o.status !== 'delivered')} onUpdateStatus={updateOrderStatus} onSyncIFood={syncIFoodOrders} />}

        {view === 'tracking' && activeOrder && (
          <div className="max-w-2xl mx-auto p-4 sm:p-12 space-y-8 pb-32">
             <div className="flex items-center gap-5 mb-8">
              <button onClick={() => setView('menu')} className="p-4 bg-white shadow-xl border border-gray-100 rounded-full text-gray-400 hover:text-red-500 transition-all"><X size={20}/></button>
              <div><h2 className="text-4xl font-black text-gray-800 tracking-tighter italic uppercase leading-none">Acompanhamento</h2><p className="text-gray-400 font-black text-[10px] uppercase tracking-widest mt-1">Status: {activeOrder.status}</p></div>
            </div>
            <div className="p-10 sm:p-16 bg-white rounded-[4rem] border border-gray-100 shadow-2xl space-y-16 relative">
              <div className="flex justify-between items-start"><div className="space-y-1"><p className="text-[10px] font-black uppercase tracking-widest text-red-500 italic">Progresso ao Vivo</p><h3 className="text-3xl font-black text-gray-800 uppercase italic tracking-tighter leading-none">{activeOrder.status}</h3></div><div className="bg-green-50 text-green-600 p-5 rounded-[2rem] border border-green-100"><Clock size={32} className="animate-pulse"/></div></div>
              <div className="relative pt-12 pb-6"><div className="absolute top-[78px] left-0 right-0 h-3 bg-gray-100 rounded-full"></div><div className="absolute top-[78px] left-0 h-3 bg-red-500 rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(239,68,68,0.5)]" style={{ width: `${(STATUS_STEPS.findIndex(s => s.id === activeOrder.status) / (STATUS_STEPS.length - 1)) * 100}%` }}></div><div className="relative flex justify-between">{STATUS_STEPS.map((step, idx) => { const isActive = STATUS_STEPS.findIndex(s => s.id === activeOrder.status) >= idx; return (<div key={step.id} className="flex flex-col items-center gap-5"><div className={`w-14 h-14 rounded-[1.5rem] flex items-center justify-center relative z-10 transition-all duration-700 ${isActive ? 'bg-red-500 text-white shadow-2xl scale-110' : 'bg-white text-gray-300 border-2 border-gray-100'}`}>{step.icon}</div><span className={`text-[10px] font-black uppercase tracking-tighter italic ${isActive ? 'text-gray-800' : 'text-gray-300'}`}>{step.label}</span></div>); })}</div></div>
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-2xl border-t border-gray-100 px-10 py-4 pb-safe flex justify-between items-center z-40 md:hidden shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
        <button onClick={() => setView('menu')} className={`flex flex-col items-center gap-1.5 active:scale-90 transition-all ${view === 'menu' ? 'text-red-600' : 'text-gray-400'}`}><Pizza size={24}/></button>
        <button onClick={() => { setInitialFlavor(null); setIsBuilderOpen(true); }} className="bg-red-500 text-white p-5 rounded-[2rem] -translate-y-10 shadow-2xl shadow-red-400 scale-110 active:scale-95 border-4 border-white transition-all"><Plus size={24}/></button>
        <button onClick={() => setIsCartOpen(true)} className={`flex flex-col items-center gap-1.5 active:scale-90 transition-all ${isCartOpen ? 'text-red-600' : 'text-gray-400'}`}><ShoppingCart size={24}/></button>
      </nav>

      {isBuilderOpen && <PizzaBuilder initialFlavor={initialFlavor} onAddToCart={addToCart} onClose={() => setIsBuilderOpen(false)} />}
      {isCartOpen && <CartModal items={cart} onRemove={removeFromCart} onCheckout={handleCheckout} onClose={() => setIsCartOpen(false)} />}
    </div>
  );
}
