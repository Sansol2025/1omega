"use client";

import { motion, Variants } from "framer-motion";
import { 
  BookOpen, 
  Plus, 
  ChevronRight, 
  LayoutGrid, 
  DollarSign, 
  Calendar,
  Search,
  BookMarked,
  Users,
  MonitorPlay,
  ArrowUpRight,
  TrendingUp,
  Award,
  Settings
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface AcademiaClientProps {
  careers: any[];
  teachers: any[];
  createCareer: (formData: FormData) => void;
  createSubject: (formData: FormData) => void;
}

export default function AcademiaClient({ careers, teachers, createCareer, createSubject }: AcademiaClientProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCareers = careers.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.subjects.some((s: any) => s.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-10 pb-20 relative"
    >
      {/* ATMOSPHERIC BLOOMS */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      {/* HEADER SECTION */}
      <motion.div variants={fadeInUp} className="flex flex-col xl:flex-row justify-between items-end gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-3 py-1 bg-muted text-muted-foreground text-[10px] font-bold uppercase tracking-widest rounded-lg border-border">
               <BookMarked className="w-3.5 h-3.5 mr-2 text-primary" /> Estrategia Académica
            </Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight leading-none">
            Gestión de <span className="text-primary">Carreras.</span>
          </h1>
          <p className="text-muted-foreground font-medium max-w-lg text-sm md:text-base leading-relaxed">
            Diseña y administra las trayectorias de <span className="text-foreground font-bold">excelencia</span> para los estudiantes de Omega.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
           <div className="relative w-full sm:w-80 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Buscar carrera o materia..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 pl-12 pr-6 bg-background border-border rounded-xl shadow-sm focus:ring-primary text-sm font-bold tracking-tight relative z-10 transition-colors"
              />
           </div>
           <div className="flex items-center gap-3 px-6 h-12 bg-muted border border-border text-foreground rounded-xl shadow-sm relative overflow-hidden shrink-0">
              <Calendar className="w-4 h-4 text-primary relative z-10" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest relative z-10">Ciclo 2026</span>
           </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
        {/* SIDEBAR TOOLS */}
        <motion.div variants={fadeInUp} className="xl:col-span-1 space-y-6">
          <Card className="rounded-[24px] border-border shadow-sm relative overflow-hidden glass-surface hover:shadow-bento transition-all duration-500">
            <CardHeader className="p-6 pb-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center border border-primary/20">
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-lg font-extrabold text-foreground tracking-tight">Nueva Carrera</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground font-medium mt-0.5">Inicia una trayectoria.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-4">
              <form action={createCareer} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Título</label>
                  <Input name="title" placeholder="Ej: Especialización en UI" className="h-10 bg-background border-border rounded-xl font-bold tracking-tight px-4 shadow-sm focus:ring-primary transition-colors" required />
                </div>
                <Button className="w-full h-10 bg-foreground hover:bg-primary text-background hover:text-primary-foreground rounded-xl font-bold text-xs shadow-sm transition-colors gap-2">
                  <Plus className="w-4 h-4" /> Crear
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="rounded-[24px] border-border shadow-sm relative overflow-hidden glass-surface hover:shadow-bento transition-all duration-500">
            <CardHeader className="p-6 pb-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-muted text-foreground rounded-xl flex items-center justify-center border border-border">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-lg font-extrabold text-foreground tracking-tight">Añadir Materia</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground font-medium mt-0.5">Nuevo módulo.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-4">
              <form action={createSubject} className="space-y-5">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Nombre Módulo</label>
                    <Input name="title" placeholder="Ej: Metafísica" className="h-10 bg-background border-border rounded-xl font-bold tracking-tight px-4 shadow-sm focus:ring-primary transition-colors" required />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Trayectoria</label>
                    <div className="relative">
                      <select name="career_id" className="flex h-10 w-full items-center justify-between rounded-xl border border-border bg-background px-4 text-xs font-bold text-foreground outline-none focus:ring-1 focus:ring-primary appearance-none shadow-sm transition-colors" required>
                        <option value="">-- SELECCIONAR --</option>
                        {careers.map((c: any) => <option key={c.id} value={c.id}>{c.title}</option>)}
                      </select>
                      <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none rotate-90" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Responsable</label>
                    <div className="relative">
                      <select name="teacher_id" className="flex h-10 w-full items-center justify-between rounded-xl border border-border bg-background px-4 text-xs font-bold text-foreground outline-none focus:ring-1 focus:ring-primary appearance-none shadow-sm transition-colors">
                        <option value="">-- DOCENTE --</option>
                        {teachers.map((t: any) => <option key={t.id} value={t.id}>{t.full_name}</option>)}
                      </select>
                      <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none rotate-90" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Arancel</label>
                    <div className="relative group/input">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground flex items-center justify-center font-extrabold text-sm">$</div>
                      <Input name="price" type="number" placeholder="5000" className="h-10 pl-9 bg-background border-border rounded-xl font-bold text-sm tracking-tight shadow-sm" />
                    </div>
                  </div>
                </div>
                <Button className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold text-xs shadow-sm transition-colors gap-2">
                  <Plus className="w-4 h-4" /> Registrar Módulo
                </Button>
              </form>
            </CardContent>
          </Card>

          <motion.div variants={fadeInUp} className="glass-surface rounded-[24px] border border-border p-6 space-y-4 shadow-sm hover:shadow-bento transition-all duration-500">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
               </div>
               <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Ocupación</h4>
                  <p className="text-xl font-extrabold tracking-tight text-foreground">1,240 <span className="text-xs text-muted-foreground font-bold">Alumnos</span></p>
               </div>
            </div>
          </motion.div>
        </motion.div>

        {/* MAIN VIEW: CAREER GRID */}
        <div className="xl:col-span-3">
          {filteredCareers.length === 0 ? (
            <motion.div variants={fadeInUp} className="bg-card rounded-[24px] border border-border p-20 text-center shadow-sm">
              <div className="w-16 h-16 bg-muted text-muted-foreground rounded-2xl flex items-center justify-center mx-auto mb-6 border border-border shadow-sm">
                <BookMarked className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-foreground tracking-tight mb-2">No se encontraron carreras</h3>
              <p className="text-muted-foreground max-w-sm mx-auto text-sm font-medium">Revisa los filtros de búsqueda o crea una nueva trayectoria curricular.</p>
              <Button variant="outline" onClick={() => setSearchTerm("")} className="mt-6 h-10 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-foreground hover:bg-muted transition-colors">Limpiar Filtros</Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCareers.map((career: any) => (
                <motion.div key={career.id} variants={fadeInUp}>
                  <Card className="rounded-[24px] border-border shadow-sm overflow-hidden glass-surface h-full flex flex-col hover:shadow-bento hover:border-primary/30 transition-all duration-500">
                    <CardHeader className="p-6 pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="space-y-1.5">
                          <Badge variant="outline" className="bg-muted text-muted-foreground text-[9px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider border-border">
                             Trayectoria
                          </Badge>
                          <CardTitle className="text-xl font-extrabold text-foreground tracking-tight leading-tight">
                            {career.title}
                          </CardTitle>
                        </div>
                        <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center border border-primary/20 shadow-sm">
                           <MonitorPlay className="w-5 h-5" />
                        </div>
                      </div>
                      <CardDescription className="text-muted-foreground text-sm font-medium leading-relaxed line-clamp-2">
                        {career.description || 'Programa oficial Omega 2026.'}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="p-6 pt-0 flex-grow">
                      <div className="flex items-center justify-between mb-4">
                         <div className="flex items-center gap-2">
                            <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Módulos</h4>
                            <Badge className="bg-muted text-foreground border-border text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                               {career.subjects.length}
                            </Badge>
                         </div>
                         <div className="h-px bg-border flex-grow mx-4"></div>
                      </div>

                      <ScrollArea className={`${career.subjects.length > 3 ? 'h-[240px]' : 'h-auto'} pr-3 -mr-3`}>
                        <div className="space-y-3">
                          {career.subjects.map((subject: any) => (
                            <div key={subject.id} className="p-4 bg-background/50 rounded-xl border border-border hover:bg-background hover:border-primary/40 hover:shadow-sm transition-colors flex justify-between items-center group/item">
                              <div className="space-y-1.5">
                                <p className="font-extrabold text-sm text-foreground tracking-tight group-hover/item:text-primary transition-colors">{subject.title}</p>
                                <div className="flex items-center flex-wrap gap-2">
                                  <div className="flex items-center gap-1.5 py-0.5 px-2 bg-muted rounded-md border border-border">
                                    <Avatar className="w-4 h-4 border border-border">
                                      <AvatarFallback className="bg-primary text-primary-foreground font-bold text-[8px] uppercase">
                                        {subject.teacher?.full_name.charAt(0) || "U"}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{subject.teacher?.full_name.split(' ')[0] || 'TBD'}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 py-0.5 px-2 bg-emerald-500/10 rounded-md border border-emerald-500/20">
                                    <Users className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                                    <span className="text-[9px] font-extrabold text-emerald-600 dark:text-emerald-400">{subject._count?.enrollments || 0}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 py-0.5 px-2 bg-accent/10 rounded-md border border-accent/20">
                                    <DollarSign className="w-3 h-3 text-accent" />
                                    <span className="text-[9px] font-extrabold text-foreground">${subject.price?.toLocaleString('es-AR') || 0}</span>
                                  </div>
                                </div>
                              </div>
                              <Button variant="ghost" size="icon" asChild className="h-8 w-8 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                                 <Link href={`/director/academia/materia/${subject.id}`}>
                                    <ArrowUpRight className="w-4 h-4 group-hover/item:scale-110 transition-transform" />
                                 </Link>
                              </Button>
                            </div>
                          ))}
                          
                          {career.subjects.length === 0 && (
                            <div className="py-8 text-center rounded-xl border border-dashed border-border bg-muted/20">
                               <Award className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                               <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Malla Curricular Vacía</p>
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                    </CardContent>

                    <CardFooter className="p-6 pt-4 mt-auto border-t border-border">
                       <div className="flex justify-between items-center w-full">
                          <Button variant="ghost" className="h-8 px-3 rounded-lg text-[10px] font-bold text-muted-foreground hover:text-primary uppercase tracking-widest gap-2 transition-colors">
                             <Settings className="w-3.5 h-3.5" /> Ajustes
                          </Button>
                          <div className="flex -space-x-2">
                             {[1,2,3].map(i => (
                               <div key={i} className="w-6 h-6 rounded-md border border-border bg-muted flex items-center justify-center text-[8px] font-extrabold text-muted-foreground">
                                 {String.fromCharCode(64 + i)}
                               </div>
                             ))}
                          </div>
                       </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
