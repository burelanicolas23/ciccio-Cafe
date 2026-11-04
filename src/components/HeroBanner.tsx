import React from 'react';
import { OrderType } from '../types/cafe';
import { Coffee, UtensilsCrossed, Bike, Sparkles, Smile, Flame } from 'lucide-react';

interface HeroBannerProps {
  orderType: OrderType;
  onChangeOrderType: (type: OrderType) => void;
  selectedTable: string;
  onSelectTable: (table: string) => void;
  onExploreMenu: () => void;
  onOpenStoreStory: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  orderType,
  onChangeOrderType,
  selectedTable,
  onSelectTable,
  onExploreMenu,
  onOpenStoreStory,
}) => {
  const quickTables = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5', 'Mesa 6', 'Mesa 7', 'Mesa 8', 'Barra 1', 'Barra 2', 'Patio'];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-[#E8DCC8] bg-gradient-to-br from-[#F5EBE1] via-[#FBF3E8] to-[#EFE4D4] text-[#2C1D1A] shadow-coffee-card mb-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-5 sm:p-8">
        {/* Left Content */}
        <div className="md:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C05C38]/10 border border-[#C05C38]/25 text-[#C05C38] text-xs font-bold tracking-wide">
            <Flame className="w-3.5 h-3.5 text-[#D99443]" />
            <span>Café de Especialidad & Panadería a la Leña</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#2C1D1A] leading-tight">
            El aroma auténtico del café, la calidez de cada mañana
          </h1>

          <p className="text-sm sm:text-base text-[#7D6858] font-medium leading-relaxed max-w-xl">
            Tostamos granos arábicos de pequeños productores y horneamos croissants hojaldrados de pura manteca desde temprano para llenar tu día de energía y sabor.
          </p>

          {/* Today's Special Barista Note */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#E8DCC8] shadow-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2C1D1A] to-[#C05C38] flex items-center justify-center shrink-0 text-[#FBF3E8] shadow-sm">
              <Sparkles className="w-5 h-5 text-[#D99443]" />
            </div>
            <div className="text-xs">
              <span className="font-extrabold text-[#C05C38] block mb-0.5 uppercase tracking-wider">
                Recomendación del Barista
              </span>
              <span className="text-[#3B2B24] font-semibold">
                Combo Vaso Ciccio Take Away + Croissant clásico de manteca recién salido del horno.
              </span>
            </div>
          </div>

          {/* Function for Taking Order: Takeaway vs Table vs Delivery */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold text-[#7D6858] uppercase tracking-wider block">
                ¿Dónde vas a tomar tu café hoy?
              </span>
              {orderType === 'dinein' && (
                <span className="text-[11px] font-bold text-[#C05C38] bg-[#F5EBE1] px-2.5 py-0.5 rounded-full border border-[#E8DCC8] animate-fadeIn">
                  📍 {selectedTable || 'Mesa 1'}
                </span>
              )}
            </div>

            {/* Mode selection tabs */}
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-[#F5EBE1] rounded-2xl border border-[#E8DCC8]">
              <button
                type="button"
                onClick={() => onChangeOrderType('dinein')}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  orderType === 'dinein'
                    ? 'bg-[#C05C38] text-white shadow-md shadow-[#C05C38]/25 scale-[1.02]'
                    : 'text-[#7D6858] hover:text-[#2C1D1A] hover:bg-white/80'
                }`}
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span className="text-center sm:text-left">Para Tomar Acá</span>
              </button>

              <button
                type="button"
                onClick={() => onChangeOrderType('takeaway')}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  orderType === 'takeaway'
                    ? 'bg-[#C05C38] text-white shadow-md shadow-[#C05C38]/25 scale-[1.02]'
                    : 'text-[#7D6858] hover:text-[#2C1D1A] hover:bg-white/80'
                }`}
              >
                <Coffee className="w-4 h-4" />
                <span className="text-center sm:text-left">Para Llevar</span>
              </button>

              <button
                type="button"
                onClick={() => onChangeOrderType('delivery')}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  orderType === 'delivery'
                    ? 'bg-[#C05C38] text-white shadow-md shadow-[#C05C38]/25 scale-[1.02]'
                    : 'text-[#7D6858] hover:text-[#2C1D1A] hover:bg-white/80'
                }`}
              >
                <Bike className="w-4 h-4" />
                <span className="text-center sm:text-left">Envío</span>
              </button>
            </div>

            {/* Sub-selector for Dine-in Table Selection */}
            {orderType === 'dinein' && (
              <div className="p-3.5 bg-white rounded-2xl border border-[#E8DCC8] shadow-sm space-y-2.5 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#2C1D1A] flex items-center gap-1.5">
                    <span>☕ Elegí tu mesa o ubicación:</span>
                  </span>
                  <span className="text-[10px] text-[#7D6858] font-medium">
                    Te lo llevamos a la mesa
                  </span>
                </div>

                {/* Quick table chips */}
                <div className="flex flex-wrap gap-1.5">
                  {quickTables.map((table) => {
                    const isSelected = selectedTable === table;
                    return (
                      <button
                        key={table}
                        type="button"
                        onClick={() => onSelectTable(table)}
                        className={`px-2.5 py-1 text-xs rounded-xl font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#C05C38] to-[#D99443] text-white shadow-sm scale-105'
                            : 'bg-[#FBF3E8] text-[#7D6858] hover:bg-[#F5EBE1] hover:text-[#2C1D1A] border border-[#E8DCC8]'
                        }`}
                      >
                        {table}
                      </button>
                    );
                  })}
                </div>

                {/* Custom table number input */}
                <div className="flex items-center gap-2 pt-1 border-t border-[#E8DCC8]/60">
                  <span className="text-[11px] text-[#7D6858] font-semibold shrink-0">
                    O escribe otra mesa:
                  </span>
                  <input
                    type="text"
                    value={selectedTable}
                    onChange={(e) => onSelectTable(e.target.value)}
                    placeholder="Ej. Mesa 12, Terraza..."
                    className="flex-1 px-3 py-1.5 bg-[#FBF3E8] border border-[#E8DCC8] rounded-xl text-xs font-bold text-[#2C1D1A] focus:outline-none focus:ring-1 focus:ring-[#C05C38]"
                  />
                </div>
              </div>
            )}

            {/* Informative notice for Takeaway */}
            {orderType === 'takeaway' && (
              <div className="p-3 bg-white/80 rounded-2xl border border-[#E8DCC8] text-xs text-[#7D6858] flex items-center gap-2 animate-fadeIn">
                <Coffee className="w-4 h-4 text-[#C05C38] shrink-0" />
                <span>
                  <strong>Listo para llevar:</strong> Retiras directamente por el mostrador en vaso térmico Ciccio ecológico.
                </span>
              </div>
            )}

            {/* Informative notice for Delivery */}
            {orderType === 'delivery' && (
              <div className="p-3 bg-white/80 rounded-2xl border border-[#E8DCC8] text-xs text-[#7D6858] flex items-center gap-2 animate-fadeIn">
                <Bike className="w-4 h-4 text-[#D99443] shrink-0" />
                <span>
                  <strong>Envío a domicilio:</strong> Tiempo promedio de 25 a 35 min. Indicarás la dirección al confirmar.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Feature Showcase */}
        <div className="md:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] bg-white group">
            <img
              src="/assets/aistudio/60_4c09d202.webp"
              alt="Vaso Ciccio con Croissant Clásico"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C1D1A]/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
              <span className="font-bold bg-[#C05C38] px-2.5 py-1 rounded-lg shadow-sm">
                #CiccioCaffe
              </span>
              <span className="bg-[#2C1D1A]/80 backdrop-blur-md px-2.5 py-1 rounded-lg font-medium text-[#FBF3E8]">
                Café tostado de origen
              </span>
            </div>
          </div>

          {/* Floating Artisan Badge */}
          <div className="absolute -top-3 -right-3 bg-white border border-[#E8DCC8] p-2.5 rounded-2xl shadow-lg flex items-center gap-2">
            <span className="text-lg">🥐☕</span>
            <span className="text-xs font-bold text-[#C05C38]">100% Artesanal</span>
          </div>
        </div>
      </div>
    </section>
  );
};
