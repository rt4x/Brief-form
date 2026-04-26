"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { readBriefById, updateBrief } from "@/lib/api/briefRequests";
import { BriefFormData } from "@/lib/types/BriefFormData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { briefFormSchema, type BriefFormValues } from "@/lib/validation/brief-form-schema";

type BriefEditableData = BriefFormValues;

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}

export default function BriefDetailsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";

  const [brief, setBrief] = useState<BriefFormData | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BriefEditableData>({
    resolver: zodResolver(briefFormSchema),
  });

  useEffect(() => {
    if (!id) return;

    async function loadBrief() {
      const loadedBrief = await readBriefById(id);
      setBrief(loadedBrief ?? null);
      if (loadedBrief) {
        const { id: _briefId, createdAt: _createdAt, ...editableData } = loadedBrief;
        reset(editableData);
      }
    }

    void loadBrief();
  }, [id, reset]);

  const onSubmit = async (data: BriefEditableData) => {
    if (!brief) return;

    const updatedBrief = await updateBrief(brief.id, data);
    if (!updatedBrief) return;

    setBrief(updatedBrief);
    setIsEditing(false);
    reset(data);
  };

  const handleCancel = () => {
    if (!brief) return;
    const { id: _briefId, createdAt: _createdAt, ...editableData } = brief;
    reset(editableData);
    setIsEditing(false);
  };

  const checkboxClass = "flex items-center gap-2 cursor-pointer";

  if (!id) {
    return (
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">Деталі брифу</h1>
        <p>Не передано ідентифікатор брифу.</p>
      </div>
    );
  }

  if (!brief) {
    return (
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">Деталі брифу</h1>
        <p>Бриф не знайдено.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex justify-center bg-muted p-6">
      <div className="w-full max-w-3xl bg-background p-8 rounded-2xl shadow space-y-10">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Деталі брифу</h1>
            <p className="text-sm text-muted-foreground">ID: {brief.id}</p>
            <p className="text-sm text-muted-foreground">
              Створено: {new Date(brief.createdAt).toLocaleString("uk-UA")}
            </p>
          </div>

          {isEditing ? (
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={handleCancel}>Скасувати</Button>
              <Button type="submit" form="brief-edit-form">Зберегти зміни</Button>
            </div>
          ) : (
            <Button type="button" onClick={() => setIsEditing(true)}>Редагувати</Button>
          )}
        </div>

        <form id="brief-edit-form" onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          <Section title="Контактна інформація">
            <Field id="name" label="Як вас звати?" error={errors.name?.message}>
              <Input id="name" {...register("name")} disabled={!isEditing} />
            </Field>

            <Field id="email" label="Яка ваша електронна адреса?" error={errors.email?.message}>
              <Input id="email" type="email" {...register("email")} disabled={!isEditing} />
            </Field>
          </Section>

          <Separator />

          <Section title="Опис продукту">
            <Field id="appName" label="Яка назва продукту?" error={errors.appName?.message}>
              <Input id="appName" {...register("appName")} disabled={!isEditing} />
            </Field>

            <Field id="projectDescription" label="Опишіть ідею продукту" error={errors.projectDescription?.message}>
              <Textarea id="projectDescription" {...register("projectDescription")} disabled={!isEditing} />
            </Field>
          </Section>

          <Separator />

          <Section title="Бізнес-контекст">
            <Field id="problemStatement" label="Яку проблему вирішує продукт?" error={errors.problemStatement?.message}>
              <Textarea id="problemStatement" {...register("problemStatement")} disabled={!isEditing} />
            </Field>

            <Field id="businessGoals" label="Які бізнес-цілі продукту?" error={errors.businessGoals?.message}>
              <Textarea id="businessGoals" {...register("businessGoals")} disabled={!isEditing} />
            </Field>

            <Field id="targetAudience" label="Яка цільова аудиторія продукту?" error={errors.targetAudience?.message}>
              <Textarea id="targetAudience" {...register("targetAudience")} disabled={!isEditing} />
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
                <label key={key} className={checkboxClass}>
                  <Checkbox
                    checked={!!watch(key as keyof BriefEditableData)}
                    onCheckedChange={(v) => {
                      if (!isEditing) return;
                      setValue(key as keyof BriefEditableData, !!v);
                    }}
                    disabled={!isEditing}
                  />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>

            <Field id="featuresAdditionalInfo" label="Додаткові функції">
              <Textarea id="featuresAdditionalInfo" {...register("featuresAdditionalInfo")} disabled={!isEditing} />
            </Field>
          </Section>

          <Separator />

          <Section title="Платформи">
            <div className="grid grid-cols-2 gap-4">
              {[
                ["ios", "iOS"],
                ["android", "Android"],
                ["web", "Веб"],
                ["ipadOs", "iPadOS"],
                ["watchOs", "watchOS"],
              ].map(([key, label]) => (
                <label key={key} className={checkboxClass}>
                  <Checkbox
                    checked={!!watch(key as keyof BriefEditableData)}
                    onCheckedChange={(v) => {
                      if (!isEditing) return;
                      setValue(key as keyof BriefEditableData, !!v);
                    }}
                    disabled={!isEditing}
                  />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>

            <Field id="platformOther" label="Інша платформа (необов'язково)">
              <Input id="platformOther" {...register("platformOther")} disabled={!isEditing} />
            </Field>
          </Section>

          <Separator />

          <Section title="Обмеження та припущення">
            <Field id="constraints" label="Які є обмеження?">
              <Textarea id="constraints" {...register("constraints")} disabled={!isEditing} />
            </Field>

            <Field id="assumptions" label="Які припущення зроблені на старті?">
              <Textarea id="assumptions" {...register("assumptions")} disabled={!isEditing} />
            </Field>

            <Field id="successCriteria" label="Як визначається успіх продукту?">
              <Textarea id="successCriteria" {...register("successCriteria")} disabled={!isEditing} />
            </Field>
          </Section>

          <Separator />

          <Section title="Монетизація">
            <label className={checkboxClass}>
              <Checkbox
                checked={!!watch("hasSubscriptions")}
                onCheckedChange={(v) => {
                  if (!isEditing) return;
                  setValue("hasSubscriptions", !!v);
                }}
                disabled={!isEditing}
              /> Підписка
            </label>

            <label className={checkboxClass}>
              <Checkbox
                checked={!!watch("hasAds")}
                onCheckedChange={(v) => {
                  if (!isEditing) return;
                  setValue("hasAds", !!v);
                }}
                disabled={!isEditing}
              /> Реклама
            </label>

            <label className={checkboxClass}>
              <Checkbox
                checked={!!watch("hasInAppPurchases")}
                onCheckedChange={(v) => {
                  if (!isEditing) return;
                  setValue("hasInAppPurchases", !!v);
                }}
                disabled={!isEditing}
              /> Вбудовані покупки
            </label>

            <Field id="monetizationNotes" label="Додаткові деталі монетизації">
              <Textarea id="monetizationNotes" {...register("monetizationNotes")} disabled={!isEditing} />
            </Field>
          </Section>

          <Separator />

          <Section title="Інтеграції">
            <Input id="integrations" {...register("integrations")} disabled={!isEditing} />
          </Section>

          <Separator />

          <Section title="Додаткова інформація та матеріали">
            <Textarea id="additionalInfo" {...register("additionalInfo")} disabled={!isEditing} />
          </Section>
        </form>
      </div>
    </main>
  );
}