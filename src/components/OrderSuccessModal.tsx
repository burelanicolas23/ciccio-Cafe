import React, { useState } from 'react';
import { OrderDetails } from '../types/cafe';
import { CheckCircle2, Sparkles, QrCode, Copy, Check, Coffee } from 'lucide-react';

interface OrderSuccessModalProps {
  order: OrderDetails | null;
  onClose: () => void;
  onNewOrder: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onNewOrder,
}) => {
  if (!order) return null;

  const [copied, setCopied] = useState(false);

  const handleCopyReceipt = () => {
    const text = `Ciccio Café & Bakery - Orden #${order.orderId}\nTotal: $${order.total.toLocaleString(
      'es-AR'
    )}\nModalidad: ${order.orderType}\nFecha: ${order.timestamp}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    { title: 'Pedido Confirmado', desc: 'Recibido en cafetería y panadería', completed: true },
    { title: 'Molienda & Horneado', desc: 'Barista preparando tu café con granos frescos', current: true },
    { title: 'Listo para Disfrutar', desc: 'En barra o directo a tu mesa', completed: false },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-[#E8DCC8] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header with Coffee Shop Palette */}
        <div className="bg-gradient-to-br from-[#2C1D1A] via-[#A64724] to-[#C05C38] text-white p-6 text-center relative overflow-hidden">
          <div className="absolute top-2 right-2 text-white/10">
            <Sparkles className="w-16 h-16" />
          </div>

          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FBF3E8] text-[#C05C38] flex items-center justify-center shadow-lg mb-3">
            <Coffee className="w-8 h-8" />
          </div>

          <span className="text-xs uppercase tracking-widest text-[#D99443] font-extrabold block mb-1">
            ¡Gracias por elegirnos!
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-white">
            ¡Tu pedido está confirmado!
          </h2>
          <p className="text-xs text-white/90 mt-1 font-semibold">
            Orden #{order.orderId} · Tiempo estimado: {order.estimatedTime}
          </p>
        </div>

        {/* Scrollable details */}
        <div className="p-5 overflow-y-auto space-y-6">
          {/* Status Tracker */}
          <div className="p-4 bg-[#F5EBE1] rounded-2xl border border-[#E8DCC8]">
            <span className="text-xs font-extrabold text-[#2C1D1A] uppercase tracking-wider block mb-3">
              Estado de Preparación
            </span>
            <div className="space-y-3">
              {steps.map((s, idx) => (
                <div key={s.title} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        s.completed
                          ? 'bg-[#4A6B53] text-white'
                          : s.current
                          ? 'bg-[#C05C38] text-white ring-4 ring-[#C05C38]/20 animate-pulse'
                          : 'bg-[#E8DCC8] text-[#7D6858]'
                      }`}
                    >
                      {s.completed ? '✓' : idx + 1}
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="w-0.5 h-6 bg-[#E8DCC8] my-0.5" />
                    )}
                  </div>
                  <div>
                    <h4
                      className={`text-xs font-extrabold ${
                        s.current ? 'text-[#C05C38]' : 'text-[#2C1D1A]'
                      }`}
                    >
                      {s.title}
                    </h4>
                    <p className="text-[11px] text-[#7D6858] font-medium">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* QR Code Container */}
          <div className="p-4 bg-white rounded-2xl border border-[#E8DCC8] text-center space-y-2 shadow-sm">
            <div className="inline-block p-3 bg-[#FBF3E8] border border-[#E8DCC8] rounded-2xl shadow-inner">
              <QrCode className="w-24 h-24 mx-auto text-[#2C1D1A]" />
            </div>
            <p className="text-xs text-[#7D6858] font-medium">
              Muestra este código al retirar en barra o al camarero en mesa.
            </p>
            {order.tableNumber && (
              <span className="inline-block px-3 py-1 rounded-full bg-[#4A6B53] text-white text-xs font-bold">
                Mesa {order.tableNumber}
              </span>
            )}
          </div>

          {/* Itemized summary */}
          <div className="space-y-2">
            <span className="text-xs font-extrabold text-[#2C1D1A] uppercase tracking-wider block">
              Resumen de Productos
            </span>
            <div className="divide-y divide-[#E8DCC8]/60 text-xs">
              {order.items.map((item) => (
                <div key={item.id} className="py-2.5 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-[#2C1D1A]">
                      {item.quantity}x {item.product.name}
                    </span>
                    {item.options.size && (
                      <span className="text-[11px] text-[#7D6858] block font-medium">
                        {item.options.size.name}
                      </span>
                    )}
                  </div>
                  <span className="font-mono tabular-nums text-[#C05C38] font-extrabold">
                    ${item.itemTotalPrice.toLocaleString('es-AR')}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#E8DCC8] flex justify-between items-center text-sm font-extrabold text-[#2C1D1A]">
              <span>Total Abonado</span>
              <span className="text-lg text-[#C05C38] font-mono tabular-nums">
                ${order.total.toLocaleString('es-AR')}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 bg-[#F5EBE1] border-t border-[#E8DCC8] flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleCopyReceipt}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#2C1D1A] bg-white border border-[#E8DCC8] hover:bg-[#E8DCC8] rounded-xl transition-all cursor-pointer shadow-sm"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#C05C38]" />}
            <span>{copied ? 'Copiado' : 'Comprobante'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onNewOrder();
            }}
            className="px-5 py-2 bg-gradient-to-r from-[#C05C38] to-[#D99443] hover:from-[#A64724] hover:to-[#C05C38] text-white text-xs font-extrabold rounded-xl transition-all cursor-pointer shadow-md shadow-[#2C1D1A]/10"
          >
            Hacer Otro Pedido
          </button>
        </div>
      </div>
    </div>
  );
};
