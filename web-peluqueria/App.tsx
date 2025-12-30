
import React, { useState, useEffect } from 'react';
import { User, Service, Appointment, AuthorizedAdmin, GalleryItem, BusinessHours, BrandConfig, Testimonial } from './types';
import { INITIAL_SERVICES, GALLERY_ITEMS, BUSINESS_HOURS } from './constants';
import { ServiceCard } from './components/ServiceCard';
import { BookingModal } from './components/BookingModal';
import { StyleConsultant } from './components/StyleConsultant';
import { AdminPanel } from './components/AdminPanel';
import { AdminAuth } from './components/AdminAuth';
import { Button } from './components/Button';
import { 
  Scissors, 
  ShieldCheck, 
  MapPin, 
  Instagram, 
  Facebook, 
  Phone, 
  Clock, 
  Menu, 
  X,
  ChevronRight,
  Sparkles,
  MessageCircle,
  LogOut,
  Calendar,
  Star,
  Image as ImageIcon,
  ExternalLink,
  Twitter,
  Quote
} from 'lucide-react';

const MASTER_ADMIN_EMAIL = 'soni.gb.2o@hotmail.com';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(GALLERY_ITEMS);
  const [businessHours, setBusinessHours] = useState<BusinessHours>(BUSINESS_HOURS);
  const [brandConfig, setBrandConfig] = useState<BrandConfig>({ 
    salonName: 'MAR TOME ESTILISTA',
    address: 'Barrio de Salamanca, Madrid',
    whatsapp: '34600000000',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12148.681126744047!2d-3.691765103429381!3d40.42163901416962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422887228a45e7%3A0xb09232924401c905!2sPuerta%20de%20Alcal%C3%A1!5e0!3m2!1ses!2ses!4v1625000000000!5m2!1ses!2ses',
    heroTitle: 'Domina Tu Imagen',
    heroSubtitle: 'Estética Premium',
    heroDescription: 'Artesanía capilar de vanguardia. Experimenta un servicio curado bajo tonos de sofisticación.',
    aboutTitle: 'Artesanía y Estilo',
    aboutText: 'En MarTome Estilista, no solo cortamos el cabello; esculpimos identidades. Con años de experiencia en el sector del lujo, nuestro equipo combina técnicas clásicas con tendencias globales para ofrecerte una experiencia transformadora.',
    servicesTitle: 'Catálogo de Servicios',
    aiTitle: 'IA Style Advisor',
    aiDescription: 'Nuestra inteligencia artificial analiza tu descripción o tu estructura ósea para recomendarte el corte que definirá tu presencia.',
    galleryTitle: 'Inspiración Digital',
    footerDescription: 'Liderando la vanguardia estética en Madrid.',
    instagramUrl: '#',
    facebookUrl: '#',
    tiktokUrl: '#',
    testimonials: [
      { id: '1', author: 'Elena R.', content: 'El mejor trato que he recibido nunca. Mar entendió exactamente lo que buscaba.', rating: 5 },
      { id: '2', author: 'Javier M.', content: 'Ambiente exclusivo y profesionalidad absoluta. Volveré sin duda.', rating: 5 }
    ]
  });
  const [authorizedAdmins, setAuthorizedAdmins] = useState<AuthorizedAdmin[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [view, setView] = useState<'home' | 'admin'>('home');

  useEffect(() => {
    const savedAppointments = localStorage.getItem('luxury_salon_appointments');
    if (savedAppointments) setAppointments(JSON.parse(savedAppointments));

    const savedServices = localStorage.getItem('luxury_salon_services');
    if (savedServices) setServices(JSON.parse(savedServices));

    const savedGallery = localStorage.getItem('martome_gallery');
    if (savedGallery) setGalleryItems(JSON.parse(savedGallery));

    const savedHours = localStorage.getItem('martome_hours');
    if (savedHours) setBusinessHours(JSON.parse(savedHours));

    const savedBrand = localStorage.getItem('martome_brand');
    if (savedBrand) setBrandConfig(prev => ({ ...prev, ...JSON.parse(savedBrand) }));

    const savedAdmins = localStorage.getItem('martome_authorized_admins');
    let adminsList: AuthorizedAdmin[] = [];
    if (savedAdmins) adminsList = JSON.parse(savedAdmins);

    const isMasterAuthorized = adminsList.some(admin => admin.email.toLowerCase() === MASTER_ADMIN_EMAIL.toLowerCase());
    if (!isMasterAuthorized) {
      adminsList.push({ email: MASTER_ADMIN_EMAIL, addedAt: new Date().toISOString() });
      localStorage.setItem('martome_authorized_admins', JSON.stringify(adminsList));
    }
    setAuthorizedAdmins(adminsList);

    const savedUser = localStorage.getItem('martome_current_user');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
  }, []);

  const handleUpdateBrand = (newConfig: BrandConfig) => {
    setBrandConfig(newConfig);
    localStorage.setItem('martome_brand', JSON.stringify(newConfig));
  };

  const navigateToSection = (sectionId: string) => {
    if (view !== 'home') setView('home');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    setIsMobileMenuOpen(false);
  };

  const handleBookingConfirm = (date: string, time: string, contactInfo: { name: string; email: string; phone: string }) => {
    if (!selectedService) return;
    const newAppointment: Appointment = {
      id: Math.random().toString(36).substring(2, 11),
      userId: 'guest',
      userName: contactInfo.name,
      userEmail: contactInfo.email,
      userPhone: contactInfo.phone,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      date,
      time,
      status: 'pending',
      price: selectedService.price
    };
    const updated = [newAppointment, ...appointments];
    setAppointments(updated);
    localStorage.setItem('luxury_salon_appointments', JSON.stringify(updated));
    const message = `¡Nueva Cita Web! ✂️\n\nCliente: ${contactInfo.name}\nServicio: ${selectedService.name}\nFecha: ${date}\nHora: ${time}`;
    window.open(`https://wa.me/${brandConfig.whatsapp?.replace(/\+/g, '') || '34600000000'}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const LogoComponent = ({ className = "h-16" }: { className?: string }) => (
    <div className={`${className} flex items-center`}>
      {brandConfig.logo ? (
        <img src={brandConfig.logo} alt={brandConfig.salonName} className="h-full w-auto object-contain" />
      ) : (
        <div className="flex items-center gap-2">
          <div className="bg-cyan-500 p-2 rounded-xl text-slate-950"><Scissors className="w-6 h-6" /></div>
          <span className="text-xl font-bold tracking-tighter text-slate-100 font-display">
            {brandConfig.salonName.split(' ')[0]}<span className="text-cyan-400">{brandConfig.salonName.split(' ').slice(1).join(' ') || ''}</span>
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 relative overflow-x-hidden pb-20 md:pb-0">
      {brandConfig.logo && <img src={brandConfig.logo} alt="fondo" className="bg-brand-logo" />}

      {/* Floating Action Button (Mobile Only) */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <button 
          onClick={() => navigateToSection('services')}
          className="bg-cyan-500 text-slate-950 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center animate-bounce shadow-cyan-500/40"
        >
          <Calendar className="w-8 h-8" />
        </button>
      </div>

      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-900/50">
        <div className="container mx-auto px-4 h-24 flex items-center justify-between">
          <div className="cursor-pointer" onClick={() => setView('home')}>
            <LogoComponent className="h-20" />
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => navigateToSection('about')} className="text-slate-400 hover:text-cyan-400 font-bold text-xs uppercase tracking-widest transition-colors">Nosotros</button>
            <button onClick={() => navigateToSection('services')} className="text-slate-400 hover:text-cyan-400 font-bold text-xs uppercase tracking-widest transition-colors">Servicios</button>
            <button onClick={() => navigateToSection('consultant')} className="text-slate-400 hover:text-cyan-400 font-bold text-xs uppercase tracking-widest transition-colors">IA Style</button>
            <button onClick={() => navigateToSection('location')} className="text-slate-400 hover:text-cyan-400 font-bold text-xs uppercase tracking-widest transition-colors">Contacto</button>
            <Button variant={view === 'admin' ? 'primary' : 'ghost'} size="sm" onClick={() => setView(view === 'admin' ? 'home' : 'admin')} className="gap-2 ml-4">
              {view === 'admin' ? <><LogOut className="w-4 h-4" /> Salir</> : <><ShieldCheck className="w-4 h-4 text-cyan-400" /> Admin</>}
            </Button>
          </nav>
          <button className="md:hidden text-slate-100" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </header>

      <main className="flex-grow">
        {view === 'admin' ? (
          <div className="container mx-auto px-4 py-12">
            {currentUser?.role === 'admin' ? (
              <AdminPanel 
                appointments={appointments} services={services} galleryItems={galleryItems} businessHours={businessHours}
                brandConfig={brandConfig} authorizedAdmins={authorizedAdmins} currentUser={currentUser}
                onUpdateStatus={(id, status) => {
                  const updated = appointments.map(a => a.id === id ? { ...a, status } : a);
                  setAppointments(updated); localStorage.setItem('luxury_salon_appointments', JSON.stringify(updated));
                }}
                onAddService={s => { const updated = [...services, {...s, id: Math.random().toString()}]; setServices(updated); localStorage.setItem('luxury_salon_services', JSON.stringify(updated)); }}
                onUpdateService={(id, d) => { const updated = services.map(s => s.id === id ? { ...s, ...d } : s); setServices(updated); localStorage.setItem('luxury_salon_services', JSON.stringify(updated)); }}
                onDeleteService={id => { const updated = services.filter(s => s.id !== id); setServices(updated); localStorage.setItem('luxury_salon_services', JSON.stringify(updated)); }}
                onAddGalleryItem={i => { const updated = [...galleryItems, {...i, id: Math.random().toString()}]; setGalleryItems(updated); localStorage.setItem('martome_gallery', JSON.stringify(updated)); }}
                onDeleteGalleryItem={id => { const updated = galleryItems.filter(i => i.id !== id); setGalleryItems(updated); localStorage.setItem('martome_gallery', JSON.stringify(updated)); }}
                onUpdateHours={h => { setBusinessHours(h); localStorage.setItem('martome_hours', JSON.stringify(h)); }}
                onUpdateBrand={handleUpdateBrand}
                onAddAdmin={e => { const updated = [...authorizedAdmins, { email: e.toLowerCase(), addedAt: new Date().toISOString() }]; setAuthorizedAdmins(updated); localStorage.setItem('martome_authorized_admins', JSON.stringify(updated)); }}
                onRemoveAdmin={e => { const updated = authorizedAdmins.filter(a => a.email !== e); setAuthorizedAdmins(updated); localStorage.setItem('martome_authorized_admins', JSON.stringify(updated)); }}
              />
            ) : <AdminAuth onLogin={(e, n) => { 
              // Fix: Explicitly type 'u' as 'User' to ensure the 'role' property is correctly constrained to 'Role' type.
              const u: User = { id: 'admin', email: e, name: n, phone: '', role: 'admin' }; 
              setCurrentUser(u); 
              localStorage.setItem('martome_current_user', JSON.stringify(u)); 
            }} authorizedEmails={authorizedAdmins.map(a => a.email)} />}
          </div>
        ) : (
          <>
            <section className="relative py-20 lg:py-32 overflow-hidden">
              <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest">
                    <Sparkles className="w-4 h-4" /> {brandConfig.heroSubtitle}
                  </div>
                  <h1 className="text-6xl lg:text-8xl font-bold leading-none text-slate-100 font-display">
                    {brandConfig.heroTitle?.split(' ').slice(0, -1).join(' ')} <span className="text-cyan-400 italic">{brandConfig.heroTitle?.split(' ').slice(-1)}</span>
                  </h1>
                  <p className="text-xl text-slate-400 max-w-lg leading-relaxed">{brandConfig.heroDescription}</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" onClick={() => navigateToSection('services')}>Reservar Ahora</Button>
                    <Button variant="outline" size="lg" onClick={() => navigateToSection('consultant')}>IA Consultant</Button>
                  </div>
                </div>
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-slate-800 shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                </div>
              </div>
            </section>

            <section id="about" className="py-24 border-y border-slate-900/50">
              <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
                <div className="order-2 md:order-1 relative">
                  <div className="absolute -inset-4 bg-cyan-500/10 blur-3xl rounded-full" />
                  <img src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=800" className="rounded-[3rem] border border-slate-800 shadow-2xl relative" />
                </div>
                <div className="order-1 md:order-2 space-y-6">
                  <h2 className="text-4xl lg:text-5xl font-bold font-display">{brandConfig.aboutTitle}</h2>
                  <p className="text-slate-400 text-lg leading-relaxed">{brandConfig.aboutText}</p>
                  <div className="flex gap-4">
                    {brandConfig.instagramUrl && <a href={brandConfig.instagramUrl} className="p-3 bg-slate-900 rounded-xl text-slate-400 hover:text-cyan-400 border border-slate-800"><Instagram className="w-6 h-6" /></a>}
                    {brandConfig.facebookUrl && <a href={brandConfig.facebookUrl} className="p-3 bg-slate-900 rounded-xl text-slate-400 hover:text-cyan-400 border border-slate-800"><Facebook className="w-6 h-6" /></a>}
                    {brandConfig.tiktokUrl && <a href={brandConfig.tiktokUrl} className="p-3 bg-slate-900 rounded-xl text-slate-400 hover:text-cyan-400 border border-slate-800"><Twitter className="w-6 h-6" /></a>}
                  </div>
                </div>
              </div>
            </section>
            
            <section id="services" className="py-24 bg-slate-900/40">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl lg:text-5xl font-bold mb-16">{brandConfig.servicesTitle}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {services.map(service => <ServiceCard key={service.id} service={service} onBook={s => setSelectedService(s)} />)}
                </div>
              </div>
            </section>

            <section id="testimonials" className="py-24">
              <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16 font-display">Experiencias Reales</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {brandConfig.testimonials?.map(t => (
                    <div key={t.id} className="bg-slate-900/50 p-10 rounded-[2.5rem] border border-slate-800 relative">
                      <Quote className="absolute top-6 right-8 w-10 h-10 text-cyan-500/10" />
                      <div className="flex gap-1 mb-4">
                        {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-cyan-400 text-cyan-400" />)}
                      </div>
                      <p className="text-slate-300 italic mb-6">"{t.content}"</p>
                      <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs">— {t.author}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="consultant" className="py-24 bg-slate-900/40">
              <div className="container mx-auto px-4 max-w-4xl">
                <StyleConsultant title={brandConfig.aiTitle} description={brandConfig.aiDescription} />
              </div>
            </section>

            <section id="gallery" className="py-24 overflow-hidden">
              <div className="container mx-auto px-4">
                <h2 className="text-4xl lg:text-5xl font-bold mb-16 text-center">{brandConfig.galleryTitle}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {galleryItems.map(item => (
                    <div key={item.id} className="group relative aspect-square rounded-2xl overflow-hidden border border-slate-800">
                      <img src={item.imageUrl} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="location" className="py-24">
              <div className="container mx-auto px-4">
                <div className="bg-slate-900 rounded-[3rem] overflow-hidden border border-slate-800 flex flex-col lg:flex-row shadow-2xl">
                  <div className="lg:w-1/2 p-12 lg:p-20 space-y-10">
                    <h2 className="text-4xl font-bold font-display">Contacto</h2>
                    <p className="text-slate-400">{brandConfig.address}</p>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 text-cyan-400"><Clock className="w-6 h-6" /></div>
                      <div><h4 className="font-bold text-lg text-slate-200">Horarios</h4><p className="text-slate-400">Lun - Sáb: {businessHours[1]?.open} - {businessHours[1]?.close}</p></div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button variant="outline" className="gap-2 flex-1" onClick={() => window.open(`https://wa.me/${brandConfig.whatsapp?.replace(/\+/g, '')}`, '_blank')}><MessageCircle className="w-5 h-5" /> WhatsApp</Button>
                      <Button variant="secondary" className="gap-2 flex-1" onClick={() => window.open(brandConfig.mapUrl?.replace('/embed', ''), '_blank')}><ExternalLink className="w-5 h-5" /> Google Maps</Button>
                    </div>
                  </div>
                  <div className="lg:w-1/2 h-[400px] lg:h-auto bg-slate-800">
                    <iframe src={brandConfig.mapUrl} width="100%" height="100%" style={{ border: 0 }} loading="lazy" className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700"></iframe>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="bg-slate-950 border-t border-slate-900/30 py-20">
        <div className="container mx-auto px-4 text-center">
          <LogoComponent className="h-28 mb-4 mx-auto" />
          <p className="text-slate-500 mb-8 max-w-md mx-auto">{brandConfig.footerDescription}</p>
          <div className="flex justify-center gap-6 mb-12">
            <Instagram className="w-5 h-5 text-slate-700 hover:text-cyan-500 cursor-pointer" />
            <Facebook className="w-5 h-5 text-slate-700 hover:text-cyan-500 cursor-pointer" />
            <Twitter className="w-5 h-5 text-slate-700 hover:text-cyan-500 cursor-pointer" />
          </div>
          <p className="text-slate-800 text-[10px] font-black uppercase tracking-[0.3em]">&copy; 2024 {brandConfig.salonName} • Luxury Care Group</p>
        </div>
      </footer>

      {selectedService && <BookingModal service={selectedService} onClose={() => setSelectedService(null)} onConfirm={handleBookingConfirm} businessHours={businessHours} />}
    </div>
  );
};

export default App;
