import { AlertCircle, CheckCircle2, ExternalLink, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export type SchemeResult = {
  id: number;
  slug: string;
  level: string;
  state: string | null;
  category: string;
  nameEn: string;
  nameHi: string | null;
  descriptionEn: string;
  benefitEn: string;
  howToApplyEn: string | null;
  otherConditionsEn: string[];
  officialUrl: string;
  lastVerifiedAt: string;
  documents: { id: number; nameEn: string; nameHi: string | null }[];
  why: { reasons: string[]; toConfirm: string[] };
};

type Props = {
  matches: SchemeResult[];
};

export default function ResultsList({ matches }: Props) {
  if (matches.length === 0) {
    return (
      <div className="rounded-2xl border bg-card p-8 text-center">
        <h2 className="font-display text-xl font-semibold">
          No schemes found yet
        </h2>
        <p className="mt-2 text-muted-foreground">
          We could not find a match for these details. We are adding more
          verified schemes regularly, so please check again soon.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-muted-foreground">
        We found {matches.length} scheme{matches.length > 1 ? "s" : ""} that
        may fit you. Rules can be more detailed than our questions, so always
        confirm on the official website before applying.
      </p>

      {matches.map((scheme) => {
        const levelText =
          scheme.level === "CENTRAL" ? "Central scheme" : scheme.state + " scheme";
          const checkItems = scheme.why.toConfirm.concat(scheme.otherConditionsEn);

        return (
          <Card key={scheme.id}>
            <CardHeader>
              <div className="flex flex-wrap gap-2">
                <Badge>{levelText}</Badge>
                <Badge variant="secondary" className="capitalize">
                  {scheme.category.replaceAll("_", " ").toLowerCase()}
                </Badge>
              </div>
              <h2 className="mt-2 font-display text-2xl font-semibold">
                {scheme.nameEn}
              </h2>
              {scheme.nameHi && (
                <p className="text-muted-foreground">{scheme.nameHi}</p>
              )}
            </CardHeader>

            <CardContent className="flex flex-col gap-5">
              <p>{scheme.descriptionEn}</p>

              <div className="rounded-xl bg-accent/20 p-4">
                <p className="text-sm font-medium text-muted-foreground">
                  What you get
                </p>
                <p className="mt-1 font-medium">{scheme.benefitEn}</p>
              </div>

              {scheme.why.reasons.length > 0 && (
                <div>
                  <p className="mb-2 text-sm font-semibold">Why this matched</p>
                  <ul className="flex flex-col gap-1">
                    {scheme.why.reasons.map((reason) => (
                      <li key={reason} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

                            {checkItems.length > 0 && (
                <details className="rounded-xl border p-3">
                  <summary className="cursor-pointer text-sm font-semibold">
                    Before you apply, check {checkItems.length} thing
                    {checkItems.length > 1 ? "s" : ""}
                  </summary>
                  <ul className="mt-3 flex flex-col gap-2">
                    {checkItems.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
              {scheme.documents.length > 0 && (
                <div>
                  <p className="mb-2 text-sm font-semibold">
                    Documents to keep ready
                  </p>
                  <ul className="flex flex-col gap-1">
                    {scheme.documents.map((doc) => (
                      <li key={doc.id} className="flex items-start gap-2 text-sm">
                        <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                        {doc.nameEn}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {scheme.howToApplyEn && (
                <div>
                  <p className="mb-1 text-sm font-semibold">How to apply</p>
                  <p className="text-sm text-muted-foreground">
                    {scheme.howToApplyEn}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
                <p className="text-xs text-muted-foreground">
                  Last verified: {scheme.lastVerifiedAt.slice(0, 10)}
                </p>
                                <div className="flex gap-2">
                  <Link
                    href={"/schemes/" + scheme.slug}
                    className={buttonVariants({ size: "sm" })}
                  >
                    View details
                  </Link>
                  <a
                    href={scheme.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ variant: "outline", size: "sm" })}
                  >
                    Official website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
                
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}