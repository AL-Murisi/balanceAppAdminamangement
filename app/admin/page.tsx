// "use client";
import { ChartAreaInteractive } from "@/components/chart-area";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/sectionCard";
import data from "./data.json";

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
