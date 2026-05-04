"use client";

import { motion, Variants } from "framer-motion";
import { 
  User, 
  Mail, 
  Search, 
  Plus, 
  GraduationCap, 
  Briefcase, 
  Trash2, 
  UserPlus,
  ShieldCheck,
  CheckCircle2,
  Settings2,
  Sparkles,
  Compass,
  ArrowUpRight,
  ShieldAlert,
  Fingerprint,
  History
} from "lucide-react";
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface UsuariosClientProps {
  users: any[];
  createUser: (formData: FormData) => void;
  deleteUser: (userId: string) => void;
}

export default function UsuariosClient({ users, createUser, deleteUser }: UsuariosClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredUsers = users.filter(u => {
    const name = u.full_name || "";
    const email = u.email || "";
    const specialty = u.specialty || "";
    const search = searchTerm.toLowerCase();
    
    const matchesSearch = name.toLowerCase().includes(search) ||
                          email.toLowerCase().includes(search) ||
                          specialty.toLowerCase().includes(search);
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-10 pb-20 relative"
    >
      {/* ATMOSPHERIC BLOOMS */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      
      {/* HEADER SECTION */}
      <motion.div variants={fadeInUp} className="flex flex-col xl:flex-row justify-between items-end gap-6 px-1">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-3 py-1 bg-muted text-muted-foreground text-[10px] font-bold uppercase tracking-widest rounded-lg border-border">
               <ShieldCheck className="w-3.5 h-3.5 mr-2 text-primary" /> Comunidad Académica
            </Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight leading-none">
            Gestión de <span className="text-primary">Usuarios.</span>
          </h1>
          <p className="text-muted-foreground font-medium max-w-xl text-sm md:text-base leading-relaxed">
            Administra los roles, permisos y accesos de todo el personal y el alumnado de la institución.
          </p>
        </div>

        <div className="flex items-center gap-4">
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Población Activa</span>
              <div className="flex items-center gap-3">
                 <div className="px-4 h-12 bg-muted/50 border border-border rounded-xl flex items-center gap-3 shadow-sm transition-colors hover:border-emerald-500/50 hover:bg-emerald-500/5">
                    <GraduationCap className="w-4 h-4 text-emerald-500" />
                    <span className="text-lg font-extrabold text-foreground">{users.filter(u => u.role === "student").length}</span>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Alumnos</span>
                 </div>
                 <div className="px-4 h-12 bg-muted/50 border border-border rounded-xl flex items-center gap-3 shadow-sm transition-colors hover:border-primary/50 hover:bg-primary/5">
                    <Briefcase className="w-4 h-4 text-primary" />
                    <span className="text-lg font-extrabold text-foreground">{users.filter(u => u.role === "teacher").length}</span>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Staff</span>
                 </div>
              </div>
           </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
        {/* REGISTRATION FORM */}
        <motion.div variants={fadeInUp} className="xl:col-span-1">
          <Card className="rounded-[24px] border-border shadow-sm relative overflow-hidden glass-surface hover:shadow-bento transition-all duration-500">
            <CardHeader className="p-6 pb-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center border border-primary/20">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-lg font-extrabold text-foreground tracking-tight">Nuevo Usuario</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground font-medium mt-0.5">
                    Registra personal interno o alumnos.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-4">
              <form action={createUser} className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Nombre Completo</label>
                    <div className="relative">
                       <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                       <Input name="full_name" placeholder="Ej: Juan Pérez" className="h-10 pl-9 bg-background border-border rounded-xl font-bold tracking-tight focus:ring-primary transition-colors shadow-sm" required />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Correo Electrónico</label>
                    <div className="relative">
                       <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                       <Input name="email" type="email" placeholder="juan@omega.com" className="h-10 pl-9 bg-background border-border rounded-xl font-bold tracking-tight focus:ring-primary transition-colors shadow-sm" required />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Rol / Jerarquía</label>
                    <div className="relative">
                      <select name="role" className="flex h-10 w-full items-center justify-between rounded-xl border border-border bg-background px-4 text-xs font-bold text-foreground outline-none focus:ring-1 focus:ring-primary appearance-none shadow-sm transition-colors" required>
                        <option value="student">ESTUDIANTE</option>
                        <option value="teacher">DOCENTE</option>
                        <option value="super_admin">DIRECCIÓN</option>
                      </select>
                      <Compass className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Especialidad (Opcional)</label>
                    <div className="relative">
                       <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                       <Input name="specialty" placeholder="Ej: Matemáticas" className="h-10 pl-9 bg-background border-border rounded-xl font-bold tracking-tight focus:ring-primary transition-colors shadow-sm" />
                    </div>
                  </div>
                </div>
                <Button type="submit" className="w-full h-10 mt-2 bg-foreground hover:bg-primary text-background hover:text-primary-foreground rounded-xl font-bold text-xs shadow-sm transition-colors gap-2">
                  <Plus className="w-4 h-4" /> Registrar Usuario
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* USER LIST */}
        <div className="xl:col-span-3 space-y-6">
           <motion.div variants={fadeInUp}>
             <Tabs defaultValue="all" className="w-full" onValueChange={setRoleFilter}>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                   <TabsList className="bg-muted p-1 rounded-xl h-10 border border-border w-full md:w-auto font-sans shadow-sm">
                      <TabsTrigger value="all" className="rounded-lg px-4 font-bold text-xs data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all">Todos</TabsTrigger>
                      <TabsTrigger value="student" className="rounded-lg px-4 font-bold text-xs data-[state=active]:bg-background data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 data-[state=active]:shadow-sm transition-all">Alumnos</TabsTrigger>
                      <TabsTrigger value="teacher" className="rounded-lg px-4 font-bold text-xs data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all">Docentes</TabsTrigger>
                      <TabsTrigger value="super_admin" className="rounded-lg px-4 font-bold text-xs data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all">Dirección</TabsTrigger>
                   </TabsList>
 
                   <div className="relative flex-1 w-full max-w-sm group/search">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within/search:text-primary transition-colors" />
                      <Input 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar por nombre, email..." 
                        className="w-full h-10 pl-10 pr-4 bg-background border-border rounded-xl font-medium text-sm text-foreground shadow-sm focus-visible:ring-primary/50 transition-colors"
                      />
                   </div>
                </div>

                <TabsContent value={roleFilter} className="mt-0 outline-none">
                   <Card className="rounded-[24px] border-border shadow-sm overflow-hidden glass-surface hover:shadow-bento transition-all duration-500">
                      
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader className="bg-muted/50">
                            <TableRow className="hover:bg-transparent border-border">
                              <TableHead className="px-6 py-4 text-muted-foreground text-[10px] font-bold uppercase tracking-widest">Usuario</TableHead>
                              <TableHead className="px-6 py-4 text-muted-foreground text-[10px] font-bold uppercase tracking-widest">Rol</TableHead>
                              <TableHead className="px-6 py-4 text-muted-foreground text-[10px] font-bold uppercase tracking-widest">Especialidad</TableHead>
                              <TableHead className="px-6 py-4 text-right text-muted-foreground text-[10px] font-bold uppercase tracking-widest">Acciones</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredUsers.map((user: any) => (
                              <TableRow key={user.id} className="group border-border/50 hover:bg-muted/30 transition-colors">
                                <TableCell className="px-6 py-3">
                                  <div className="flex items-center gap-4">
                                    <div className="relative">
                                       <Avatar className="h-10 w-10 rounded-xl shadow-sm border border-border group-hover:border-primary/30 transition-colors">
                                         <AvatarFallback className="bg-muted text-muted-foreground font-extrabold text-sm uppercase">
                                           {user.full_name?.charAt(0) || "U"}
                                         </AvatarFallback>
                                       </Avatar>
                                    </div>
                                    <div className="space-y-0.5">
                                      <p className="font-extrabold text-foreground text-sm group-hover:text-primary transition-colors leading-none">{user.full_name}</p>
                                      <p className="text-[10px] text-muted-foreground font-bold flex items-center gap-1.5">
                                        <Mail className="w-3 h-3 opacity-60" /> {user.email}
                                      </p>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="px-6 py-3">
                                   <Badge className={`px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit shadow-none border-none ${
                                    user.role === 'super_admin' ? 'bg-foreground text-background' :
                                    user.role === 'teacher' ? 'bg-primary/10 text-primary' :
                                    'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                  }`}>
                                    <ShieldCheck className="w-3 h-3" />
                                    {user.role === 'super_admin' ? 'ADMIN' : user.role === 'teacher' ? 'DOCENTE' : 'ALUMNO'}
                                  </Badge>
                                </TableCell>
                                <TableCell className="px-6 py-3">
                                  <p className="text-xs text-muted-foreground font-medium group-hover:text-foreground transition-colors">
                                    {user.specialty || 'Generalista'}
                                  </p>
                                </TableCell>
                                <TableCell className="px-6 py-3 text-right">
                                  <div className="flex justify-end items-center gap-2">
                                    <Button 
                                      variant="ghost" 
                                      size="icon"
                                      onClick={() => deleteUser(user.id)}
                                      className="h-8 w-8 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                                          <Settings2 className="w-4 h-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end" className="w-56 rounded-xl p-2 shadow-bento border-border bg-background">
                                         <DropdownMenuLabel className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest p-2">Acciones</DropdownMenuLabel>
                                         <DropdownMenuItem className="p-2.5 rounded-lg font-bold text-xs flex gap-2.5 hover:bg-muted transition-colors cursor-pointer">
                                            <ShieldAlert className="w-4 h-4" /> Restringir Acceso
                                         </DropdownMenuItem>
                                         <DropdownMenuItem className="p-2.5 rounded-lg font-bold text-xs flex gap-2.5 hover:bg-muted transition-colors cursor-pointer">
                                            <History className="w-4 h-4" /> Historial de Actividad
                                         </DropdownMenuItem>
                                         <DropdownMenuSeparator className="bg-border my-1" />
                                         <DropdownMenuItem className="p-2.5 rounded-lg font-bold text-xs flex gap-2.5 text-primary hover:bg-primary/10 transition-colors cursor-pointer">
                                            <ArrowUpRight className="w-4 h-4" /> Cambiar Rol
                                         </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      <div className="p-6 bg-muted/20 border-t border-border flex justify-between items-center px-8 relative overflow-hidden group">
                         <div className="space-y-0.5">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Total Registrados</p>
                            <p className="text-xl font-extrabold tracking-tight text-foreground"><span className="text-primary">{users.length}</span> Miembros</p>
                         </div>
                      </div>
                   </Card>
                </TabsContent>
             </Tabs>
           </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
