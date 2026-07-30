import React from 'react';

export const BroadcomVCFLogo: React.FC = () => {
  return (
    <div className="flex items-center space-x-3 cursor-pointer group">
      {/* EXECUTIVITY ISOTYPE MONOGRAM */}
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#CC092F] to-[#00C288] rounded-2xl blur-md opacity-30 group-hover:opacity-100 transition duration-500" />
        
        <div className="relative bg-slate-950 p-2 rounded-2xl border border-white/10 flex items-center justify-center shadow-2xl overflow-hidden">
          <svg className="w-7 h-7" viewBox="0 0 100 100" fill="none">
            {/* Broadcom Crimson Red Background Disc */}
            <circle cx="50" cy="50" r="48" fill="#CC092F" />
            
            {/* Broadcom Signature White Wave Peak */}
            <path
              d="M 12,65 C 28,65 38,72 50,28 C 62,72 72,65 88,65"
              stroke="#FFFFFF"
              strokeWidth="11"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* VMware VCF Green Cloud Arc Overlay */}
            <circle cx="82" cy="22" r="14" fill="#00C288" className="animate-pulse" />
            <path
              d="M 76,22 L 88,22 M 82,16 L 82,28"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* CLEAN LOGO TYPOGRAPHY */}
      <div className="flex flex-col">
        <span className="text-2xl font-black tracking-tight text-white leading-none">
          RIVERITA<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400">TECH</span>
        </span>
      </div>
    </div>
  );
};
