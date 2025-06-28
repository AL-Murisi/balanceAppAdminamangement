// app/admin/manageusers/[id]/page.tsx

import UserProfiel from "@/components/userProfile";
// import { useParams } from "next/navigation";

export default async function UserDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="container mx-auto py-2 ">
      <UserProfiel id={id} />
    </div>
  );
}
