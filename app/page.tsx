"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { submitBrief } from "@/lib/api/briefRequests";
import { briefFormSchema, type BriefFormValues } from "@/lib/validation/brief-form-schema";

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
  const router = useRouter();

  const { register, setValue, handleSubmit, formState: { errors } } = useForm<BriefFormValues>({
    resolver: zodResolver(briefFormSchema),
  });

  const onSubmit = async (data: BriefFormValues) => {
    await submitBrief(data);
    router.push("/success");
  };

  return (
    <main className="min-h-screen flex justify-center bg-muted p-6">
      <div className="w-full max-w-3xl bg-background p-8 rounded-2xl shadow space-y-10">
        <h1 className="text-2xl font-bold">
          Бриф: мобільний застосунок для контролю харчування
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

          <Section title="Контактна інформація">
            <Field id="name" label="Як вас звати?" error={errors.name?.message}>
              <Input id="name" {...register("name")} placeholder="Введіть ваше ім'я" />
            </Field>

            <Field id="email" label="Яка ваша електронна адреса?" error={errors.email?.message}>
              <Input id="email" type="email" {...register("email")} placeholder="name@domain.com" />
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
              <Textarea id="businessGoals" {...register("businessGoals")} placeholder="Напр. зростання користувачів, дохід, утримання" />
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
                ["featureAIRecommendations", "Рекомендації ШІ"],
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
              <Textarea id="featuresAdditionalInfo" {...register("featuresAdditionalInfo")} placeholder="Напр. фото їжі, чат із ШІ, відстеження активності" />
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
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox onCheckedChange={(v) => setValue("web", !!v)} /> Веб
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox onCheckedChange={(v) => setValue("ipadOs", !!v)} /> iPadOS
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox onCheckedChange={(v) => setValue("watchOs", !!v)} /> watchOS
              </label>
            </div>
            <Field id="platformOther" label="Інша платформа (необов'язково)">
              <Input
                id="platformOther"
                {...register("platformOther")}
                placeholder="Напр. HarmonyOS, Windows Phone"
              />
            </Field>
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
              <Textarea id="successCriteria" {...register("successCriteria")} placeholder="MAU, утримання, досягнення цілей користувача" />
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
              <Checkbox onCheckedChange={(v) => setValue("hasInAppPurchases", !!v)} /> Вбудовані покупки
            </label>

            <Field id="monetizationNotes" label="Додаткові деталі монетизації">
              <Textarea id="monetizationNotes" {...register("monetizationNotes")} placeholder="Опишіть модель монетизації детальніше" />
            </Field>
          </Section>

          <Separator />

          <Section title="Інтеграції">
            <Input {...register("integrations")} placeholder="Напр. Apple Health, Google Fit, MyFitnessPal" />
          </Section>

          <Separator />

          <Section title="Додаткова інформація та матеріали">
            <Textarea {...register("additionalInfo")} placeholder="Будь-які додаткові деталі про продукт" />
          </Section>

          <Button className="w-full" type="submit">
            Зберегти бриф
          </Button>
        </form>
      </div>
    </main>
  );
}
