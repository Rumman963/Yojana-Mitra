import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AlertCircle, ArrowLeft, ExternalLink, FileText } from "lucide-react";
import { prisma } from "@/lib/db_client";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getScheme(slug: string) {
  return prisma.scheme.findUnique({
    where: { slug: slug },
    include: { documents: true },
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const scheme = await getScheme(slug);

  if (!scheme) {
    return { title: "Scheme not found" };
  }

  return {
    title: scheme.nameEn + " | YojanaMitra",
    description: scheme.descriptionEn,
  };
}

export default async function SchemePage({ params }: Props) {
  const { slug } = await params;
  const scheme = await getScheme(slug);

  if (!scheme) {
    notFound();
  }

  // Build a short "who can apply" list from the structured rules
  const rules: string[] = [];

  if (scheme.level === "STATE") {
    rules.push("Residents of " + scheme.state);
  }
  if (scheme.minAge !== null && scheme.maxAge !== null) {
    rules.push("Age " + scheme.minAge + " to " + scheme.maxAge);
  } else if (scheme.minAge !== null) {
    rules.push("Age " + scheme.minAge + " or older");
  } else if (scheme.maxAge !== null) {
    rules.push("Age " + scheme.maxAge + " or younger");
  }
  if (scheme.gender !== null) {
    rules.push("Gender: " + scheme.gender.toLowerCase());
  }
  if (scheme.maxAnnualIncome !== null) {
    rules.push(
      "Yearly family income up to Rs " +
        scheme.maxAnnualIncome.toLocaleString("en-IN")
    );
  }
  if (scheme.socialCategories.length > 0) {
    rules.push("Category: " + scheme.socialCategories.join(", "));
  }
  if (scheme.occupations.length > 0) {
    rules.push("Work: " + scheme.occupations.join(", "));
  }

  const levelText =
    scheme.level === "CENTRAL" ? "Central scheme" : scheme.state + " scheme";

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link
        href="/find"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to search
      </Link>

      <div className="flex flex-wrap gap-2">
        <Badge>{levelText}</Badge>
        <Badge variant="secondary" className="capitalize">
          {scheme.category.replaceAll("_", " ").toLowerCase()}
        </Badge>
      </div>

      <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
        {scheme.nameEn}
      </h1>
      {scheme.nameHi && (
        <p className="mt-1 text-lg text-muted-foreground">{scheme.nameHi}</p>
      )}

      <p className="mt-5 text-lg">{scheme.descriptionEn}</p>

      <div className="mt-6 rounded-2xl bg-accent/20 p-5">
        <p className="text-sm font-medium text-muted-foreground">What you get</p>
        <p className="mt-1 text-lg font-medium">{scheme.benefitEn}</p>
      </div>

      {rules.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-xl font-semibold">Who can apply</h2>
          <ul className="mt-3 list-disc pl-5 text-muted-foreground">
            {rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </section>
      )}

      {scheme.otherConditionsEn.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-xl font-semibold">
            Also check these
          </h2>
          <ul className="mt-3 flex flex-col gap-2">
            {scheme.otherConditionsEn.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {scheme.documents.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-xl font-semibold">
            Documents to keep ready
          </h2>
          <ul className="mt-3 flex flex-col gap-2">
            {scheme.documents.map((doc) => (
              <li key={doc.id} className="flex items-start gap-2">
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                {doc.nameEn}
              </li>
            ))}
          </ul>
        </section>
      )}

      {scheme.howToApplyEn && (
        <section className="mt-8">
          <h2 className="font-display text-xl font-semibold">How to apply</h2>
          <p className="mt-3 text-muted-foreground">{scheme.howToApplyEn}</p>
        </section>
      )}

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
        <p className="text-sm text-muted-foreground">
          Last verified: {scheme.lastVerifiedAt.toISOString().slice(0, 10)}
        </p>
        <a
          href={scheme.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ size: "lg" })}
        >
          Go to official website
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        YojanaMitra is not a government website. Rules can change, so always
        confirm on the official website before you apply.
      </p>
    </main>
  );
}