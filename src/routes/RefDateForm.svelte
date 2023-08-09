<script lang="ts">
	import { DateTime } from 'luxon';

	let defaultValue = DateTime.now().toISODate();
</script>

<form class="flex flex-row flex-wrap justify-center items-center gap-4 text-center">
	<label for="refDate">Or, see it for another week:</label>
	<input
		type="date"
		id="refDate"
		name="ref"
        value={defaultValue}
		class="border border-gray-900 rounded text-gray-700 px-2 py-1"
	/>
    <button type="submit" class="link font-semibold hover:text-gray-600">Go</button>
</form>
