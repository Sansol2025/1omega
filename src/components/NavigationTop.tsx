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
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/80 backdrop-blur-2xl border-b border-border flex items-center px-6">
      {/* Logo Area */}
      <Link href={`/${role}`} className="flex items-center gap-3 group">
        <Image 
          src="/logo1.png" 
          alt="Omega Logo" 
          width={32} 
          height={32} 
          className="object-contain group-hover:scale-105 transition-transform"
        />
        <div className="hidden lg:flex flex-col -space-y-0.5">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">Omega Instituto</span>
          <span className="text-sm font-black text-foreground tracking-tight">Portal Académico</span>
        </div>
      </Link>

      <div className="h-6 w-px bg-border mx-6 hidden md:block"></div>

      {/* Navigation Area */}
      <nav className="flex items-center gap-2 flex-grow">
        {items.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 relative group text-sm font-bold",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <item.icon className={cn("w-4 h-4", isActive ? "" : "group-hover:scale-110 transition-transform")} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Right Section: Actions & Profile */}
      <div className="flex items-center gap-4">
        <div className="hidden xl:flex items-center gap-3 mr-2">
          <Badge variant="outline" className="h-8 px-4 bg-muted/50 border-border text-[10px] font-bold text-muted-foreground uppercase tracking-widest rounded-xl">
            {roleName}
          </Badge>
        </div>

        <button className="relative w-10 h-10 flex items-center justify-center bg-background rounded-xl border border-border shadow-sm hover:bg-muted transition-colors group">
          <Bell className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-primary rounded-full"></span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 group focus:outline-none bg-muted/30 hover:bg-muted/50 border border-border/50 rounded-xl p-1 pr-3 transition-colors">
              <Avatar className="h-8 w-8 rounded-lg shadow-sm">
                <AvatarFallback className="bg-primary text-primary-foreground font-black text-xs uppercase">
                  {userName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-0.5 text-left hidden md:block">
                <p className="text-xs font-black text-foreground tracking-tight leading-none">{userName}</p>
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Mi Cuenta</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground ml-1 group-hover:text-foreground transition-colors" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 mt-2 bg-background/95 backdrop-blur-xl border-border rounded-2xl p-2 shadow-bento">
            <DropdownMenuLabel className="p-4 flex flex-col items-center gap-3">
               <Avatar className="h-16 w-16 border border-border bg-muted rounded-2xl shadow-sm">
                 <AvatarFallback className="text-2xl font-black text-foreground">
                    {userName.charAt(0)}
                 </AvatarFallback>
               </Avatar>
               <div className="text-center space-y-1">
                  <p className="text-sm font-black text-foreground">{userName}</p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{roleName}</p>
               </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border mx-2" />
            <DropdownMenuItem asChild>
              <Link href="#" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted cursor-pointer group transition-all text-muted-foreground hover:text-foreground">
                <Settings className="w-4 h-4" />
                <span className="text-xs font-bold">Configuración</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border mx-2" />
            <DropdownMenuItem asChild>
              <Link href="/login" className="flex items-center gap-3 p-3 rounded-xl hover:bg-destructive/10 cursor-pointer transition-all text-destructive">
                <LogOut className="w-4 h-4" />
                <span className="text-xs font-bold">Cerrar Sesión</span>
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
