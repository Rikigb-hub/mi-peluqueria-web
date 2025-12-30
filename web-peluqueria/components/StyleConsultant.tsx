
import React, { useState, useRef } from 'react';
import { Button } from './Button';
import { getStyleRecommendation, analyzeFaceShape } from '../services/geminiService';
import { Sparkles, Camera, Send, Loader2, User } from 'lucide-react';

interface StyleConsultantProps {
  title?: string;
  description?: string;
}

export const StyleConsultant: React.FC<StyleConsultantProps> = ({ 
  title = "IA Style Advisor", 
  description = "Nuestra inteligencia artificial analiza tu descripción o tu estructura ósea para recomendarte el corte que definirá tu presencia."
}) => {
  const [input, setInput] = useState('');
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analyzingImage, setAnalyzingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAsk = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const result = await getStyleRecommendation(input);
    setRecommendation(result || "Error al obtener recomendación");
    setLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAnalyzingImage(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1];
      const result = await analyzeFaceShape(base64);
      setRecommendation(result || "Error al analizar la imagen");
      setAnalyzingImage(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-slate-900 rounded-[2.5rem] border border-slate-800 overflow-hidden shadow-2xl">
      <div className="bg-gradient-to-r from-cyan-600 to-sky-600 p-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-950/20 rounded-2xl backdrop-blur-md">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white font-['Playfair_Display'] tracking-tight">{title}</h2>
            <p className="text-cyan-100/80 text-xs font-bold uppercase tracking-widest">Powered by Gemini 3 Flash</p>
          </div>
        </div>
      </div>
      
      <div className="p-8 md:p-12">
        <div className="mb-10">
          <p className="text-slate-400 mb-8 font-medium leading-relaxed">
            {description}
          </p>
          
          <div className="flex flex-col gap-6">
            <div className="relative group">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe tu estilo, tipo de cabello o eventos próximos..."
                className="w-full bg-slate-950 border border-slate-800 rounded-3xl p-6 pr-14 text-slate-100 placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 min-h-[140px] resize-none transition-all group-hover:border-slate-700"
              />
              <button 
                onClick={handleAsk}
                disabled={loading || !input.trim()}
                className="absolute bottom-6 right-6 p-3 bg-cyan-500 text-slate-950 rounded-2xl hover:bg-cyan-400 disabled:opacity-30 transition-all shadow-lg shadow-cyan-500/20"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
              </button>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="h-px flex-1 bg-slate-800" />
              <span className="text-slate-700 text-[10px] font-black uppercase tracking-widest">Digital Vision</span>
              <div className="h-px flex-1 bg-slate-800" />
            </div>

            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleImageUpload}
            />
            
            <Button 
              variant="outline" 
              fullWidth 
              onClick={() => fileInputRef.current?.click()}
              disabled={analyzingImage}
              className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 h-14"
            >
              {analyzingImage ? (
                <><Loader2 className="w-5 h-5 mr-3 animate-spin" /> Escaneando rostro...</>
              ) : (
                <><Camera className="w-5 h-5 mr-3" /> Subir Selfie para Análisis</>
              )}
            </Button>
          </div>
        </div>

        {recommendation && (
          <div className="bg-slate-950 rounded-[2rem] p-8 border border-cyan-500/20 animate-in fade-in slide-in-from-bottom-6 duration-700 shadow-xl">
            <div className="flex items-start gap-6">
              <div className="bg-cyan-500 p-3 rounded-2xl text-slate-950 shadow-lg shadow-cyan-500/40 shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-4">
                <h4 className="text-cyan-400 font-black tracking-widest uppercase text-xs">Propuesta del Consultor</h4>
                <div className="text-slate-200 leading-relaxed whitespace-pre-wrap text-xl font-['Inter']">
                  {recommendation}
                </div>
                <div className="flex gap-4 mt-6">
                  <Button size="sm" variant="secondary" onClick={() => { setRecommendation(null); setInput(''); }}>
                    Limpiar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
