import { db } from "@/lib/db";
import { Users } from "lucide-react";
import DocenteDashboardClient from "./DocenteDashboardClient";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

async function getDocenteData(userId: string) {
  const teacher = await db.user.findUnique({
    where: { id: userId },
    include: {
      subjects_taught: {
        include: {
          _count: {
            select: { enrollments: true, topics: true }
          }
        }
      },
      sessions_as_teacher: {
        where: { status: "scheduled" },
        include: { student: true, subject: true },
        orderBy: { start_time: "asc" },
        take: 3
      }
    }
  });

  return teacher;
}

export default async function DocentePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const teacher = await getDocenteData(user.id);

  if (!teacher || teacher.role !== "teacher") {
    redirect("/dashboard");
  }

  return <DocenteDashboardClient teacher={teacher} />;
}
