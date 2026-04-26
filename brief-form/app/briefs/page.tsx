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
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Відправлені брифи</h1>

            <table className="w-full border text-sm">
                <thead>
                    <tr className="border-b">
                        <th className="text-left p-2">Назва</th>
                        <th className="text-left p-2">Email</th>
                        <th className="text-left p-2">Дата</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((brief) => (
                        <tr key={brief.id} className="border-b hover:bg-muted">
                            <td className="p-2">
                                <Link href={`/briefs/${brief.id}`} className="text-blue-600">
                                    {brief.appName}
                                </Link>
                            </td>
                            <td className="p-2">{brief.email}</td>
                            <td className="p-2">
                                {new Date(brief.createdAt).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

