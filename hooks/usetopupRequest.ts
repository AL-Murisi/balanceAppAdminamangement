"use client";

import axios from "axios";
import { UserRound } from "lucide-react";
import useSWR from "swr";

type Payment = {
  id: string;
  amount: number;
  status: "Rejected" | "Pending" | "Approved";
  email: string;
  business_name: string;
  phone_number: string;
  user_id: string;
};
type NewUsers = {
  user_id: string;
  id: string;
  status: "rejected" | "pending" | "approved";
  email: string;
  business_name: string;
  phone_number: string;
  location: string;
};
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
type profile = {
  avatar_url: string;
  email: string;
  full_name: string;
  id: string;
  invite_code: string;
  phonenumber: number;
  transfer_pin: string;
  updated_at: string;
  user_role: string;
  username: string;
};
type amount = {
  amount: string | null;
};
const fetcher = (url: string) => axios.get(url).then((res) => res.data);
export function useTopUprequest() {
  const { data, error, isLoading } = useSWR("/api/top-uprequests", fetcher);

  const topup: Payment[] = Array.isArray(data?.topup)
    ? data.topup.map((item: any) => ({
        ...item,
        email: item.profiles?.email || "",
      }))
    : [];

  return { topup, loading: isLoading };
}
export function useNewUsers() {
  const { data, error, isLoading } = useSWR("/api/promote-user", fetcher);

  const users: NewUsers[] = Array.isArray(data?.users)
    ? data.users.map((item: any) => ({
        ...item,
        email: item.profiles?.email || "",
      }))
    : [];

  return { users, loading: isLoading };
}
export function allUsers() {
  const { data, error, isLoading } = useSWR("/api/get-allusers", fetcher);

  const users: UserRecord[] =
    Array.isArray(data?.users) &&
    data.users.map((item: any) => ({
      ...item,
      item: item || "",
    }));
  console.log(data);

  return { users, loading: isLoading };
}
export function balance() {
  const { data, error, isLoading } = useSWR("/api/profile-user", fetcher);
  return { data, loading: isLoading };
}
export function getuserbyID(id: string) {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  const { data, error, isLoading } = useSWR(`/api/usersdetails/${id}`, fetcher);
  // const users: UserRecord | null =
  //   Array.isArray(data?.users) &&
  //   data.users.map((item: any) => ({
  //     ...item,
  //     item: item || "",
  //   }));
  return { user: data, loading: isLoading };
}
// }
// export function useTopUprequest() {
//   const [topup, setTopup] = useState<Payment[]>([]);
//   const [loading, setLoading] = useState(true);

//   React.useEffect(() => {
//     const loadRqust = async () => {
//       setLoading(true);
//       const res = await fetch("/api/top-uprequests");
//       const data = await res.json();

//       if (res.ok) {
//         const topups = Array.isArray(data.topup) ? data.topup : [data.topup];

//         const transformedData: Payment[] = topups.map((item: any) => ({
//           ...item,
//           email: item.profiles?.email || "",
//         }));

//         setTopup(transformedData);
//       } else console.error("Error fetching users:", data.error);
//       setLoading(false);
//     };
//     loadRqust();
//   }, []);
//   return { topup };
// }
// /hooks/useFetchUsers.ts

export const handleUpdateStatusTopUp = async (
  requestId: string,
  status: "Rejected" | "Pending" | "Approved"
) => {
  try {
    const res = await fetch("/api/top-uprequests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: requestId, status }),
    });
    console.log();
    const data = await res.json();

    if (res.ok) {
      console.log(`User ${requestId} status updated to ${status}:`, data);
      // The real-time listener in useNewUsers will automatically update the UI
    } else {
      console.error(
        `Error updating user ${requestId} status to ${status}:`,
        data.error
      );
      // Optionally show an error message to the user
    }
  } catch (err) {
    console.error("Network error updating user status:", err);
    // Optionally show a network error message
  }
};

export const handleUpdateStatus = async (
  userId: string,
  status: "rejected" | "pending" | "approved"
) => {
  try {
    const res = await fetch("/api/promote-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId, status }),
    });

    const data = await res.json();

    if (res.ok) {
      console.log(`User ${userId} status updated to ${status}:`, data);
      // The real-time listener in useNewUsers will automatically update the UI
    } else {
      console.error(
        `Error updating user ${userId} status to ${status}:`,
        data.error
      );
      // Optionally show an error message to the user
    }
  } catch (err) {
    console.error("Network error updating user status:", err);
    // Optionally show a network error message
  }
};
export const handleDeleteUser = async (userId: string) => {
  try {
    const res = await fetch("/api/deleteuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("User deleted:", data);
      alert("تم حذف المستخدم بنجاح");
    } else {
      console.error("Delete error:", data.error);
      alert("حدث خطأ أثناء حذف المستخدم: " + data.error);
    }
  } catch (err) {
    console.error("Network error deleting user:", err);
    alert("فشل الاتصال بالخادم");
  }
};
