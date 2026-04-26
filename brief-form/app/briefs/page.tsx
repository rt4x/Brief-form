"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { readBriefs } from "@/lib/api/submitBrief";
import { BriefFormData } from "@/lib/types/BriefFormData";

export default function BriefsPage() {
    const [data, setData] = useState<BriefFormData[]>([]);

    useEffect(() => {
        setData(readBriefs());
    }, []);

    return (
        <main className="min-h-screen bg-muted/40 p-6">
            <div className="mx-auto w-full max-w-5xl space-y-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Надіслані брифи</h1>
                    <p className="text-sm text-muted-foreground">
                        Переглядайте усі збережені брифи та відкривайте деталі для редагування.
                    </p>
                </div>

                <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
                    <div className="border-b bg-muted/30 px-5 py-3">
                        <p className="text-sm font-medium">Усього брифів: {data.length}</p>
                    </div>

                    {data.length === 0 ? (
                        <div className="px-5 py-10 text-center">
                            <p className="text-base font-medium">Список брифів поки порожній</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Заповніть форму на головній сторінці, щоб побачити записи тут.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-160 text-sm">
                                <thead className="bg-muted/50 text-muted-foreground">
                                    <tr className="border-b">
                                        <th className="px-5 py-3 text-left font-medium">Назва продукту</th>
                                        <th className="px-5 py-3 text-left font-medium">Email</th>
                                        <th className="px-5 py-3 text-left font-medium">Дата створення</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {data.map((brief) => (
                                        <tr key={brief.id} className="border-b last:border-0 transition-colors hover:bg-muted/40">
                                            <td className="px-5 py-3 font-medium">
                                                <Link
                                                    href={`/briefs/${brief.id}`}
                                                    className="text-primary underline-offset-4 hover:underline"
                                                >
                                                    {brief.appName}
                                                </Link>
                                            </td>
                                            <td className="px-5 py-3 text-muted-foreground">{brief.email}</td>
                                            <td className="px-5 py-3 text-muted-foreground">
                                                {new Date(brief.createdAt).toLocaleString("uk-UA")}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

