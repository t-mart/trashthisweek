import type { Assertion, AsymmetricMatchersContaining } from 'vitest';

interface MatcherResult {
    pass: boolean
    message: () => string
    // If you pass these, they will automatically appear inside a diff when
    // the matcher does not pass, so you don't need to print the diff yourself
    actual?: unknown
    expected?: unknown
  }

interface CustomMatchers<R = MatcherResult> {
	toMatchCollectionPickup(expected: PickupCollection): R;
}

declare module 'vitest' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface Assertion<T = MatcherResult> extends CustomMatchers<T> {}
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface AsymmetricMatchersContaining extends CustomMatchers {}
}
