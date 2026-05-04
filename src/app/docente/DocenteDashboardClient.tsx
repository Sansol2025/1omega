"use client";

import { motion } from "framer-motion";
import { 
  BookOpen, 
  Users, 
  Plus, 
  Calendar, 
  Clock, 
  ChevronRight, 
  FileText, 
  BookMarked,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Video
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

interface TeacherData {
  full_name: string;
  subjects_taught: any[];
  sessions_as_teacher: any[];
}

export default function DocenteDashboardClient({ teacher }: { teacher: TeacherData }) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="w-full min-h-screen bg-background font-sans p-6 md:p-10">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-1">
            Hola, <span className="text-primary">{teacher.full_name}</span>
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Panel de productividad y gestión de cátedras.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex -space-x-3 mr-4 hidden sm:flex">
             {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground z-10 relative">
                   {String.fromCharCode(64 + i)}
                </div>
             ))}
             <div className="w-8 h-8 rounded-full border-2 border-background bg-background flex items-center justify-center text-[10px] font-bold text-foreground z-10 relative shadow-sm">
                +12
             </div>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-foreground text-background hover:bg-foreground/90 rounded-xl shadow-bento transition-all text-sm font-bold">
            <Plus className="w-4 h-4" />
            Nueva Clase
          </button>
        </div>
      </header>

      {/* Quick Stats & Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="glass-surface p-6 rounded-[16px] group hover:shadow-bento-hover transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <BookMarked className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-destructive bg-destructive/10 px-2.5 py-1 rounded-md">
              3 Pendientes
            </span>
          </div>
          <p className="text-sm font-semibold text-muted-foreground mb-1">Entregas por corregir</p>
          <h2 className="text-3xl font-extrabold text-foreground">12</h2>
        </div>

        <div className="glass-surface p-6 rounded-[16px] group hover:shadow-bento-hover transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-accent/10 rounded-xl text-accent">
              <Video className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Hoy
            </span>
          </div>
          <p className="text-sm font-semibold text-muted-foreground mb-1">Clases Sincrónicas</p>
          <h2 className="text-3xl font-extrabold text-foreground">{teacher.sessions_as_teacher?.length || 0}</h2>
        </div>

        <div className="glass-surface p-6 rounded-[16px] group hover:shadow-bento-hover transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-secondary rounded-xl text-secondary-foreground">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-sm font-semibold text-muted-foreground mb-1">Total de Alumnos</p>
          <h2 className="text-3xl font-extrabold text-foreground">
            {teacher.subjects_taught?.reduce((acc, curr) => acc + (curr._count?.enrollments || 0), 0) || 0}
          </h2>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Calendar & Drag n Drop */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Gestor de Archivos Drag & Drop */}
          <div className="glass-surface p-6 rounded-[16px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-foreground">Gestor de Recursos</h3>
              <button className="text-xs font-bold text-primary hover:text-primary/80 transition-colors">
                Ver todos
              </button>
            </div>
            
            <div 
              className={`border-2 border-dashed rounded-xl p-8 text-center flex flex-col items-center justify-center transition-all duration-300 ${isDragging ? 'border-primary bg-primary/5' : 'border-border/60 hover:border-primary/40 bg-muted/30'}`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
            >
              <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center shadow-sm mb-4">
                <UploadCloud className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-sm font-bold text-foreground mb-1">Arrastra tus archivos aquí</h4>
              <p className="text-xs font-medium text-muted-foreground mb-4">PDF, MP4, o presentaciones hasta 50MB</p>
              <button className="px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-lg text-xs font-bold transition-colors">
                Explorar archivos
              </button>
            </div>

            {/* Archivos recientes */}
            <div className="mt-6 space-y-3">
              {[
                { name: "Syllabus_Matematicas_2026.pdf", size: "2.4 MB", type: "PDF" },
                { name: "Clase_Grabada_Unidad1.mp4", size: "45 MB", type: "Video" }
              ].map((file, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-background border border-border/50 rounded-xl hover:border-border transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs font-bold text-foreground">{file.name}</p>
                      <p className="text-[10px] font-medium text-muted-foreground">{file.size}</p>
                    </div>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Calendario Interactivo */}
          <div className="glass-surface p-6 rounded-[16px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-foreground">Calendario de Clases</h3>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground transition-colors"><ChevronRight className="w-4 h-4 rotate-180" /></button>
                <span className="text-sm font-bold text-foreground">Octubre 2026</span>
                <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground transition-colors"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
            
            {/* Week days */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, i) => (
                <div key={i} className="text-center text-[10px] font-bold text-muted-foreground uppercase">{day}</div>
              ))}
            </div>
            {/* Days grid - Simulated */}
            <div className="grid grid-cols-7 gap-2">
              {Array.from({length: 31}).map((_, i) => {
                const day = i + 1;
                const hasEvent = day === 12 || day === 15 || day === 22 || day === 28;
                const isToday = day === 15;
                return (
                  <div key={i} className={`aspect-square rounded-xl flex items-center justify-center text-xs font-bold relative cursor-pointer transition-all duration-300 ${isToday ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-muted text-foreground'}`}>
                    {day}
                    {hasEvent && !isToday && <span className="absolute bottom-1.5 w-1 h-1 bg-accent rounded-full"></span>}
                  </div>
                )
              })}
            </div>
          </div>

        </div>

        {/* Right Col: Sessions & Tasks */}
        <div className="flex flex-col gap-6">
          
          {/* Próximas Clases */}
          <div className="glass-surface p-6 rounded-[16px] flex-1">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-foreground">Agenda Hoy</h3>
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </div>

            <div className="space-y-4">
              {teacher.sessions_as_teacher?.length > 0 ? (
                teacher.sessions_as_teacher.map((session, i) => (
                  <div key={i} className="p-4 bg-background border border-border/50 rounded-xl group hover:border-primary/40 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                      <p className="text-xs font-bold text-primary flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> 
                        {new Date(session.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded-md">Virtual</span>
                    </div>
                    <p className="text-sm font-bold text-foreground mb-1">{session.subject?.title || "Clase Particular"}</p>
                    <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" /> {session.student?.full_name || "Alumno"}
                    </p>
                    <button className="w-full mt-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded-lg text-xs font-bold transition-colors">
                      Iniciar Transmisión
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-10 text-center flex flex-col items-center justify-center bg-muted/30 rounded-xl border border-dashed border-border/60">
                  <Video className="w-8 h-8 text-muted-foreground mb-3 opacity-50" />
                  <p className="text-sm font-bold text-foreground">Día libre</p>
                  <p className="text-xs font-medium text-muted-foreground">No tienes clases hoy.</p>
                </div>
              )}
            </div>
          </div>

          {/* Tareas Pendientes */}
          <div className="glass-surface p-6 rounded-[16px]">
            <h3 className="text-lg font-bold text-foreground mb-6">Tareas Pendientes</h3>
            
            <div className="space-y-4">
              {[
                { title: "Corregir Examen Final", course: "Matemáticas", priority: "Alta", type: "alert" },
                { title: "Subir Syllabus", course: "Física", priority: "Media", type: "normal" },
                { title: "Responder consultas", course: "Foro General", priority: "Baja", type: "normal" }
              ].map((task, i) => (
                <div key={i} className="flex gap-3 items-start group cursor-pointer">
                  <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center border-2 ${task.type === 'alert' ? 'border-destructive text-destructive bg-destructive/10' : 'border-muted-foreground/30 text-transparent group-hover:border-primary group-hover:text-primary transition-colors'}`}>
                    {task.type === 'alert' ? <AlertCircle className="w-2.5 h-2.5" /> : <CheckCircle2 className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground leading-none mb-1 group-hover:text-primary transition-colors">{task.title}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-medium text-muted-foreground">{task.course}</span>
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm ${task.type === 'alert' ? 'bg-destructive/10 text-destructive' : 'bg-muted text-muted-foreground'}`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
