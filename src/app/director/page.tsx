import { db } from "@/lib/db";
import DirectorDashboardClient from "./DirectorDashboardClient";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

async function getStats() {
  const [students, teachers, subjects] = await Promise.all([
    db.user.count({ where: { role: "student" } }),
    db.user.count({ where: { role: "teacher" } }),
    db.subject.count(),
  ]);
  return { students, teachers, subjects };
}

export default async function DirectorPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const dbUser = await db.user.findUnique({ where: { id: user.id } });
  if (dbUser?.role !== "super_admin") {
    redirect("/dashboard");
  }

  const { students, teachers, subjects } = await getStats();

  return <DirectorDashboardClient stats={{ students, teachers, subjects }} />;
}
