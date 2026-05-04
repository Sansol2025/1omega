"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Role } from "@prisma/client";

export async function createUser(formData: FormData) {
  const email = formData.get("email") as string;
  const full_name = formData.get("full_name") as string;
  const role = formData.get("role") as Role;
  const specialty = formData.get("specialty") as string;

  await db.user.create({
    data: {
      email,
      full_name,
      role,
      specialty: specialty || null,
    },
  });

  revalidatePath("/director/usuarios");
}

export async function deleteUser(userId: string) {
  // Nota: Deberíamos manejar las claves foráneas si el usuario tiene inscripciones o clases.
  // Por ahora lo hacemos simple para demo.
  await db.user.delete({
    where: { id: userId },
  });
  revalidatePath("/director/usuarios");
}

export async function createCareer(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  await db.career.create({
    data: {
      title,
      description,
    },
  });

  revalidatePath("/director/academia");
}

export async function createSubject(formData: FormData) {
  const title = formData.get("title") as string;
  const career_id = formData.get("career_id") as string;
  const teacher_id = formData.get("teacher_id") as string;
  const price = parseFloat(formData.get("price") as string) || 0;

  await db.subject.create({
    data: {
      title,
      career_id,
      teacher_id: teacher_id || null,
      price,
    },
  });

  revalidatePath("/director/academia");
}
