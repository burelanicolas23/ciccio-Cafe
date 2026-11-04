import React, { useState } from 'react';
import { Search, X, SlidersHorizontal, Check, Sparkles, Heart } from 'lucide-react';

interface SearchBarAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDietary: string[];
  onToggleDietary: (tag: string) => void;
  showOnlyFavorites: boolean;
  onToggleFavorites: () => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc';
  onSortChange: (sort: 'featured' | 'price-asc' | 'price-desc') => void;
  popularOnly: boolean;
  onTogglePopularOnly: () => void;
}

export const SearchBarAndFilters: React.FC<SearchBarAndFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedDietary,
  onToggleDietary,
  showOnlyFavorites,
  onToggleFavorites,
  sortBy,
  onSortChange,
  popularOnly,
  onTogglePopularOnly,
}) => {
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  const activeFiltersCount =
    selectedDietary.length + (showOnlyFavorites ? 1 : 0) + (popularOnly ? 1 : 0);

  return (
    <div className="space-y-3 mb-6">
      {/* Modern Coffee Search Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C05C38]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar espresso, croissant, flat white, tostón, budín..."
            className="w-full pl-10 pr-9 py-3 bg-white border border-[#E8DCC8] rounded-2xl text-sm text-[#2C1D1A] placeholder-[#8A6F57]/70 focus:outline-none focus:ring-2 focus:ring-[#C05C38]/25 focus:border-[#C05C38] transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#7D6858] hover:text-[#2C1D1A] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter button */}
        <button
          onClick={() => setShowFilterDrawer(!showFilterDrawer)}
          className={`flex items-center gap-1.5 px-4 py-3 rounded-2xl text-xs font-bold border transition-all cursor-pointer shadow-sm ${
            activeFiltersCount > 0
              ? 'bg-[#C05C38] text-white border-[#C05C38]'
              : 'bg-white text-[#7D6858] hover:bg-[#F5EBE1] border-[#E8DCC8]'
          }`}
          aria-label="Filtros"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">Filtros</span>
          {activeFiltersCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#D99443] text-[#2C1D1A] text-[10px] font-extrabold flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Quick filter row */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {/* Popular filter */}
        <button
          onClick={onTogglePopularOnly}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border font-bold transition-all whitespace-nowrap cursor-pointer ${
            popularOnly
              ? 'bg-[#C05C38] text-white border-[#C05C38]'
              : 'bg-white text-[#C05C38] border-[#C05C38]/30 hover:bg-[#F5EBE1]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D99443]" />
          <span>Más Populares</span>
        </button>

        {/* Favoritos */}
        <button
          onClick={onToggleFavorites}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border font-bold transition-all whitespace-nowrap cursor-pointer ${
            showOnlyFavorites
              ? 'bg-[#D99443] text-white border-[#D99443]'
              : 'bg-white text-[#7D6858] border-[#E8DCC8] hover:bg-[#F5EBE1]'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${showOnlyFavorites ? 'fill-white' : 'text-[#D99443]'}`} />
          <span>Mis Favoritos</span>
        </button>

        {/* Sin TACC */}
        <button
          onClick={() => onToggleDietary('Sin TACC')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border font-semibold transition-all whitespace-nowrap cursor-pointer ${
            selectedDietary.includes('Sin TACC')
              ? 'bg-[#4A6B53] text-white border-[#4A6B53]'
              : 'bg-white text-[#4A6B53] border-[#4A6B53]/30 hover:bg-emerald-50'
          }`}
        >
          {selectedDietary.includes('Sin TACC') && <Check className="w-3 h-3" />}
          <span>Sin TACC</span>
        </button>

        {/* Vegano */}
        <button
          onClick={() => onToggleDietary('Vegano')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border font-semibold transition-all whitespace-nowrap cursor-pointer ${
            selectedDietary.includes('Vegano')
              ? 'bg-[#4A6B53] text-white border-[#4A6B53]'
              : 'bg-white text-[#4A6B53] border-[#4A6B53]/30 hover:bg-emerald-50'
          }`}
        >
          {selectedDietary.includes('Vegano') && <Check className="w-3 h-3" />}
          <span>Vegano</span>
        </button>

        {/* Masa Madre */}
        <button
          onClick={() => onToggleDietary('Masa Madre')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border font-semibold transition-all whitespace-nowrap cursor-pointer ${
            selectedDietary.includes('Masa Madre')
              ? 'bg-[#8A6F57] text-white border-[#8A6F57]'
              : 'bg-white text-[#8A6F57] border-[#8A6F57]/30 hover:bg-amber-50'
          }`}
        >
          {selectedDietary.includes('Masa Madre') && <Check className="w-3 h-3" />}
          <span>Masa Madre</span>
        </button>

        {/* Clear all */}
        {activeFiltersCount > 0 && (
          <button
            onClick={() => {
              if (selectedDietary.length > 0) selectedDietary.forEach(onToggleDietary);
              if (showOnlyFavorites) onToggleFavorites();
              if (popularOnly) onTogglePopularOnly();
            }}
            className="text-[11px] text-[#C05C38] font-bold hover:underline ml-auto whitespace-nowrap pl-2 cursor-pointer"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Expanded Filter Drawer */}
      {showFilterDrawer && (
        <div className="p-4 bg-white border border-[#E8DCC8] rounded-2xl space-y-3 shadow-md animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#2C1D1A] uppercase tracking-wider">
              Ordenar lista por
            </span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="text-xs bg-[#F5EBE1] border border-[#E8DCC8] rounded-xl px-3 py-2 text-[#2C1D1A] font-semibold focus:outline-none cursor-pointer"
            >
              <option value="featured">Destacados de Ciccio</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
