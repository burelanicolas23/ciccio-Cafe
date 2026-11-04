import React from 'react';
import { ShoppingBag, ArrowRight, MapPin, Clock, Phone, Coffee, Lock, Shield } from 'lucide-react';
import { STORE_DETAILS } from '../data/menu';

interface FooterProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenStoreInfo: () => void;
  onOpenAdminAuth?: () => void;
  onOpenPrivacyPolicies?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenStoreInfo,
  onOpenAdminAuth,
  onOpenPrivacyPolicies,
}) => {
  return (
    <>
      {/* Floating Sticky Mobile Cart Bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-3 inset-x-3 sm:inset-x-auto sm:right-6 sm:bottom-6 z-40 max-w-md mx-auto">
          <button
            onClick={onOpenCart}
            className="w-full bg-gradient-to-r from-[#C05C38] via-[#A64724] to-[#D99443] hover:from-[#A64724] hover:to-[#C05C38] text-white p-4 rounded-2xl shadow-coffee-floating border border-white/20 flex items-center justify-between transition-all active:scale-[0.98] cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1.5 -right-1.5 bg-[#2C1D1A] text-[#FBF3E8] text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-[#E8DCC8]">
                  {cartCount}
                </span>
              </div>
              <div className="text-left">
                <span className="text-[11px] uppercase tracking-wider text-[#FBF3E8]/90 font-extrabold block">
                  Ver mi pedido
                </span>
                <span className="text-sm font-extrabold">
                  {cartCount} {cartCount === 1 ? 'producto' : 'productos seleccionados'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold font-mono tabular-nums text-white">
                ${cartTotal.toLocaleString('es-AR')}
              </span>
              <ArrowRight className="w-5 h-5 text-[#FBF3E8]" />
            </div>
          </button>
        </div>
      )}

      {/* Main Grounded Footer in Espresso with Honey Accents */}
      <footer className="mt-14 bg-[#2C1D1A] text-[#FBF3E8] border-t-2 border-[#C05C38] pt-12 pb-20 sm:pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-[#E8DCC8]/15">
            {/* Brand story */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#C05C38] flex items-center justify-center text-white">
                  <Coffee className="w-4 h-4" />
                </div>
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Ciccio Café & Bakery
                </span>
              </div>
              <p className="text-xs text-[#E8DCC8]/80 leading-relaxed font-medium">
                Tu rincón de café de especialidad tostado fresco, tostones de masa madre y repostería artesanal horneada cada mañana.
              </p>
            </div>

            {/* Quick Details */}
            <div className="space-y-2 text-xs text-[#E8DCC8]/85">
              <span className="font-extrabold text-[#D99443] uppercase tracking-wider block mb-2">
                Encuéntranos
              </span>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D99443] shrink-0 mt-0.5" />
                <span className="font-medium">{STORE_DETAILS.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D99443] shrink-0" />
                <span className="font-medium">{STORE_DETAILS.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D99443] shrink-0" />
                <span className="font-medium">Lun a Vie 07:30 - 20:30 · Sáb & Dom 08:30 - 21:00</span>
              </div>
            </div>

            {/* Interactive reservation link */}
            <div className="space-y-3">
              <span className="font-extrabold text-[#D99443] uppercase tracking-wider text-xs block">
                ¡Ven a visitarnos!
              </span>
              <p className="text-xs text-[#E8DCC8]/75 leading-relaxed font-medium">
                ¿Planeas un desayuno en grupo, merienda de trabajo o retiro para llevar?
              </p>
              <button
                type="button"
                onClick={onOpenStoreInfo}
                className="px-4 py-2 bg-[#C05C38] hover:bg-[#A64724] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                Reservar Mesa o Consultar
              </button>
            </div>
          </div>

          {/* Bottom Line */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#E8DCC8]/60">
            <span>
              © {new Date().getFullYear()} Ciccio Café & Bakery · Todos los derechos reservados.
            </span>

            <div className="flex flex-wrap items-center gap-3 text-xs text-[#E8DCC8]/75">
              <button
                type="button"
                onClick={onOpenPrivacyPolicies}
                className="hover:text-white transition-colors cursor-pointer underline underline-offset-2 flex items-center gap-1"
              >
                <Shield className="w-3 h-3 text-[#D99443]" />
                <span>Políticas de Privacidad</span>
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={onOpenAdminAuth}
                className="hover:text-[#D99443] transition-colors cursor-pointer flex items-center gap-1"
              >
                <Lock className="w-3 h-3 text-[#D99443]" />
                <span>Acceso Administrador / Turno</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
