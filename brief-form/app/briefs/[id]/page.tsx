"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { readBriefById } from "@/lib/api/submitBrief";
import { BriefFormData } from "@/lib/types/BriefFormData";

export default function BriefDetailsPage() {
    const params = useParams<{ id: string }>();
    const [brief, setBrief] = useState<BriefFormData | null>(null);

    useEffect(() => {
        const id = params?.id;
        if (!id) return;

        const loadedBrief = readBriefById(id);
        setBrief(loadedBrief ?? null);
    }, [params]);

    if (!brief) {
        return (
            <div className="p-6 space-y-4">
                <h1 className="text-2xl font-bold">Деталі брифу</h1>
                <p>Бриф не знайдено.</p>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Деталі брифу</h1>

            <div className="space-y-2">
                <p><b>Назва:</b> {brief.appName}</p>
                <p><b>Email:</b> {brief.email}</p>
                <p><b>Опис:</b> {brief.projectDescription}</p>
                <p><b>Проблема:</b> {brief.problemStatement}</p>
                <p><b>Цілі:</b> {brief.businessGoals}</p>
                <p><b>Аудиторія:</b> {brief.targetAudience}</p>
                <p><b>Інтеграції:</b> {brief.integrations}</p>
                <p><b>Додатково:</b> {brief.additionalInfo}</p>
            </div>
        </div>
    );
}
