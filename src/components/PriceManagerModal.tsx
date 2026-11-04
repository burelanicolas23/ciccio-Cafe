import React, { useState } from 'react';
import { Product, UserRole } from '../types/cafe';
import { X, Check, Save, RotateCcw, Search, DollarSign, Lock, KeyRound, ShieldAlert, ShieldCheck, Eye, EyeOff, Shield } from 'lucide-react';

interface PriceManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onUpdateProducts: (updatedProducts: Product[]) => void;
  onResetDefaults: () => void;
  currentRole: UserRole;
  adminPassword: string;
  onUnlockAdmin: () => void;
  onOpenPrivacyPolicies: () => void;
}

export const PriceManagerModal: React.FC<PriceManagerModalProps> = ({
  isOpen,
  onClose,
  products,
  onUpdateProducts,
  onResetDefaults,
  currentRole,
  adminPassword,
  onUnlockAdmin,
  onOpenPrivacyPolicies,
}) => {
  const [editableProducts, setEditableProducts] = useState<Product[]>(products);
  const [filterQuery, setFilterQuery] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Sync when products change or modal opens
  React.useEffect(() => {
    if (isOpen) {
      setEditableProducts(products);
      setFilterQuery('');
      setSavedSuccess(false);
      setPasswordInput('');
      setAuthError('');
    }
  }, [isOpen, products]);

  if (!isOpen) return null;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const key = passwordInput.trim();
    if (key === adminPassword || key === '1234' || key === 'ciccio2026') {
      onUnlockAdmin();
      setAuthError('');
      setPasswordInput('');
    } else {
      setAuthError('Clave incorrecta. Clave por defecto de administrador: 1234');
    }
  };

  const handlePriceChange = (id: string, newPriceStr: string) => {
    const num = parseInt(newPriceStr.replace(/\D/g, ''), 10) || 0;
    setEditableProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, price: num } : p))
    );
  };

  const handleNameChange = (id: string, newName: string) => {
    setEditableProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name: newName } : p))
    );
  };

  const handleSave = () => {
    onUpdateProducts(editableProducts);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const filtered = editableProducts.filter((p) => {
    const q = filterQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#FBF3E8] rounded-3xl border border-[#E8DCC8] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E8DCC8] flex items-center justify-between bg-[#F5EBE1]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#C05C38] flex items-center justify-center text-white">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-[#2C1D1A]">
                  Gestor de Precios y Catálogo
                </h2>
                {currentRole === 'admin' ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Admin Autenticado</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-300">
                    <Lock className="w-3 h-3" />
                    <span>Bloqueado</span>
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#7D6858]">
                Ajusta los precios de tus 27 productos con control de clave maestra
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#7D6858] hover:text-[#2C1D1A] hover:bg-[#E8DCC8] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SECURITY GATE: If not authenticated as Admin, prompt for password */}
        {currentRole !== 'admin' ? (
          <div className="p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-4 max-w-md mx-auto my-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#C05C38]/10 border border-[#C05C38]/30 flex items-center justify-center text-[#C05C38] shadow-sm">
              <Lock className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-extrabold text-[#2C1D1A]">
                Clave de Administrador Requerida
              </h3>
              <p className="text-xs text-[#7D6858] leading-relaxed">
                Según las políticas de privacidad y seguridad de Ciccio Café, la modificación de precios requiere la clave maestra del Administrador General. El Encargado de Turno y Comensales tienen el acceso protegido.
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="w-full space-y-3 pt-2">
              <div className="relative">
                <KeyRound className="w-4 h-4 text-[#8A6F57] absolute left-3 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setAuthError('');
                  }}
                  placeholder="Ingresa clave maestra (ej. 1234)"
                  className="w-full pl-9 pr-10 py-3 bg-white border border-[#E8DCC8] rounded-xl text-xs font-mono font-bold text-[#2C1D1A] focus:outline-none focus:ring-2 focus:ring-[#C05C38]/30 shadow-sm"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-[#7D6858] hover:text-[#2C1D1A] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {authError && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-1.5 text-left">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <p className="text-[11px] text-[#7D6858]">
                💡 <em>Clave inicial de demostración:</em> <code>1234</code> o <code>ciccio2026</code>
              </p>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#C05C38] to-[#D99443] hover:from-[#A64724] hover:to-[#C05C38] text-white rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-md shadow-[#2C1D1A]/15"
              >
                Desbloquear Gestor de Precios
              </button>
            </form>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenPrivacyPolicies();
              }}
              className="text-[11px] text-[#C05C38] hover:underline font-bold pt-2 cursor-pointer"
            >
              Consultar Políticas de Privacidad y Roles
            </button>
          </div>
        ) : (
          /* UNLOCKED VIEW: Full price & product editor */
          <>
            {/* Filter bar */}
            <div className="p-4 bg-white border-b border-[#E8DCC8] flex items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#8A6F57] absolute left-3 top-3" />
                <input
                  type="text"
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  placeholder="Filtrar por nombre o categoría..."
                  className="w-full pl-9 pr-3 py-2 bg-[#FBF3E8] border border-[#E8DCC8] rounded-xl text-xs text-[#2C1D1A] focus:outline-none focus:ring-1 focus:ring-[#C05C38]"
                />
              </div>

              <button
                type="button"
                onClick={onResetDefaults}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#7D6858] hover:text-[#2C1D1A] bg-[#F5EBE1] hover:bg-[#E8DCC8] rounded-xl border border-[#E8DCC8] transition-colors cursor-pointer whitespace-nowrap"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Restablecer sugeridos</span>
              </button>
            </div>

            {/* Products List */}
            <div className="p-4 overflow-y-auto flex-1 space-y-2">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="p-3 bg-white rounded-2xl border border-[#E8DCC8] flex items-center justify-between gap-3 shadow-sm hover:border-[#C05C38]/40 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 bg-[#F5EBE1] border border-[#E8DCC8]"
                    />
                    <div className="flex-1 min-w-0">
                      <input
                        type="text"
                        value={product.name}
                        onChange={(e) => handleNameChange(product.id, e.target.value)}
                        className="w-full font-bold text-xs text-[#2C1D1A] bg-transparent border-b border-transparent hover:border-[#E8DCC8] focus:border-[#C05C38] focus:outline-none truncate"
                      />
                      <span className="text-[10px] text-[#7D6858] font-medium block">
                        Categoría: {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Price Editor */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-xs font-bold text-[#C05C38]">$</span>
                    <input
                      type="text"
                      value={product.price.toLocaleString('es-AR')}
                      onChange={(e) => handlePriceChange(product.id, e.target.value)}
                      className="w-24 p-2 bg-[#F5EBE1] border border-[#E8DCC8] rounded-xl text-xs font-mono font-bold text-[#C05C38] text-right focus:outline-none focus:ring-2 focus:ring-[#C05C38]/25"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 bg-[#F5EBE1] border-t border-[#E8DCC8] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#7D6858] font-medium">
                  {editableProducts.length} productos listos
                </span>
                <button
                  type="button"
                  onClick={onOpenPrivacyPolicies}
                  className="text-[11px] text-[#C05C38] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Shield className="w-3 h-3" />
                  <span>Políticas</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#7D6858] hover:text-[#2C1D1A] cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-[#C05C38] to-[#D99443] hover:from-[#A64724] hover:to-[#C05C38] text-white rounded-xl text-xs font-extrabold shadow-md shadow-[#2C1D1A]/10 transition-all cursor-pointer"
                >
                  {savedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-200" />
                      <span>¡Precios Guardados!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Guardar Precios</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
