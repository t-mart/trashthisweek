<script lang="ts">
  import dayjs from 'dayjs';
  import calendar from 'dayjs/plugin/calendar.js';
  import advancedFormat from 'dayjs/plugin/advancedFormat.js';

  import { onMount } from 'svelte';
  import { Pickup } from '../pickup';

  dayjs.extend(calendar); // gives a date relative to another (tomorrow/today/etc)
  dayjs.extend(advancedFormat); // gives ordinal formatting like 1st/2nd/3rd

  // various formats
  const monthDateFormat = 'MMMM Do';
  const weekdayMonthDateFormat = 'dddd, MMMM Do';

  // The human ways to express when the next pickup is. Used as the seconds argument to
  // dayjs().calendar. Characters which could be interpreted as format keys are enclosed in [].
  const relativeCalendarFormats = {
    sameDay: `[Today], ${monthDateFormat}`, // when its today
    nextDay: `[Tomorrow], ${monthDateFormat}`, // when its tomorrow
    nextWeek: `[Next] ${weekdayMonthDateFormat}`, // when its sometime next week
    sameElse: weekdayMonthDateFormat // any other time
  };

  // fromDate is essentially now (todays date) but frozen so we don't have race conditions between
  // the always-moving current time and the next pickup date.
  export let fromDate = dayjs();
  export let nextPickup = Pickup.after(fromDate);

  // Update the fromDate on an interval
  // this may be overkill, but i don't want an old pageload stuck on someone's  browser to show out
  // of date pickup data.
  onMount(() => {
    const updateIntervalMilliseconds = 1000 * 60; // 1 minute
    const updateIntervalId = setInterval(() => {
      fromDate = dayjs()
    }, updateIntervalMilliseconds);

    return () => {
      clearInterval(updateIntervalId);
    };
  });

  $: nextPickup = Pickup.after(fromDate);
  $: fromDateIsPickupDate = fromDate.isSame(nextPickup.date, 'day');
  $: pickupDateInRelativeFormat = nextPickup.date.calendar(fromDate, relativeCalendarFormats);
</script>

<!--
@component
Display information about the next trash pickup
-->
<svelte:head>
  <title>Trash This Week</title>
</svelte:head>

<p>
  {pickupDateInRelativeFormat}, is
  {#if nextPickup.isRecyclingDay}
    <span class="trash">trash</span> and <span class="recycling">recycling</span>.
  {:else}
    just <span class="trash">trash</span>.
  {/if}
</p>

{#if !fromDateIsPickupDate}
  <p class="remind">(Today is {fromDate.format(weekdayMonthDateFormat)}.)</p>
{/if}

<style>
  :global(body) {
    color: #18181b;
    background-color: #fafafa;
  }

  .trash {
    color: green;
  }

  .recycling {
    color: blue;
  }

  @media (prefers-color-scheme: dark) {
    :global(body) {
      background-color: #18181b;
      color: #fafafa;
    }

    .trash {
      color: #27ac29;
    }

    .recycling {
      color: #3e92ff;
    }
  }

  .remind {
    font-style: italic;
    color: #71717a;
  }
</style>
