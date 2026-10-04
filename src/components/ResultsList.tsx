export type SchemeResult = {
  id: number;
  slug: string;
  nameEn: string;
  nameHi: string | null;
  descriptionEn: string;
  benefitEn: string;
  howToApplyEn: string | null;
  officialUrl: string;
  lastVerifiedAt: string;
  documents: { id: number; nameEn: string; nameHi: string | null }[];
};

type Props = {
  matches: SchemeResult[];
};

export default function ResultsList({ matches }: Props) {
  if (matches.length === 0) {
    return (
      <p className="rounded border border-gray-300 p-4">
        No schemes found for these details yet. We are adding more schemes
        regularly.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-gray-400">
        These schemes may fit your details. Rules can be more detailed than
        this form, so always confirm on the official website before applying.
      </p>

      {matches.map((scheme) => (
        <div key={scheme.id} className="rounded border border-gray-300 p-4">
          <h2 className="text-lg font-bold">{scheme.nameEn}</h2>

          {scheme.nameHi && <p className="text-gray-600">{scheme.nameHi}</p>}

          <p className="mt-2">{scheme.descriptionEn}</p>

          <p className="mt-2">
            <strong>Benefit:</strong> {scheme.benefitEn}
          </p>

          {scheme.howToApplyEn && (
            <p className="mt-2">
              <strong>How to apply:</strong> {scheme.howToApplyEn}
            </p>
          )}

          {scheme.documents.length > 0 && (
            <div className="mt-2">
              <strong>Documents:</strong>
              <ul className="list-disc pl-5">
                {scheme.documents.map((doc) => (
                  <li key={doc.id}>{doc.nameEn}</li>
                ))}
              </ul>
            </div>
          )}

          <a
            href={scheme.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-green-700 underline"
          >
            Official website
          </a>

          <p className="mt-2 text-xs text-gray-500">
            Last verified: {scheme.lastVerifiedAt.slice(0, 10)}
          </p>
        </div>
      ))}
    </div>
  );
}