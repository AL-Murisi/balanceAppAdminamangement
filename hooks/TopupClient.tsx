"use client";
import { topUpUserBalance } from "@/hooks/function";
import { useTopUprequest } from "@/hooks/usetopupRequest";
import { Topuprequest } from "@/components/topuprequest";
import * as React from "react";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { handleUpdateStatusTopUp } from "@/hooks/usetopupRequest";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

export type Payment = {
  id: string;
  amount: number;
  status: "Rejected" | "Pending" | "Approved";
  email: string;
  business_name: string;
  phone_number: string;
  user_id: string;
};

const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="تحديد الكل"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="تحديد الصف"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "status",
    header: () => <div className="text-right">الحالة</div>, // Align header text to right
    cell: ({ row }) => {
      const currentStatus: Payment["status"] = row.original.status; // Get status directly from row data

      const statusMap: Record<Payment["status"], string> = {
        Pending: "قيد الانتظار",
        Approved: "موافق عليه",
        Rejected: "مرفوض",
      };
      const isDropdownDisabled = currentStatus === "Approved";

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              disabled={isDropdownDisabled}
              className="w-24 text-right"
            >
              {/* Adjust width as needed */}
              {statusMap[currentStatus]}{" "}
              <ChevronDown className="ml-1 h-4 w-4" />{" "}
              {/* Add ChevronDown icon */}
              {/* Display current status */}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-amber-900 text-amber-50 border-b-black">
            <DropdownMenuItem
              onClick={() => {
                handleUpdateStatusTopUp(row.original.id, "Approved"),
                  topUpUserBalance(
                    "17d2e3de-b890-44b3-83d8-b8936306f8a6",
                    row.original.user_id,

                    row.original.amount
                  );
              }}
              className="capitalize text-right cursor-pointer hover:bg-amber-800"
            >
              {statusMap["Approved"]}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                handleUpdateStatusTopUp(row.original.id, "Rejected")
              }
              className="capitalize text-right cursor-pointer hover:bg-amber-800"
            >
              {statusMap["Rejected"]}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        البريد الإلكتروني
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "business_name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        اسم النشاط التجاري
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("business_name")}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">المبلغ</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">فتح القائمة</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-yellow-50">
            <DropdownMenuLabel>إجراءات</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              نسخ معرف الدفع
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>عرض العميل</DropdownMenuItem>
            <DropdownMenuItem>عرض تفاصيل الدفع</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function TopupClientWrapper() {
  const { topup, loading } = useTopUprequest();

  if (loading) return <div>جاري التحميل...</div>;

  return <Topuprequest data={topup} columns={columns} />;
}
