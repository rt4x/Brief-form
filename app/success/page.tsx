import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <main className="min-h-[calc(100svh-4rem)] bg-muted p-6">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-6 rounded-2xl border bg-background p-8 text-center shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight">Форму успішно надіслано</h1>
        <p className="text-muted-foreground">
          Ваш бриф збережено. Ви можете надіслати ще один.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href="/">Надіслати ще один бриф</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
