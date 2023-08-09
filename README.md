# trashthisweek

Answers the question, "Is it just trash or recycling too this week?".

Deployed to <https://trashthisweek.com>.

## `ref` Parameter

By using the optional `ref` query parameter, you can time-travel back and
forward to see the next collection that would occur on/after that time.

The value for the parameter must be ISO-8601 date or datetime string, with an
optional timezone indicator. If no timezone is provided, `America/Chicago` will
be used.

If the passed in string cannot be parsed, an error will be shown.

Examples:

- <https://trashthisweek.com?ref=2038-01-19T03:14:08-05:00> Full form
- <https://trashthisweek.com?ref=2038-01-19T03:14:08> No time zone, so `America/Chicago` assumed
- <https://trashthisweek.com?ref=2038-01-19T03:14:08Z> Different timezone, but will be converted
- <https://trashthisweek.com?ref=2038-01-19> No time required
- <https://trashthisweek.com?ref=malformed> Malformed

## API

### `/api/next`

Responds in JSON with an object containing the following properties:

- `date`, string, an ISO-8601 datetime string for the start of the date of the next collection.
- `hasRecycling`, boolean, `true` iff the collection will also be picking up recycling.

This endpoint also optionally accepts the [`ref` parameter](#ref-parameter).

Examples:

- <https://trashthisweek.com/api/next?ref=2038-01-19T03:14:08-05:00>
- <https://trashthisweek.com/api/next?ref=2038-01-19T03:14:08>
- <https://trashthisweek.com/api/next?ref=2038-01-19T03:14:08Z>
- <https://trashthisweek.com/api/next?ref=2038-01-19>
- <https://trashthisweek.com/api/next?ref=malformed>
