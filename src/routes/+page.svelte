<script lang="ts">
	import type { PageData } from './$types';

	import { DateTime } from 'luxon';

	import { getDayOfMonthOrdinalSuffix } from '$lib/util';
	import { refParameter, timeZone } from '$lib/constants';
	import Trash from './Trash.svelte';
	import Recycling from './Recycling.svelte';

	export let data: PageData;

	$: ({ ref, nextTrashDate, isRecycling } = data);

	$: nowStartOfDay = DateTime.now().setZone(timeZone).startOf('day');

	// these use the real current time as reference! not the time passed in
	$: relative = nextTrashDate.toRelativeCalendar({ unit: 'days', base: nowStartOfDay })!;
	$: isInTheFuture = nowStartOfDay <= nextTrashDate;
	$: isToday = nowStartOfDay.equals(ref.startOf('day'));

	$: formatted = nextTrashDate.toLocaleString({ weekday: 'long', month: 'long', day: 'numeric' });
	$: ordinalSuffix = getDayOfMonthOrdinalSuffix(nextTrashDate.day);
	$: nextWeekHref = `/?${refParameter}=${ref.plus({ weeks: 1 }).toISO()}`;
	$: apiHref = `/api/next?${refParameter}=${ref.toISO()}`;
</script>

<div class="text-center max-w-prose mx-auto p-8">
	<main class="text-2xl font-semibold text-gray-800 mb-8">
		<p class="mb-8">
			The pickup {relative} on<br />
			<span>{formatted}{ordinalSuffix},</span><br />
			{#if isInTheFuture}is{:else}was{/if}
			<span>
				{#if isRecycling}
					<Trash /> and <Recycling />.
				{:else}
					just <Trash />.
				{/if}
			</span>
		</p>

		<div class="flex flex-row justify-center items-center gap-8">
			<picture>
				<img src="/trash.jpg" alt="trash bin" class="w-full h-80 object-contain" />
			</picture>
			{#if isRecycling}
				<picture>
					<img src="/recycling.jpg" alt="recycling bin" class="w-full h-80 object-contain" />
				</picture>
			{/if}
		</div>
	</main>

	<footer>
		<nav class="text-gray-600">
			<ul class="flex justify-center flex-wrap">
				<li><span>by Tim Martin</span></li>
				<li><a href="https://github.com/t-mart/trashthisweek" class="footer-link">source</a></li>
				<li><a href={apiHref} class="footer-link">API</a></li>
				{#if isToday}
					<li><a href={nextWeekHref} class="footer-link">next week, for example</a></li>
				{:else}
					<li><a href="/" class="footer-link text-red-700 hover:text-red-900">back to today</a></li>
				{/if}
			</ul>
		</nav>
	</footer>
</div>

<svelte:head>
	<title>Trash This Week</title>
	<meta name="description" content="The next weekly collection pickup in my area" />
</svelte:head>

<style lang="scss">
	footer li:not(:last-child):after {
		content: '|';
		margin-left: 0.5rem;
		margin-right: 0.5rem;
	}

	// don't color the bullet
	footer li:hover:after {
		color: inherit;
	}
</style>
