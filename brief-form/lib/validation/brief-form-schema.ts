import { z } from "zod";

export const briefFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Вкажіть ім'я (щонайменше 2 символи)"),
  email: z
    .string()
    .trim()
    .email("Вкажіть коректну електронну адресу"),

  appName: z
    .string()
    .trim()
    .min(2, "Вкажіть назву продукту (щонайменше 2 символи)"),
  projectDescription: z
    .string()
    .trim()
    .min(10, "Опис ідеї має містити щонайменше 10 символів"),

  problemStatement: z
    .string()
    .trim()
    .min(10, "Опишіть проблему щонайменше 10 символами"),
  businessGoals: z
    .string()
    .trim()
    .min(10, "Опишіть бізнес-цілі щонайменше 10 символами"),

  targetAudience: z
    .string()
    .trim()
    .min(5, "Опишіть цільову аудиторію щонайменше 5 символами"),

  featureCaloriesTracking: z.boolean().optional(),
  featureBarcodeScanner: z.boolean().optional(),
  featureWaterTracking: z.boolean().optional(),
  featureAIRecommendations: z.boolean().optional(),
  featureMealPlanner: z.boolean().optional(),
  featureGroceryList: z.boolean().optional(),

  featuresAdditionalInfo: z.string().trim().optional(),

  ios: z.boolean().optional(),
  android: z.boolean().optional(),
  web: z.boolean().optional(),
  ipadOs: z.boolean().optional(),
  watchOs: z.boolean().optional(),
  platformOther: z.string().trim().optional(),

  constraints: z.string().trim().optional(),
  assumptions: z.string().trim().optional(),
  successCriteria: z.string().trim().optional(),

  hasSubscriptions: z.boolean().optional(),
  hasAds: z.boolean().optional(),
  hasInAppPurchases: z.boolean().optional(),
  monetizationNotes: z.string().trim().optional(),

  integrations: z.string().trim().optional(),
  additionalInfo: z.string().trim().optional(),
});

export type BriefFormValues = z.infer<typeof briefFormSchema>;
