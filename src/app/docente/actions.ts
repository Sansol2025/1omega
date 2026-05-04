"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createTopic(subjectId: string, title: string) {
  const lastTopic = await db.topic.findFirst({
    where: { subject_id: subjectId },
    orderBy: { order: 'desc' }
  });

  const nextOrder = (lastTopic?.order || 0) + 1;

  await db.topic.create({
    data: {
      subject_id: subjectId,
      title,
      order: nextOrder
    }
  });

  revalidatePath(`/docente/materia/${subjectId}`);
}

import { createClient } from "@supabase/supabase-js";

export async function createLesson(formData: FormData) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    const topicId = formData.get("topicId") as string;
    const subjectId = formData.get("subjectId") as string;
    const title = formData.get("title") as string;
    const description = formData.get("desc") as string;
    const externalUrl = formData.get("url") as string;
    const videoFile = formData.get("videoFile") as File;

    let contentUrl = externalUrl;

    // Si hay un archivo de video y tenemos configuración de supabase
    if (videoFile && videoFile.size > 0 && supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      const fileExt = videoFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `lessons/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("academy")
        .upload(filePath, videoFile);

      if (uploadError) {
        console.error("Error directo de Supabase Storage:", uploadError);
      } else {
        const { data: publicUrlData } = supabase.storage
          .from("academy")
          .getPublicUrl(filePath);
        
        contentUrl = publicUrlData.publicUrl;
      }
    }

    const lastLesson = await db.lesson.findFirst({
      where: { topic_id: topicId },
      orderBy: { order: 'desc' }
    });

    const nextOrder = (lastLesson?.order || 0) + 1;

    await db.lesson.create({
      data: {
        topic_id: topicId,
        title,
        content_url: contentUrl || "",
        description,
        order: nextOrder
      }
    });

    revalidatePath(`/docente/materia/${subjectId}`);
  } catch (error) {
    console.error("CRITICAL ERROR en createLesson:", error);
    // Podríamos lanzar el error de nuevo o manejarlo silenciosamente para evitar el 500
    throw error; 
  }
}

export async function deleteLesson(lessonId: string, subjectId: string) {
  await db.lesson.delete({
    where: { id: lessonId }
  });
  revalidatePath(`/docente/materia/${subjectId}`);
}

export async function deleteTopic(topicId: string, subjectId: string) {
  // Primero borramos las lecciones asociadas
  await db.lesson.deleteMany({
    where: { topic_id: topicId }
  });
  
  await db.topic.delete({
    where: { id: topicId }
  });
  
  revalidatePath(`/docente/materia/${subjectId}`);
}
