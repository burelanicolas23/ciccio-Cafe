import React, { useState } from 'react';
import { CartItem, OrderType, OrderDetails } from '../types/cafe';
import { X, Trash2, Plus, Minus, Gift, Tag, Check, ArrowRight, Coffee } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  orderType: OrderType;
  onChangeOrderType: (type: OrderType) => void;
  selectedTable: string;
  onSelectTable: (table: string) => void;
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onConfirmOrder: (orderDetails: OrderDetails) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  orderType,
  onChangeOrderType,
  selectedTable,
  onSelectTable,
  onUpdateQuantity,
  onRemoveItem,
  onConfirmOrder,
}) => {
  if (!isOpen) return null;

  const [giftPackaging, setGiftPackaging] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPct: number } | null>({
    code: 'CICCIO15',
    discountPct: 0.15,
  });
  const [promoError, setPromoError] = useState('');
  const [tableNumber, setTableNumber] = useState(selectedTable || 'Mesa 1');
  const [customerName, setCustomerName] = useState('Mariana Gómez');
  const [customerPhone, setCustomerPhone] = useState('+54 11 4455-8822');
  const [deliveryAddress, setDeliveryAddress] = useState('Av. Santa Fe 1920, Piso 3A');

  React.useEffect(() => {
    if (selectedTable) {
      setTableNumber(selectedTable);
    }
  }, [selectedTable]);

  const giftPackagingPrice = giftPackaging ? 400 : 0;
  const subtotal = items.reduce((acc, item) => acc + item.itemTotalPrice, 0);
  const discountAmount = appliedPromo ? Math.round(subtotal * appliedPromo.discountPct) : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount + giftPackagingPrice);

  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'CICCIO15' || code === 'COFFEE15' || code === 'AROMA') {
      setAppliedPromo({ code, discountPct: 0.15 });
      setPromoCode('');
    } else if (code === 'CICCIO20') {
      setAppliedPromo({ code, discountPct: 0.20 });
      setPromoCode('');
    } else {
      setPromoError('Código inválido. Prueba con CICCIO15 o AROMA');
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    const newOrder: OrderDetails = {
      orderId: `CICCIO-${Math.floor(1000 + Math.random() * 9000)}`,
      items: [...items],
      subtotal,
      discount: discountAmount,
      promoCode: appliedPromo?.code,
      giftPackaging,
      giftPackagingPrice,
      total: finalTotal,
      orderType,
      tableNumber: orderType === 'dinein' ? tableNumber : undefined,
      deliveryAddress: orderType === 'delivery' ? deliveryAddress : undefined,
      customerName: customerName || 'Cliente Ciccio',
      customerPhone: customerPhone || 'Sin teléfono',
      estimatedTime: orderType === 'delivery' ? '25 - 35 min' : '10 - 12 min',
      timestamp: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
      status: 'confirmed',
    };

    onConfirmOrder(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FBF3E8] shadow-2xl border-l border-[#E8DCC8] flex flex-col">
          {/* Header */}
          <div className="px-5 py-4 border-b border-[#E8DCC8] flex items-center justify-between bg-[#F5EBE1]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-[#C05C38] flex items-center justify-center text-white">
                <Coffee className="w-4 h-4" />
              </div>
              <span className="text-base font-extrabold text-[#2C1D1A]">
                Tu Pedido en Ciccio
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#C05C38] text-white font-extrabold">
                {items.length} {items.length === 1 ? 'ítem' : 'ítems'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#7D6858] hover:text-[#2C1D1A] hover:bg-[#E8DCC8] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#F5EBE1] flex items-center justify-center text-[#C05C38]">
                  <Coffee className="w-8 h-8 text-[#C05C38]" />
                </div>
                <h3 className="text-lg font-extrabold text-[#2C1D1A]">
                  Tu canasta está vacía
                </h3>
                <p className="text-xs text-[#7D6858] max-w-xs mx-auto font-medium">
                  Agrega cafés de especialidad, tostones de masa madre o croissants recién horneados para empezar.
                </p>
              </div>
            ) : (
              <>
                {/* Order Type Toggle */}
                <div className="p-1 bg-[#F5EBE1] rounded-2xl grid grid-cols-3 gap-1 border border-[#E8DCC8]">
                  <button
                    type="button"
                    onClick={() => onChangeOrderType('takeaway')}
                    className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                      orderType === 'takeaway'
                        ? 'bg-[#C05C38] text-white shadow-sm'
                        : 'text-[#7D6858] hover:text-[#2C1D1A]'
                    }`}
                  >
                    Llevar
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeOrderType('dinein')}
                    className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                      orderType === 'dinein'
                        ? 'bg-[#C05C38] text-white shadow-sm'
                        : 'text-[#7D6858] hover:text-[#2C1D1A]'
                    }`}
                  >
                    En Mesa
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeOrderType('delivery')}
                    className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                      orderType === 'delivery'
                        ? 'bg-[#C05C38] text-white shadow-sm'
                        : 'text-[#7D6858] hover:text-[#2C1D1A]'
                    }`}
                  >
                    Envío
                  </button>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 bg-white rounded-2xl border border-[#E8DCC8] shadow-sm space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex gap-3">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-14 h-14 rounded-xl object-cover shrink-0 bg-[#F5EBE1] border border-[#E8DCC8]/60"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <h4 className="text-xs font-bold text-[#2C1D1A] leading-snug">
                              {item.product.name}
                            </h4>
                            {item.options.size && (
                              <p className="text-[11px] text-[#7D6858] font-medium">
                                {item.options.size.name}
                              </p>
                            )}
                            {item.options.milk && (
                              <p className="text-[11px] text-[#7D6858] font-medium">
                                {item.options.milk}
                              </p>
                            )}
                            {item.options.extras && item.options.extras.length > 0 && (
                              <p className="text-[10px] text-[#C05C38] font-bold">
                                + {item.options.extras.map((e) => e.name).join(', ')}
                              </p>
                            )}
                            {item.options.notes && (
                              <p className="text-[10px] text-[#7D6858] italic">
                                "{item.options.notes}"
                              </p>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#8A6F57] hover:text-[#A64724] p-1 cursor-pointer"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#E8DCC8]/70">
                        {/* Stepper */}
                        <div className="flex items-center bg-[#F5EBE1] rounded-xl p-0.5 border border-[#E8DCC8]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-[#2C1D1A] hover:bg-white rounded-lg cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-extrabold text-[#2C1D1A] tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-[#2C1D1A] hover:bg-white rounded-lg cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-extrabold text-[#C05C38] font-mono tabular-nums">
                          ${item.itemTotalPrice.toLocaleString('es-AR')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Gift packaging option */}
                <div
                  onClick={() => setGiftPackaging(!giftPackaging)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    giftPackaging
                      ? 'bg-[#C05C38]/10 border-[#C05C38]'
                      : 'bg-white border-[#E8DCC8] hover:bg-[#F5EBE1]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        giftPackaging ? 'bg-[#C05C38] text-white' : 'bg-[#F5EBE1] text-[#C05C38]'
                      }`}
                    >
                      <Gift className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#2C1D1A] block">
                        Bolsa Especial de Papel Kraft Ciccio
                      </span>
                      <span className="text-[11px] text-[#7D6858]">
                        Con sello artesanal de lacre y tarjeta caligrafiada
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-[#C05C38]">
                    +$400
                  </span>
                </div>

                {/* Promo Code Input */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-[#8A6F57] absolute left-3 top-3" />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Cupón: CICCIO15"
                        className="w-full pl-8 pr-3 py-2.5 bg-white border border-[#E8DCC8] rounded-2xl text-xs uppercase tracking-wider text-[#2C1D1A] font-bold focus:outline-none focus:ring-2 focus:ring-[#C05C38]/25"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-4 py-2.5 bg-[#C05C38] hover:bg-[#A64724] text-white rounded-2xl text-xs font-extrabold transition-colors cursor-pointer shadow-sm"
                    >
                      Aplicar
                    </button>
                  </div>
                  {appliedPromo && (
                    <p className="text-[11px] text-[#4A6B53] font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Cupón {appliedPromo.code} activo (-15%)
                    </p>
                  )}
                  {promoError && (
                    <p className="text-[11px] text-[#A64724] font-semibold">{promoError}</p>
                  )}
                </div>

                {/* Order Details Form */}
                <div className="space-y-2.5 p-4 bg-white rounded-2xl border border-[#E8DCC8] shadow-sm">
                  <span className="text-xs font-extrabold text-[#2C1D1A] uppercase tracking-wider block">
                    Datos de Entrega
                  </span>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-[#7D6858] font-bold block mb-1">Nombre</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full p-2.5 bg-[#FBF3E8] border border-[#E8DCC8] rounded-xl text-xs text-[#2C1D1A] font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-[#7D6858] font-bold block mb-1">Teléfono</label>
                      <input
                        type="text"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full p-2.5 bg-[#FBF3E8] border border-[#E8DCC8] rounded-xl text-xs text-[#2C1D1A] font-semibold"
                      />
                    </div>
                  </div>

                  {orderType === 'dinein' && (
                    <div>
                      <label className="text-[10px] text-[#7D6858] font-bold block mb-1">Número de Mesa</label>
                      <input
                        type="text"
                        value={tableNumber}
                        onChange={(e) => {
                          setTableNumber(e.target.value);
                          onSelectTable(e.target.value);
                        }}
                        placeholder="Ej. Mesa 3"
                        className="w-full p-2.5 bg-[#FBF3E8] border border-[#E8DCC8] rounded-xl text-xs text-[#2C1D1A] font-semibold"
                      />
                    </div>
                  )}

                  {orderType === 'delivery' && (
                    <div>
                      <label className="text-[10px] text-[#7D6858] font-bold block mb-1">Dirección de Entrega</label>
                      <input
                        type="text"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="Calle, número y piso"
                        className="w-full p-2.5 bg-[#FBF3E8] border border-[#E8DCC8] rounded-xl text-xs text-[#2C1D1A] font-semibold"
                      />
                    </div>
                  )}
                </div>

                {/* Summary */}
                <div className="space-y-1.5 pt-2 text-xs border-t border-[#E8DCC8]">
                  <div className="flex justify-between text-[#7D6858] font-medium">
                    <span>Subtotal</span>
                    <span className="font-mono tabular-nums font-bold">${subtotal.toLocaleString('es-AR')}</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-[#4A6B53] font-bold">
                      <span>Descuento ({appliedPromo.code})</span>
                      <span className="font-mono tabular-nums">-${discountAmount.toLocaleString('es-AR')}</span>
                    </div>
                  )}
                  {giftPackaging && (
                    <div className="flex justify-between text-[#C05C38] font-bold">
                      <span>Bolsa Especial Kraft</span>
                      <span className="font-mono tabular-nums">+${giftPackagingPrice.toLocaleString('es-AR')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-extrabold text-[#2C1D1A] pt-2 border-t border-[#E8DCC8]">
                    <span>Total</span>
                    <span className="text-lg text-[#C05C38] font-mono tabular-nums">
                      ${finalTotal.toLocaleString('es-AR')}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout CTA */}
          {items.length > 0 && (
            <div className="p-4 bg-[#F5EBE1] border-t border-[#E8DCC8]">
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full py-4 px-5 bg-gradient-to-r from-[#C05C38] to-[#D99443] hover:from-[#A64724] hover:to-[#C05C38] text-white rounded-2xl font-extrabold text-sm shadow-md shadow-[#2C1D1A]/15 transition-all active:scale-[0.98] flex items-center justify-between cursor-pointer border border-[#E8DCC8]/40"
              >
                <span>Confirmar Pedido & Disfrutar</span>
                <div className="flex items-center gap-1.5 text-[#FBF3E8]">
                  <span className="font-mono tabular-nums text-base">${finalTotal.toLocaleString('es-AR')}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
