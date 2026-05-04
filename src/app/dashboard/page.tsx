import { db } from "@/lib/db";
import { GraduationCap } from "lucide-react";
import Link from "next/link";
import DashboardAlumnoClient from "./DashboardAlumnoClient";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

async function getAlumnoData(userId: string) {
  const student = await db.user.findUnique({
    where: { id: userId },
    include: {
      enrollments: {
        include: {
          subject: {
            include: { career: true }
          }
        }
      },
      sessions_as_student: {
        where: { status: "scheduled" },
        include: { teacher: true, subject: true },
        orderBy: { start_time: "asc" },
        take: 3
      }
    }
  });

  return student;
}

export default async function DashboardAlumnoPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const student = await getAlumnoData(user.id);

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center">
        <GraduationCap className="w-16 h-16 text-slate-200 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 font-heading">Todavía no tienes cursos activos</h2>
        <p className="text-slate-500 max-w-sm mb-8 font-medium">Explora nuestro catálogo y comienza tu camino a la excelencia académica hoy mismo.</p>
        <Link href="/dashboard/catalogo" className="bg-primary text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:shadow-2xl transition-all">
          Ver Catálogo de Carreras
        </Link>
      </div>
    );
  }

  return <DashboardAlumnoClient student={student} />;
}
