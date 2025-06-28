"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  flexRender, // Keep flexRender if you are rendering inside page.tsx directly
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

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
  // Keep Table components if you are rendering inside page.tsx directly
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Corrected import path for NewAccount

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useNewUsers } from "@/hooks/usetopupRequest";
import { Topuprequest } from "@/components/topuprequest";
import { handleUpdateStatus } from "@/hooks/usetopupRequest";
export type NewUsers = {
  user_id: string;
  id: string;
  status: "rejected" | "pending" | "approved";
  email: string;
  business_name: string;
  phone_number: string;
  location: string;
};

const columns: ColumnDef<NewUsers>[] = [
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
    header: () => <div className="text-center">الحالة</div>, // Align header text to right
    cell: ({ row }) => {
      const currentStatus: NewUsers["status"] = row.original.status; // Get status directly from row data

      const statusMap: Record<NewUsers["status"], string> = {
        pending: "قيد الانتظار",
        approved: "موافق عليه",
        rejected: "مرفوض",
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-24 text-right">
              {/* Adjust width as needed */}
              {statusMap[currentStatus]} {/* Display current status */}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-amber-900 text-amber-50 border-b-black">
            {currentStatus === "pending" ? (
              <>
                <DropdownMenuItem
                  onClick={() =>
                    handleUpdateStatus(row.original.user_id, "approved")
                  }
                  className="capitalize text-right cursor-pointer hover:bg-amber-800"
                >
                  {statusMap["approved"]}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    handleUpdateStatus(row.original.id, "rejected")
                  }
                  className="capitalize text-right cursor-pointer hover:bg-amber-800"
                >
                  {statusMap["rejected"]}
                </DropdownMenuItem>
              </>
            ) : (
              // Display current status as a disabled item if not pending
              <DropdownMenuItem
                disabled
                className="capitalize text-right opacity-60"
              >
                {statusMap[currentStatus]} (لا يمكن تغيير الحالة)
              </DropdownMenuItem>
            )}
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
    accessorKey: "phone_number",
    header: () => <div className="text-right">رقم الهاتف</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {row.getValue("phone_number")}
      </div>
    ),
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        الموقع
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("location")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">فتح القائمة</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>إجراءات</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              نسخ معرف المستخدم
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>عرض تفاصيل المستخدم</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function DataTableDemo() {
  const { users } = useNewUsers();

  return (
    <div className="container mx-auto px-5 py-2">
      {/* Ensure the columns prop matches the expected type in NewAccount */}
      <Topuprequest data={users} columns={columns} />
    </div>
  );
}
