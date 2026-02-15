import type { Metadata } from "next";
import { CaseStudyContent } from "./CaseStudyContent";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: slug ? `${slug.replace(/-/g, " ")} | Work` : "Work" };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  return <CaseStudyContent slug={slug} />;
}
