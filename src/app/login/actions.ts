'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'

export type AuthState = { error: string | null, msg?: string | null }

export async function login(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Por favor, completa todos los campos' }
  }

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: 'Credenciales inválidas o correo no confirmado' }
  }

  // Redireccionar en base al rol que tiene configurado en Prisma
  if (authData.user) {
    try {
      const dbUser = await db.user.findUnique({
        where: { id: authData.user.id }
      })

      revalidatePath('/', 'layout')
      
      if (dbUser?.role === 'super_admin') {
        redirect('/director')
      } else if (dbUser?.role === 'teacher') {
        redirect('/docente')
      } else {
        redirect('/dashboard') // Estudiante o default
      }
    } catch (dbError) {
      // Fallback si no fue encontrado en la DB
      revalidatePath('/', 'layout')
      redirect('/dashboard')
    }
  }

  return { error: null }
}

export async function signup(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = (formData.get('full_name') as string) || 'Estudiante Omega'

  if (!email || !password) {
    return { error: 'Por favor, completa todos los campos' }
  }

  const { data: authData, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  if (authData.user) {
    try {
      // Insercion paralela en Prisma
      await db.user.create({
        data: {
          id: authData.user.id,
          email: email,
          full_name: fullName,
          role: 'student'
        }
      })
    } catch (e) {
      console.error("Error creating user in Prisma:", e)
    }
  }

  // Si confirmation is required, Supabase returns user but session is null
  if (authData.user && !authData.session) {
    return { error: null, msg: 'Registro exitoso. Por favor revisa tu correo para confirmar la cuenta.' }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}
