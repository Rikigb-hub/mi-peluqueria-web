
import React, { useState } from 'react';
import { Button } from './Button';
import { Lock, Mail, User as UserIcon, ShieldAlert } from 'lucide-react';

interface AdminAuthProps {
  onLogin: (email: string, name: string) => void;
  authorizedEmails: string[];
}

export const AdminAuth: React.FC<AdminAuthProps> = ({ onLogin, authorizedEmails }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!authorizedEmails.map(e => e.toLowerCase()).includes(email.toLowerCase())) {
      setError('Acceso denegado. Contacta con soni.gb.2o@hotmail.com para autorizar tu correo.');
      return;
    }

    onLogin(email, name || 'Administrador');
  };

  return (
    <div className="max-w-md mx-auto bg-slate-900 p-8 rounded-[2rem] border border-slate-800 shadow-2xl animate-in fade-in zoom-in duration-300">
      <div className="text-center mb-8">
        <div className="inline-flex p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 mb-4">
          <Lock className="w-8 h-8 text-cyan-400" />
        </div>
        <h2 className="text-3xl font-bold font-['Playfair_Display'] text-slate-100">Acceso Privado</h2>
        <p className="text-slate-400 mt-2 font-medium">Panel de gestión MarTome Estilista</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div className="relative">
            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>
        )}
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        {error && (
          <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold uppercase leading-tight">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <Button fullWidth size="lg" type="submit">
          {isLogin ? 'Entrar al Panel' : 'Solicitar Acceso'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-xs font-bold text-slate-500 hover:text-cyan-400 uppercase tracking-widest transition-colors"
        >
          {isLogin ? '¿Solicitar acceso? Infórmate' : '¿Ya tienes acceso? Entra'}
        </button>
      </div>

      {!isLogin && (
        <p className="mt-4 text-[10px] text-slate-600 text-center font-bold uppercase tracking-wider">
          Envía tu solicitud a:<br/>
          <a href="mailto:soni.gb.2o@hotmail.com" className="text-cyan-500 hover:underline">soni.gb.2o@hotmail.com</a>
        </p>
      )}
    </div>
  );
};
