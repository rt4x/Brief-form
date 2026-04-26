"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AppHeader() {
  const pathname = usePathname();

  const isHomeActive = pathname === "/";
  const isBriefsActive = pathname === "/briefs" || pathname.startsWith("/briefs/");

  return (
    <header className="border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Бриф-форма
        </Link>

        <nav className="flex items-center gap-2">
          <Button
            asChild
            variant={isHomeActive ? "default" : "ghost"}
            className={cn(!isHomeActive && "text-muted-foreground")}
          >
            <Link href="/">Головна</Link>
          </Button>

          <Button
            asChild
            variant={isBriefsActive ? "default" : "ghost"}
            className={cn(!isBriefsActive && "text-muted-foreground")}
          >
            <Link href="/briefs">Брифи</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}