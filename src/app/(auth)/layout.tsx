import { useAuthStore } from "@/stores/Auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { session } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  if (session) {
    return null;
  }
  return (
    <div className="">
      <div>{children}</div>
    </div>
  );
}
