# trashthisweek

Answers the question, "Is it just trash or recycling too this week?".

Deployed to <https://trashthisweek.com>.

## `ref` Parameter

You can optionally add a `ref` query parameter to requests assigned to an
ISO-8601 date or datetime string. This will then be the reference for which the
next collection day is calculated.

If no timezone is indicated in the value, `America/Chicago` will be used.

If the passed in string cannot be parsed, an error will be shown.

## API

### `/api/next`

Responds in JSON with an object with the following properties:

- `date`, string, an ISO-8601 datetime string for the start of the date of the next collection.
- `hasRecycling`, boolean, `true` iff the collection will also be picking up recycling.

This endpoint also optionally accepts the [`ref` parameter](#ref-parameter).
