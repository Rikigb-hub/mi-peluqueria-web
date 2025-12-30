
import React from 'react';
import { Service } from '../types';
import { Button } from './Button';
import { Clock, DollarSign } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  onBook: (service: Service) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBook }) => {
  return (
    <div className="group relative bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800 hover:border-cyan-500/40 transition-all duration-500 shadow-xl">
      <div className="h-52 w-full overflow-hidden relative">
        <img 
          src={service.imageUrl} 
          alt={service.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
        <div className="absolute top-4 right-4 bg-cyan-500/90 backdrop-blur-md text-slate-950 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
          {service.category}
        </div>
      </div>
      
      <div className="p-7">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors font-['Playfair_Display']">
            {service.name}
          </h3>
        </div>
        
        <p className="text-slate-500 text-xs font-medium mb-8 line-clamp-2 leading-relaxed uppercase tracking-wider">
          {service.description}
        </p>
        
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-800/50">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{service.durationMinutes} minutos</span>
          </div>
          <div className="text-2xl font-bold text-slate-100 tracking-tighter">
            {service.price}<span className="text-cyan-400 ml-0.5 font-normal">€</span>
          </div>
        </div>
        
        <Button fullWidth onClick={() => onBook(service)} variant="outline">
          Reservar
        </Button>
      </div>
    </div>
  );
};
