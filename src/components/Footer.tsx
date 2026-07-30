import React from 'react';
import { Server, Youtube, Linkedin, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Server size={20}/>
          </div>
          <span className="font-extrabold text-white text-lg tracking-tight">
            Riverita<span className="text-purple-400">Tech</span>
          </span>
        </div>

        <div className="flex gap-6 text-xs font-mono font-bold">
          <a href="https://www.youtube.com/@RiveritaTech" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors flex items-center gap-1.5">
            <Youtube size={14} /> YouTube
          </a>
          <a href="https://www.linkedin.com/in/diego-fernando-rivera-lopez-392186133" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors flex items-center gap-1.5">
            <Linkedin size={14} /> LinkedIn
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors flex items-center gap-1.5">
            <Twitter size={14} /> Twitter
          </a>
        </div>

        <div className="text-xs font-mono text-slate-400">
          © 2026 Creado para la comunidad VMware & Broadcom Enterprise.
        </div>

      </div>
    </footer>
  );
};
