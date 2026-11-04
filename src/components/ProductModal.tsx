import React, { useState } from 'react';
import { Product, CustomizationSize, CustomizationOption } from '../types/cafe';
import { X, Plus, Minus, Sparkles, Check, Clock, MapPin } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    quantity: number,
    options: {
      size?: CustomizationSize;
      milk?: string;
      extras?: CustomizationOption[];
      notes?: string;
    }
  ) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<CustomizationSize | undefined>(
    product.sizes ? product.sizes[0] : undefined
  );
  const [selectedMilk, setSelectedMilk] = useState<string | undefined>(
    product.milkOptions ? product.milkOptions[0] : undefined
  );
  const [selectedExtras, setSelectedExtras] = useState<CustomizationOption[]>([]);
  const [notes, setNotes] = useState('');

  const toggleExtra = (extra: CustomizationOption) => {
    if (selectedExtras.some((e) => e.id === extra.id)) {
      setSelectedExtras(selectedExtras.filter((e) => e.id !== extra.id));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const basePrice = product.price;
  const sizeDelta = selectedSize ? selectedSize.priceDelta : 0;
  const extrasDelta = selectedExtras.reduce((sum, item) => sum + item.price, 0);
  const unitPrice = basePrice + sizeDelta + extrasDelta;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart(product, quantity, {
      size: selectedSize,
      milk: selectedMilk,
      extras: selectedExtras,
      notes: notes.trim() || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl border border-[#E8DCC8] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#2C1D1A] flex items-center justify-center shadow-md transition-all cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          {/* Header Image */}
          <div className="relative aspect-[16/10] bg-[#F5EBE1] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute bottom-3 left-4 flex flex-wrap gap-1.5">
              {product.badges.map((b) => (
                <span
                  key={b}
                  className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#C05C38] text-white shadow-md flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-[#FBF3E8]" />
                  <span>{b}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-5">
            {/* Title & Description */}
            <div>
              {product.subtitle && (
                <span className="text-xs font-bold text-[#C05C38] block mb-1">
                  {product.subtitle}
                </span>
              )}
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#2C1D1A] leading-snug">
                {product.name}
              </h2>
              <p className="text-sm text-[#7D6858] mt-1.5 leading-relaxed font-medium">
                {product.description}
              </p>

              <div className="flex items-center gap-4 mt-3 text-xs text-[#7D6858] pt-2 border-t border-[#E8DCC8]">
                {product.origin && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#D99443]" />
                    <span className="font-semibold">{product.origin}</span>
                  </div>
                )}
                {product.prepTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#D99443]" />
                    <span className="font-semibold">{product.prepTime}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-[#2C1D1A] uppercase tracking-wider block">
                  Elige tu opción o tamaño
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize?.name === size.name;
                    return (
                      <button
                        key={size.name}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`p-3 rounded-2xl border text-left flex items-center justify-between text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#C05C38] to-[#D99443] text-white border-[#C05C38] shadow-md shadow-[#C05C38]/20'
                            : 'bg-[#F5EBE1] text-[#2C1D1A] hover:bg-[#E8DCC8] border-[#E8DCC8]'
                        }`}
                      >
                        <span>{size.name}</span>
                        {size.priceDelta > 0 && (
                          <span className={isSelected ? 'text-[#FBF3E8]' : 'text-[#C05C38]'}>
                            +${size.priceDelta.toLocaleString('es-AR')}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Milk Options */}
            {product.milkOptions && product.milkOptions.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-[#2C1D1A] uppercase tracking-wider block">
                  Tipo de leche
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.milkOptions.map((milk) => {
                    const isSelected = selectedMilk === milk;
                    return (
                      <button
                        key={milk}
                        type="button"
                        onClick={() => setSelectedMilk(milk)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-[#4A6B53] text-white border-[#4A6B53]'
                            : 'bg-[#F5EBE1] text-[#2C1D1A] hover:bg-[#E8DCC8] border-[#E8DCC8]'
                        }`}
                      >
                        <span>{milk}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Extras */}
            {product.extras && product.extras.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-[#2C1D1A] uppercase tracking-wider block">
                  Toques y extras artesanales
                </label>
                <div className="space-y-1.5">
                  {product.extras.map((extra) => {
                    const isChecked = selectedExtras.some((e) => e.id === extra.id);
                    return (
                      <button
                        key={extra.id}
                        type="button"
                        onClick={() => toggleExtra(extra)}
                        className={`w-full p-2.5 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                          isChecked
                            ? 'bg-[#C05C38]/10 border-[#C05C38] text-[#2C1D1A]'
                            : 'bg-white text-[#2C1D1A] hover:bg-[#F5EBE1] border-[#E8DCC8]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                              isChecked
                                ? 'bg-[#C05C38] border-[#C05C38] text-white'
                                : 'border-[#CBBBA0] bg-white'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <span>{extra.name}</span>
                        </div>
                        <span className="text-[#C05C38] font-extrabold">
                          +${extra.price.toLocaleString('es-AR')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special Instructions */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-[#2C1D1A] uppercase tracking-wider block">
                Notas especiales para el barista / pastelería
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ej. Servir tibio, sin endulzar, tostado bien crocante..."
                rows={2}
                className="w-full p-3 bg-[#F5EBE1] border border-[#E8DCC8] rounded-2xl text-xs text-[#2C1D1A] placeholder-[#8A6F57] focus:outline-none focus:ring-2 focus:ring-[#C05C38]/25"
              />
            </div>
          </div>
        </div>

        {/* Modal Sticky Bottom Bar */}
        <div className="p-4 bg-[#F5EBE1] border-t border-[#E8DCC8] flex items-center justify-between gap-3">
          {/* Stepper */}
          <div className="flex items-center bg-white border border-[#E8DCC8] rounded-2xl p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-[#2C1D1A] hover:bg-[#F5EBE1] disabled:opacity-40 cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center font-extrabold text-sm text-[#2C1D1A] tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-[#2C1D1A] hover:bg-[#F5EBE1] cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to order CTA */}
          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 py-3.5 px-5 bg-gradient-to-r from-[#C05C38] to-[#D99443] hover:from-[#A64724] hover:to-[#C05C38] text-white rounded-2xl font-extrabold text-sm shadow-md shadow-[#2C1D1A]/15 transition-all active:scale-[0.98] flex items-center justify-between cursor-pointer border border-[#E8DCC8]/40"
          >
            <span>Agregar a la orden</span>
            <span className="text-[#FBF3E8] font-mono tabular-nums text-base">
              ${totalPrice.toLocaleString('es-AR')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
