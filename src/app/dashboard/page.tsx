import Dashboard from "@/components/Dashboard";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // if user is not logged in
  if (!user || !user.id) redirect("/auth-callback?origin=dashboard");

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  // if user is not synced to the db
  if (!dbUser) redirect("/auth-callback?origin=dashboard");

  return <Dashboard />;
}
