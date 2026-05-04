import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import * as dotenv from 'dotenv'

dotenv.config()

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Iniciando seeding de la base de datos Omega...')

  // 1. Limpiar base de datos (Opcional, con cuidado)
  // await prisma.enrollment.deleteMany()
  // await prisma.privateSession.deleteMany()
  // await prisma.lesson.deleteMany()
  // await prisma.topic.deleteMany()
  // await prisma.subject.deleteMany()
  // await prisma.career.deleteMany()

  // 2. Crear Carreras
  const medicina = await prisma.career.create({
    data: {
      title: 'Ingreso a Medicina/Salud',
      description: 'Preparación integral para el ingreso a facultades de medicina y carreras de salud.',
    },
  })

  const idiomas = await prisma.career.create({
    data: {
      title: 'Departamento de Idiomas',
      description: 'Cursos de inglés, portugués y otros idiomas con enfoque académico y profesional.',
    },
  })

  console.log('✅ Carreras creadas')

  // 3. Crear Materias para Medicina
  const biofisica = await prisma.subject.create({
    data: {
      career_id: medicina.id,
      title: 'Biofísica',
      description: 'Estudio de los principios físicos aplicados a los sistemas biológicos.',
      price: 25000,
    },
  })

  const quimica = await prisma.subject.create({
    data: {
      career_id: medicina.id,
      title: 'Química Celular',
      description: 'Fundamentos de química orgánica e inorgánica para salud.',
      price: 22000,
    },
  })

  // 4. Crear Materias para Idiomas
  const inglesI = await prisma.subject.create({
    data: {
      career_id: idiomas.id,
      title: 'Inglés Nivel I (Beginner)',
      description: 'Fundamentos del idioma para estudiantes sin conocimientos previos.',
      price: 18000,
    },
  })

  console.log('✅ Materias creadas')

  // 5. Crear Temas y Lecciones para Biofísica
  const tema1Bio = await prisma.topic.create({
    data: {
      subject_id: biofisica.id,
      title: 'Mecánica de Fluídos',
      order: 1,
    },
  })

  await prisma.lesson.createMany({
    data: [
      {
        topic_id: tema1Bio.id,
        title: 'Hidrostática: Principio de Pascal',
        content_url: 'https://video-link.com/pascal',
        order: 1,
      },
      {
        topic_id: tema1Bio.id,
        title: 'Hidrodinámica: Ecuación de Bernoulli',
        content_url: 'https://video-link.com/bernoulli',
        order: 2,
      },
    ],
  })

  console.log('✅ Temas y lecciones creados para Biofísica')
  
  // 6. Crear Usuarios (Docente y Alumno)
  const teacher = await prisma.user.create({
    data: {
      email: 'profesor@omega.com',
      full_name: 'Dr. Julián Martínez',
      role: 'teacher',
      specialty: 'Biofísica y Ciencias Exactas',
      bio: 'Especialista en preparación para ingreso a Medicina con más de 10 años de experiencia.'
    }
  })

  const student = await prisma.user.create({
    data: {
      email: 'alumno@ejemplo.com',
      full_name: 'Sofía Rodríguez',
      role: 'student'
    }
  })

  // 7. Vincular Docente a Materia
  await prisma.subject.update({
    where: { id: biofisica.id },
    data: { teacher_id: teacher.id }
  })

  // 8. Crear Inscripción para Alumno
  await prisma.enrollment.create({
    data: {
      user_id: student.id,
      subject_id: biofisica.id,
      payment_status: 'approved'
    }
  })

  console.log('✅ Usuarios y relaciones de prueba creados')
  console.log('🚀 Seeding completado con éxito')
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    pool.end()
  })
