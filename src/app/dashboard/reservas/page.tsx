import { db } from "@/lib/db";
import { Calendar, Clock, User, BookOpen, ChevronLeft, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

async function getReservationData() {
  // Demo: primer alumno y profesores disponibles
  const student = await db.user.findFirst({
    where: { role: "student" }
  });

  const teachers = await db.user.findMany({
    where: { role: "teacher" }
  });

  const subjects = await db.subject.findMany({
    include: { career: true }
  });

  return { student, teachers, subjects };
}

export default async function ReservasPage() {
  const { student, teachers, subjects } = await getReservationData();

  if (!student) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-2xl font-bold">No se encontró perfil de alumno.</h2>
      </div>
    );
  }

  async function handleCreateReservation(formData: FormData) {
    'use server';
    const teacherId = formData.get('teacherId') as string;
    const subjectId = formData.get('subjectId') as string;
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;

    const start = new Date(`${date}T${time}:00`);
    const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hora por defecto

    await db.privateSession.create({
      data: {
        student_id: student!.id,
        teacher_id: teacherId,
        subject_id: subjectId || null,
        start_time: start,
        end_time: end,
        status: "scheduled",
        meeting_url: "https://meet.google.com/new" // Generado dinámicamente en producción
      }
    });

    revalidatePath('/dashboard');
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-primary transition-all mb-8">
           <ChevronLeft className="w-4 h-4" /> Volver al Dashboard
        </Link>
        
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl overflow-hidden">
          <div className="bg-slate-900 p-10 text-white relative overflow-hidden">
             <div className="relative z-10">
                <span className="bg-primary/20 text-primary text-[10px] font-bold px-3 py-1 rounded-full border border-primary/30 flex items-center gap-2 w-fit mb-4">
                  <Sparkles className="w-3 h-3" /> SERVICIO PREMIUM
                </span>
                <h1 className="text-4xl font-extrabold tracking-tight mb-2">Reserva tu Clase Particular</h1>
                <p className="text-slate-400 text-lg">Elige a tu mentor preferido y el horario que mejor se adapte a tu ritmo de estudio.</p>
             </div>
             <Calendar className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 -rotate-12" />
          </div>

          <form action={handleCreateReservation} className="p-10 space-y-10">
            {/* Paso 1: Materia y Profesor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                  <BookOpen className="w-4 h-4 text-primary" /> Materia a Reforzar
                </label>
                <select 
                  name="subjectId" 
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all appearance-none cursor-pointer font-bold text-slate-700"
                  required
                >
                  <option value="">Selecciona materia...</option>
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.title} ({s.career?.title})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                  <User className="w-4 h-4 text-indigo-500" /> Seleccionar Profesor
                </label>
                <select 
                  name="teacherId" 
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all appearance-none cursor-pointer font-bold text-slate-700"
                  required
                >
                  <option value="">Cualquier docente disponible</option>
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.full_name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Paso 2: Fecha y Hora */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-3">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                    <Calendar className="w-4 h-4 text-emerald-500" /> Fecha de la Clase
                  </label>
                  <input 
                    type="date" 
                    name="date" 
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-bold text-slate-700"
                    required
                  />
               </div>
               <div className="space-y-3">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                    <Clock className="w-4 h-4 text-amber-500" /> Horario (Sesión de 1hs)
                  </label>
                  <input 
                    type="time" 
                    name="time" 
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all font-bold text-slate-700"
                    required
                  />
               </div>
            </div>

            {/* Info Card */}
            <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100 flex items-start gap-4">
               <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
               </div>
               <div>
                  <h4 className="font-bold text-indigo-900 text-sm mb-1">Confirmación Instantánea</h4>
                  <p className="text-xs text-indigo-700 leading-relaxed">
                    Al confirmar, recibirás un link de Google Meet por correo y la clase aparecerá en tu dashboard. Las cancelaciones deben realizarse con un mínimo de 24hs de antelación.
                  </p>
               </div>
            </div>

            <button className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg tracking-tight hover:bg-black transition-all shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-[0.98]">
              CONFIRMAR RESERVA <Sparkles className="w-6 h-6 text-white/50" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
