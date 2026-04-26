"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth-provider";
import { useIsAdmin } from "@/hooks/use-is-admin";

export function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, signOutUser } = useAuth();
  const isAdmin = useIsAdmin();

  const isHomeActive = pathname === "/";
  const isBriefsActive = pathname === "/briefs" || pathname.startsWith("/briefs/");

  const handleLogout = async () => {
    await signOutUser();
    router.push("/login");
  };

  return (
    <header className="border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Бриф-форма
        </Link>

        <div className="flex items-center gap-2">
          {user && (
            <nav className="flex items-center gap-2">
              <Button
                asChild
                variant={isHomeActive ? "default" : "ghost"}
                className={cn(!isHomeActive && "text-muted-foreground")}
              >
                <Link href="/">Головна</Link>
              </Button>

              {isAdmin && (
                <Button
                  asChild
                  variant={isBriefsActive ? "default" : "ghost"}
                  className={cn(!isBriefsActive && "text-muted-foreground")}
                >
                  <Link href="/briefs">Брифи</Link>
                </Button>
              )}
            </nav>
          )}

          {user ? (
            <Button type="button" variant="outline" onClick={handleLogout}>
              Вийти
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link href="/register">Реєстрація</Link>
              </Button>
              <Button asChild variant="default">
                <Link href="/login">Увійти</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}