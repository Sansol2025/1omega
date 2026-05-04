"use client";

import { motion, Variants } from "framer-motion";
import { 
  TrendingUp, 
  Calendar,
  Filter,
  Download,
  Search,
  History,
  ShieldCheck,
  CircleDollarSign,
  BarChart3,
  Wallet,
  Lock
} from "lucide-react";
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

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

interface FinanzasClientProps {
  approvedPayments: any[];
  totalRevenue: number;
  count: number;
}

export default function FinanzasClient({ approvedPayments, totalRevenue, count }: FinanzasClientProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPayments = approvedPayments.filter(p => 
    p.user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.subject.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-10 pb-20 relative"
    >
      {/* ATMOSPHERIC BLOOMS */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      {/* HEADER SECTION */}
      <motion.div variants={fadeInUp} className="flex flex-col xl:flex-row justify-between items-end gap-6 px-1">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-3 py-1 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest rounded-lg border-emerald-500/20">
               <ShieldCheck className="w-3.5 h-3.5 mr-2 text-emerald-500" /> Auditoría Centralizada
            </Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight leading-none">
            Control <span className="text-emerald-500">Financiero.</span>
          </h1>
          <p className="text-muted-foreground font-medium max-w-xl text-sm md:text-base leading-relaxed">
            Administra los ingresos y verifica los pagos de la academia con precisión institucional.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
           <Button className="h-12 px-6 bg-foreground hover:bg-emerald-600 text-background hover:text-white rounded-xl flex items-center gap-2 font-bold text-xs shadow-sm transition-colors group">
              <Download className="w-4 h-4" /> 
              Exportar Balance
           </Button>
           <div className="flex items-center gap-3 px-6 h-12 bg-muted border border-border text-foreground rounded-xl shadow-sm shrink-0">
              <Calendar className="w-4 h-4 text-emerald-500" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest">Hoy, {new Date().toLocaleDateString('es-AR', { day: '2-digit', month: 'long' })}</span>
           </div>
        </div>
      </motion.div>

      {/* KPI SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            title: "Ingresos Brutos", 
            value: totalRevenue.toLocaleString('es-AR'), 
            icon: CircleDollarSign, 
            color: "emerald", 
            trend: "+14.2%",
            symbol: "$" 
          },
          { 
            title: "Inscripciones", 
            value: count.toString().padStart(2, '0'), 
            icon: Wallet, 
            color: "primary", 
            trend: "Acreditado",
            symbol: ""
          },
          { 
            title: "Ticket Promedio", 
            value: count > 0 ? (totalRevenue / count).toLocaleString('es-AR') : '0', 
            icon: TrendingUp, 
            color: "primary", 
            trend: "Estable",
            symbol: "$"
          }
        ].map((kpi, idx) => (
          <motion.div key={idx} variants={fadeInUp}>
            <Card className="rounded-[24px] border-border shadow-sm glass-surface relative overflow-hidden group hover:shadow-bento hover:border-emerald-500/30 transition-all duration-500">
              <CardHeader className="p-6 pb-2">
                <div className="flex justify-between items-center mb-4">
                  <div className={`w-12 h-12 ${kpi.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-primary/10 text-primary border-primary/20'} border rounded-xl flex items-center justify-center shadow-sm`}>
                    <kpi.icon className="w-6 h-6" />
                  </div>
                  <Badge variant="secondary" className="bg-muted text-muted-foreground border-none text-[9px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                    {kpi.trend}
                  </Badge>
                </div>
                <CardDescription className="text-muted-foreground font-bold uppercase tracking-wider text-[10px] mb-1">{kpi.title}</CardDescription>
                <CardTitle className="text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight tabular-nums leading-none">
                  {kpi.symbol && <span className="text-xl font-medium text-muted-foreground mr-1">{kpi.symbol}</span>}
                  {kpi.value}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-3">
                 <div className="flex items-center gap-2 py-2 px-3 bg-muted/50 rounded-lg border border-border">
                    <BarChart3 className="w-3.5 h-3.5 text-muted-foreground" />
                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Métrica consolidada</p>
                 </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* TRANSACTIONS SECTION */}
      <div className="space-y-6">
        <motion.div variants={fadeInUp} className="flex flex-col lg:flex-row justify-between items-center gap-4">
           <div className="relative w-full lg:max-w-md group">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-emerald-500 transition-colors" />
             <Input 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               placeholder="Buscar por usuario o servicio..." 
               className="h-10 pl-10 pr-4 bg-background border-border rounded-xl shadow-sm text-sm font-bold focus:ring-emerald-500 relative z-10 transition-colors"
             />
           </div>
           <Button variant="outline" className="h-10 px-4 rounded-xl border-border bg-background shadow-sm text-[10px] font-bold uppercase tracking-wider gap-2 hover:bg-muted transition-colors w-full lg:w-auto">
              <Filter className="w-4 h-4 text-muted-foreground" /> 
              Filtros
           </Button>
        </motion.div>

        <motion.div variants={fadeInUp} className="glass-surface rounded-[24px] border border-border shadow-sm overflow-hidden relative">
          
          <div className="p-6 border-b border-border flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-xl flex items-center justify-center shadow-sm">
                  <History className="w-6 h-6" />
               </div>
               <div className="space-y-1">
                  <h2 className="font-extrabold text-xl text-foreground tracking-tight leading-none">Libro Mayor</h2>
                  <div className="flex items-center gap-2">
                     <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">Liquidación</Badge>
                     <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Tiempo Real</p>
                  </div>
               </div>
            </div>
            
            <div className="flex items-center gap-6 px-6 py-3 bg-muted/50 rounded-xl border border-border">
               <div className="text-center">
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">Volumen</p>
                  <p className="text-lg font-extrabold text-emerald-500 tabular-nums leading-none">{approvedPayments.length}</p>
               </div>
               <Separator orientation="vertical" className="h-6 bg-border" />
               <div className="text-center">
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">Pendientes</p>
                  <p className="text-lg font-extrabold text-muted-foreground tabular-nums leading-none">0</p>
               </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Contribuyente</TableHead>
                  <TableHead className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Asignación</TableHead>
                  <TableHead className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Fecha</TableHead>
                  <TableHead className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Liquidación</TableHead>
                  <TableHead className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-right">Estatus</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id} className="border-border/50 hover:bg-muted/30 transition-colors group">
                    <TableCell className="px-8 py-4">
                       <div className="flex items-center gap-4">
                          <Avatar className="w-10 h-10 rounded-xl border border-border shadow-sm group-hover:border-emerald-500/30 transition-colors">
                             <AvatarFallback className="bg-muted text-muted-foreground font-extrabold text-sm uppercase">
                                 {payment.user?.full_name?.charAt(0) || "U"}
                               </AvatarFallback>
                          </Avatar>
                          <div className="space-y-0.5">
                            <p className="font-extrabold text-foreground text-sm group-hover:text-emerald-500 transition-colors tracking-tight leading-none">{payment.user?.full_name}</p>
                            <p className="text-[9px] text-muted-foreground font-bold tracking-widest uppercase">{payment.user?.email}</p>
                          </div>
                       </div>
                    </TableCell>
                    <TableCell className="px-8 py-4">
                       <div className="space-y-1.5">
                          <p className="text-sm text-foreground font-bold tracking-tight leading-tight line-clamp-1">{payment.subject?.title}</p>
                          <Badge variant="outline" className="bg-muted text-muted-foreground text-[8px] font-bold px-2 py-0.5 border-border rounded-md uppercase tracking-widest">Inscripción</Badge>
                       </div>
                    </TableCell>
                    <TableCell className="px-8 py-4">
                       <div className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-md border border-border w-fit">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          <span className="text-[9px] font-bold text-foreground uppercase tracking-widest tabular-nums">
                             {new Date(payment.created_at).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}
                          </span>
                       </div>
                    </TableCell>
                    <TableCell className="px-8 py-4">
                       <div className="space-y-0.5">
                          <p className="text-lg font-extrabold text-foreground tracking-tight tabular-nums">
                             <span className="text-xs font-medium text-muted-foreground mr-1">$</span>
                             {payment.subject?.price?.toLocaleString('es-AR')}
                          </p>
                          <p className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">MercadoPago</p>
                       </div>
                    </TableCell>
                    <TableCell className="px-8 py-4 text-right">
                       <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-bold px-3 py-1.5 rounded-md border-none uppercase tracking-wider shadow-none gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5" /> Liquidado
                       </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredPayments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-20 text-center bg-muted/10">
                       <div className="w-16 h-16 bg-muted text-muted-foreground rounded-2xl flex items-center justify-center mx-auto mb-4 border border-border shadow-sm">
                          <Lock className="w-8 h-8" />
                       </div>
                       <h3 className="text-xl font-extrabold text-foreground tracking-tight mb-2">Bóveda Vacía</h3>
                       <p className="text-muted-foreground font-medium text-sm max-w-sm mx-auto">No se registran transacciones en este período.</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="p-6 bg-muted/20 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 px-8">
             <div className="space-y-0.5 text-center sm:text-left">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Resumen Fiscal</p>
                <p className="text-lg font-extrabold tracking-tight text-foreground">Ingresos Netos: <span className="text-emerald-500">${totalRevenue.toLocaleString('es-AR')}</span> ARS</p>
             </div>
             <Button className="h-10 px-6 bg-foreground text-background hover:bg-emerald-600 hover:text-white rounded-xl font-bold text-xs shadow-sm transition-colors w-full sm:w-auto">
                Cerrar Balance
             </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
