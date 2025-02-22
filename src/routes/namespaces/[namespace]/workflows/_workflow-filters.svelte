<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { durations } from '$lib/utilities/to-duration';

  import Select from '$lib/components/select/select.svelte';
  import FilterSelect from '$lib/components/select/filter-select.svelte';
  import Option from '$lib/components/select/option.svelte';
  import FilterInput from '$lib/components/filter-input.svelte';

  export let timeFormat: TimeFormat = 'UTC';

  const statuses = {
    All: null,
    Running: 'Running',
    'Timed Out': 'TimedOut',
    Completed: 'Completed',
    Failed: 'Failed',
    'Continued as New': 'ContinuedAsNew',
    Canceled: 'Canceled',
    Terminated: 'Terminated',
  };

  let isAdvancedQuery = $page.url.searchParams.has('query');
  let workflowIdFilter = '';
  let workflowTypeFilter = '';

  const handleToggle =
    (searchType: 'basic' | 'advanced') =>
    (event: Event): void => {
      const element = event.target as HTMLAnchorElement;
      isAdvancedQuery = searchType === 'advanced';

      if (!isAdvancedQuery) $page.url.searchParams.delete('query');

      goto(element.href);
    };
</script>

<section class="flex flex-col gap-2">
  <p class="text-right text-xs">
    {#if isAdvancedQuery}
      <a
        href={$page.url.pathname}
        class="text-blue-700"
        on:click|preventDefault={handleToggle('basic')}
      >
        Basic Search
      </a>
    {:else}
      <a
        href="{$page.url.pathname}?query=''"
        class="text-blue-700"
        on:click|preventDefault={handleToggle('advanced')}
      >
        Advanced Search
      </a>
    {/if}
  </p>

  {#if isAdvancedQuery}
    <FilterInput parameter="query" name="Query" value={''} />
  {:else}
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
      <FilterInput
        parameter="workflow-id"
        name="Workflow ID"
        value={workflowIdFilter}
      />
      <FilterInput
        parameter="workflow-type"
        name="Workflow Type"
        value={workflowTypeFilter}
      />
      <FilterSelect label="Time Range" parameter="time-range" value="24 hours">
        {#each durations as value}
          <Option {value}>{value}</Option>
        {/each}
      </FilterSelect>
      <FilterSelect label="Workflow Status" parameter="status" value={null}>
        {#each Object.entries(statuses) as [label, value]}
          <Option {value}>{label}</Option>
        {/each}
      </FilterSelect>
      <Select id="filter-by-relative-time" bind:value={timeFormat}>
        <Option value={'relative'}>Relative</Option>
        <Option value={'UTC'}>UTC</Option>
        <Option value={'local'}>Local</Option>
      </Select>
    </div>
  {/if}
</section>
