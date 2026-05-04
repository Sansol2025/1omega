import { db } from "@/lib/db";
import DocenteAlumnosClient from "./DocenteAlumnosClient";

export const dynamic = 'force-dynamic';

async function getDocenteAlumnos() {
  const teacher = await db.user.findFirst({
    where: { role: 'teacher' },
    include: {
      subjects_taught: {
        include: {
          enrollments: {
            include: { user: true }
          }
        }
      }
    }
  });

  const studentsMap = new Map();
  teacher?.subjects_taught.forEach(subject => {
    subject.enrollments.forEach(enrollment => {
      studentsMap.set(enrollment.user.id, {
        id: enrollment.user.id,
        full_name: enrollment.user.full_name,
        email: enrollment.user.email,
        subjectName: subject.title
      });
    });
  });

  return Array.from(studentsMap.values());
}

export default async function DocenteAlumnosPage() {
  const students = await getDocenteAlumnos();

  return (
    <div className="min-h-screen bg-transparent p-4 md:p-12">
      <DocenteAlumnosClient students={students as any} />
    </div>
  );
}
