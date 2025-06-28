"use client";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { getuserbyID, handleDeleteUser } from "@/hooks/usetopupRequest";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useParams } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import { handleUpdateStatus } from "@/hooks/usetopupRequest";
import Grid from "@mui/material/Grid";
import { Separator } from "@radix-ui/react-separator";
import { Card, CardContent } from "@/components/ui/card";

import { topUpUserBalance } from "@/hooks/function";
import { useTopUprequest } from "@/hooks/usetopupRequest";
import { Topuprequest } from "@/components/topuprequest";
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

type Payment = {
  id: string;
  amount: number;
  status: "Rejected" | "Pending" | "Approved";
  email: string;
  business_name: string;
  phone_number: string;
  user_id: string;
};
type Props = {
  id: string;
};

export default function UserProfiel({ id }: Props) {
  const { user, loading } = getuserbyID(id);

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
      header: () => <div className="">الحالة</div>, // Align header text to right
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
      accessorKey: "created_at",
      header: () => <div className="text-right">تاريخ الإنشاء</div>,
      cell: ({ row }) => {
        const date = new Date(row.getValue("created_at"));
        const formatted = date.toLocaleDateString("ar-EG", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        return <div className="text-right text-sm">{formatted}</div>;
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
          <Skeleton className="h-4 w-[250px] dark:bg-blue-300" />
          <Skeleton className="h-4 w-[250px] dark:bg-blue-300" />
          <Skeleton className="h-4 w-[250px] dark:bg-blue-300" />
        </Skeleton>
      </div>
    );
  }
  const InfoRow = ({ label, value }: { label: string; value: any }) => (
    <div className="flex flex-col items-end">
      <span className="text-sm  ">{label}</span>

      <p className="text-lg font-medium ">{value ?? "غير متوفر"}</p>
    </div>
  );

  return (
    <Card className=" mx-auto border-0 p-6 space-y-6">
      <div className="flex justify-center">
        <Avatar className="w-24 h-24">
          {user?.avatar_url ? (
            <AvatarImage src={user.avatar_url} alt={user.full_name} />
          ) : (
            <AvatarFallback className="bg-blue-600 text-white text-xl">
              {(user?.username?.charAt(0) ?? "") +
                (user?.username?.slice(-1) ?? "")}
            </AvatarFallback>
          )}
        </Avatar>
      </div>

      <CardContent className="grid grid-cols-1 md:grid-cols-2  items-center text-right">
        <InfoRow value={user?.invited_users_count} label=":المستخدم" />
        <InfoRow label=":الاسم الكامل" value={user?.full_name} />
        <InfoRow label=":اسم المستخدم" value={user?.username} />
        <InfoRow label=":البريد الإلكتروني" value={user?.email} />
        <InfoRow label=":رقم الهاتف" value={user?.phonenumber} />
        <InfoRow label=":الدور" value={user?.user_role} />
        <InfoRow
          label=":اسم النشاط التجاري"
          value={user?.sub_vendors?.business_name}
        />
        <InfoRow label=":الموقع" value={user?.sub_vendors?.location} />
        <InfoRow label=":الحالة" value={user?.sub_vendors?.status} />
        <InfoRow label=":الرصيد" value={user?.balances?.balance_amount} />
        <InfoRow label=":رقم الحساب" value={user?.balances?.account_number} />
      </CardContent>
      <Topuprequest data={user?.top_up_requests} columns={columns} />

      <div className="flex flex-col sm:flex-row justify-center gap-4 ">
        <Button
          variant="outline"
          onClick={() => handleUpdateStatus(user.id, "pending")}
        >
          تعليق المستخدم
        </Button>
        <Button variant="outline" onClick={() => handleDeleteUser(user.id)}>
          حذف المستخدم
        </Button>
      </div>
    </Card>
  );
}
