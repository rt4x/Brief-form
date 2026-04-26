"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/auth-provider";

const loginSchema = z.object({
  email: z.string().email("Вкажіть коректну електронну адресу"),
  password: z.string().min(6, "Пароль має містити щонайменше 6 символів"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signInWithGoogle } = useAuth();
  const [submitError, setSubmitError] = useState<string>("");
  const [googleLoading, setGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setSubmitError("");

    try {
      await signIn(data.email, data.password);
      router.replace("/");
    } catch {
      setSubmitError("Не вдалося увійти. Перевірте email і пароль.");
    }
  };

  const onGoogleAuth = async () => {
    setSubmitError("");
    setGoogleLoading(true);

    try {
      await signInWithGoogle();
      router.replace("/");
    } catch {
      setSubmitError("Не вдалося увійти через Google. Спробуйте ще раз.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-muted/40 p-6">
      <div className="mx-auto w-full max-w-md rounded-xl border bg-background p-8 shadow-sm">
        <div className="mb-6 space-y-1 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Вхід</h1>
          <p className="text-sm text-muted-foreground">Увійдіть, щоб працювати з брифами</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email?.message && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password?.message && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          {submitError && <p className="text-sm text-destructive">{submitError}</p>}

          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Вхід..." : "Увійти"}
          </Button>

          <Button
            className="w-full"
            type="button"
            variant="outline"
            onClick={onGoogleAuth}
            disabled={googleLoading}
          >
            {googleLoading ? "Вхід через Google..." : "Увійти через Google"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Немає акаунта?{" "}
            <Link href="/register" className="text-primary underline-offset-4 hover:underline">
              Зареєструватися
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
