<script lang="ts">
    export let apiHref: string;
</script>

<footer>
    <nav class="text-gray-600">
        <ul class="flex justify-center flex-wrap">
            <li><span>by Tim Martin</span></li>
            <li><a href="https://github.com/t-mart/trashthisweek" class="link underline hover:text-gray-900">source</a></li>
            <li><a href={apiHref} class="link underline hover:text-gray-900">API</a></li>
        </ul>
    </nav>
</footer>

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