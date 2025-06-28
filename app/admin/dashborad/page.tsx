"use client";
// import { AppSidebar } from "@/components/app-sidebar";
// import { ChartAreaInteractive } from "@/components/chart-area";
// import { DataTable } from "@/components/data-table";
// import { SectionCards } from "@/components/sectionCard";
// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";

// import data from "./data.json";

// export default function Page() {
//   return (
//     <SidebarProvider
//       style={
//         {
//           "--sidebar-width": "calc(var(--spacing) * 72)",
//           "--header-height": "calc(var(--spacing) * 12)",
//         } as React.CSSProperties
//       }
//     >
//       <SidebarInset>
//         <div className="flex flex-1 flex-col">
//           <div className="@container/main flex flex-1 flex-col gap-2">
//             <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
//               <SectionCards />
//               <div className="px-4 lg:px-6">
//                 <ChartAreaInteractive />
//               </div>
//               <DataTable data={data} />
//             </div>
//           </div>
//         </div>
//       </SidebarInset>
//       <SidebarTrigger className="-ml-0" />
//       <AppSidebar variant="floating" />
//     </SidebarProvider>
//   );
// }
import { ChartAreaInteractive } from "@/components/chart-area";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/sectionCard";
import data from "../data.json";
import { useNewUsers, useTopUprequest } from "@/hooks/usetopupRequest";

export default function Page() {
  // const { topup } = useTopUprequest();
  // const { users } = useNewUsers();
  return (
    <div className="@container/main flex flex-1 flex-col gap-2 py-4  md:gap-6 md:py-6">
      <SectionCards />
      <div className="px-4 lg:px-6 ">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </div>
  );
}
