import { NavigationTop } from "@/components/NavigationTop";

export default function DocenteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans selection:bg-primary/20 selection:text-primary">
      {/* Navigation Suite Pro Max */}
      <NavigationTop 
        role="teacher" 
        userName="Titular Académico" 
        roleName="Cátedra Magistral" 
      />

      {/* Main Content Area - Full Width Ivory Canvas */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 relative overflow-hidden pt-16">
         {/* Atmospheric Blooms */}
         <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/[0.02] rounded-full blur-[200px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/[0.01] rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

         <div className="flex-1 overflow-auto relative z-10">
            <div className="max-w-[1800px] mx-auto p-6 md:p-8 lg:p-10">
              {children}
            </div>
         </div>
      </main>
    </div>
  );
}
