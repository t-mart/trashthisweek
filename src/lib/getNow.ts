import { Temporal } from "temporal-polyfill";
import { dateInPflugerville } from "./nextCollection";

export function getNow(nowParam: string | null) {
  if (nowParam === null) {
    return { date: dateInPflugerville(), error: null };
  }

  try {
    const date = Temporal.PlainDate.from(nowParam);
    return { date, error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { date: null, error };
    }
    return { date: null, error: new Error(JSON.stringify(error)) };
  }
}
