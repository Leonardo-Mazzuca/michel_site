interface JsonLdGraphProps {
  schemas: Record<string, unknown>[];
}

export function JsonLdGraph({ schemas }: JsonLdGraphProps) {
  return (
    <>
      {schemas.map((schema) => (
        <script
          key={JSON.stringify(schema["@type"] ?? schema)}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
