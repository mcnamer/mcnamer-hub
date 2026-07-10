/**
 * JSON-LD — server-rendered structured data. Emitted as a script tag so the
 * knowledge graph ships in the initial HTML, crawlable with zero JavaScript.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Schema is authored, not user input — safe to serialize directly.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
