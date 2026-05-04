'use client'

import { useActionState, useState } from 'react'
import { User, Lock, Mail, ArrowRight, Loader2, ShieldCheck, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import Link from "next/link"
import { login, signup, type AuthState } from './actions'
import { motion, AnimatePresence } from "framer-motion"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  
  const [loginState, loginAction, isLoginPending] = useActionState(login, { error: null } as AuthState)
  const [signupState, signupAction, isSignupPending] = useActionState(signup, { error: null, msg: null } as AuthState)

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-background font-sans overflow-hidden">
      
      {/* LADO A: Branding Visual Impactante */}
      <div className="hidden md:flex md:w-[45%] lg:w-[50%] relative flex-col justify-between p-12 lg:p-16 text-white overflow-hidden bg-primary">
        {/* Modern Glass background / Abstract Glows */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3 z-0 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-black/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 z-0"></div>

        <div className="relative z-10">
          <Link href="/" className="inline-block group">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 transition-transform group-hover:scale-105 duration-500 shadow-bento">
              <Image src="/logofn.png" alt="Omega logo" width={48} height={48} className="object-contain brightness-0 invert" />
            </div>
          </Link>
        </div>

        <div className="relative z-10 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              Forjando el futuro <br/>
              <span className="text-accent">educativo.</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg font-medium leading-relaxed mb-10 max-w-md">
              Plataforma integral de gestión académica y clases particulares de alto rendimiento.
            </p>
            
            <div className="space-y-4">
              {[
                "Seguridad de datos end-to-end",
                "Monitoreo analítico en tiempo real",
                "Campus virtual de vanguardia"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-white/90">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-sm font-medium text-white/60">
          <p>Omega Instituto © {new Date().getFullYear()}</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">Privacidad</Link>
            <Link href="#" className="hover:text-white transition-colors">Términos</Link>
          </div>
        </div>
      </div>

      {/* LADO B: Formulario Minimalista Clean Glassmorphism */}
      <div className="w-full md:w-[55%] lg:w-[50%] min-h-screen flex items-center justify-center p-6 sm:p-12 relative bg-background">
        
        {/* Glow móvil */}
        <div className="absolute md:hidden top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] -z-10"></div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-[420px]"
        >
          {/* Logo Mobile */}
          <div className="md:hidden flex justify-center mb-8">
             <div className="p-4 bg-card rounded-2xl shadow-bento border border-border">
               <Image src="/logofn.png" alt="Omega logo" width={50} height={50} className="object-contain" />
             </div>
          </div>

          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground mb-2">
              {isLogin ? 'Bienvenido de nuevo' : 'Crear nueva cuenta'}
            </h2>
            <p className="text-muted-foreground font-medium">
              {isLogin ? 'Ingresa tus credenciales institucionales.' : 'Inicia tu trayectoria académica hoy mismo.'}
            </p>
          </div>

          <div className="glass-surface rounded-2xl p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.form 
                  key="login"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  action={loginAction} 
                  className="space-y-5"
                >
                  {loginState?.error && (
                    <div className="bg-destructive/10 text-destructive p-4 rounded-xl font-semibold text-sm border border-destructive/20 flex items-center gap-2">
                       <span className="block w-1.5 h-1.5 rounded-full bg-destructive"></span>
                      {loginState.error}
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground uppercase tracking-wider">Email</label>
                      <div className="relative group/field">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-muted-foreground group-focus-within/field:text-primary transition-colors" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          placeholder="alumno@omegainstituto.com"
                          className="pl-12 w-full h-14 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-foreground placeholder:text-muted-foreground shadow-sm"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-foreground uppercase tracking-wider">Contraseña</label>
                        <Link href="#" className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">¿Olvidaste tu clave?</Link>
                      </div>
                      <div className="relative group/field">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-muted-foreground group-focus-within/field:text-primary transition-colors" />
                        </div>
                        <input
                          type="password"
                          name="password"
                          placeholder="••••••••"
                          className="pl-12 w-full h-14 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-foreground placeholder:text-muted-foreground shadow-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    disabled={isLoginPending}
                    type="submit" 
                    className="w-full h-14 mt-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed shadow-bento group/btn"
                  >
                    {isLoginPending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>Ingresar al Campus <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.form 
                  key="signup"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  action={signupAction} 
                  className="space-y-5"
                >
                  {signupState?.error && (
                    <div className="bg-destructive/10 text-destructive p-4 rounded-xl font-semibold text-sm border border-destructive/20 flex items-center gap-2">
                       <span className="block w-1.5 h-1.5 rounded-full bg-destructive"></span>
                      {signupState.error}
                    </div>
                  )}
                  {signupState?.msg && (
                    <div className="bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 p-4 rounded-xl font-semibold text-sm border border-emerald-200 dark:border-emerald-500/20">
                      {signupState.msg}
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground uppercase tracking-wider">Nombre Completo</label>
                      <div className="relative group/field">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-muted-foreground group-focus-within/field:text-primary transition-colors" />
                        </div>
                        <input
                          type="text"
                          name="full_name"
                          placeholder="Tu nombre"
                          className="pl-12 w-full h-14 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-foreground placeholder:text-muted-foreground shadow-sm"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground uppercase tracking-wider">Email</label>
                      <div className="relative group/field">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-muted-foreground group-focus-within/field:text-primary transition-colors" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          placeholder="alumno@ejemplo.com"
                          className="pl-12 w-full h-14 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-foreground placeholder:text-muted-foreground shadow-sm"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground uppercase tracking-wider">Contraseña</label>
                      <div className="relative group/field">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-muted-foreground group-focus-within/field:text-primary transition-colors" />
                        </div>
                        <input
                          type="password"
                          name="password"
                          placeholder="••••••••"
                          className="pl-12 w-full h-14 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-foreground placeholder:text-muted-foreground shadow-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    disabled={isSignupPending}
                    type="submit" 
                    className="w-full h-14 mt-6 bg-foreground hover:bg-foreground/90 text-background rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 shadow-bento group/btn"
                  >
                    {isSignupPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Crear Cuenta <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-8 text-center flex flex-col items-center space-y-6">
            <p className="text-sm font-medium text-muted-foreground">
              {isLogin ? "¿No tienes una cuenta? " : "¿Ya posees credenciales? "}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary font-bold hover:underline transition-all"
              >
                {isLogin ? 'Regístrate' : 'Inicia Sesión'}
              </button>
            </p>
            
            <div className="inline-flex items-center gap-2 py-2 px-4 bg-muted/50 rounded-full border border-border/50">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Conexión Segura Omega SSL</span>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  )
}
