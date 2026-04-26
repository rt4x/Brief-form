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
 * Zod schema
 */
const briefSchema = z.object({
  name: z.string().min(2, "Мінімум 2 символи"),
  email: z.string().email("Некоректний email"),

  projectName: z.string().min(2, "Вкажіть назву проєкту"),
  projectDescription: z.string().min(10, "Мінімум 10 символів"),

  goals: z.string().min(5, "Опишіть цілі"),
  constraints: z.string().optional(),
  successCriteria: z.string().optional(),
  stakeholders: z.string().optional(),

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
      projectName: "",
      projectDescription: "",
      goals: "",
      constraints: "",
      successCriteria: "",
      stakeholders: "",
    },
  });

  const onSubmit = (data: BriefFormValues) => {
    console.log("FORM DATA:", data);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted p-6">
      <div className="w-full max-w-2xl rounded-2xl bg-background p-8 shadow">
        <h1 className="mb-6 text-2xl font-semibold">Заповнення брифу</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Contact */}
          <div className="space-y-4">
            <h2 className="font-medium">Контактна інформація</h2>

            <Field label="Ім’я" error={errors.name?.message}>
              <Input {...register("name")} />
            </Field>

            <Field label="Email" error={errors.email?.message}>
              <Input type="email" {...register("email")} />
            </Field>
          </div>

          {/* Project */}
          <div className="space-y-4">
            <h2 className="font-medium">Проєкт</h2>

            <Field label="Назва проєкту" error={errors.projectName?.message}>
              <Input {...register("projectName")} />
            </Field>

            <Field
              label="Короткий опис проєкту"
              error={errors.projectDescription?.message}
            >
              <Textarea {...register("projectDescription")} />
            </Field>
          </div>

          {/* Strategy */}
          <div className="space-y-4">
            <h2 className="font-medium">Стратегія</h2>

            <Field label="Цілі" error={errors.goals?.message}>
              <Textarea {...register("goals")} />
            </Field>

            <Field label="Обмеження та припущення">
              <Textarea {...register("constraints")} />
            </Field>

            <Field label="Критерії успіху">
              <Textarea {...register("successCriteria")} />
            </Field>

            <Field label="Стейкхолдери">
              <Textarea {...register("stakeholders")} />
            </Field>
          </div>

          {/* Attachments */}
          <div className="space-y-4">
            <h2 className="font-medium">Додатки</h2>

            <Field label="Файли / зображення">
              <Input type="file" multiple {...register("attachments")} />
            </Field>
          </div>

          <Button type="submit" className="w-full">
            Надіслати
          </Button>
        </form>
      </div>
    </main>
  );
}
