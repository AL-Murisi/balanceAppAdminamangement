"use client";

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
import { Topuprequest } from "@/components/topuprequest";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { allUsers } from "@/hooks/usetopupRequest";
import { useRouter, useSearchParams } from "next/navigation";

import { Label } from "@radix-ui/react-dropdown-menu";
import { SkeletonCard } from "@/components/skeletonCard";
import { Skeleton } from "@/components/ui/skeleton";
type UserRecord = {
  id: string;
  email: string;
  full_name: string;
  username: string;
  user_role: string;
  avatar_url: string;
  phonenumber: number;
  sub_vendors: {
    business_name: string;
    location: string;
    status: string;
  };
  balances: {
    balance_amount: number;
    account_number: string;
  };
};

export default function UserDashboardTable() {
  const router = useRouter();
  const columns: ColumnDef<UserRecord>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "full_name",
      header: "الاسم الكامل",
      cell: ({ row }) => <div>{row.getValue("full_name")}</div>,
    },
    {
      accessorKey: "username",
      header: "اسم المستخدم",
      cell: ({ row }) => <div>{row.getValue("username")}</div>,
    },
    {
      accessorKey: "email",
      header: "البريد الإلكتروني",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "user_role",
      header: "الدور",
      cell: ({ row }) => <div>{row.getValue("user_role")}</div>,
    },
    {
      accessorKey: "phonenumber",
      header: "رقم الهاتف",
      cell: ({ row }) => <div>{row.getValue("phonenumber")}</div>,
    },
    {
      header: "النشاط التجاري",
      accessorFn: (row) => row.sub_vendors?.business_name ?? "-",
      id: "business_name",
      cell: (info) => <div>{info.getValue() as string}</div>,
    },
    {
      header: "الموقع",
      accessorFn: (row) => row.sub_vendors?.location ?? "-",
      id: "location",
      cell: (info) => <div>{info.getValue() as string}</div>,
    },

    {
      id: "status",
      header: "حالة البائع",
      accessorFn: (row) => row.sub_vendors?.status ?? "-",

      cell: (info) => <div>{info.getValue() as string}</div>,
    },

    {
      header: "الرصيد",
      accessorFn: (row) => row.balances?.balance_amount ?? 0,
      id: "balance_amount",
      cell: (info) => {
        const value = info.getValue() as number;
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(value);
        return <div>{formatted}</div>;
      },
    },
    {
      header: "رقم الحساب",
      accessorFn: (row) => row.balances?.account_number ?? "-",
      id: "account_number",
      cell: (info) => <div>{info.getValue() as string}</div>,
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
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="dark:bg-amber-700">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  router.push(`/admin/manageusers/${row.original.id}`);
                  // getuserbyID(row.original.id); // Replace with user query hook
                }}
              >
                View customer
              </DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const { users, loading } = allUsers(); // Replace with user query hook
  if (loading) {
    return (
      <div className="container mx-auto px-5 py-2">
        <Skeleton className="rounded-md border  h-full p-5 dark:bg-gray-500">
          <div className="flex-col  ">
            <div>
              <Skeleton className="h-4 w-[250px] dark:bg-blue-300" />
            </div>

            <div>
              <Skeleton className="h-4 w-[200px] dark:bg-blue-300" />
            </div>
          </div>
          <Skeleton className="h-4 w-[250px] dark:bg-blue-300" />
          <Skeleton className="h-4 w-[250px] dark:bg-blue-300" />{" "}
          <Skeleton className="h-4 w-[250px] dark:bg-blue-300" />
          <Skeleton className="h-4 w-[250px] dark:bg-blue-300" />
        </Skeleton>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-5 py-2">
      <Topuprequest data={users} columns={columns} />
    </div>
  );
}
