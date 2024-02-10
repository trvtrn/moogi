"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { trpc } from "../_trpc/client";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  const { error, isLoading } = trpc.authCallBack.useQuery(undefined, {
    retry: true,
    retryDelay: 500,
  });

  useEffect(() => {
    if (isLoading) {
      router.push(origin ? `/${origin}` : "/dashboard");
    }
    if (error?.data?.code === "UNAUTHORIZED") {
      router.push("/sign-in");
      console.log("there was an error");
    }
  }, [isLoading, router, error?.data?.code, origin]);

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
        <h3 className="dont-semibold text-xl">Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default Page;
