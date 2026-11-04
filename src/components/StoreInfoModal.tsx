import React, { useState } from 'react';
import { STORE_DETAILS } from '../data/menu';
import { X, Clock, MapPin, Phone, Instagram, Coffee, CalendarCheck, Check } from 'lucide-react';

interface StoreInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoreInfoModal: React.FC<StoreInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [reserveGuests, setReserveGuests] = useState('2');
  const [reserveDate, setReserveDate] = useState('2026-11-04');
  const [reserveTime, setReserveTime] = useState('10:00');
  const [reserveName, setReserveName] = useState('');
  const [reservationSent, setReservationSent] = useState(false);

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    setReservationSent(true);
    setTimeout(() => {
      setReservationSent(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-[#E8DCC8] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E8DCC8] flex items-center justify-between bg-[#F5EBE1]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-[#C05C38] flex items-center justify-center text-white">
              <Coffee className="w-4 h-4" />
            </div>
            <h2 className="text-base font-extrabold text-[#2C1D1A]">
              Ciccio Café & Bakery
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#7D6858] hover:text-[#2C1D1A] hover:bg-[#E8DCC8] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs text-[#2C1D1A]">
          {/* Story */}
          <div className="p-4 bg-[#FBF3E8] rounded-2xl border border-[#E8DCC8] space-y-2">
            <div className="flex items-center gap-1.5 text-[#C05C38] font-extrabold text-sm">
              <Coffee className="w-4 h-4" />
              <span>Nuestra Pasión & Tostaduría</span>
            </div>
            <p className="text-[#7D6858] leading-relaxed font-medium">
              {STORE_DETAILS.story}
            </p>
          </div>

          {/* Hours */}
          <div className="p-4 bg-[#F5EBE1] rounded-2xl border border-[#E8DCC8] space-y-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#2C1D1A] uppercase tracking-wider">
              <Clock className="w-4 h-4 text-[#D99443]" />
              <span>Horarios de Atención</span>
            </div>
            <div className="divide-y divide-[#E8DCC8]/70">
              {STORE_DETAILS.hours.map((h) => (
                <div key={h.day} className="py-2 flex justify-between items-center text-xs">
                  <span className="font-bold text-[#2C1D1A]">{h.day}</span>
                  <span className="text-[#C05C38] font-mono font-bold tabular-nums">{h.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location & Contact */}
          <div className="p-4 bg-white rounded-2xl border border-[#E8DCC8] space-y-2.5 shadow-sm">
            <h4 className="font-extrabold text-[#2C1D1A] uppercase tracking-wider text-[11px]">
              Contacto & Ubicación
            </h4>
            <div className="flex items-center gap-2 text-[#7D6858] font-medium">
              <MapPin className="w-4 h-4 text-[#C05C38] shrink-0" />
              <span>{STORE_DETAILS.address}</span>
            </div>
            <div className="flex items-center gap-2 text-[#7D6858] font-medium">
              <Phone className="w-4 h-4 text-[#C05C38] shrink-0" />
              <span>{STORE_DETAILS.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-[#7D6858] font-medium">
              <Instagram className="w-4 h-4 text-[#C05C38] shrink-0" />
              <span>{STORE_DETAILS.instagram}</span>
            </div>
          </div>

          {/* Table reservation */}
          <div className="p-4 bg-[#F5EBE1] rounded-2xl border border-[#E8DCC8] space-y-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#2C1D1A] uppercase tracking-wider">
              <CalendarCheck className="w-4 h-4 text-[#C05C38]" />
              <span>Reserva tu Mesa para Merienda o Brunch</span>
            </div>

            {reservationSent ? (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-800 text-center space-y-1">
                <Check className="w-5 h-5 mx-auto text-emerald-600" />
                <p className="font-bold">¡Reserva enviada con éxito!</p>
                <p className="text-[11px]">Te esperamos con café caliente y croissants dorados.</p>
              </div>
            ) : (
              <form onSubmit={handleReservation} className="space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] text-[#7D6858] font-bold block mb-0.5">Personas</label>
                    <select
                      value={reserveGuests}
                      onChange={(e) => setReserveGuests(e.target.value)}
                      className="w-full p-2 bg-white border border-[#E8DCC8] rounded-xl text-xs font-semibold"
                    >
                      <option value="1">1 pers</option>
                      <option value="2">2 pers</option>
                      <option value="4">4 pers</option>
                      <option value="6">6+ pers</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-[#7D6858] font-bold block mb-0.5">Fecha</label>
                    <input
                      type="date"
                      value={reserveDate}
                      onChange={(e) => setReserveDate(e.target.value)}
                      className="w-full p-1.5 bg-white border border-[#E8DCC8] rounded-xl text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#7D6858] font-bold block mb-0.5">Hora</label>
                    <input
                      type="time"
                      value={reserveTime}
                      onChange={(e) => setReserveTime(e.target.value)}
                      className="w-full p-1.5 bg-white border border-[#E8DCC8] rounded-xl text-xs font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-[#7D6858] font-bold block mb-0.5">Nombre de la Reserva</label>
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre y apellido"
                    value={reserveName}
                    onChange={(e) => setReserveName(e.target.value)}
                    className="w-full p-2 bg-white border border-[#E8DCC8] rounded-xl text-xs font-semibold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-[#C05C38] to-[#D99443] hover:from-[#A64724] hover:to-[#C05C38] text-white rounded-xl font-extrabold text-xs transition-colors cursor-pointer shadow-sm"
                >
                  Confirmar Reserva
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
