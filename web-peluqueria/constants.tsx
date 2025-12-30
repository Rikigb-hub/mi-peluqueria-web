
import { Service, GalleryItem, BusinessHours } from './types';

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'peinado',
    name: 'Peinado',
    description: 'Estilismo y peinado personalizado para cualquier ocasión, desde looks diarios hasta eventos.',
    price: 14,
    durationMinutes: 30,
    imageUrl: 'https://images.unsplash.com/photo-1560869713-7d0a29430863?auto=format&fit=crop&q=80&w=400',
    category: 'hair'
  },
  {
    id: 'tinte',
    name: 'Tinte',
    description: 'Coloración profesional con productos de alta calidad para un brillo y cobertura total.',
    price: 24,
    durationMinutes: 60,
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=400',
    category: 'other'
  },
  {
    id: 'mechas',
    name: 'Mechas',
    description: 'Técnica de iluminación capilar completa para aportar dimensión y luminosidad a tu melena.',
    price: 50,
    durationMinutes: 90,
    imageUrl: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&q=80&w=400',
    category: 'other'
  },
  {
    id: 'corte',
    name: 'Corte',
    description: 'Corte de tendencia adaptado a tus facciones, estilo personal y tipo de cabello.',
    price: 14,
    durationMinutes: 30,
    imageUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=400',
    category: 'hair'
  },
  {
    id: 'media-mechas',
    name: 'Media Cabeza Mechas',
    description: 'Iluminación parcial estratégica para un aspecto natural y refrescante.',
    price: 25,
    durationMinutes: 60,
    imageUrl: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=400',
    category: 'other'
  },
  {
    id: 'matiz',
    name: 'Matiz',
    description: 'Ajuste de tono para perfeccionar el color y eliminar reflejos no deseados entre servicios.',
    price: 20,
    durationMinutes: 30,
    imageUrl: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=400',
    category: 'other'
  },
  {
    id: 'recogido',
    name: 'Recogido',
    description: 'Peinado elaborado ideal para bodas, galas y celebraciones especiales de alto impacto.',
    price: 40,
    durationMinutes: 60,
    imageUrl: 'https://images.unsplash.com/photo-1519415510271-4197a7d26441?auto=format&fit=crop&q=80&w=400',
    category: 'hair'
  },
  {
    id: 'semirrecogido',
    name: 'Semirrecogido',
    description: 'Equilibrio perfecto entre elegancia y naturalidad para un look sofisticado pero relajado.',
    price: 20,
    durationMinutes: 45,
    imageUrl: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&q=80&w=400',
    category: 'hair'
  },
  {
    id: 'alisado-organico',
    name: 'Alisado Orgánico',
    description: 'Tratamiento alisador de larga duración sin químicos agresivos. Cabello liso, sano y brillante.',
    price: 140,
    durationMinutes: 180,
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13df7727c6?auto=format&fit=crop&q=80&w=400',
    category: 'other'
  },
  {
    id: 'tratamiento',
    name: 'Tratamiento',
    description: 'Cuidado intensivo de hidratación o reparación personalizado según las necesidades de tu cabello.',
    price: 25,
    durationMinutes: 30,
    imageUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=400',
    category: 'other'
  },
  {
    id: 'decoloracion',
    name: 'Decoloración Completa',
    description: 'Aclarado total profesional para alcanzar bases rubias platino o preparar para colores fantasía.',
    price: 50,
    durationMinutes: 120,
    imageUrl: 'https://images.unsplash.com/photo-1620331311520-246422ff82f9?auto=format&fit=crop&q=80&w=400',
    category: 'other'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: '1', imageUrl: 'https://picsum.photos/seed/style1/800/800', title: 'Degradado Ejecutivo' },
  { id: '2', imageUrl: 'https://picsum.photos/seed/style2/800/800', title: 'Textura Urbana' },
  { id: '3', imageUrl: 'https://picsum.photos/seed/style3/800/800', title: 'Tupé Clásico' },
  { id: '4', imageUrl: 'https://picsum.photos/seed/style4/800/800', title: 'Barba de Autor' },
  { id: '5', imageUrl: 'https://picsum.photos/seed/style5/800/800', title: 'Crop Moderno' },
  { id: '6', imageUrl: 'https://picsum.photos/seed/style6/800/800', title: 'Raya al Lado Vintage' },
];

export const BUSINESS_HOURS: BusinessHours = {
  1: { open: '09:00', close: '20:00', isOpen: true }, // Lunes
  2: { open: '09:00', close: '20:00', isOpen: true }, // Martes
  3: { open: '09:00', close: '20:00', isOpen: true }, // Miércoles
  4: { open: '09:00', close: '20:00', isOpen: true }, // Jueves
  5: { open: '09:00', close: '20:00', isOpen: true }, // Viernes
  6: { open: '09:00', close: '14:00', isOpen: true }, // Sábado
  0: { open: '09:00', close: '20:00', isOpen: false }, // Domingo
};
