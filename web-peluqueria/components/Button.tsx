
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl uppercase tracking-wider text-xs';
  
  const variants = {
    primary: 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 focus:ring-cyan-500 shadow-lg shadow-cyan-500/30 active:scale-95',
    secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700 focus:ring-slate-500',
    outline: 'border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 focus:ring-cyan-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-lg shadow-red-500/20',
    ghost: 'text-slate-400 hover:text-slate-100 hover:bg-slate-800 focus:ring-slate-500'
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-10 py-4 text-base'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
