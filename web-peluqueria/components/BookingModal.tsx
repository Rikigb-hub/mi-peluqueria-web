
import React, { useState, useMemo } from 'react';
import { Service, TimeSlot, BusinessHours } from '../types';
import { Button } from './Button';
import { X, Calendar as CalendarIcon, Clock, CheckCircle2, User, Mail, Phone, AlertCircle } from 'lucide-react';

interface BookingModalProps {
  service: Service;
  businessHours: BusinessHours;
  onClose: () => void;
  onConfirm: (date: string, time: string, contactInfo: { name: string; email: string; phone: string }) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ service, businessHours, onClose, onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const slots = useMemo((): TimeSlot[] => {
    // Determinar el día de la semana (0-6)
    const dateObj = new Date(selectedDate);
    const dayOfWeek = dateObj.getDay();
    const schedule = businessHours[dayOfWeek];

    if (!schedule || !schedule.isOpen) return [];

    const slotsArray: TimeSlot[] = [];
    const [openH, openM] = schedule.open.split(':').map(Number);
    const [closeH, closeM] = schedule.close.split(':').map(Number);

    let currentH = openH;
    let currentM = openM;

    // Generar franjas cada 30 minutos mientras sea antes de la hora de cierre
    while (currentH < closeH || (currentH === closeH && currentM < closeM)) {
      const timeString = `${currentH.toString().padStart(2, '0')}:${currentM.toString().padStart(2, '0')}`;
      
      // Simulación de disponibilidad (esto en una app real consultaría la DB)
      slotsArray.push({ time: timeString, available: Math.random() > 0.2 });

      currentM += 30;
      if (currentM >= 60) {
        currentH += 1;
        currentM = 0;
      }
    }
    
    return slotsArray;
  }, [selectedDate, businessHours]);

  const handleBooking = () => {
    if (!selectedTime || !name || !email || !phone) return;
    onConfirm(selectedDate, selectedTime, { name, email, phone });
    setIsSuccess(true);
  };

  const isClosed = slots.length === 0;

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
        <div className="bg-slate-900 w-full max-w-md rounded-[2.5rem] p-10 border border-cyan-500/20 text-center animate-in zoom-in-95 duration-500 shadow-2xl">
          <div className="mx-auto w-24 h-24 bg-cyan-500/10 rounded-3xl flex items-center justify-center mb-8 border border-cyan-500/20">
            <CheckCircle2 className="w-12 h-12 text-cyan-400" />
          </div>
          <h2 className="text-3xl font-bold mb-3 text-slate-100">¡Cita agendada!</h2>
          <p className="text-slate-400 mb-10 font-medium">
            Confirmación enviada a <span className="text-cyan-400">{email}</span>. Te esperamos el {new Date(selectedDate).toLocaleDateString()} a las {selectedTime}.
          </p>
          <Button fullWidth onClick={onClose} size="lg">Entendido</Button>
        </div>
      </div>
    );
  }

  const isFormValid = selectedTime && name.trim().length > 2 && email.includes('@') && phone.trim().length > 8;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      <div className="bg-slate-900 w-full max-w-xl rounded-[2.5rem] overflow-hidden border border-slate-800 shadow-[0_0_50px_rgba(6,182,212,0.15)] animate-in fade-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <div>
            <h2 className="text-2xl font-bold text-slate-100 font-['Playfair_Display']">Reserva de Turno</h2>
            <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest mt-1">{service.name}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-xl transition-colors border border-slate-800">
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar">
          <div className="space-y-5">
            <h3 className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em]">Identificación del Cliente</h3>
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input type="text" placeholder="Nombre completo" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm" />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input type="tel" placeholder="Teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm" />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1 space-y-3">
                <label className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] flex items-center gap-2"><CalendarIcon className="w-3.5 h-3.5" /> Selección de Día</label>
                <input type="date" min={new Date().toISOString().split('T')[0]} value={selectedDate} onChange={(e) => { setSelectedDate(e.target.value); setSelectedTime(null); }} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-bold" />
              </div>
              <div className="flex-1 space-y-3">
                 <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col justify-center h-full">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Inversión</span>
                    <span className="text-2xl font-bold text-cyan-400">{service.price}€ <span className="text-xs text-slate-600">IVA incl.</span></span>
                 </div>
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> Franjas Disponibles</label>
              
              {isClosed ? (
                <div className="flex items-center gap-3 p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-500">
                  <AlertCircle className="w-6 h-6" />
                  <div>
                    <p className="font-bold text-sm">Salón Cerrado</p>
                    <p className="text-xs opacity-80">No atendemos este día. Por favor, selecciona otra fecha.</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {slots.map((slot) => (
                    <button
                      key={slot.time}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`py-3 rounded-xl text-xs font-bold transition-all border ${!slot.available ? 'bg-slate-950 border-slate-900 text-slate-800 cursor-not-allowed' : selectedTime === slot.time ? 'bg-cyan-500 border-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-cyan-500/50'}`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="p-8 bg-slate-900/50 border-t border-slate-800 shrink-0">
          <Button fullWidth disabled={!isFormValid || isClosed} onClick={handleBooking} size="lg">Confirmar Turno Premium</Button>
          <p className="mt-4 text-center text-[9px] text-slate-500 font-bold uppercase tracking-widest italic">Notificación instantánea vía SMS y WhatsApp</p>
        </div>
      </div>
    </div>
  );
};
