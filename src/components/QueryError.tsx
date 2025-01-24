// I wish I could return a generic 400 with this, but there doesn't seem to be
// any way with NextJS. Do web standards even exist anymore?
//
// I could do a notFound() to show a 404, but:
// 1) there's no way to pass context to it, so I can't show the invalid date,
//    and
// 2) its a 404, not a 400. 404 doesn't really make sense here. It's not that
//    the date isn't found, it's that it's not valid. That's a 400, if you ask
//    me.
export default function QueryError({
  queryStr,
  error,
}: Readonly<{ queryStr: string; error: unknown }>) {
  return (
    <>
      <h2 className="text-xl">Not a valid date</h2>
      <p>
        Query date <code className="font-mono">{queryStr}</code> should be formatted as defined
        in RFC 9557.
      </p>
      <p>
        <output className="font-mono text-destructive">
          {error?.toString() ?? "<error has no string representation>"}
        </output>
      </p>
    </>
  );
}
