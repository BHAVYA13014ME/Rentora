"use client";

import { useCurrentUserClient } from "@/hook/use-current-user";
import Loading from "../Loading";
import { usePathname } from "next/navigation";

// Pages that should render immediately without waiting for session
const publicPaths = ["/", "/auth", "/products"];

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { status } = useCurrentUserClient();
  const pathname = usePathname();

  const isPublicPage = publicPaths.some(
    (path) => pathname === path || pathname?.startsWith(path + "/")
  );

  // Don't block rendering on public pages — let them load immediately
  if (status === "loading" && !isPublicPage) {
    return <Loading />;
  }

  return <>{children}</>;
}
