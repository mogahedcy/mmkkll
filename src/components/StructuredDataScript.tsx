import Script from 'next/script';

interface StructuredDataScriptProps {
  data: Record<string, unknown>;
}

export default function StructuredDataScript({ data }: StructuredDataScriptProps) {
  const jsonLd = JSON.stringify(data);

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
}
