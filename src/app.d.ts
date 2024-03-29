// See https://kit.svelte.dev/docs/types#app
import type { DateTime } from 'luxon';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	interface PickupCollection {
		date: DateTime;
		hasRecycling: boolean;
	}
}

export {};
