"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Users, 
  MonitorPlay, 
  ArrowRight, 
  Menu, 
  X
} from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-primary/30 overflow-x-hidden">
      
      {/* HEADER */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#0B0F19]/95 backdrop-blur-md py-4 shadow-xl" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo1.png" alt="Omega logo" width={32} height={32} className="object-contain" />
            <span className="text-xl font-extrabold tracking-tight">
              OMEGA <span className="text-primary">INSTITUTO</span>
            </span>
          </div>
          
          <nav className="hidden lg:flex gap-8 font-bold text-xs uppercase tracking-[0.2em] items-center text-slate-300">
            <Link href="#cursos" className="hover:text-white transition-colors">Cursos</Link>
            <Link href="#particulares" className="hover:text-white transition-colors">Particulares</Link>
            <Link href="#metodologia" className="hover:text-white transition-colors">Metodología</Link>
            <Link href="#contacto" className="hover:text-white transition-colors">Contacto</Link>
          </nav>

          <div className="hidden lg:block">
             <Link href="/login" className="px-8 py-3 border border-white text-white font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-[#0B0F19] transition-all">
               Mi Campus
             </Link>
          </div>

          <button 
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden absolute top-full left-0 w-full bg-[#0B0F19] border-t border-slate-800"
            >
              <div className="flex flex-col p-6 gap-6 text-center">
                <Link href="#cursos" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-slate-300 hover:text-white">Cursos</Link>
                <Link href="#particulares" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-slate-300 hover:text-white">Particulares</Link>
                <Link href="#metodologia" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-slate-300 hover:text-white">Metodología</Link>
                <Link href="#contacto" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-slate-300 hover:text-white">Contacto</Link>
                <Link href="/login" className="px-6 py-4 mt-4 border border-white text-white font-bold uppercase tracking-widest text-xs" onClick={() => setIsMobileMenuOpen(false)}>
                  Mi Campus
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-32 pb-48 lg:pt-0 lg:pb-32">
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#0B0F19]/80 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/90 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2000&q=80" 
            alt="Estudiantes Omega" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-20">
          <div className="max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl lg:text-[9rem] font-heading font-bold tracking-tighter leading-[0.9] mb-4"
            >
              Excelencia<br />
              <span className="text-primary italic">Sin Fronteras.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-8 text-xl md:text-2xl text-slate-300 max-w-2xl leading-relaxed font-sans"
            >
              Tutorías de élite y formación académica especializada.<br />
              Donde la <span className="border-b-2 border-brand-gold pb-0.5 font-bold text-white">calidad educativa</span> se encuentra con el futuro digital.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 flex flex-col sm:flex-row gap-6"
            >
              <Link href="#cursos" className="px-8 py-5 bg-primary text-white font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-primary/90 transition-all flex items-center justify-center gap-3">
                Ver Catálogo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/login" className="px-8 py-5 border border-slate-700 bg-slate-900/60 text-white font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-slate-800 hover:border-slate-600 transition-all text-center">
                Ingresar al Campus
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="relative z-30 -mt-32 container mx-auto px-6 lg:px-12 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="bg-white p-12 xl:p-16 text-slate-900 border-b md:border-b-0 md:border-r border-slate-100">
             <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-8 text-primary">
                <Users className="w-8 h-8" />
             </div>
             <h3 className="text-3xl font-heading font-black mb-4 tracking-tight leading-none italic">Clases<br/>Particulares</h3>
             <p className="text-slate-600 font-medium text-sm leading-relaxed">Apoyo individual e intensivo uno-a-uno diseñado para superar cualquier obstáculo académico.</p>
          </div>
          
          <div className="bg-primary p-12 xl:p-16 text-white border-b md:border-b-0">
             <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-8 text-white">
                <BookOpen className="w-8 h-8" />
             </div>
             <h3 className="text-3xl font-heading font-black mb-4 tracking-tight leading-none italic">Cursos<br/>Destacados</h3>
             <p className="text-white/80 font-medium text-sm leading-relaxed">Módulos avanzados de nivelación y apoyo universitario con materiales exclusivos.</p>
          </div>
          
          <div className="bg-[#0c1220] p-12 xl:p-16 text-white">
             <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-8 text-brand-gold">
                <MonitorPlay className="w-8 h-8" />
             </div>
             <h3 className="text-3xl font-heading font-black mb-4 tracking-tight leading-none italic">Campus<br/>Virtual 24/7</h3>
             <p className="text-slate-400 font-medium text-sm leading-relaxed">Acceso instantáneo a clases grabadas, foros especializados y contenido digital.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#070A12] py-20 border-t border-slate-800/50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-1 flex flex-col items-start">
              <div className="flex items-center gap-3 mb-6">
                <Image src="/logo1.png" alt="Omega logo" width={32} height={32} className="object-contain" />
                <span className="text-2xl font-extrabold text-white tracking-tight">OMEGA</span>
              </div>
              <p className="text-sm font-medium text-slate-500 mb-6 max-w-xs">
                Elevamos el estándar de la educación online. Excelencia y dedicación sin fronteras.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Ecosistema</h4>
              <ul className="space-y-4 font-medium text-sm text-slate-500">
                <li><Link href="#cursos" className="hover:text-primary transition-colors">Catálogo de Cursos</Link></li>
                <li><Link href="#particulares" className="hover:text-primary transition-colors">Tutorías 1-a-1</Link></li>
                <li><Link href="/login" className="hover:text-primary transition-colors">Acceso Estudiantes</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Recursos</h4>
              <ul className="space-y-4 font-medium text-sm text-slate-500">
                <li><Link href="#" className="hover:text-primary transition-colors">Preguntas Frecuentes</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Soporte Técnico</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Pagos y Facturas</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Contacto</h4>
              <ul className="space-y-4 font-medium text-sm text-slate-500">
                <li>Soporte Online 24/7</li>
                <li>Argentina para el mundo</li>
                <li>
                  <Link href="mailto:hola@omegainstituto.com" className="text-primary hover:text-white transition-colors">
                    hola@omegainstituto.com
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            <span>&copy; {new Date().getFullYear()} OMEGA INSTITUTO. EXCELLENCE SIN FRONTERAS.</span>
            <div className="flex gap-6">
                <Link href="#" className="hover:text-white transition-colors">Privacidad</Link>
                <Link href="#" className="hover:text-white transition-colors">Términos</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
