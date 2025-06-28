import * as React from "react";
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "./ui/card";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { FilterIcon, ChevronDown, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";

interface TopupRequestProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  // Removed searchKey as we'll apply global filter
}

export type Payment = {
  id: string;
  amount: number;
  status: "Rejected" | "Pending" | "Approved";
  email: string;
  business_name: string;
  phone_number: string;
  user_id: string;
};

export function Topuprequest<T extends object>({
  data,
  columns,
}: TopupRequestProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState(""); // New state for global search
  const [statusFilter, setStatusFilter] = React.useState<
    Payment["status"] | ""
  >("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter, // Include globalFilter in the table state
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter, // Handle global filter changes
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // Define a custom filter function for global search if needed,
    // or rely on default string matching provided by TanStack Table
  });

  // Apply status filter when statusFilter state changes
  React.useEffect(() => {
    if (statusFilter) {
      table.getColumn("status")?.setFilterValue(statusFilter);
    } else {
      table.getColumn("status")?.setFilterValue(undefined); // Clear filter if no status is selected
    }
  }, [statusFilter, table]);

  const statusMap: Record<Payment["status"], string> = {
    Pending: "قيد الانتظار",
    Approved: "موافق عليه",
    Rejected: "مرفوض",
  };

  return (
    <div className="rounded-md border p-5">
      <div className="flex items-center justify-between mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="max-w-sm flex items-center gap-2"
            >
              {statusFilter ? statusMap[statusFilter] : "تصفية حسب الحالة"}
              <FilterIcon size={16} />
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-amber-900 text-amber-50 border-b-black">
            <DropdownMenuItem onClick={() => setStatusFilter("")}>
              عرض الكل
            </DropdownMenuItem>
            {Object.entries(statusMap).map(([status, label]) => (
              <DropdownMenuItem
                key={status}
                onClick={() => setStatusFilter(status as Payment["status"])}
              >
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="relative max-w-sm w-full">
          {/* Added relative positioning and full width */}
          <Input
            placeholder="ابحث في كل الأعمدة..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="w-full bg-white text-black text-right border-red-700 border-2 pr-10" // Added pr-10 for padding
          />
          {globalFilter && ( // Conditionally render the clear button
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setGlobalFilter("")} // Clear filter on click
              className="absolute inset-y-0 left-0 flex items-center pr-3" // Positioned on the left
            >
              <X className="h-4 w-4 text-black" /> {/* X icon */}
            </Button>
          )}
        </div>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                لا توجد بيانات.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            Rows per page
          </Label>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger size="sm" className="w-20" id="rows-per-page">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
