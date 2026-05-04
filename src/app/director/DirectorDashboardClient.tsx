"use client";

import { motion } from "framer-motion";
import { Users, GraduationCap, BookOpen, TrendingUp, Target, ShieldCheck, MoreHorizontal, UserPlus, Bell } from "lucide-react";
import React from "react";

export default function DirectorDashboardClient({ stats }: { stats: { students: number, teachers: number, subjects: number } }) {
  return (
    <div className="w-full min-h-screen bg-background font-sans p-6 md:p-10">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-1">
            Dashboard Director
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Monitor analítico e inteligencia institucional.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-border rounded-xl shadow-sm hover:shadow-bento transition-all text-sm font-bold text-foreground">
            <Bell className="w-4 h-4 text-muted-foreground" />
            Notificaciones
            <span className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full ml-1">3</span>
          </button>
        </div>
      </header>

      {/* Main Grid - Bento Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Metric 1 */}
        <div className="glass-surface p-6 rounded-[16px] group hover:shadow-bento-hover transition-all duration-500">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">
              <TrendingUp className="w-3 h-3" /> +12%
            </span>
          </div>
          <p className="text-sm font-semibold text-muted-foreground mb-1">Alumnos Activos</p>
          <h2 className="text-3xl font-extrabold text-foreground">{stats.students || 0}</h2>
        </div>

        {/* Metric 2 */}
        <div className="glass-surface p-6 rounded-[16px] group hover:shadow-bento-hover transition-all duration-500">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-accent/10 rounded-xl text-accent">
              <Users className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">
              <TrendingUp className="w-3 h-3" /> +4%
            </span>
          </div>
          <p className="text-sm font-semibold text-muted-foreground mb-1">Cuerpo Docente</p>
          <h2 className="text-3xl font-extrabold text-foreground">{stats.teachers || 0}</h2>
        </div>

        {/* Metric 3 */}
        <div className="glass-surface p-6 rounded-[16px] group hover:shadow-bento-hover transition-all duration-500">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-muted rounded-xl text-muted-foreground">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-1 rounded-md">
              Estable
            </span>
          </div>
          <p className="text-sm font-semibold text-muted-foreground mb-1">Oferta Académica</p>
          <h2 className="text-3xl font-extrabold text-foreground">{stats.subjects || 0}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Gráfica Limpia (Construida nativamente para Modern Bento) */}
        <div className="lg:col-span-2 glass-surface p-6 rounded-[16px]">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-bold text-foreground">Rendimiento Académico</h3>
              <p className="text-xs font-medium text-muted-foreground mt-1">Evolución de matriculaciones (Simulada)</p>
            </div>
            <button className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-lg">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          
          <div className="relative h-64 w-full flex items-end justify-between gap-2 md:gap-4 mt-4">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between z-0">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-full border-t border-border/60"></div>
              ))}
            </div>
            
            {/* Bars */}
            {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
              <div key={i} className="relative z-10 w-full flex flex-col items-center gap-3 group">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                  className="w-full max-w-[48px] bg-primary/20 hover:bg-primary rounded-t-xl transition-colors cursor-pointer relative"
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-foreground text-background text-[10px] font-bold px-2 py-1 rounded-md transition-opacity shadow-sm">
                    {height}k
                  </div>
                </motion.div>
                <span className="text-xs font-bold text-muted-foreground uppercase">M{i+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gestión de Usuarios - Activity Feed */}
        <div className="glass-surface p-6 rounded-[16px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-foreground">Activity Feed</h3>
            <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase tracking-wider">Live</span>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <div className="space-y-6">
              {[
                { name: "Martina Silva", action: "Nueva matriculación", course: "Matemáticas Avanzadas", time: "Hace 5 min", icon: UserPlus, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                { name: "Prof. Alberto R.", action: "Publicó una clase", course: "Física Cuántica", time: "Hace 22 min", icon: BookOpen, color: "text-accent", bg: "bg-accent/10" },
                { name: "Lucía Gómez", action: "Completó el módulo", course: "Biología Celular", time: "Hace 1 hora", icon: Target, color: "text-primary", bg: "bg-primary/10" },
                { name: "Sistema", action: "Respaldo automático", course: "Base de datos", time: "Hace 3 horas", icon: ShieldCheck, color: "text-muted-foreground", bg: "bg-muted" }
              ].map((feed, i) => (
                <div key={i} className="flex gap-4 items-start group cursor-pointer">
                  <div className={`p-2.5 rounded-xl mt-1 ${feed.bg} ${feed.color} transition-transform group-hover:scale-110 duration-300`}>
                    <feed.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{feed.name}</p>
                    <p className="text-xs font-medium text-muted-foreground mt-0.5">{feed.action} <span className="font-semibold text-foreground/80">{feed.course}</span></p>
                    <p className="text-[10px] font-bold text-muted-foreground/50 mt-1.5 uppercase tracking-wider">{feed.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button className="w-full mt-6 py-3 text-xs font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-widest border-t border-border/50">
            Ver Todo el Registro
          </button>
        </div>

      </div>

      {/* Tablas sin bordes */}
      <div className="mt-6 glass-surface p-6 rounded-[16px]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-foreground">Docentes Destacados</h3>
          <button className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-muted border border-border/50">
            Filtros
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-border/60">
                <th className="pb-4 pl-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest w-1/3">Docente</th>
                <th className="pb-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Materia Principal</th>
                <th className="pb-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center">Alumnos</th>
                <th className="pb-4 pr-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Dr. Carlos Mendez", email: "carlos@omega.edu", subject: "Matemáticas", students: 124, status: "Activo" },
                { name: "Lic. Ana Torres", email: "ana@omega.edu", subject: "Literatura", students: 98, status: "Activo" },
                { name: "Ing. Marcos Díaz", email: "marcos@omega.edu", subject: "Física", students: 145, status: "En Clase" }
              ].map((docente, i) => (
                <tr key={i} className="group hover:bg-muted/30 transition-colors">
                  <td className="py-4 pl-2 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {docente.name.charAt(4)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors cursor-pointer">{docente.name}</p>
                      <p className="text-xs font-medium text-muted-foreground">{docente.email}</p>
                    </div>
                  </td>
                  <td className="py-4 text-sm font-medium text-foreground">{docente.subject}</td>
                  <td className="py-4 text-sm font-bold text-muted-foreground text-center">{docente.students}</td>
                  <td className="py-4 pr-2 text-right">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${docente.status === 'Activo' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-accent/10 text-accent'}`}>
                      {docente.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
