import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { 
  Plus, 
  Trash2, 
  Video, 
  FileText, 
  ChevronLeft, 
  Layout, 
  BookOpen, 
  Clock, 
  Settings, 
  ExternalLink, 
  Save,
  Sparkles,
  ArrowRight,
  MonitorPlay,
  FileCode,
  Shapes,
  Library,
  BookMarked
} from "lucide-react";
import Link from "next/link";
import { createTopic, createLesson, deleteTopic, deleteLesson } from "../../actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export const dynamic = 'force-dynamic';

export default async function MateriaGestionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

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

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-40">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      {/* Header Contextual - Gestión Académica */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-5">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" asChild className="h-10 w-10 rounded-xl border-border hover:border-primary hover:bg-primary/5 transition-colors group shrink-0">
                <Link href="/docente">
                   <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              </Button>
              <div className="space-y-0.5">
                <nav className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">
                   <span>{subject.career?.title || 'Especialidad'}</span>
                   <div className="w-1 h-1 bg-border rounded-full"></div>
                   <span className="text-primary">Gestión de Cátedra</span>
                </nav>
                <h1 className="text-2xl font-extrabold text-foreground tracking-tight leading-none">{subject.title}</h1>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
               <Button variant="outline" asChild className="h-10 px-4 border-border rounded-xl font-bold text-xs hover:bg-muted transition-colors flex items-center gap-2">
                  <Link href={`/curso/${id}`} target="_blank">
                     <ExternalLink className="w-4 h-4 text-primary" /> Vista Alumno
                  </Link>
               </Button>
               
               <form action={async (formData) => {
                 'use server';
                 const title = formData.get('title') as string;
                 if (title) await createTopic(id, title);
               }} className="flex-grow flex items-center gap-2">
                  <Input 
                    name="title" 
                    placeholder="Nuevo Módulo..." 
                    className="h-10 bg-background border-border px-4 rounded-xl text-sm font-bold placeholder:font-medium placeholder:text-muted-foreground focus:ring-primary shadow-sm"
                    required
                  />
                  <Button type="submit" className="h-10 px-5 bg-foreground hover:bg-primary text-background hover:text-primary-foreground rounded-xl font-bold text-xs shadow-sm transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Agregar</span>
                  </Button>
               </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area - Grid of Topics */}
      <main className="max-w-[1400px] mx-auto px-6 md:px-8 py-12">
        <div className="grid grid-cols-1 gap-12">
          {subject.topics.map((topic) => (
            <section key={topic.id} className="relative group/topic">
              <div className="absolute -left-[30px] top-4 bottom-0 w-px bg-border hidden xl:block"></div>
              
              <div className="glass-surface rounded-2xl border border-border shadow-sm bg-card overflow-hidden transition-all hover:shadow-bento hover:border-primary/30">
                {/* Header del Tema */}
                <div className="bg-muted/30 px-6 py-5 border-b border-border flex justify-between items-center transition-colors">
                  <div className="flex items-center gap-5">
                    <div className="relative">
                       <div className="w-12 h-12 bg-background border border-border shadow-sm rounded-xl flex items-center justify-center font-extrabold text-foreground text-lg transition-colors group-hover/topic:border-primary/50">
                        {topic.order < 10 ? `0${topic.order}` : topic.order}
                       </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1 flex items-center gap-1.5">
                        <Shapes className="w-3 h-3" /> Módulo de Estudio
                      </p>
                      <h3 className="text-xl font-extrabold text-foreground tracking-tight leading-none">{topic.title}</h3>
                    </div>
                  </div>
                  <form action={async () => {
                    'use server';
                    await deleteTopic(topic.id, id);
                  }}>
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </form>
                </div>

                {/* Lista de Lecciones */}
                <div className="divide-y divide-border">
                   {topic.lessons.length > 0 ? (
                    topic.lessons.map((lesson) => (
                      <div key={lesson.id} className="px-6 py-4 hover:bg-muted/20 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group/lesson">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-muted/50 border border-border rounded-xl flex items-center justify-center text-muted-foreground group-hover/lesson:bg-primary/10 group-hover/lesson:text-primary transition-colors">
                            {lesson.content_url?.includes('video') || lesson.content_url?.match(/\.(mp4|mov|avi|wmv|flv|mkv)$/i) ? <MonitorPlay className="w-4 h-4" /> : <FileCode className="w-4 h-4" />}
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-sm font-bold text-foreground transition-colors leading-tight">{lesson.title}</h4>
                            <div className="flex items-center gap-3">
                               <span className="text-[10px] font-bold text-muted-foreground flex items-center gap-1.5 uppercase tracking-wider">
                                 <Clock className="w-3 h-3" /> 15 MIN
                               </span>
                               {lesson.content_url && (
                                 <Badge variant="outline" className="text-[9px] font-bold text-emerald-600 bg-emerald-500/10 border-emerald-500/20 max-w-[200px] truncate">
                                   Recurso Cargado
                                 </Badge>
                               )}
                            </div>
                          </div>
                        </div>
                        <form action={async () => {
                          'use server';
                          await deleteLesson(lesson.id, id);
                        }}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </form>
                      </div>
                    ))
                  ) : (
                    <div className="px-8 py-10 text-center bg-muted/10">
                       <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest leading-relaxed">Sin lecciones<br/>en este módulo.</p>
                    </div>
                  )}

                  {/* Formulario para Nueva Lección */}
                   <div className="bg-muted/10 p-6 border-t border-border">
                    <div className="flex items-center gap-2 mb-6">
                       <h4 className="text-[11px] font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
                        <Plus className="w-3.5 h-3.5 text-primary" /> Agregar Lección
                       </h4>
                    </div>
                    
                    <form action={createLesson} className="space-y-6">
                      <input type="hidden" name="topicId" value={topic.id} />
                      <input type="hidden" name="subjectId" value={id} />
 
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">
                             Título de la lección
                          </label>
                          <Input 
                            name="title" 
                            placeholder="Ej: Introducción a la materia" 
                            className="h-10 bg-background border-border px-4 rounded-xl text-sm outline-none shadow-sm focus:ring-primary transition-colors"
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">
                             Descripción
                          </label>
                          <Input 
                            name="desc" 
                            placeholder="Breve resumen (opcional)" 
                            className="h-10 bg-background border-border px-4 rounded-xl text-sm outline-none shadow-sm focus:ring-primary transition-colors"
                          />
                        </div>
                      </div>
 
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 bg-background rounded-2xl border border-border shadow-sm">
                        <div className="space-y-3">
                           <div className="flex items-center gap-1.5 mb-1">
                              <ExternalLink className="w-3.5 h-3.5 text-primary" />
                              <span className="text-[10px] font-bold text-foreground uppercase tracking-widest">Enlace Externo / Video URL</span>
                           </div>
                           <Input 
                            name="url" 
                            placeholder="https://..." 
                            className="h-10 bg-muted/50 border-border px-4 rounded-xl text-xs font-mono"
                          />
                        </div>
 
                        <div className="space-y-3 lg:pl-6 lg:border-l lg:border-border">
                           <div className="flex items-center gap-1.5 mb-1">
                              <MonitorPlay className="w-3.5 h-3.5 text-emerald-500" />
                              <span className="text-[10px] font-bold text-foreground uppercase tracking-widest">Archivo Local (MP4)</span>
                           </div>
                           <input 
                             type="file"
                             name="videoFile"
                             accept="video/*"
                             className="w-full text-xs text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-foreground file:text-background hover:file:bg-primary transition-colors cursor-pointer bg-muted/30 rounded-xl p-1 border border-border"
                           />
                        </div>
                      </div>
 
                      <div className="flex justify-end pt-2">
                        <Button type="submit" className="h-10 px-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold text-xs shadow-sm transition-colors gap-2">
                          <Save className="w-4 h-4" /> Guardar Lección
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          ))}

          {subject.topics.length === 0 && (
            <div className="text-center py-20 bg-card rounded-3xl border border-border shadow-sm">
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-border">
                <Library className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-extrabold text-foreground tracking-tight mb-2">Sin Módulos</h3>
              <p className="text-muted-foreground max-w-sm mx-auto mb-8 font-medium text-sm">Comienza agregando un módulo a tu materia para empezar a subir contenido.</p>
              
              <form action={async (formData) => {
                 'use server';
                 const title = formData.get('title') as string;
                 if (title) await createTopic(id, title);
               }} className="flex flex-col sm:flex-row justify-center items-center gap-3 px-6">
                  <Input 
                    name="title" 
                    placeholder="Nombre del primer módulo" 
                    className="max-w-xs h-12 bg-background border-border px-5 rounded-xl text-sm font-bold shadow-sm"
                    required
                  />
                   <Button type="submit" className="h-12 px-6 bg-foreground hover:bg-primary text-background hover:text-primary-foreground rounded-xl font-bold text-xs shadow-sm transition-colors gap-2">
                    <Plus className="w-4 h-4" /> Crear
                  </Button>
               </form>
            </div>
          )}
        </div>
      </main>

      {/* Floating Status Bar */}
       <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-50 hidden md:block">
        <div className="glass-surface bg-background/90 text-foreground rounded-2xl p-3 shadow-bento-hover border border-border flex items-center justify-between">
           <div className="flex items-center gap-4 px-2">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                 <BookMarked className="w-4 h-4 text-primary" />
              </div>
              <div>
                 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">Métricas</p>
                 <div className="flex items-center gap-2">
                    <p className="text-sm font-extrabold tracking-tight">
                       {subject.topics.length} <span className="text-muted-foreground text-[10px] font-bold">Mód.</span>
                    </p>
                    <div className="w-1 h-1 bg-border rounded-full"></div>
                    <p className="text-sm font-extrabold tracking-tight">
                       {subject.topics.reduce((acc, t) => acc + t.lessons.length, 0)} <span className="text-muted-foreground text-[10px] font-bold">Clases</span>
                    </p>
                 </div>
              </div>
           </div>
           <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:bg-muted rounded-lg transition-colors mr-1">
              <Settings className="w-4 h-4" />
           </Button>
        </div>
      </div>
    </div>
  );
}
