"use client";

import { motion } from "framer-motion";
import { 
  Rocket, 
  BookOpen, 
  Star, 
  ChevronRight, 
  Zap, 
  Target, 
  Search,
  CheckCircle2,
  CreditCard,
  Layers
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface CatalogoClientProps {
  careers: any[];
}

export default function CatalogoClient({ careers }: CatalogoClientProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInscripcion = async (subjectId: string) => {
    setLoadingId(subjectId);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject_id: subjectId })
      });

      const data = await res.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        toast.error("Error al generar el link de pago");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error de conexión con la pasarela de pagos.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="w-full min-h-screen bg-background font-sans p-6 md:p-10">
      
      {/* Header Catalogo */}
      <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full shadow-sm">
           <Star className="w-3.5 h-3.5 text-accent" />
           <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Catálogo Oficial</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight leading-[1.1]">
          Impulsa tu <span className="text-primary">carrera.</span>
        </h1>
        <p className="text-muted-foreground text-base md:text-lg font-medium max-w-2xl mx-auto">
          Accede a módulos de alto rendimiento diseñados por especialistas para garantizar tu éxito profesional y académico.
        </p>
      </div>

      {/* Search Filter */}
      <div className="max-w-2xl mx-auto relative mb-20 group">
         <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
         <div className="relative flex items-center glass-surface p-4 rounded-2xl shadow-sm border border-border focus-within:border-primary/50 focus-within:shadow-bento transition-all">
            <Search className="w-5 h-5 text-muted-foreground ml-3" />
            <input 
              type="text" 
              placeholder="Buscar asignaturas, módulos o áreas..."
              className="flex-1 bg-transparent px-4 outline-none font-bold text-sm text-foreground placeholder:text-muted-foreground/50 placeholder:font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
      </div>

      {/* Grid de Carreras */}
      <div className="space-y-24 max-w-7xl mx-auto">
        {careers.map((career) => {
          const filteredSubjects = career.subjects.filter((s: any) => s.title.toLowerCase().includes(searchTerm.toLowerCase()));
          
          if (filteredSubjects.length === 0 && searchTerm !== "") return null;

          return (
            <div key={career.id} className="space-y-10">
              <div className="flex items-center gap-4 px-2">
                 <div className="w-2 h-8 bg-primary rounded-full shadow-[0_0_10px_rgba(159,18,57,0.5)]"></div>
                 <h2 className="text-2xl font-extrabold text-foreground uppercase tracking-tight">
                    {career.title}
                 </h2>
                 <div className="h-px bg-border flex-1 ml-4 hidden sm:block"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSubjects.map((subject: any) => (
                  <motion.div 
                    key={subject.id} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-surface p-6 rounded-[24px] border border-border hover:border-primary/40 shadow-sm hover:shadow-bento-hover transition-all duration-500 group flex flex-col relative overflow-hidden"
                  >
                     <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors duration-700 pointer-events-none"></div>

                     <div className="flex justify-between items-start mb-6 relative z-10">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-[14px] flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                           <BookOpen className="w-6 h-6" />
                        </div>
                        <div className="flex gap-1 bg-accent/10 px-2 py-1 rounded-md">
                           {[1, 2, 3, 4, 5].map((s) => (
                             <Star key={s} className="w-3 h-3 text-accent fill-current" />
                           ))}
                        </div>
                     </div>
                     
                     <div className="space-y-2 mb-6 relative z-10 flex-1">
                       <h3 className="text-xl font-extrabold text-foreground leading-tight group-hover:text-primary transition-colors">{subject.title}</h3>
                       <p className="text-muted-foreground text-xs font-medium line-clamp-3 leading-relaxed">{subject.description || "Módulo intensivo especializado. Todo lo que necesitas para aprobar está aquí."}</p>
                     </div>

                     <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                        <span className="flex items-center gap-1.5 text-[10px] font-bold bg-muted text-muted-foreground px-2.5 py-1 rounded-md uppercase tracking-wider">
                           <Layers className="w-3 h-3 text-foreground" /> {subject._count?.topics || 0} Capítulos
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-md uppercase tracking-wider">
                           <CheckCircle2 className="w-3 h-3" /> Certificado
                        </span>
                     </div>
                     
                     <div className="pt-6 mt-auto relative z-10 border-t border-border">
                        <div className="flex items-end justify-between mb-6">
                           <div className="space-y-0.5">
                              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Inversión</p>
                              <p className="text-2xl font-extrabold text-foreground">${subject.price ? subject.price.toLocaleString('es-AR') : '25.000'}</p>
                           </div>
                        </div>
                        
                        <button 
                          onClick={() => handleInscripcion(subject.id)}
                          disabled={loadingId === subject.id}
                          className="w-full bg-foreground text-background hover:bg-primary py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-70 group/btn"
                        >
                           {loadingId === subject.id ? (
                             <div className="w-4 h-4 border-2 border-background/20 border-t-background rounded-full animate-spin"></div>
                           ) : (
                             <>Iniciar Inscripción <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" /></>
                           )}
                        </button>
                     </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Pro CTA */}
      <div className="mt-24 max-w-5xl mx-auto glass-surface rounded-[32px] p-12 md:p-16 text-center relative overflow-hidden border border-primary/20 shadow-bento-hover">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -mr-40 -mt-40 pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 blur-[100px] rounded-full -ml-40 -mb-40 pointer-events-none" />
         
         <div className="relative z-10 space-y-6">
            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto shadow-sm border border-border">
                <Target className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-3">
               <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">¿Necesitas apoyo <span className="text-primary">extremo?</span></h3>
               <p className="text-muted-foreground text-sm md:text-base font-medium max-w-2xl mx-auto">
                 Atención personalizada uno-a-uno con el staff docente más prestigioso del sector. Resolvé tus dudas en tiempo récord.
               </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 font-bold text-xs uppercase tracking-wider">
               <button className="bg-foreground text-background px-8 py-3.5 rounded-xl hover:bg-foreground/90 transition-all shadow-sm">
                 Consultas Particulares
               </button>
               <button className="bg-muted text-foreground hover:bg-accent hover:text-accent-foreground px-8 py-3.5 rounded-xl transition-all shadow-sm flex items-center gap-2 justify-center group">
                 <CreditCard className="w-4 h-4" /> Medios de Pago
               </button>
            </div>
         </div>
      </div>

    </div>
  );
}
