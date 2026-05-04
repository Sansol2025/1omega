import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { PlayCircle, FileText, ChevronRight, BookOpen, Lock, Sparkles, ArrowLeft, Clock, MonitorPlay, GraduationCap, Zap, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import LessonPlayer from "@/components/LessonPlayer";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lessonId?: string }>;
}

export default async function CourseRoomPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { lessonId } = await searchParams;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const subject = await db.subject.findUnique({
    where: { id },
    include: {
      career: true,
      topics: {
        orderBy: { order: 'asc' },
        include: {
          lessons: {
            orderBy: { order: 'asc' }
          }
        }
      }
    }
  });

  if (!subject) notFound();

  // Verificar inscripción para Estudiantes
  const dbUser = await db.user.findUnique({ where: { id: user.id } });
  
  if (dbUser?.role === "student") {
    const enrollment = await db.enrollment.findUnique({
      where: {
        user_id_subject_id: {
          user_id: user.id,
          subject_id: id
        }
      }
    });

    if (!enrollment) {
      redirect("/dashboard/catalogo");
    }
  } else if (dbUser?.role === "teacher" && subject.teacher_id !== user.id) {
    // Si es docente pero no el titular de esta materia
    redirect("/docente");
  } else if (dbUser?.role !== "super_admin" && dbUser?.role !== "teacher") {
    redirect("/login");
  }

  // Encontrar la lección actual
  const allLessons = subject.topics.flatMap(t => t.lessons);
  let currentLesson = null;
  
  if (lessonId) {
    currentLesson = allLessons.find(l => l.id === lessonId);
  }
  
  if (!currentLesson && allLessons.length > 0) {
    currentLesson = allLessons[0];
  }

  return (
    <div className="flex h-screen flex-col bg-background font-sans overflow-hidden selection:bg-primary/20 selection:text-primary">
      
      {/* HEADER - GESTIÓN ACADÉMICA */}
      <header className="glass-surface px-6 py-4 flex items-center justify-between shrink-0 shadow-sm border-b border-border relative z-50">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="w-10 h-10 flex items-center justify-center bg-muted/50 hover:bg-muted rounded-xl border border-border transition-colors group">
            <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                 Cátedra Omega
              </span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                <GraduationCap className="w-3 h-3" /> {subject.career?.title || "Troncal Académica"}
              </span>
            </div>
            <h1 className="text-xl font-extrabold text-foreground leading-none tracking-tight">
              {subject.title}
            </h1>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Progreso Global</span>
              <div className="flex items-center gap-3">
                 <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[45%] rounded-full"></div>
                 </div>
                 <span className="text-xs font-bold text-foreground">45%</span>
              </div>
           </div>
           <div className="w-px h-8 bg-border mx-2"></div>
           <Link href="/dashboard" className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 shadow-sm hover:border-primary transition-colors">
             <img src="https://i.pravatar.cc/150?u=student" alt="Alumno" className="object-cover w-full h-full" />
           </Link>
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        
        {/* MAIN CANVAS: LESSON AREA */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-slate-50 dark:bg-black/20 relative">
          
          <div className="p-6 md:p-10 lg:p-12 space-y-8 max-w-5xl mx-auto w-full">
            {currentLesson ? (
              <div className="space-y-8">
                
                {/* Reproductor */}
                <div className="relative rounded-[24px] overflow-hidden shadow-bento-hover border border-border/50 bg-black group">
                   <div className="aspect-video relative z-10">
                      <LessonPlayer 
                        url={currentLesson.content_url} 
                        title={currentLesson.title} 
                      />
                   </div>
                   <div className="absolute top-4 left-4 z-20 pointer-events-none">
                      <span className="bg-black/60 backdrop-blur-md border border-white/10 text-white font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-2">
                         <MonitorPlay className="w-3.5 h-3.5 text-primary" /> Alta Resolución
                      </span>
                   </div>
                </div>

                {/* Detalles de la Clase */}
                <div className="glass-surface rounded-[24px] p-8 md:p-10 border border-border shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-16 bg-primary rounded-br-2xl" />
                  
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 pl-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Lección Actual</span>
                        <div className="w-1 h-1 rounded-full bg-border"></div>
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Visto
                        </span>
                      </div>
                      <h2 className="text-2xl font-extrabold text-foreground tracking-tight leading-tight">{currentLesson.title}</h2>
                    </div>
                    
                    <button className="h-12 px-6 bg-secondary text-secondary-foreground hover:bg-foreground hover:text-background rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all flex items-center gap-2 shadow-sm group">
                      <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" /> 
                      Recursos
                    </button>
                  </div>
                  
                  <div className="pl-4">
                    <div className="p-5 bg-muted/30 rounded-xl border border-border/50">
                      <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                        {currentLesson.description || "Esta lección no incluye descripción adicional. Concéntrate en el video para aprender el contenido."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ADVISORY/NEXT BOX */}
                <div className="flex gap-4 cursor-pointer">
                   <div className="flex-1 p-6 bg-primary rounded-[20px] text-primary-foreground flex items-center justify-between border-none shadow-bento hover:shadow-bento-hover group transition-all relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors"></div>
                      <div className="flex items-center gap-5 relative z-10">
                         <div className="w-12 h-12 bg-black/20 rounded-xl flex items-center justify-center border border-white/10">
                            <Sparkles className="w-6 h-6 text-brand-gold" />
                         </div>
                         <div>
                            <p className="text-[10px] font-bold tracking-widest text-primary-foreground/70 uppercase">Siguiente Módulo</p>
                            <p className="text-base font-extrabold tracking-tight">Evaluación Diagnóstica</p>
                         </div>
                      </div>
                      <ChevronRight className="w-6 h-6 text-primary-foreground/50 group-hover:text-white transition-all group-hover:translate-x-1 relative z-10" />
                   </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
                <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center border border-border shadow-sm">
                   <Lock className="w-10 h-10 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-foreground tracking-tight">Módulo Bloqueado</h3>
                  <p className="text-muted-foreground max-w-sm font-medium text-sm leading-relaxed mx-auto">
                    Este contenido aún no está disponible o requiere que completes las unidades anteriores.
                  </p>
                </div>
                <Link href="/dashboard" className="px-8 py-3 bg-foreground text-background rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm hover:bg-foreground/90 transition-colors">
                  Volver al Portal
                </Link>
              </div>
            )}
          </div>
        </main>

        {/* SIDEBAR: SYLLABUS EDITORIAL */}
        <aside className="w-full md:w-[24rem] lg:w-[26rem] bg-background border-t md:border-t-0 md:border-l border-border flex flex-col shrink-0 relative z-40 shadow-[-10px_0_30px_rgba(0,0,0,0.02)]">
          <div className="p-6 border-b border-border bg-muted/20">
            <h3 className="text-[11px] font-bold text-foreground flex items-center gap-2 uppercase tracking-widest">
              <BookOpen className="w-4 h-4 text-primary" /> Estructura del Curso
            </h3>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {subject.topics.map((topic, topicIdx) => (
              <div key={topic.id} className="border-b border-border/50 last:border-0 relative">
                <div className="px-6 py-5 bg-muted/10 group cursor-default">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-extrabold text-muted-foreground leading-none">SECCIÓN {topicIdx + 1}</span>
                    <div className="h-px flex-1 bg-border/50"></div>
                  </div>
                  <h4 className="text-base font-extrabold text-foreground tracking-tight">{topic.title}</h4>
                </div>
                <div className="flex flex-col">
                  {topic.lessons.map((lesson, lessonIdx) => {
                    const isActive = currentLesson?.id === lesson.id;
                    return (
                      <Link
                        key={lesson.id}
                        href={`/curso/${id}?lessonId=${lesson.id}`}
                        className={`group flex items-start gap-4 px-6 py-5 transition-all relative ${
                          isActive 
                          ? 'bg-primary/5' 
                          : 'hover:bg-muted/30'
                        }`}
                      >
                        {isActive && (
                          <div className="absolute left-0 top-0 w-1 h-full bg-primary rounded-r-full" />
                        )}
                        
                        <div className={`mt-0.5 shrink-0 w-10 h-10 rounded-[10px] flex items-center justify-center transition-all duration-300 border ${
                          isActive 
                          ? 'bg-primary text-primary-foreground border-primary shadow-sm' 
                          : 'bg-background text-muted-foreground border-border group-hover:border-primary/40 group-hover:text-primary'
                        }`}>
                          <PlayCircle className={`w-5 h-5 ${isActive ? 'fill-primary-foreground/20' : ''}`} />
                        </div>

                        <div className="flex-1 space-y-1.5">
                          <p className={`text-sm font-bold leading-snug tracking-tight transition-colors ${
                            isActive ? 'text-primary' : 'text-foreground group-hover:text-primary'
                          }`}>
                            {lesson.title}
                          </p>
                          <div className="flex items-center gap-3">
                             <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground">
                                <Clock className="w-3 h-3" /> 
                                <span>15 MIN</span>
                             </div>
                             {isActive && (
                               <span className="bg-primary/20 text-primary border-none text-[8px] font-extrabold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                                 ACTUAL
                               </span>
                             )}
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}

            {subject.topics.length === 0 && (
               <div className="p-12 text-center space-y-3">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto border border-border opacity-50">
                    <BookOpen className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Sin contenido modular</p>
               </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
