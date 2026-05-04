"use client";

import { motion } from "framer-motion";
import { 
  PlayCircle, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Trophy,
  ArrowRight,
  Sparkles,
  BookOpen,
  Video,
  CheckCircle2,
  BrainCircuit,
  Target
} from "lucide-react";
import Link from "next/link";
import React from "react";

// Componente para barra de progreso circular animada
const CircularProgress = ({ value, label }: { value: number, label: string }) => {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex items-center gap-5">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <svg className="transform -rotate-90 w-16 h-16">
          <circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="5" fill="transparent" className="text-border" />
          <motion.circle 
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="5" fill="transparent"
            strokeDasharray={circumference}
            className="text-primary drop-shadow-[0_0_8px_rgba(159,18,57,0.3)]"
          />
        </svg>
        <span className="absolute text-[11px] font-extrabold text-foreground">{value}%</span>
      </div>
      <div>
        <p className="text-sm font-bold text-foreground leading-none mb-1.5">{label}</p>
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">En curso</p>
      </div>
    </div>
  );
}

export default function DashboardAlumnoClient({ student }: { student: any }) {
  return (
    <div className="w-full min-h-screen bg-background font-sans p-6 md:p-10">
      
      {/* Header Motivacional */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-accent/10 border border-accent/20 rounded-full mb-4 shadow-sm">
             <Sparkles className="w-3.5 h-3.5 text-accent" />
             <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Foco Diario</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-3">
            ¡A por todo, <span className="text-primary">{student.full_name?.split(' ')[0] || 'Estudiante'}</span>!
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Tus metas académicas están a un <span className="font-bold text-foreground">20% de esfuerzo extra</span> hoy.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="glass-surface px-6 py-4 rounded-2xl flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shadow-inner">
                <Trophy className="w-6 h-6 text-accent" />
             </div>
             <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Nivel General</p>
                <p className="text-base font-extrabold text-foreground leading-none">Avanzado <span className="text-emerald-500 ml-1">↑</span></p>
             </div>
          </div>
        </div>
      </header>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Lado Izquierdo: Cursos (2/3) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center justify-between px-1 mb-2">
             <h2 className="text-xl font-extrabold text-foreground flex items-center gap-2">
               <BrainCircuit className="w-5 h-5 text-primary" /> Tu Trayectoria
             </h2>
             <Link href="/dashboard/catalogo" className="text-[11px] font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-primary/5">
               Explorar Catálogo
             </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {student.enrollments.map((enrollment: any, i: number) => {
              const progress = Math.floor(Math.random() * 40) + 30; // Progreso simulado para la demo
              return (
                <motion.div 
                  key={enrollment.id || i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div className="glass-surface p-1.5 rounded-[24px] group hover:shadow-bento-hover transition-all duration-500">
                    <div className="relative h-36 bg-muted rounded-t-[20px] rounded-b-xl overflow-hidden p-6 flex flex-col justify-end">
                       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
                       {/* Background decoration */}
                       <div className="absolute -right-8 -top-8 w-40 h-40 bg-primary/40 rounded-full blur-3xl group-hover:bg-primary/60 transition-colors duration-700"></div>
                       
                       <div className="relative z-20">
                          <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1.5 block">
                            {enrollment.subject?.career?.title || "Curso Independiente"}
                          </span>
                          <h3 className="text-xl font-extrabold text-white leading-tight group-hover:text-accent transition-colors">
                            {enrollment.subject?.title}
                          </h3>
                       </div>
                    </div>
                    
                    <div className="p-6">
                       <CircularProgress value={progress} label="Avance del módulo" />
                       
                       <Link 
                         href={`/curso/${enrollment.subject_id}`}
                         className="mt-6 w-full py-3.5 bg-secondary hover:bg-foreground hover:text-background text-secondary-foreground rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-sm group/btn"
                       >
                         Continuar Clase <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
                       </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}

            {/* Empty state / Agregar curso */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <div className="border-2 border-dashed border-border/60 rounded-[24px] p-8 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors group cursor-pointer bg-muted/10 h-full min-h-[280px]">
                 <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center shadow-sm mb-5 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
                   <BookOpen className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                 </div>
                 <p className="text-sm font-extrabold text-foreground mb-2">Añadir nueva meta</p>
                 <p className="text-xs font-medium text-muted-foreground px-4">Inscríbete en un nuevo curso para potenciar tus habilidades profesionales.</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Lado Derecho: Próximas Clases Online */}
        <div className="flex flex-col gap-6">
          <div className="glass-surface p-6 sm:p-8 rounded-[24px] flex flex-col h-full relative overflow-hidden">
             {/* Destello de fondo */}
             <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
             
             <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-xl font-extrabold text-foreground flex items-center gap-2">
                   <Video className="w-5 h-5 text-accent" /> Clases Online
                </h2>
             </div>

             <div className="space-y-4 relative z-10 flex-1">
               {student.sessions_as_student?.length > 0 ? (
                 student.sessions_as_student.map((session: any, i: number) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.15, duration: 0.5 }}
                     className="p-5 bg-background border border-border/60 rounded-2xl group hover:border-accent/40 hover:shadow-bento transition-all"
                   >
                     <div className="flex justify-between items-start mb-4">
                       <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground bg-muted px-2.5 py-1 rounded-md">
                         Sincrónico
                       </span>
                       <p className="text-xs font-bold text-accent flex items-center gap-1.5">
                         <Clock className="w-3.5 h-3.5" /> 
                         {new Date(session.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                       </p>
                     </div>
                     <p className="text-sm font-extrabold text-foreground mb-1.5 group-hover:text-accent transition-colors">{session.subject?.title || "Tutoría Privada"}</p>
                     <p className="text-xs font-medium text-muted-foreground flex items-center gap-2 mb-5">
                       <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[9px] font-bold">
                         {session.teacher?.full_name?.charAt(0) || "P"}
                       </span>
                       Prof. {session.teacher?.full_name || "Asignado"}
                     </p>
                     
                     <Link 
                        href={session.meeting_url || "#"}
                        className="w-full py-3 bg-foreground text-background hover:bg-accent hover:text-accent-foreground rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-bento group/join"
                      >
                        Unirse a la sala <PlayCircle className="w-4 h-4 group-hover/join:scale-110 transition-transform" />
                      </Link>
                   </motion.div>
                 ))
               ) : (
                 <div className="py-16 text-center flex flex-col items-center justify-center bg-muted/20 rounded-2xl border border-dashed border-border/60 h-full">
                   <Target className="w-12 h-12 text-muted-foreground mb-4 opacity-30" />
                   <p className="text-sm font-extrabold text-foreground">Sin clases próximas</p>
                   <p className="text-xs font-medium text-muted-foreground mt-2 px-6">Aprovecha el tiempo para avanzar en tus módulos offline.</p>
                 </div>
               )}
             </div>
             
             <div className="mt-6 pt-6 border-t border-border/60 relative z-10">
               <Link href="/dashboard/reservas" className="text-[10px] font-bold text-muted-foreground hover:text-foreground flex items-center justify-center gap-2 transition-colors uppercase tracking-widest p-2 hover:bg-muted rounded-xl">
                 Ver Calendario Completo <ChevronRight className="w-3.5 h-3.5" />
               </Link>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
