<script lang="ts">
	import type { PageData } from './$types';

	import { DateTime } from 'luxon';

	import { getDayOfMonthOrdinalSuffix } from '$lib/util';
	import { refParameter, baseRecyclingPickupDateTime } from '$lib/constants';
	import Trash from './Trash.svelte';
	import Recycling from './Recycling.svelte';
	import RefDateForm from './RefDateForm.svelte';
	import Footer from './Footer.svelte';

	export let data: PageData;

	$: ({ ref, nextCollectionDate, nextCollectionHasRecycling } = data);

	// note that, for presentation on this page, we consider the collection
	// date to be relative to the current time right now, not the ref datetime
	$: nowStartOfDay = DateTime.now().setZone(baseRecyclingPickupDateTime.zone).startOf('day');
	$: relative = nextCollectionDate.toRelativeCalendar({ unit: 'days', base: nowStartOfDay })!;
	$: isOrWas = nowStartOfDay <= nextCollectionDate ? 'is' : 'was';

	$: formatted = nextCollectionDate.toLocaleString({
		weekday: 'long',
		month: 'long',
		day: 'numeric'
	});
	$: ordinalSuffix = getDayOfMonthOrdinalSuffix(nextCollectionDate.day);
	$: apiHref = `/api/next?${refParameter}=${ref.toISO()}`;
</script>

<div class="max-w-prose mx-auto p-8 flex flex-col gap-y-8">
	<main class="text-gray-800 flex flex-col gap-y-8">
		<p class="text-center text-2xl font-semibold">
			The pickup {relative} on<br />

			<span>{formatted}{ordinalSuffix},</span><br />

			{isOrWas}
			<span>
				{#if nextCollectionHasRecycling}
					<Trash /> and <Recycling />.
				{:else}
					just <Trash />.
				{/if}
			</span>
		</p>

		<section class="flex flex-row justify-center items-center gap-x-8">
			<picture>
				<img src="/trash.jpg" alt="trash bin" class="w-full h-80 object-contain" />
			</picture>
			{#if nextCollectionHasRecycling}
				<picture>
					<img src="/recycling.jpg" alt="recycling bin" class="w-full h-80 object-contain" />
				</picture>
			{/if}
		</section>

		<section>
			<RefDateForm />
		</section>
	</main>

	<Footer apiHref={apiHref} />
</div>

<svelte:head>
	<title>Trash This Week</title>
	<meta name="description" content="The next weekly collection pickup in my area" />
</svelte:head>
