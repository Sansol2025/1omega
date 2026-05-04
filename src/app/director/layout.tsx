import { NavigationTop } from "@/components/NavigationTop";

export default function DirectorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans selection:bg-primary/10 selection:text-primary">
      {/* Navigation Suite Pro Max */}
      <NavigationTop 
        role="director" 
        userName="Administrador Ejecutivo" 
        roleName="Dirección General" 
      />

      {/* Main Content Area - Full Width Ivory Canvas */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 relative overflow-hidden pt-16">
         {/* Deep depth shapes purely aesthetic */}
         <div className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-primary/[0.03] rounded-full blur-[200px] -translate-y-1/2 translate-x-1/2 -z-10"></div>
         
         <div className="flex-1 p-6 md:p-8 lg:p-10 relative z-10">
           <div className="max-w-[1800px] mx-auto w-full">
             {children}
           </div>
         </div>
      </main>
    </div>
  );
}
