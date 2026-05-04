import { NavigationTop } from "@/components/NavigationTop";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans selection:bg-primary/10 selection:text-primary">
      {/* Navigation Suite Pro Max */}
      <NavigationTop 
        role="student" 
        userName="Alumno Titular" 
        roleName="Estudiante Omega" 
      />

      {/* Main Content Area - Full Width Ivory Canvas */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 relative overflow-hidden pt-16">
         {/* Atmospheric Blooms */}
         <div className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-primary/[0.02] rounded-full blur-[250px] -translate-y-1/2 translate-x-1/2 -z-10 animate-pulse-slow"></div>
         <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-slate-200/10 rounded-full blur-[180px] translate-y-1/2 -translate-x-1/2 -z-10"></div>
         
         <div className="flex-1 overflow-auto relative z-10">
           <div className="p-6 md:p-8 lg:p-10 max-w-[1800px] mx-auto w-full">
             {children}
           </div>
         </div>
      </main>
    </div>
  );
}

