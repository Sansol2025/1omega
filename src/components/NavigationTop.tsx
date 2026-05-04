"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  CreditCard, 
  LogOut, 
  Sparkles, 
  Settings,
  Bell,
  Search,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
  icon: any;
}

interface NavigationTopProps {
  role: "director" | "teacher" | "student";
  userName: string;
  roleName: string;
}

const navItemsByRole = {
  director: [
    { name: "Dashboard", href: "/director", icon: LayoutDashboard },
    { name: "Comunidad", href: "/director/usuarios", icon: Users },
    { name: "Academia", href: "/director/academia", icon: BookOpen },
    { name: "Finanzas", href: "/director/finanzas", icon: CreditCard },
  ],
  teacher: [
    { name: "Resumen", href: "/docente", icon: LayoutDashboard },
    { name: "Alumnos", href: "/docente/alumnos", icon: Users },
  ],
  student: [
    { name: "Mis Materias", href: "/dashboard", icon: BookOpen },
    { name: "Catálogo", href: "/dashboard/catalogo", icon: Search },
  ],
};

export function NavigationTop({ role, userName, roleName }: NavigationTopProps) {
  const pathname = usePathname();
  const items = navItemsByRole[role] || [];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-950/80 backdrop-blur-2xl border-b border-white/5 flex items-center px-6">
      {/* Decorative Accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-brand-gold to-primary opacity-60"></div>
      
      {/* Logo Area */}
      <Link href={`/${role}`} className="flex items-center gap-4 group">
        <div className="relative p-1 bg-white/5 rounded-lg border border-white/10 group-hover:border-primary/50 group-hover:scale-105 transition-all duration-300 shadow-xl overflow-hidden shrink-0">
          <Image 
            src="/logofn.png" 
            alt="Omega Logo" 
            width={28} 
            height={28} 
            className="object-contain brightness-110"
          />
        </div>
        <div className="hidden lg:flex flex-col -space-y-1">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-gold italic opacity-80">Omega Instituto</span>
          <span className="text-base font-heading font-bold text-white tracking-tight italic">Portal <span className="text-primary">Académico</span></span>
        </div>
      </Link>

      <div className="h-5 w-px bg-white/10 mx-5 hidden md:block"></div>

      {/* Navigation Area */}
      <nav className="flex items-center gap-1.5 flex-grow">
        {items.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "px-5 py-2 rounded-full flex items-center gap-2.5 transition-all duration-300 overflow-hidden relative group",
                isActive 
                  ? "bg-primary text-white shadow-lg shadow-primary/10" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("w-3.5 h-3.5", isActive ? "animate-pulse" : "group-hover:scale-110 transition-transform")} />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] italic">{item.name}</span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-white/40 rounded-full"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Right Section: Actions & Profile */}
      <div className="flex items-center gap-4">
        <div className="hidden xl:flex items-center gap-3 mr-4">
          <Badge variant="outline" className="h-8 px-4 bg-white/5 border-white/5 text-[9px] font-black text-slate-500 uppercase tracking-widest italic rounded-full">
            <Sparkles className="w-3 h-3 mr-2 text-brand-gold animate-pulse" /> {roleName}
          </Badge>
        </div>

        <button className="relative w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors group">
          <Bell className="w-4 h-4 text-slate-400 group-hover:text-white" />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-primary rounded-full ring-2 ring-slate-950"></span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-4 group focus:outline-none">
              <div className="space-y-1 text-right hidden md:block">
                <p className="text-[11px] font-black text-white italic tracking-tight leading-none group-hover:text-primary transition-colors">{userName}</p>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">Mi Cuenta</p>
              </div>
              <Avatar className="h-10 w-10 rounded-xl border border-white/10 shadow-2xl group-hover:scale-110 transition-transform bg-slate-800">
                <AvatarFallback className="bg-slate-950 text-brand-gold font-black text-xs uppercase italic">
                  {userName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 mt-4 bg-slate-950/95 backdrop-blur-xl border-white/10 rounded-2xl p-2">
            <DropdownMenuLabel className="p-4 flex flex-col items-center gap-3">
               <Avatar className="h-16 w-16 border-2 border-primary/20 bg-slate-900 rounded-2xl">
                 <AvatarFallback className="text-2xl font-black text-primary">
                    {userName.charAt(0)}
                 </AvatarFallback>
               </Avatar>
               <div className="text-center">
                  <p className="text-sm font-black text-white italic">{userName}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{roleName}</p>
               </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/5 mx-2" />
            <DropdownMenuItem asChild>
              <Link href="#" className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 cursor-pointer group transition-all text-slate-400 hover:text-white">
                <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">Configuración</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/5 mx-2" />
            <DropdownMenuItem asChild>
              <Link href="/login" className="flex items-center gap-4 p-4 rounded-xl hover:bg-primary/20 cursor-pointer group transition-all text-red-400">
                <LogOut className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Cerrar Sesión</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function Badge({ children, className, variant }: any) {
  return (
    <div className={cn("inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", className)}>
      {children}
    </div>
  );
}
