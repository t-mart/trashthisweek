<slot />

<style>
  :global(body) {
    background-color: white;
    color: black;
  }

  @media (prefers-color-scheme: dark) {
    :global(body) {
      background-color: black;
      color: white;
    }
  }
</style>
