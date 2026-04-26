"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

/**
 * Brief for mobile nutrition tracking app
 */
const briefSchema = z.object({
  // Contact
  name: z.string().min(2, "Мінімум 2 символи"),
  email: z.string().email("Некоректний email"),

  // Project basics
  appName: z.string().min(2, "Вкажіть назву застосунку"),
  projectDescription: z.string().min(10, "Опишіть ідею детальніше"),

  // Product definition
  targetAudience: z.string().min(5, "Кому призначено застосунок?"),
  coreFeatures: z.string().min(10, "Опишіть ключові функції"),
  platforms: z.string().min(2, "iOS / Android / обидві"),

  // Strategy
  goals: z.string().min(5, "Цілі проєкту"),
  constraints: z.string().optional(),
  successCriteria: z.string().optional(),
  stakeholders: z.string().optional(),

  // Domain-specific
  dietPreferences: z.string().optional(),
  integrations: z.string().optional(),
  notifications: z.string().optional(),
  monetization: z.string().optional(),

  attachments: z.any().optional(),
});

type BriefFormValues = z.infer<typeof briefSchema>;

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BriefFormValues>({
    resolver: zodResolver(briefSchema),
    defaultValues: {
      name: "",
      email: "",
      appName: "",
      projectDescription: "",
      targetAudience: "",
      coreFeatures: "",
      platforms: "",
      goals: "",
      constraints: "",
      successCriteria: "",
      stakeholders: "",
      dietPreferences: "",
      integrations: "",
      notifications: "",
      monetization: "",
    },
  });

  const onSubmit = (data: BriefFormValues) => {
    console.log("FORM DATA:", data);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted p-6">
      <div className="w-full max-w-3xl rounded-2xl bg-background p-8 shadow">
        <h1 className="mb-6 text-2xl font-semibold">
          Бриф: мобільний застосунок для контролю харчування
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Contact */}
          <section className="space-y-4">
            <h2 className="font-medium">Контактна інформація</h2>

            <Field label="Ім’я" error={errors.name?.message}>
              <Input {...register("name")} />
            </Field>

            <Field label="Email" error={errors.email?.message}>
              <Input type="email" {...register("email")} />
            </Field>
          </section>

          {/* App basics */}
          <section className="space-y-4">
            <h2 className="font-medium">Про застосунок</h2>

            <Field label="Назва застосунку" error={errors.appName?.message}>
              <Input {...register("appName")} />
            </Field>

            <Field
              label="Короткий опис ідеї"
              error={errors.projectDescription?.message}
            >
              <Textarea {...register("projectDescription")} />
            </Field>

            <Field label="Цільова аудиторія" error={errors.targetAudience?.message}>
              <Textarea placeholder="Напр. спортсмени, люди на дієті..." {...register("targetAudience")} />
            </Field>

            <Field label="Основні функції" error={errors.coreFeatures?.message}>
              <Textarea placeholder="Підрахунок калорій, сканер штрих-кодів..." {...register("coreFeatures")} />
            </Field>

            <Field label="Платформи" error={errors.platforms?.message}>
              <Input placeholder="iOS / Android / обидві" {...register("platforms")} />
            </Field>
          </section>

          {/* Strategy */}
          <section className="space-y-4">
            <h2 className="font-medium">Продуктова стратегія</h2>

            <Field label="Цілі проєкту" error={errors.goals?.message}>
              <Textarea placeholder="Напр. зменшення ваги користувачів, retention" {...register("goals")} />
            </Field>

            <Field label="Обмеження">
              <Textarea {...register("constraints")} />
            </Field>

            <Field label="Критерії успіху">
              <Textarea placeholder="MAU, retention, % втрати ваги" {...register("successCriteria")} />
            </Field>

            <Field label="Стейкхолдери">
              <Textarea {...register("stakeholders")} />
            </Field>
          </section>

          {/* Nutrition-specific */}
          <section className="space-y-4">
            <h2 className="font-medium">Функціонал харчування</h2>

            <Field label="Дієтичні вподобання">
              <Input placeholder="веган, кето, без глютену" {...register("dietPreferences")} />
            </Field>

            <Field label="Інтеграції">
              <Input placeholder="Apple Health, Google Fit" {...register("integrations")} />
            </Field>

            <Field label="Нотифікації">
              <Input placeholder="нагадування про прийом їжі, воду" {...register("notifications")} />
            </Field>

            <Field label="Монетизація">
              <Input placeholder="підписка, freemium" {...register("monetization")} />
            </Field>
          </section>

          {/* Attachments */}
          <section className="space-y-4">
            <h2 className="font-medium">Додатки</h2>

            <Field label="Файли / зображення">
              <Input type="file" multiple {...register("attachments")} />
            </Field>
          </section>

          <Button type="submit" className="w-full">
            Надіслати бриф
          </Button>
        </form>
      </div>
    </main>
  );
}
