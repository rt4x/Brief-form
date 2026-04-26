import BriefDetailsClient from "./brief-details-client";

export async function generateStaticParams() {
  return [];
}

export default async function BriefDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <BriefDetailsClient id={id} />;
}
