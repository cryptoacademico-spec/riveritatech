import React from 'react';
import { BroadcomVCFLogo } from './BroadcomVCFLogo';
import { Menu, X, LogOut, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setPage: (page: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onOpenAuth: () => void;
  user: { name: string; email: string } | null;
  onLogout: () => void;
  vibrateOffset?: { x: number; y: number };
  isHolding?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setPage,
  mobileMenuOpen,
  setMobileMenuOpen,
  onOpenAuth,
  user,
  onLogout,
  vibrateOffset = { x: 0, y: 0 },
  isHolding = false,
}) => {
  return (
    <nav 
      style={{
        transform: `perspective(600px) translate3d(${vibrateOffset.x}px, ${vibrateOffset.y}px, 0px) rotateX(0deg)`,
        transition: isHolding ? 'none' : 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
      className="fixed w-full z-50 top-0 start-0 border-b border-white/10 bg-slate-950/85 backdrop-blur-2xl"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4 px-6">
        
        {/* LOGO CORPORATIVO EXECUTIVE (RIVERITA TECH) */}
        <div onClick={() => setPage('home')}>
          <BroadcomVCFLogo />
        </div>

        {/* RIGHT ACTION BUTTONS */}
        <div className="flex md:order-2 space-x-3 items-center">
          {user ? (
            <div className="flex items-center gap-3 bg-slate-900/90 border border-white/10 px-4 py-1.5 rounded-full shadow-lg">
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-600 to-emerald-500 flex items-center justify-center font-bold text-xs text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs font-mono font-bold text-white hidden sm:inline">{user.name}</span>
              <button 
                onClick={onLogout}
                title="Cerrar Sesión"
                className="text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none cursor-pointer"
            >
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#CC092F_0%,#00C288_50%,#CC092F_100%)]" />
              <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-slate-950 px-5 py-1 text-xs font-bold text-white backdrop-blur-3xl hover:bg-slate-900 transition-colors gap-2">
                <ShieldCheck size={15} className="text-emerald-400" /> Comunidad VCF
              </span>
            </button>
          )}

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden text-white hover:bg-white/10 rounded-xl p-2 transition-colors"
          >
            {mobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
          </button>
        </div>

        {/* CENTER NAVIGATION LINKS */}
        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${mobileMenuOpen ? 'block mt-4' : 'hidden'}`}>
          <ul className="flex flex-col p-4 md:p-0 font-medium border border-white/10 rounded-2xl bg-slate-900/90 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            {[
              { id: 'home', label: 'Inicio' },
              { id: 'labs', label: 'Laboratorios VMware' },
              { id: 'scripts', label: 'PowerCLI Scripts' },
              { id: 'tutorials', label: 'Academia' },
              { id: 'about', label: 'Sobre Mí (Riverita)' }
            ].map((link) => (
              <li key={link.id}>
                <button 
                  onClick={() => { setPage(link.id); setMobileMenuOpen(false); }}
                  className={`block py-2 px-4 md:p-0 rounded-lg text-sm transition-all text-left w-full cursor-pointer ${
                    currentPage === link.id 
                      ? 'text-emerald-400 font-bold drop-shadow-[0_0_10px_rgba(16,185,129,0.6)]' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </nav>
  );
};
