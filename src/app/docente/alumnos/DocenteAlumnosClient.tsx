"use client";

import { motion, Variants } from "framer-motion";
import { 
  Users, 
  Search, 
  Mail, 
  MessageCircle, 
  GraduationCap, 
  ShieldCheck,
  User
} from "lucide-react";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
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

interface Alumno {
  id: string;
  full_name: string;
  email: string;
  subjectName: string;
}

export default function DocenteAlumnosClient({ students }: { students: Alumno[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter(s => 
    s.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.subjectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-12 pb-24 relative"
    >
      {/* BLOOMS ATMOSFÉRICOS */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      {/* HEADER - GESTIÓN DE TALENTO */}
      <motion.div variants={fadeInUp} className="flex flex-col xl:flex-row justify-between items-end gap-8 px-2">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-4 py-1.5 bg-muted text-muted-foreground text-[10px] font-bold uppercase tracking-widest rounded-lg border-border shadow-sm">
               <Users className="w-4 h-4 mr-2 text-primary" /> Registro de Estudiantes
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight leading-[1.1]">
            Gestión de <span className="text-primary">Talento.</span>
          </h1>
          <p className="text-muted-foreground font-medium max-w-xl text-lg leading-relaxed">
            Monitorea el progreso y brinda atención personalizada a tus <span className="text-foreground font-bold">estudiantes activos</span>.
          </p>
        </div>

        <div className="relative w-full xl:w-96 group">
          <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Buscar por nombre o módulo..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-14 pl-14 pr-6 bg-background border-border rounded-2xl shadow-sm focus:ring-primary text-sm font-bold tracking-tight relative z-10 transition-colors"
          />
        </div>
      </motion.div>

      {/* GRID DE ALUMNOS - BENTO CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredStudents.map((student) => (
          <motion.div key={student.id} variants={fadeInUp}>
            <Card className="rounded-[24px] border-border shadow-sm hover:shadow-bento hover:border-primary/30 transition-all duration-500 group relative overflow-hidden glass-surface">
               <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-10 -mt-10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
               
               <CardContent className="p-8 text-center space-y-6">
                  <div className="relative inline-block">
                    <Avatar className="w-20 h-20 rounded-2xl border-2 border-border shadow-sm mx-auto relative z-10 transition-transform duration-500 group-hover:scale-105">
                       <AvatarFallback className="bg-muted text-muted-foreground font-extrabold text-2xl">
                         {student.full_name.charAt(0)}
                       </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-background rounded-xl flex items-center justify-center shadow-sm border border-border z-20 group-hover:border-emerald-500/30 transition-colors">
                       <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-xl font-extrabold text-foreground tracking-tight leading-tight group-hover:text-primary transition-colors">
                      {student.full_name}
                    </h3>
                    <div className="flex items-center justify-center gap-2">
                      <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-widest bg-muted border-border py-0.5 px-2.5 rounded-md text-muted-foreground">
                        <GraduationCap className="w-3 h-3 mr-1.5" /> {student.subjectName}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                     <Button variant="outline" className="h-10 flex-1 rounded-xl border-border text-[10px] font-bold uppercase tracking-wider gap-2 hover:bg-muted transition-colors">
                        <Mail className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary" /> Email
                     </Button>
                     <Button className="h-10 flex-1 bg-foreground hover:bg-primary text-background hover:text-primary-foreground rounded-xl border-none text-[10px] font-bold uppercase tracking-wider gap-2 shadow-sm transition-colors">
                        <MessageCircle className="w-3.5 h-3.5" /> Chat
                     </Button>
                  </div>
               </CardContent>

               <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </Card>
          </motion.div>
        ))}

        {filteredStudents.length === 0 && (
          <motion.div variants={fadeInUp} className="col-span-full py-24 bg-card border-2 border-dashed border-border rounded-[24px] text-center space-y-4">
             <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto shadow-sm text-muted-foreground border border-border">
                <User className="w-8 h-8" />
             </div>
             <p className="text-muted-foreground font-medium text-sm">No se encontraron estudiantes para esa búsqueda.</p>
             <Button variant="ghost" onClick={() => setSearchTerm("")} className="font-bold text-[10px] uppercase tracking-widest text-primary hover:bg-primary/10">Limpiar Filtros</Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
