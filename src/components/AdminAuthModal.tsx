import React, { useState } from 'react';
import { UserRole } from '../types/cafe';
import { X, Lock, KeyRound, ShieldAlert, Check, ShieldCheck, UserCheck, Users, HelpCircle, Eye, EyeOff } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  adminPassword: string;
  onChangeAdminPassword: (newPass: string) => void;
  onOpenPrivacyPolicies: () => void;
  onSuccessAdminAuth?: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onSelectRole,
  adminPassword,
  onChangeAdminPassword,
  onOpenPrivacyPolicies,
  onSuccessAdminAuth,
}) => {
  if (!isOpen) return null;

  const [selectedTab, setSelectedTab] = useState<UserRole>(currentRole === 'customer' ? 'admin' : currentRole);
  const [enteredKey, setEnteredKey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [changeSuccess, setChangeSuccess] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (enteredKey.trim() === adminPassword || enteredKey.trim() === '1234' || enteredKey.trim() === 'ciccio2026') {
      onSelectRole('admin');
      setEnteredKey('');
      if (onSuccessAdminAuth) {
        onSuccessAdminAuth();
      }
      onClose();
    } else {
      setErrorMsg('Clave incorrecta. Clave por defecto sugerida: 1234 o ciccio2026');
    }
  };

  const handleShiftManagerLogin = () => {
    onSelectRole('shift_manager');
    onClose();
  };

  const handleCustomerLogin = () => {
    onSelectRole('customer');
    onClose();
  };

  const handleSaveNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPasswordInput.trim().length < 3) {
      setErrorMsg('La nueva clave debe tener al menos 3 caracteres.');
      return;
    }
    onChangeAdminPassword(newPasswordInput.trim());
    setNewPasswordInput('');
    setIsChangingPass(false);
    setChangeSuccess(true);
    setTimeout(() => setChangeSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#FBF3E8] rounded-3xl border border-[#E8DCC8] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E8DCC8] flex items-center justify-between bg-[#F5EBE1]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#C05C38] flex items-center justify-center text-white">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#2C1D1A]">
                Gestión de Permisos y Seguridad
              </h2>
              <p className="text-[11px] text-[#7D6858]">
                Ciccio Café & Bakery · Control de Acceso por Roles
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

        {/* Role Selector Tabs */}
        <div className="p-4 bg-white border-b border-[#E8DCC8]">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#7D6858] block mb-2">
            Selecciona el rol con el que deseas operar:
          </span>
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-[#F5EBE1] rounded-2xl border border-[#E8DCC8]">
            <button
              type="button"
              onClick={() => {
                setSelectedTab('admin');
                setErrorMsg('');
              }}
              className={`py-2 px-1 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                selectedTab === 'admin'
                  ? 'bg-[#C05C38] text-white shadow-sm'
                  : 'text-[#7D6858] hover:text-[#2C1D1A]'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Administrador</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedTab('shift_manager');
                setErrorMsg('');
              }}
              className={`py-2 px-1 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                selectedTab === 'shift_manager'
                  ? 'bg-[#D99443] text-white shadow-sm'
                  : 'text-[#7D6858] hover:text-[#2C1D1A]'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Encargado</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedTab('customer');
                setErrorMsg('');
              }}
              className={`py-2 px-1 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                selectedTab === 'customer'
                  ? 'bg-[#4A6B53] text-white shadow-sm'
                  : 'text-[#7D6858] hover:text-[#2C1D1A]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Comensal</span>
            </button>
          </div>
        </div>

        {/* Tab Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* TAB 1: ADMIN */}
          {selectedTab === 'admin' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-3.5 bg-gradient-to-br from-[#F5EBE1] to-white rounded-2xl border border-[#E8DCC8] text-xs space-y-1.5">
                <div className="flex items-center gap-2 text-[#C05C38] font-extrabold uppercase tracking-wide">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Permisos de Administrador General</span>
                </div>
                <p className="text-[#7D6858]">
                  Tiene control absoluto para <strong>modificar precios</strong> de los 27 productos, cambiar nombres, editar descripciones, actualizar fotos y reestablecer la carta.
                </p>
                <div className="text-[11px] text-[#4A6B53] font-bold">
                  ✓ Acceso protegido con clave maestra.
                </div>
              </div>

              {currentRole === 'admin' ? (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Actualmente estás autenticado como Administrador</span>
                  </div>
                  <p className="text-[11px] text-emerald-700">
                    Tu sesión está activa y tienes permiso para editar todos los precios del catálogo en el Gestor de Precios.
                  </p>
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsChangingPass(!isChangingPass)}
                      className="px-3 py-1.5 bg-white border border-emerald-300 rounded-xl text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer"
                    >
                      {isChangingPass ? 'Cancelar cambio de clave' : 'Cambiar clave maestra'}
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectRole('customer')}
                      className="px-3 py-1.5 bg-white border border-rose-300 rounded-xl text-xs font-bold text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      Cerrar sesión de Admin
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleAdminLogin} className="space-y-3 p-4 bg-white rounded-2xl border border-[#E8DCC8] shadow-sm">
                  <label className="block text-xs font-extrabold text-[#2C1D1A]">
                    Ingresa la Clave de Administrador para desbloquear la gestión de precios:
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-[#8A6F57] absolute left-3 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={enteredKey}
                      onChange={(e) => {
                        setEnteredKey(e.target.value);
                        setErrorMsg('');
                      }}
                      placeholder="Ingresa clave (ej. 1234)"
                      className="w-full pl-9 pr-10 py-2.5 bg-[#FBF3E8] border border-[#E8DCC8] rounded-xl text-xs font-mono font-bold text-[#2C1D1A] focus:outline-none focus:ring-2 focus:ring-[#C05C38]/25"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-[#7D6858] hover:text-[#2C1D1A] cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  <p className="text-[11px] text-[#7D6858]">
                    💡 <em>Clave de fábrica preconfigurada:</em> <code>1234</code> o <code>ciccio2026</code>
                  </p>

                  {errorMsg && (
                    <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-[#C05C38] to-[#D99443] hover:from-[#A64724] hover:to-[#C05C38] text-white rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-md shadow-[#2C1D1A]/10"
                  >
                    Ingresar como Administrador
                  </button>
                </form>
              )}

              {/* Form to change admin password */}
              {isChangingPass && (
                <form onSubmit={handleSaveNewPassword} className="p-4 bg-white rounded-2xl border border-[#C05C38]/40 space-y-2.5 animate-fadeIn">
                  <span className="text-xs font-bold text-[#C05C38] block">
                    Actualizar clave maestra de Administrador:
                  </span>
                  <input
                    type="text"
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    placeholder="Escribe la nueva clave..."
                    className="w-full p-2.5 bg-[#FBF3E8] border border-[#E8DCC8] rounded-xl text-xs font-mono font-bold text-[#2C1D1A]"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsChangingPass(false)}
                      className="px-3 py-1.5 text-xs text-[#7D6858] font-semibold cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#C05C38] text-white rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Guardar Clave
                    </button>
                  </div>
                </form>
              )}

              {changeSuccess && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>¡Clave de Administrador actualizada con éxito!</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SHIFT MANAGER */}
          {selectedTab === 'shift_manager' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 bg-white rounded-2xl border border-[#E8DCC8] space-y-2">
                <div className="flex items-center gap-2 text-[#D99443] font-bold text-xs uppercase tracking-wide">
                  <UserCheck className="w-4 h-4" />
                  <span>Permisos del Encargado de Turno / Cajero</span>
                </div>
                <p className="text-xs text-[#7D6858] leading-relaxed">
                  Permite operar la cafetería durante el turno: tomar pedidos en salón o para llevar, asignar mesas, supervisar comandas y aplicar cupones de cortesía.
                </p>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-medium">
                  ⚠️ <strong>Restricción de seguridad:</strong> El Encargado de Turno NO tiene permiso para alterar los precios base del catálogo, para prevenir modificaciones no autorizadas.
                </div>
              </div>

              <button
                type="button"
                onClick={handleShiftManagerLogin}
                className="w-full py-2.5 bg-[#D99443] hover:bg-[#C08332] text-white rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-md shadow-[#2C1D1A]/10"
              >
                Activar Modo Encargado de Turno
              </button>
            </div>
          )}

          {/* TAB 3: CUSTOMER */}
          {selectedTab === 'customer' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 bg-white rounded-2xl border border-[#E8DCC8] space-y-2">
                <div className="flex items-center gap-2 text-[#4A6B53] font-bold text-xs uppercase tracking-wide">
                  <Users className="w-4 h-4" />
                  <span>Modo Comensal / Cliente</span>
                </div>
                <p className="text-xs text-[#7D6858] leading-relaxed">
                  Vista habitual de la cafetería con el menú interactivo, selección de café para llevar o en mesa, personalización de croissants y armado de canasta de pedidos.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCustomerLogin}
                className="w-full py-2.5 bg-[#4A6B53] hover:bg-[#3B5742] text-white rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-md shadow-[#2C1D1A]/10"
              >
                Continuar como Comensal
              </button>
            </div>
          )}
        </div>

        {/* Footer with Privacy Policy Link */}
        <div className="p-4 bg-[#F5EBE1] border-t border-[#E8DCC8] flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenPrivacyPolicies();
            }}
            className="flex items-center gap-1.5 text-[#C05C38] hover:text-[#2C1D1A] font-bold cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Ver Políticas de Privacidad y Roles</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#7D6858] hover:text-[#2C1D1A] cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
