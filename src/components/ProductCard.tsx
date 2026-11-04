import React from 'react';
import { Product } from '../types/cafe';
import { Heart, Plus, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  onSelectProduct,
  onQuickAdd,
}) => {
  return (
    <article className="group flex flex-col justify-between bg-white rounded-3xl border border-[#E8DCC8] shadow-coffee-card overflow-hidden hover:border-[#C05C38]/60 hover:shadow-coffee-hover transition-all duration-300">
      {/* Top Image Section with 4:3 Crop */}
      <div
        className="relative aspect-[4/3] overflow-hidden bg-[#F5EBE1] cursor-pointer"
        onClick={() => onSelectProduct(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10 max-w-[80%]">
          {product.badges.map((badge, idx) => {
            const isFirst = idx === 0;
            return (
              <span
                key={badge}
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold shadow-sm tracking-wide ${
                  isFirst
                    ? 'bg-gradient-to-r from-[#C05C38] to-[#D99443] text-white'
                    : 'bg-white/95 text-[#2C1D1A] backdrop-blur-sm border border-[#E8DCC8]'
                }`}
              >
                {isFirst && <Sparkles className="w-2.5 h-2.5 text-[#FBF3E8]" />}
                <span>{badge}</span>
              </span>
            );
          })}
        </div>

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#8A6F57] hover:text-[#C05C38] hover:bg-white transition-all shadow-sm z-10 cursor-pointer active:scale-90"
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'fill-[#C05C38] text-[#C05C38]' : ''
            }`}
          />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div className="cursor-pointer" onClick={() => onSelectProduct(product)}>
          {product.subtitle && (
            <span className="text-[11px] font-semibold text-[#C05C38] block mb-1 line-clamp-1">
              {product.subtitle}
            </span>
          )}
          <h3 className="font-extrabold text-sm sm:text-base text-[#2C1D1A] leading-snug line-clamp-2 group-hover:text-[#C05C38] transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-[#7D6858] line-clamp-2 mt-1 leading-relaxed font-medium">
            {product.description}
          </p>
        </div>

        {/* Card Footer */}
        <div className="pt-2.5 border-t border-[#E8DCC8]/70 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8A6F57]">
              Precio
            </span>
            <span className="text-base sm:text-lg font-extrabold text-[#C05C38] tabular-nums tracking-tight">
              ${product.price.toLocaleString('es-AR')}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onSelectProduct(product)}
              className="px-2.5 py-1.5 bg-[#F5EBE1] hover:bg-[#E8DCC8] text-[#2C1D1A] rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer"
            >
              Ver
            </button>
            <button
              type="button"
              onClick={() => onQuickAdd(product)}
              className="p-2 sm:px-3 sm:py-2 bg-gradient-to-r from-[#C05C38] to-[#D99443] hover:from-[#A64724] hover:to-[#C05C38] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer shadow-md shadow-[#2C1D1A]/10"
              title="Agregar al pedido"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Agregar</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
