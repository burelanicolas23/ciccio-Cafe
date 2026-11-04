import React from 'react';
import { X, ShieldCheck, Lock, UserCheck, EyeOff, FileText, CheckCircle2 } from 'lucide-react';

interface PrivacyPoliciesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPoliciesModal: React.FC<PrivacyPoliciesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#FBF3E8] rounded-3xl border border-[#E8DCC8] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E8DCC8] flex items-center justify-between bg-[#F5EBE1]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#4A6B53] flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#2C1D1A]">
                Políticas de Privacidad y Control de Permisos
              </h2>
              <p className="text-[11px] text-[#7D6858]">
                Ciccio Café & Bakery · Seguridad para Administrador, Encargado de Turno y Clientes
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

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-[#2C1D1A]">
          {/* Section 1: Admin */}
          <div className="p-4 bg-white rounded-2xl border border-[#E8DCC8] space-y-2">
            <div className="flex items-center gap-2 text-[#C05C38] font-bold text-xs uppercase tracking-wider">
              <Lock className="w-4 h-4" />
              <span>1. Política de Administrador General & Gestión de Precios</span>
            </div>
            <p className="text-xs text-[#7D6858] leading-relaxed">
              El acceso a la edición de precios, creación o modificación de productos y restablecimiento de listas oficiales está estrictamente reservado al <strong>Administrador General</strong> mediante una <strong>clave maestra encriptada</strong>. Ningún empleado o cliente puede alterar la lista de precios sin la autenticación requerida.
            </p>
            <ul className="text-xs text-[#3B2B24] space-y-1 pl-1 font-medium">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#4A6B53] shrink-0 mt-0.5" />
                <span>Protección con clave secreta (por defecto <code>1234</code> / <code>ciccio2026</code>, modificable por el titular).</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#4A6B53] shrink-0 mt-0.5" />
                <span>Auditoría de cambios guardados en almacenamiento seguro local.</span>
              </li>
            </ul>
          </div>

          {/* Section 2: Shift Manager */}
          <div className="p-4 bg-white rounded-2xl border border-[#E8DCC8] space-y-2">
            <div className="flex items-center gap-2 text-[#D99443] font-bold text-xs uppercase tracking-wider">
              <UserCheck className="w-4 h-4" />
              <span>2. Política y Deberes del Encargado de Turno</span>
            </div>
            <p className="text-xs text-[#7D6858] leading-relaxed">
              El <strong>Encargado de Turno</strong> tiene permisos operativos para gestionar la toma de comandas, asignar pedidos a mesas o para llevar, cambiar estados de cocina/barra y aplicar descuentos autorizados de cortesía. <strong>Tiene expresamente restringida la modificación de la estructura tarifaria del establecimiento</strong> para salvaguardar la coherencia comercial.
            </p>
            <ul className="text-xs text-[#3B2B24] space-y-1 pl-1 font-medium">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#4A6B53] shrink-0 mt-0.5" />
                <span>Supervisión de comandas por mesa y flujo de entregas.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#4A6B53] shrink-0 mt-0.5" />
                <span>Deber de confidencialidad comercial y resguardo de claves operativas.</span>
              </li>
            </ul>
          </div>

          {/* Section 3: Customer Privacy */}
          <div className="p-4 bg-white rounded-2xl border border-[#E8DCC8] space-y-2">
            <div className="flex items-center gap-2 text-[#4A6B53] font-bold text-xs uppercase tracking-wider">
              <EyeOff className="w-4 h-4" />
              <span>3. Privacidad del Comensal y Datos de Pedidos</span>
            </div>
            <p className="text-xs text-[#7D6858] leading-relaxed">
              Los datos solicitados a los comensales (nombre, teléfono de contacto y número de mesa o dirección de entrega) son utilizados única y exclusivamente con el fin operativo de preparar, despachar y entregar su pedido en el local o domicilio.
            </p>
            <ul className="text-xs text-[#3B2B24] space-y-1 pl-1 font-medium">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#4A6B53] shrink-0 mt-0.5" />
                <span>No se comercializan ni transfieren datos a terceros o redes de publicidad.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#4A6B53] shrink-0 mt-0.5" />
                <span>Los pedidos y favoritos se almacenan de manera privada en el dispositivo del usuario.</span>
              </li>
            </ul>
          </div>

          {/* Section 4: Data Retention */}
          <div className="p-3.5 bg-[#F5EBE1] rounded-2xl border border-[#E8DCC8] text-[11px] text-[#7D6858] flex items-start gap-2">
            <FileText className="w-4 h-4 text-[#C05C38] shrink-0 mt-0.5" />
            <span>
              Ciccio Café cumple con las mejores prácticas de privacidad y protección de datos comerciales. Las sesiones de administración se revocan automáticamente o pueden cerrarse manualmente desde el encabezado.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F5EBE1] border-t border-[#E8DCC8] flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-gradient-to-r from-[#C05C38] to-[#D99443] hover:from-[#A64724] hover:to-[#C05C38] text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md shadow-[#2C1D1A]/10"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
