import { BriefFormData } from "@/lib/types/BriefFormData";

const KEY = "briefs";

export function getBriefs(): BriefFormData[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveBrief(data: Omit<BriefFormData, "id" | "createdAt">) {
  const briefs = getBriefs();

  const newBrief: BriefFormData = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  briefs.push(newBrief);
  localStorage.setItem(KEY, JSON.stringify(briefs));

  return newBrief;
}

export function getBriefById(id: string) {
  return getBriefs().find((b) => b.id === id);
}

export function updateBriefById(
  id: string,
  data: Omit<BriefFormData, "id" | "createdAt">,
) {
  const briefs = getBriefs();
  const briefIndex = briefs.findIndex((b) => b.id === id);

  if (briefIndex === -1) return undefined;

  const updatedBrief: BriefFormData = {
    ...briefs[briefIndex],
    ...data,
    id,
    createdAt: briefs[briefIndex].createdAt,
  };

  briefs[briefIndex] = updatedBrief;
  localStorage.setItem(KEY, JSON.stringify(briefs));

  return updatedBrief;
}
