<script lang="ts">
	import { onMount } from 'svelte';
	import dayjs from 'dayjs';
	import calendar from 'dayjs/plugin/calendar.js';
	import advancedFormat from 'dayjs/plugin/advancedFormat.js';
	import utc from 'dayjs/plugin/utc.js';
	import timezone from 'dayjs/plugin/timezone.js';

	dayjs.extend(calendar); // gives a date relative to another (tomorrow/today/etc)
	dayjs.extend(advancedFormat); // gives ordinal formatting like 1st/2nd/3rd
	dayjs.extend(utc); // gives timezone support
	dayjs.extend(timezone); // also gives timezone support

	/**
	 * The day of the week when pickup occurs. (Zero-indexed because thats what dayjs expects)
	 */
	const pickupDayIndex = 3;

	/**
	 * The timezone of Pflugerville, TX, where our trash pickup occurs
	 */
	const pflugervilleTimeZone = 'America/Chicago';
	dayjs.tz.setDefault(pflugervilleTimeZone);

	/**
	 * A known trash and recycle day to use as a reference for all other days.
	 */
	const reference_trash_and_recycle_day = dayjs('2022-03-16');

	/**
	 * The human ways to express when the next pickup is. Used as the seconds
	 * argument to dayjs().calendar.
	 */
	const relative_pickup_formats = {
		sameDay: '[Today], MMMM Do',
		nextDay: '[Tomorrow], MMMM Do',
		nextWeek: '[Next] dddd, MMMM Do',
		sameElse: 'dddd, MMMM Do'
	};

	/**
	 *	Return an object with the next pickup date (as a dayjs object) and if that date is a recycling pickup day.
	 *	@param now The date to determine the next pickup from. If not provided, uses the current day.
	 */
	function getNextPickup(now?: string | number | Date | dayjs.Dayjs) {
		const nowDayJs = dayjs(now);

		let nextPickup: string | number | Date | dayjs.Dayjs;
		if (nowDayJs.day() <= pickupDayIndex) {
			nextPickup = nowDayJs.day(pickupDayIndex).startOf('day');
		} else {
			nextPickup = nowDayJs.add(1, 'week').day(pickupDayIndex).startOf('day');
		}

		const weeksBetween = dayjs(nextPickup).diff(reference_trash_and_recycle_day, 'week');
		const isRecyclingDay = weeksBetween % 2 === 0;

		return {
			date: nextPickup,
			isRecyclingDay
		};
	}

	/**
	 * Returns when now is. Made into a function for easier testing since its referenced in multiple places
	 */
	function getNow() {
		// for example...
		// return dayjs().add(1, 'day'). subtract(4, 'minute');
		return dayjs();
	}

	let now = getNow();

	$: nextPickup = getNextPickup(now); // updates reactively when `now` updates

	onMount(() => {
		const updateIntervalMilliseconds = 1000; // 1 minute
		const updateIntervalId = setInterval(() => {
			now = getNow();
		}, updateIntervalMilliseconds);

		return () => {
			clearInterval(updateIntervalId);
		};
	});
</script>

<svelte:head>
	<title>Trash This Week</title>
</svelte:head>

<p>
	{nextPickup.date.calendar(now, relative_pickup_formats)}, is
	{#if nextPickup.isRecyclingDay}
		<span class="trash">trash</span> and <span class="recycling">recycling</span>.
	{:else}
		just <span class="trash">trash</span>.
	{/if}
</p>

{#if !nextPickup.date.isSame(now, 'day')}
	<p class="remind">(Today is {now.format('dddd, MMMM Do')}.)</p>
{/if}

<style>
	@media (prefers-color-scheme: dark) {
		:global(body) {
			background-color: black;
			color: white;
		}
	}
	.trash {
		color: green;
	}

	.recycling {
		color: blue;
	}

	.remind {
		font-style: italic;
		color: gray;
	}
</style>
