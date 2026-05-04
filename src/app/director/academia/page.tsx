import { db } from "@/lib/db";
import { createCareer, createSubject } from "../actions";
import AcademiaClient from "./AcademiaClient";

export const dynamic = 'force-dynamic';

async function getAcademicData() {
  const careers = await db.career.findMany({
    include: {
      subjects: {
        include: {
          teacher: true,
          _count: {
            select: { topics: true, enrollments: true }
          }
        }
      }
    },
    orderBy: { created_at: "desc" }
  });

  const teachers = await db.user.findMany({
    where: { role: "teacher" },
    orderBy: { full_name: "asc" }
  });

  return { careers, teachers };
}

export default async function AcademiaPage() {
  const { careers, teachers } = await getAcademicData();

  return (
    <AcademiaClient 
      careers={careers} 
      teachers={teachers} 
      createCareer={createCareer} 
      createSubject={createSubject} 
    />
  );
}

