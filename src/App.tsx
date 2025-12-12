import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Server, Database, Activity, ShieldCheck, 
  ArrowRight, Youtube, Twitter, Linkedin, Monitor, 
  Cpu, Zap, BookOpen, User, Play, ArrowRightLeft, Scale, Network, Video,
  Star, Users, CheckCircle, Terminal, Code
} from 'lucide-react';

// --- FONDO ANIMADO (Grid Estilo Tron) ---
const BackgroundGrid = () => (
  <div className="absolute inset-0 z-0 pointer-events-none">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950"></div>
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
  </div>
);

// --- NUEVO COMPONENTE: EFECTO DE CURSOR (CyberCursor) ---
const CyberCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };
    
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* 1. La "Linterna" azul de fondo */}
      <div 
        className="pointer-events-none fixed inset-0 z-[100] transition-opacity duration-300 mix-blend-screen"
        style={{
          opacity: isVisible ? 1 : 0,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`
        }}
      />
      
      {/* 2. El punto tecnológico central (Mira Láser) */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[101] w-8 h-8 rounded-full border border-blue-500/50 bg-blue-500/10 backdrop-blur-sm transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            opacity: isVisible ? 1 : 0
        }}
      >
        <div className="w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)]"></div>
      </div>
    </>
  );
};

// --- DATOS (AQUÍ PONES TUS LINKS) ---

const misLaboratorios = [
    {
      id: 1,
      titulo: "Aprende a configurar vSAN",
      // ENFOQUE: Modernidad y eliminación de hardware legado
      descripcion: "Convierte discos locales en un Datastore indestructible. Domina la HCI y dile adiós a las SAN tradicionales para siempre.",
      nivel: "Intermedio",
      etiqueta: "Más Popular",
      color: "from-blue-600 to-cyan-500",
      icono: <Database size={48} className="text-white drop-shadow-lg"/>,
      link: "https://vsan-lab.riveritatech.com" 
    },
    {
      id: 2,
      titulo: "Master en vCenter Server",
      // ENFOQUE: Control total (God Mode)
      descripcion: "El cerebro de tu Data Center. Orquesta clusters, automatiza cargas y gobierna toda tu infraestructura desde un único panel de cristal.",
      nivel: "Básico",
      etiqueta: "Core",
      color: "from-slate-600 to-gray-500", // Cambié a gris/slate porque vCenter es gestión
      icono: <Network size={48} className="text-white drop-shadow-lg"/>,
      link: "https://vcenter-lab.riveritatech.com/"
    },
    {
      id: 3,
      titulo: "vSphere High Availability (HA)",
      // ENFOQUE: Resiliencia y "Muerte" del servidor
      descripcion: "Corta los cables. Mata el servidor. Mira cómo tus VMs resucitan automáticamente en otro host. Cero pánico, 100% uptime.",
      nivel: "Básico",
      etiqueta: "Supervivencia",
      color: "from-red-600 to-rose-500", // Rojo de alerta/emergencia
      icono: <Activity size={48} className="text-white drop-shadow-lg"/>,
      link: "https://ha-lab.riveritatech.com/"
    },
    {
      id: 4,
      titulo: "vSphere DRS (Balanceo)",
      // ENFOQUE: Rendimiento y Automatización
      descripcion: "El piloto automático de tu clúster. Deja que el sistema mueva tus cargas para que ninguna VM sufra nunca por falta de CPU o RAM.",
      nivel: "Básico",
      etiqueta: "Performance",
      color: "from-orange-500 to-amber-500", // Naranja de advertencia/balanceo
      icono: <Scale size={48} className="text-white drop-shadow-lg"/>,
      link: "https://drs-lab.riveritatech.com/"
    },
    {
      id: 5,
      titulo: "vSphere vMotion Live",
      // ENFOQUE: "Magia" técnica
      descripcion: "Teletransportación en tiempo real. Mueve servidores activos entre hardware físico sin perder ni un solo ping de conexión. Magia pura.",
      nivel: "Básico",
      etiqueta: "Magia",
      color: "from-purple-600 to-indigo-500",
      icono: <ArrowRightLeft size={48} className="text-white drop-shadow-lg"/>,
      link: "https://vmotion-lab.riveritatech.com/"
    }
  ];

  const misTutoriales = [
    {
      id: 1,
      titulo: "VMWARE LABS GRATIS: Simula vMotion, DRS y HA en vSphere",
      tipo: "Video",
      duracion: "Nuevo", 
      // ID extraído de tu imagen: iFr16fXUjz4
      thumbnail: "https://img.youtube.com/vi/iFr16fXUjz4/maxresdefault.jpg", 
      link: "https://www.youtube.com/watch?v=iFr16fXUjz4"
    },
    {
      id: 2,
      titulo: "Cómo Instalar VMware ESXi 9.0.1 DESDE CERO en Workstation 2025",
      tipo: "Video",
      duracion: "Guía",
      // ID extraído de tu imagen: mSa_rtnWK3s
      thumbnail: "https://img.youtube.com/vi/mSa_rtnWK3s/maxresdefault.jpg", 
      link: "https://www.youtube.com/watch?v=mSa_rtnWK3s"
    },
    {
      id: 3,
      titulo: "Cómo Instalar VMware Workstation Pro 25H2 GRATIS",
      tipo: "Video",
      duracion: "Tutorial",
      // ID extraído de tu imagen: -9a1mGe1Q8c
      thumbnail: "https://img.youtube.com/vi/-9a1mGe1Q8c/maxresdefault.jpg",
      link: "https://www.youtube.com/watch?v=-9a1mGe1Q8c"
    }
  ];

// --- COMPONENTES ---

const Navbar = ({ setPage, currentPage, mobileMenuOpen, setMobileMenuOpen }: any) => (
  <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
    <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4">
      {/* LOGO */}
      <div 
        onClick={() => setPage('home')}
        className="flex items-center space-x-3 cursor-pointer group"
      >
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative bg-slate-900 p-2 rounded-lg border border-white/10">
             <Server className="text-blue-400" size={24}/>
          </div>
        </div>
        <span className="self-center text-2xl font-bold whitespace-nowrap text-white tracking-tighter">
          RIVERITA<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">TECH</span>
        </span>
      </div>
      
      {/* BOTONES DERECHA */}
      <div className="flex md:order-2 space-x-3 md:space-x-0">
        <button className="hidden md:flex relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl hover:bg-slate-900 transition-colors">
            Acceso Premium
          </span>
        </button>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white hover:bg-white/10 rounded-lg p-2">
            {mobileMenuOpen ? <X/> : <Menu/>}
        </button>
      </div>

      {/* MENÚ CENTRO */}
      <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-white/10 rounded-lg bg-slate-900/50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-transparent">
          {['home', 'labs', 'tutorials', 'about'].map((page) => (
            <li key={page}>
              <button 
                onClick={() => { setPage(page); setMobileMenuOpen(false); }}
                className={`block py-2 px-3 md:p-0 rounded w-full text-left transition-all ${
                  currentPage === page ? 'text-blue-400 font-bold drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'text-slate-400 hover:text-white'
                }`}
              >
                {page === 'home' ? 'Inicio' : page === 'labs' ? 'Laboratorios' : page === 'tutorials' ? 'Academia' : 'Mentoría'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </nav>
);

const Hero = ({ setPage }: any) => (
  <section className="relative pt-32 pb-20 lg:pt-48 overflow-hidden min-h-screen flex items-center">
    <BackgroundGrid />
    {/* Decoración */}
    <div className="absolute top-20 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
    <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>

    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-8 hover:bg-blue-500/20 transition-colors cursor-pointer animate-in fade-in slide-in-from-top-4">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        Nuevo: vSAN 8 LAB
      </div>

      <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight animate-in slide-in-from-bottom-6 duration-700">
        La Infraestructura TI <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">
           No Se Lee, Se Rompe.
        </span>
      </h1>
      
      <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-in slide-in-from-bottom-8 duration-1000">
        Simuladores hiper-realistas de VMware. Rompe clústers en producción y aprende a arreglarlos antes de que suene el teléfono.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in slide-in-from-bottom-10 duration-1000">
        <button 
          onClick={() => setPage('labs')}
          className="group px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] hover:bg-blue-500 transition-all transform hover:-translate-y-1"
        >
          <span className="flex items-center gap-2">
            Iniciar Laboratorio <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
          </span>
        </button>
        <button 
            onClick={() => setPage('tutorials')}
            className="flex items-center gap-3 px-8 py-4 bg-slate-800 text-white rounded-xl border border-white/10 hover:bg-slate-700 transition-all font-medium"
        >
          <Play size={20} className="text-emerald-400"/> Ver Videos
        </button>
      </div>
      
      {/* Social Proof */}
      <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-center gap-8 text-slate-500 text-sm font-medium animate-in fade-in duration-1000 delay-300">
        <div className="flex gap-6">
           <span className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500"/> Simuladores Reales</span>
           <span className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500"/> Certificado</span>
        </div>
      </div>
    </div>
  </section>
);

const LabsSection = ({ limit }: { limit?: number }) => (
  <section className="py-24 bg-slate-950 relative">
     <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {misLaboratorios.slice(0, limit || misLaboratorios.length).map((lab) => (
              <div key={lab.id} className="group relative bg-slate-900 border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] flex flex-col">
                 
                 {/* Badge */}
                 <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-bold text-white z-10">
                    {lab.etiqueta}
                 </div>

                 {/* ICONO CENTRADO (Header de Color) */}
                 <div className={`h-48 bg-gradient-to-br ${lab.color} relative overflow-hidden group-hover:scale-105 transition-transform duration-500 flex items-center justify-center`}>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                    {/* Icono Grande Centrado */}
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                        {lab.icono}
                    </div>
                 </div>

                 {/* Content */}
                 <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{lab.titulo}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1 border-b border-white/5 pb-6">
                       {lab.descripcion}
                    </p>
                    
                    <div className="flex justify-between items-center mt-auto">
                       <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                          <Terminal size={14}/> {lab.nivel}
                       </span>
                       <a href={lab.link} target="_blank" rel="noopener noreferrer" className="bg-white text-slate-950 px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors flex items-center gap-2">
                          Desplegar Lab <ArrowRight size={16}/>
                       </a>
                    </div>
                 </div>
              </div>
           ))}
        </div>
     </div>
  </section>
);

const Tutorials = () => (
    <section className="py-24 bg-slate-950 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 pt-12">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Academia <span className="text-blue-500">Riverita TECH</span></h2>
                <p className="text-slate-400 text-lg">Guías técnicas y demos en profundidad.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {misTutoriales.map((tuto) => (
                    <a key={tuto.id} href={tuto.link} target="_blank" rel="noopener noreferrer" className="group block">
                        <div className="bg-slate-900 rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                            {/* MINIATURA YOUTUBE */}
                            <div className="relative aspect-video overflow-hidden">
                                <img src={tuto.thumbnail} alt={tuto.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                                <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors"></div>
                                <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded border border-white/10 font-mono">
                                    {tuto.duracion}
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="bg-blue-600/90 p-3 rounded-full shadow-lg backdrop-blur-sm">
                                        <Play size={24} className="text-white" fill="currentColor"/>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <span className="text-xs font-bold text-blue-400 uppercase mb-2 block tracking-wider flex items-center gap-1">
                                    <Video size={12}/> {tuto.tipo}
                                </span>
                                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                                    {tuto.titulo}
                                </h3>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    </section>
);

const About = () => (
    <section className="py-24 bg-slate-950 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-6">
            <div className="bg-slate-900/50 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-xl flex flex-col md:flex-row gap-12 items-center relative overflow-hidden">
                {/* Fondo decorativo interno */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-blue-500/5 to-transparent pointer-events-none"></div>

                <div className="w-80 h-80 relative shrink-0 group">
                    <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-pulse group-hover:opacity-40 transition-opacity"></div>
                    {/* TU FOTO AQUÍ - Reemplaza el src con tu foto real cuando puedas */}
                    <img 
                        src="/riverita.jpg" 
                        alt="Riveritatech" 
                        className="w-full h-full rounded-full object-cover border-4 border-slate-800 shadow-2xl relative z-10 grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    {/* Badge VCP Flotante */}
                    <div className="absolute -bottom-4 -right-4 bg-slate-950 border border-blue-500 text-blue-400 px-4 py-2 rounded-xl font-bold text-xs shadow-xl z-20 flex items-center gap-2">
                        <CheckCircle size={14} /> VCP CERTIFIED
                    </div>
                </div>
                
                <div className="flex-1 text-center md:text-left relative z-10">
                    <h2 className="text-4xl font-bold text-white mb-2">Hola, soy Riverita<span className="text-blue-500">Tech</span></h2>
                    <p className="text-blue-400 text-lg font-mono mb-6 flex items-center justify-center md:justify-start gap-2">
                        <Terminal size={16}/> Administrador Senior de Virtualización & VCP
                    </p>
                    
                    <div className="text-slate-400 mb-8 leading-relaxed text-lg space-y-4">
                        <p>
                            Más que un instructor, soy un administrador de sistemas apasionado por VMware, igual que tú.
                        </p>
                        <p>
                            Tengo la responsabilidad de gestionar un entorno real con más de <strong className="text-white">10,000 Máquinas Virtuales</strong> y <strong className="text-white">400 Hosts ESXi</strong>. En ese día a día me encuentro con desafíos, errores y soluciones que no siempre están en los manuales.
                        </p>
                        <p>
                            Mi objetivo con este proyecto es simple: <span className="text-emerald-400 font-bold">compartir esa experiencia real contigo</span>. Crear laboratorios y tutoriales basados en situaciones de trinchera para ayudarte a subir de nivel, perder el miedo a la consola y dominar tecnologías como vSAN, HCX, Vcenter, VRMS y SRM.
                        </p>
                        <p className="italic border-l-4 border-blue-500 pl-4 text-slate-500">
                            "Aprendamos juntos a resolver lo que pasa cuando la producción se complica."
                        </p>
                    </div>

                    {/* ESTADÍSTICAS VISUALES */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="bg-slate-800/50 p-3 rounded-lg border border-white/5 text-center">
                            <div className="text-2xl font-bold text-white">10k+</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">VMs Activas</div>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded-lg border border-white/5 text-center">
                            <div className="text-2xl font-bold text-white">400+</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Hosts ESXi</div>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded-lg border border-white/5 text-center">
                            <div className="text-2xl font-bold text-white">VCP</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Certificado</div>
                        </div>
                    </div>
                    
                    {/* AQUÍ ESTÁN LOS LINKS CONFIGURADOS */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        
                        {/* YOUTUBE (Ya configurado con tu link) */}
                        <a 
                            href="https://www.youtube.com/@RiveritaTech" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-red-600/90 text-white rounded-xl hover:bg-red-600 transition-colors font-bold shadow-lg"
                        >
                            <Youtube size={20}/> YouTube
                        </a>

                        {/* LINKEDIN (¡EDITA EL HREF AQUÍ!) */}
                        <a 
                            href="https://www.linkedin.com/in/diego-fernando-rivera-lopez-392186133?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-[#0077b5]/90 text-white rounded-xl hover:bg-[#0077b5] transition-colors font-bold shadow-lg"
                        >
                            <Linkedin size={20}/> LinkedIn
                        </a>

                        {/* TWITTER (Opcional) */}
                        <a 
                            href="https://twitter.com/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 border border-white/10 transition-colors font-bold shadow-lg"
                        >
                            <Twitter size={20}/> @riveritatech
                        </a>

                    </div>
                </div>
            </div>
        </div>
    </section>
);

const Newsletter = () => (
   <section className="py-24 bg-gradient-to-b from-slate-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
         <div className="inline-block p-3 bg-blue-500/10 rounded-full mb-6">
            <Zap size={32} className="text-blue-400 fill-blue-400/20"/>
         </div>
         <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Únete a la Élite</h2>
         <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Recibe trucos de ingeniería, escenarios de falla y acceso anticipado a nuevos labs.
         </p>

         <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="tu@correo.com" 
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-colors">
               Suscribirme
            </button>
         </div>
      </div>
   </section>
);

const Footer = () => (
   <footer className="bg-black text-slate-400 py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
         <div className="flex items-center gap-2">
            <Server className="text-blue-500" size={20}/>
            <span className="font-bold text-white">RiveritaTech</span>
         </div>
         <div className="flex gap-6 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">Github</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
         </div>
         <div className="text-xs text-slate-600">
            © 2025 Creado para la comunidad VMware.
         </div>
      </div>
   </footer>
);

// --- COMPONENTE PRINCIPAL (CONTROLADOR DE VISTAS) ---

const RiveritatechWebsite = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    // 'cursor-none' OCULTA la flecha del navegador para que solo se vea tu CyberCursor
    <div className="font-sans min-h-screen bg-slate-950 text-white selection:bg-blue-500 selection:text-white overflow-x-hidden cursor-none">
      
      {/* AQUÍ ESTÁ EL EFECTO DE CURSOR INTEGRADO */}
      <CyberCursor />

      <Navbar 
        setPage={setCurrentPage} 
        currentPage={currentPage} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />

      <main>
        {/* VISTA: INICIO */}
        {currentPage === 'home' && (
           <div className="animate-in fade-in zoom-in duration-500">
              <Hero setPage={setCurrentPage} />
              <div className="text-center pt-10 pb-4">
                 <h2 className="text-3xl font-bold text-white">Labs Destacados</h2>
              </div>
              <LabsSection limit={3} />
              <Newsletter />
           </div>
        )}
        
        {/* VISTA: LABORATORIOS (Catálogo Completo) */}
        {currentPage === 'labs' && (
           <div className="pt-24 min-h-screen animate-in slide-in-from-right duration-500">
              <div className="text-center py-12 px-6">
                 <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Catálogo de <span className="text-blue-500">Simulaciones</span></h2>
                 <p className="text-slate-400 text-lg max-w-2xl mx-auto">Selecciona tu desafío. Entornos aislados listos en segundos.</p>
              </div>
              <LabsSection /> 
           </div>
        )}

        {/* VISTA: ACADEMIA (Tutoriales y YouTube) */}
        {currentPage === 'tutorials' && (
            <div className="pt-10 animate-in slide-in-from-right duration-500">
                <Tutorials />
            </div>
        )}

        {/* VISTA: SOBRE MÍ (Mentoría) */}
        {currentPage === 'about' && (
            <div className="pt-10 animate-in slide-in-from-right duration-500">
                <About />
            </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default RiveritatechWebsite;
