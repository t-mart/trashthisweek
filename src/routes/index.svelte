<script lang="ts">
  import { onMount } from "svelte";
  import { getNextPickup } from "../pickup";

  let now = new Date();
  let nextPickup = getNextPickup(now);

  // Update the fromDate on an interval, to prevent stale data
  onMount(() => {
    const updateIntervalMilliseconds = 1000 * 60; // 1 minute
    const updateIntervalId = setInterval(() => {
      now = new Date();
    }, updateIntervalMilliseconds);

    return () => {
      clearInterval(updateIntervalId);
    };
  });

  $: nextPickup = getNextPickup(now);
</script>

<svelte:head>
  <title>Trash This Week</title>
</svelte:head>

<div class="mx-auto my-8 text-2xl flex flex-col gap-4 max-w-prose">
  <p class="text-center">
    {nextPickup.relativeText}, is
    {#if nextPickup.isRecycling}
      <span class="trash">trash</span> and <span class="recycling">recycling</span>.
    {:else}
      just <span class="trash">trash</span>.
    {/if}
  </p>
  <div class="flex gap-4 justify-center mx-4">
    <img src="/trash.jpg" class="object-scale-down w-full" alt="trash bin" />
    {#if nextPickup.isRecycling}
      <img src="/recycle.jpg" class="object-scale-down w-full" alt="recycling bin" />
    {/if}
  </div>
</div>

<style>
  .trash {
    color: #607f35;
  }

  .recycling {
    color: #2378c3;
  }
</style>
