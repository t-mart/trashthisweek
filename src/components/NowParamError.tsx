export default function DataParamError({
  value,
  error,
}: Readonly<{
  value: string | null;
  error: unknown;
}>) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl">Not a valid date</h2>
      <p>
        Date for parameter <code className="font-mono">now</code> with value{" "}
        <code className="font-mono">{JSON.stringify(value)}</code> should be
        formatted as a <code>full-date</code> as defined in{" "}
        <a
          href="https://datatracker.ietf.org/doc/html/rfc3339#section-5.6"
          className="underline"
        >
          RFC 3338
        </a>
        .
      </p>
      <p>
        <output className="font-mono text-destructive">
          {error?.toString() ?? "<error has no string representation>"}
        </output>
      </p>
      <p>
        <a href="/" className="underline">
          Return home
        </a>
        .
      </p>
    </div>
  );
}
