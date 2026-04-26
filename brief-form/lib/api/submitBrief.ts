import { getBriefById, getBriefs, saveBrief } from "@/lib/brief-storage";
import { BriefFormData } from "@/lib/types/BriefFormData";

export type BriefSubmissionData = Omit<BriefFormData, "id" | "createdAt">;

export function submitBrief(brief: BriefSubmissionData): BriefFormData {
	return saveBrief(brief);
}

export function readBriefs(): BriefFormData[] {
	return getBriefs();
}

export function readBriefById(id: string): BriefFormData | undefined {
	return getBriefById(id);
}
