
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Appointment, Service, AuthorizedAdmin, GalleryItem, BusinessHours, BrandConfig, User, DaySchedule } from '../types';
import { Button } from './Button';
import { 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Plus, 
  Trash2, 
  Edit3, 
  Tag,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  ShieldCheck,
  CalendarCheck,
  Image as ImageIcon,
  Settings,
  Camera,
  Upload,
  Palette,
  TrendingUp,
  Activity,
  Briefcase,
  Lock,
  Unlock,
  MapPin,
  MessageCircle,
  ExternalLink,
  Info,
  Power,
  Type,
  Share2,
  FileText
} from 'lucide-react';

const MASTER_ADMIN_EMAIL = 'soni.gb.2o@hotmail.com';
const DAY_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

interface AdminPanelProps {
  appointments: Appointment[];
  services: Service[];
  galleryItems: GalleryItem[];
  businessHours: BusinessHours;
  brandConfig: BrandConfig;
  authorizedAdmins: AuthorizedAdmin[];
  currentUser: User;
  onUpdateStatus: (id: string, status: 'confirmed' | 'cancelled') => void;
  onAddService: (service: Omit<Service, 'id'>) => void;
  onUpdateService: (id: string, service: Partial<Service>) => void;
  onDeleteService: (id: string) => void;
  onAddGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  onDeleteGalleryItem: (id: string) => void;
  onUpdateHours: (hours: BusinessHours) => void;
  onUpdateBrand: (config: BrandConfig) => void;
  onAddAdmin: (email: string) => void;
  onRemoveAdmin: (email: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  appointments, services, galleryItems, businessHours, brandConfig, authorizedAdmins, currentUser,
  onUpdateStatus, onAddService, onUpdateService, onDeleteService, onAddGalleryItem, onDeleteGalleryItem,
  onUpdateHours, onUpdateBrand, onAddAdmin, onRemoveAdmin
}) => {
  const [activeTab, setActiveTab] = useState<'calendar' | 'services' | 'gallery' | 'privileges' | 'stats' | 'settings'>('calendar');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const [isServiceFormOpen, setIsServiceFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isGalleryFormOpen, setIsGalleryFormOpen] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  
  const [brandForm, setBrandForm] = useState<BrandConfig>(brandConfig);
  const [settingsHours, setSettingsHours] = useState<BusinessHours>(businessHours);

  const isMasterAdmin = currentUser.email.toLowerCase() === MASTER_ADMIN_EMAIL.toLowerCase();

  const handleDayUpdate = (dayIndex: number, updates: Partial<DaySchedule>) => {
    setSettingsHours(prev => ({ ...prev, [dayIndex]: { ...prev[dayIndex], ...updates } }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'logo' | 'service') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      if (target === 'logo') setBrandForm(prev => ({ ...prev, logo: base64 }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-6 lg:p-10 border border-slate-800 shadow-2xl">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 mb-10">
        <div>
          <h2 className="text-4xl font-bold mb-2 font-display text-slate-100">Administración Web</h2>
          <p className="text-slate-400 font-medium">Control total de {brandConfig.salonName}</p>
        </div>
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-950 rounded-2xl border border-slate-800 overflow-x-auto">
          {[
            { id: 'calendar', label: 'Agenda', icon: <CalendarCheck className="w-4 h-4" /> },
            { id: 'services', label: 'Servicios', icon: <Tag className="w-4 h-4" /> },
            { id: 'gallery', label: 'Galería', icon: <ImageIcon className="w-4 h-4" /> },
            { id: 'settings', label: 'Ajustes Web', icon: <Settings className="w-4 h-4" /> },
            { id: 'privileges', label: 'Equipos', icon: <ShieldCheck className="w-4 h-4" /> },
            { id: 'stats', label: 'Cifras', icon: <DollarSign className="w-4 h-4" /> }
          ].map(tab => (
            <button 
              key={tab.id} onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'text-slate-500 hover:text-slate-200'}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'calendar' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <h3 className="text-xl font-bold text-slate-200 capitalize">{currentMonth.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</h3>
              <div className="flex gap-2">
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="p-2 border border-slate-800 rounded-lg text-slate-400"><ChevronLeft /></button>
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="p-2 border border-slate-800 rounded-lg text-slate-400"><ChevronRight /></button>
              </div>
            </div>
            <div className="bg-slate-950 p-6 rounded-[2rem] border border-slate-800 grid grid-cols-7 gap-2">
              {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(d => <div key={d} className="text-[10px] font-bold text-slate-600 text-center uppercase">{d}</div>)}
              {Array.from({length: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()}, (_, i) => i + 1).map(d => {
                const dateStr = `${currentMonth.getFullYear()}-${(currentMonth.getMonth() + 1).toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
                return (
                  <button key={d} onClick={() => setSelectedDate(dateStr)} className={`aspect-square rounded-xl flex items-center justify-center font-bold ${selectedDate === dateStr ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-400'}`}>{d}</button>
                );
              })}
            </div>
          </div>
          <div className="lg:col-span-5 bg-slate-950 p-6 rounded-[2rem] border border-slate-800">
            <h3 className="text-xl font-bold mb-6">Citas: {selectedDate}</h3>
            <div className="space-y-4">
              {appointments.filter(a => a.date === selectedDate).map(app => (
                <div key={app.id} className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-slate-200">{app.userName} — {app.time}</div>
                    <div className="text-[10px] text-cyan-400 uppercase font-black">{app.serviceName}</div>
                  </div>
                  {app.status === 'pending' && <button onClick={() => onUpdateStatus(app.id, 'confirmed')} className="text-[10px] bg-cyan-500 text-slate-950 px-3 py-1 rounded-lg font-black uppercase">Confirmar</button>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="animate-in fade-in space-y-12 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-10">
              <div className="bg-slate-950 p-10 rounded-[2.5rem] border border-slate-800">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3"><Palette className="text-cyan-400" /> Identidad Visual</h3>
                <div className="space-y-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nombre del Salón</label>
                    <input type="text" value={brandForm.salonName} onChange={e => setBrandForm({...brandForm, salonName: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-100" />
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center overflow-hidden">
                      {brandForm.logo ? <img src={brandForm.logo} className="w-full h-full object-contain" /> : <ImageIcon />}
                    </div>
                    <Button variant="outline" size="sm" onClick={() => document.getElementById('logo-upload')?.click()}>Cambiar Logo</Button>
                    <input id="logo-upload" type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, 'logo')} />
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-10 rounded-[2.5rem] border border-slate-800">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3"><Share2 className="text-cyan-400" /> Redes Sociales</h3>
                <div className="space-y-4">
                  <input placeholder="Instagram URL" value={brandForm.instagramUrl} onChange={e => setBrandForm({...brandForm, instagramUrl: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm" />
                  <input placeholder="Facebook URL" value={brandForm.facebookUrl} onChange={e => setBrandForm({...brandForm, facebookUrl: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm" />
                  <input placeholder="TikTok URL" value={brandForm.tiktokUrl} onChange={e => setBrandForm({...brandForm, tiktokUrl: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm" />
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-10 rounded-[2.5rem] border border-slate-800 space-y-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3"><FileText className="text-cyan-400" /> Contenidos de la Web</h3>
              <div className="space-y-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Título "Sobre Nosotros"</label>
                  <input value={brandForm.aboutTitle} onChange={e => setBrandForm({...brandForm, aboutTitle: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Historia / Biografía</label>
                  <textarea rows={4} value={brandForm.aboutText} onChange={e => setBrandForm({...brandForm, aboutText: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm resize-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Slogan Hero</label>
                  <input value={brandForm.heroTitle} onChange={e => setBrandForm({...brandForm, heroTitle: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm" />
                </div>
              </div>
              <Button fullWidth size="lg" onClick={() => onUpdateBrand(brandForm)}>Publicar Cambios Web</Button>
            </div>
          </div>
          
          <div className="bg-slate-950 p-10 rounded-[2.5rem] border border-slate-800">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3"><Clock className="text-cyan-400" /> Horarios de la Semana</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {DAY_NAMES.map((name, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-3">
                    <button onClick={() => handleDayUpdate(i, { isOpen: !settingsHours[i].isOpen })} className={`w-8 h-8 rounded-lg flex items-center justify-center ${settingsHours[i].isOpen ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-600'}`}><Power className="w-4 h-4" /></button>
                    <span className="font-bold text-sm">{name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="time" value={settingsHours[i].open} onChange={e => handleDayUpdate(i, { open: e.target.value })} className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs" />
                    <span>-</span>
                    <input type="time" value={settingsHours[i].close} onChange={e => handleDayUpdate(i, { close: e.target.value })} className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs" />
                  </div>
                </div>
              ))}
            </div>
            <Button className="mt-8" fullWidth onClick={() => onUpdateHours(settingsHours)}>Actualizar Horarios</Button>
          </div>
        </div>
      )}

      {activeTab === 'services' && (
        <div className="space-y-8 animate-in fade-in">
          <div className="flex justify-between items-center bg-slate-950 p-6 rounded-2xl border border-slate-800">
            <h3 className="text-2xl font-bold">Gestión de Servicios</h3>
            <Button size="md" onClick={() => setIsServiceFormOpen(true)} className="gap-2"><Plus className="w-5 h-5" /> Nuevo</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map(s => (
              <div key={s.id} className="bg-slate-950 p-5 rounded-[2rem] border border-slate-800 flex flex-col group">
                <div className="w-full h-32 rounded-xl overflow-hidden mb-4"><img src={s.imageUrl} className="w-full h-full object-cover" /></div>
                <h4 className="font-bold mb-1">{s.name}</h4>
                <div className="text-cyan-400 font-bold mb-4">{s.price}€</div>
                <div className="flex justify-end gap-2"><button onClick={() => onDeleteService(s.id)} className="p-2 text-slate-600 hover:text-red-500"><Trash2 className="w-4 h-4" /></button></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
