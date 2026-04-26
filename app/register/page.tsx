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

const registerSchema = z
  .object({
    email: z.string().email("Вкажіть коректну електронну адресу"),
    password: z.string().min(6, "Пароль має містити щонайменше 6 символів"),
    confirmPassword: z.string().min(6, "Підтвердження пароля є обов'язковим"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Паролі не співпадають",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { signUp, signInWithGoogle } = useAuth();
  const [submitError, setSubmitError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setSubmitError("");

    try {
      await signUp(data.email, data.password);
      router.replace("/");
    } catch (error: unknown) {
      const code = (error as { code?: string })?.code;
      if (code === "auth/email-already-in-use") {
        setSubmitError("Обліковий запис із цією адресою вже існує. Спробуйте увійти.");
      } else if (code === "auth/invalid-email") {
        setSubmitError("Некоректна електронна адреса.");
      } else if (code === "auth/weak-password") {
        setSubmitError("Пароль занадто слабкий. Використовуйте щонайменше 6 символів.");
      } else {
        setSubmitError("Не вдалося зареєструватися. Спробуйте ще раз.");
      }
    }
  };

  const onGoogleAuth = async () => {
    setSubmitError("");
    setGoogleLoading(true);

    try {
      await signInWithGoogle();
      router.replace("/");
    } catch {
      setSubmitError("Не вдалося авторизуватися через Google. Спробуйте ще раз.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-muted/40 p-6">
      <div className="mx-auto w-full max-w-md rounded-xl border bg-background p-8 shadow-sm">
        <div className="mb-6 space-y-1 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Реєстрація</h1>
          <p className="text-sm text-muted-foreground">Створіть акаунт для роботи з брифами</p>
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Підтвердіть пароль</Label>
            <Input id="confirmPassword" type="password" {...register("confirmPassword")} />
            {errors.confirmPassword?.message && (
              <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
            )}
          </div>

          {submitError && <p className="text-sm text-destructive">{submitError}</p>}

          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Реєстрація..." : "Зареєструватися"}
          </Button>

          <Button
            className="w-full"
            type="button"
            variant="outline"
            onClick={onGoogleAuth}
            disabled={googleLoading}
          >
            {googleLoading
              ? "Авторизація через Google..."
              : "Зареєструватися через Google"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Уже є акаунт?{" "}
            <Link href="/login" className="text-primary underline-offset-4 hover:underline">
              Увійти
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
