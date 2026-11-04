import React from 'react';
import { ShoppingBag, Heart, Clock, Coffee, Smartphone, Monitor, Tag, ShieldCheck, UserCheck, Users, Lock, Shield } from 'lucide-react';
import { UserRole } from '../types/cafe';

interface HeaderProps {
  favoritesCount: number;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenFavorites: () => void;
  onOpenStoreInfo: () => void;
  onOpenPriceManager: () => void;
  onOpenAdminAuth: () => void;
  currentRole: UserRole;
  isMobilePreview: boolean;
  onToggleMobilePreview: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  favoritesCount,
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenFavorites,
  onOpenStoreInfo,
  onOpenPriceManager,
  onOpenAdminAuth,
  currentRole,
  isMobilePreview,
  onToggleMobilePreview,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#FBF3E8]/95 backdrop-blur-md border-b border-[#E8DCC8] transition-all">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Zone 1: Coffee Brand Wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#2C1D1A] to-[#C05C38] flex items-center justify-center text-white shadow-md shadow-[#2C1D1A]/20">
            <Coffee className="w-5 h-5 text-[#E8DCC8]" />
          </div>
          <a href="#" className="flex flex-col text-left group">
            <div className="flex items-center gap-1">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#2C1D1A] group-hover:text-[#C05C38] transition-colors leading-none">
                Ciccio
              </span>
              <span className="w-2 h-2 rounded-full bg-[#C05C38] inline-block mb-1" />
            </div>
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#C05C38] mt-0.5">
              Café & Bakery Artigianale
            </span>
          </a>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-semibold text-[#7D6858]">
          <a href="#menu-sezione" className="hover:text-[#C05C38] transition-colors whitespace-nowrap">
            Nuestra Carta
          </a>
          <button
            onClick={onOpenStoreInfo}
            className="hover:text-[#C05C38] transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5 text-[#D99443]" />
            <span>Horarios & Tostaduría</span>
          </button>
          <button
            onClick={onOpenPriceManager}
            className="hover:text-[#C05C38] transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer text-[#C05C38] font-bold"
          >
            <Tag className="w-3.5 h-3.5 text-[#C05C38]" />
            <span>Gestor de Precios</span>
          </button>
          <button
            onClick={onOpenAdminAuth}
            className="hover:text-[#C05C38] transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5 text-[#4A6B53]" />
            <span>Roles & Privacidad</span>
          </button>
        </nav>

        {/* Zone 3: Actions & Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Active Role Badge & Security Toggle */}
          <button
            onClick={onOpenAdminAuth}
            title="Cambiar rol o ingresar clave de administrador"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer active:scale-95 shadow-xs ${
              currentRole === 'admin'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                : currentRole === 'shift_manager'
                ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                : 'bg-[#F5EBE1] text-[#7D6858] border-[#E8DCC8] hover:bg-[#E8DCC8]'
            }`}
          >
            {currentRole === 'admin' ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden xs:inline">Admin</span>
              </>
            ) : currentRole === 'shift_manager' ? (
              <>
                <UserCheck className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden xs:inline">Encargado</span>
              </>
            ) : (
              <>
                <Users className="w-3.5 h-3.5 text-[#7D6858]" />
                <span className="hidden xs:inline">Cliente</span>
              </>
            )}
          </button>

          {/* Price Manager Button with lock indicator if not admin */}
          <button
            onClick={onOpenPriceManager}
            title={currentRole === 'admin' ? "Gestor de Precios (Desbloqueado)" : "Gestor de Precios (Requiere clave de Admin)"}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-[#C05C38] bg-[#F5EBE1] hover:bg-[#E8DCC8] border border-[#C05C38]/30 rounded-xl transition-all cursor-pointer active:scale-95 shadow-xs"
          >
            {currentRole === 'admin' ? (
              <Tag className="w-3.5 h-3.5 text-[#C05C38]" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-[#C05C38]" />
            )}
            <span className="hidden xs:inline">Precios</span>
          </button>

          {/* Mobile view toggle */}
          <button
            onClick={onToggleMobilePreview}
            title={isMobilePreview ? "Cambiar a vista completa" : "Simular pantalla móvil"}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#7D6858] bg-[#F5EBE1] hover:bg-[#E8DCC8] border border-[#E8DCC8] rounded-xl transition-colors cursor-pointer"
          >
            {isMobilePreview ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-[#C05C38]" />
                <span className="hidden lg:inline">Vista Completa</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-[#C05C38]" />
                <span className="hidden lg:inline">Modo Móvil 390px</span>
              </>
            )}
          </button>

          {/* Favorites Button */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2 text-[#7D6858] hover:text-[#C05C38] hover:bg-[#F5EBE1] rounded-full transition-colors cursor-pointer"
            aria-label="Ver favoritos"
          >
            <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-[#C05C38] text-[#C05C38]' : ''}`} />
            {favoritesCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#C05C38] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-sm">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#C05C38] to-[#D99443] hover:from-[#A64724] hover:to-[#C05C38] text-white rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-[#2C1D1A]/15 transition-all active:scale-95 cursor-pointer border border-[#E8DCC8]/40"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#2C1D1A] text-[#FBF3E8] text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-[#E8DCC8]">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden xs:inline">
              {cartCount > 0 ? `$${cartTotal.toLocaleString('es-AR')}` : 'Mi Pedido'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
