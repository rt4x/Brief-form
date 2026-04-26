"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { submitBrief } from "@/lib/api/submitBrief";

const briefSchema = z.object({
  name: z.string().min(2),
  email: z.email(),

  appName: z.string().min(2),
  projectDescription: z.string().min(10),

  problemStatement: z.string().min(10),
  businessGoals: z.string().min(10),

  targetAudience: z.string().min(5),

  featureCaloriesTracking: z.boolean().optional(),
  featureBarcodeScanner: z.boolean().optional(),
  featureWaterTracking: z.boolean().optional(),
  featureAIRecommendations: z.boolean().optional(),
  featureMealPlanner: z.boolean().optional(),
  featureGroceryList: z.boolean().optional(),

  featuresAdditionalInfo: z.string().optional(),

  ios: z.boolean().optional(),
  android: z.boolean().optional(),

  constraints: z.string().optional(),
  assumptions: z.string().optional(),

  successCriteria: z.string().optional(),

  hasSubscriptions: z.boolean().optional(),
  hasAds: z.boolean().optional(),
  hasInAppPurchases: z.boolean().optional(),
  monetizationNotes: z.string().optional(),

  integrations: z.string().optional(),

  additionalInfo: z.string().optional(),
});

type BriefFormValues = z.infer<typeof briefSchema>;

function Field({ id, label, error, children }: any) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="font-medium cursor-pointer">
        {label}
      </Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}

export default function Home() {
  const { register, setValue, handleSubmit, formState: { errors } } = useForm<BriefFormValues>({
    resolver: zodResolver(briefSchema),
  });

  const onSubmit = (data: BriefFormValues) => {
    const savedBrief = submitBrief(data);
    console.log("Saved brief:", savedBrief);
  };

  return (
    <main className="min-h-screen flex justify-center bg-muted p-6">
      <div className="w-full max-w-3xl bg-background p-8 rounded-2xl shadow space-y-10">

      <Link href="/briefs">Брифи</Link>
        <h1 className="text-2xl font-bold">
          Бриф: мобільний застосунок для контролю харчування
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

          <Section title="Контактна інформація">
            <Field id="name" label="Як вас звати?" error={errors.name?.message}>
              <Input id="name" {...register("name")} placeholder="Введіть ваше ім'я" />
            </Field>

            <Field id="email" label="Яка ваша електронна адреса?" error={errors.email?.message}>
              <Input id="email" type="email" {...register("email")} placeholder="name@example.com" />
            </Field>
          </Section>

          <Separator />

          <Section title="Опис продукту">
            <Field id="appName" label="Яка назва продукту?" error={errors.appName?.message}>
              <Input id="appName" {...register("appName")} placeholder="Напр. NutriTrack" />
            </Field>

            <Field id="projectDescription" label="Опишіть ідею продукту" error={errors.projectDescription?.message}>
              <Textarea id="projectDescription" {...register("projectDescription")} placeholder="Коротко опишіть, що робить ваш продукт" />
            </Field>
          </Section>

          <Separator />

          <Section title="Бізнес-контекст">
            <Field id="problemStatement" label="Яку проблему вирішує продукт?" error={errors.problemStatement?.message}>
              <Textarea id="problemStatement" {...register("problemStatement")} placeholder="Яку біль користувача вирішуємо?" />
            </Field>

            <Field id="businessGoals" label="Які бізнес-цілі продукту?" error={errors.businessGoals?.message}>
              <Textarea id="businessGoals" {...register("businessGoals")} placeholder="Напр. зростання користувачів, дохід, retention" />
            </Field>

            <Field id="targetAudience" label="Яка цільова аудиторія продукту?">
              <Textarea id="targetAudience" {...register("targetAudience")} placeholder="Напр. спортсмени, люди на дієті, офісні працівники" />
            </Field>
          </Section>

          <Separator />

          <Section title="Функціонал продукту">
            <div className="grid grid-cols-2 gap-4">
              {[
                ["featureCaloriesTracking", "Підрахунок калорій"],
                ["featureBarcodeScanner", "Сканер штрих-кодів"],
                ["featureWaterTracking", "Відстеження води"],
                ["featureAIRecommendations", "AI-рекомендації"],
                ["featureMealPlanner", "План харчування"],
                ["featureGroceryList", "Список покупок"],
              ].map(([key, label]) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox onCheckedChange={(v) => setValue(key as any, !!v)} />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>

            <Field id="featuresAdditionalInfo" label="Додаткові функції">
              <Textarea id="featuresAdditionalInfo" {...register("featuresAdditionalInfo")} placeholder="Напр. фото їжі, AI-чат, трекінг активності" />
            </Field>
          </Section>

          <Separator />

          <Section title="Платформи">
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox onCheckedChange={(v) => setValue("ios", !!v)} /> iOS
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox onCheckedChange={(v) => setValue("android", !!v)} /> Android
              </label>
            </div>
          </Section>

          <Separator />

          <Section title="Обмеження та припущення">
            <Field id="constraints" label="Які є обмеження?" error={errors.constraints?.message}>
              <Textarea id="constraints" {...register("constraints")} placeholder="Бюджет, час, технології" />
            </Field>

            <Field id="assumptions" label="Які припущення зроблені на старті?">
              <Textarea id="assumptions" {...register("assumptions")} placeholder="Що вважаємо правдою зараз" />
            </Field>

            <Field id="successCriteria" label="Як визначається успіх продукту?">
              <Textarea id="successCriteria" {...register("successCriteria")} placeholder="MAU, retention, досягнення цілей користувача" />
            </Field>
          </Section>

          <Separator />

          <Section title="Монетизація">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox onCheckedChange={(v) => setValue("hasSubscriptions", !!v)} /> Підписка
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox onCheckedChange={(v) => setValue("hasAds", !!v)} /> Реклама
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox onCheckedChange={(v) => setValue("hasInAppPurchases", !!v)} /> In-app покупки
            </label>

            <Field id="monetizationNotes" label="Додаткові деталі монетизації">
              <Textarea id="monetizationNotes" {...register("monetizationNotes")} placeholder="Опишіть модель монетизації детальніше" />
            </Field>
          </Section>

          <Separator />

          <Section title="Інтеграції">
            <Input {...register("integrations")} placeholder="Apple Health, Google Fit, MyFitnessPal" />
          </Section>

          <Separator />

          <Section title="Додаткова інформація та матеріали">
            <Textarea {...register("additionalInfo")} placeholder="Будь-які додаткові деталі про продукт" />

            <div className="mt-4">
              <Input type="file" multiple />
            </div>
          </Section>

          <Button className="w-full" type="submit">
            Зберегти бриф
          </Button>
        </form>
      </div>
    </main>
  );
}
