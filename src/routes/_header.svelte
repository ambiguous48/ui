<script context="module" lang="ts">
  import NamespaceSelect from '$lib/components/select/namespace-select.svelte';
</script>

<script lang="ts">
  import { namespace } from '$lib/stores/namespace';
  import DataConverterStatus from '$lib/components/data-converter-status.svelte';

  import { user } from '$lib/stores/user';
  import { goto } from '$app/navigation';

  import NavigationLink from './_navigation-link.svelte';
</script>

<header
  class="grid grid-rows-1 grid-cols-12 px-10 items-center bg-gray-900 shadow-lg gap-6"
>
  <div class="flex gap-4 col-span-3">
    <a href="/namespaces/{$namespace}" class="block">
      <img src="/logo.svg" alt="Temporal Logo" class="max-h-10" />
    </a>
    <NamespaceSelect />
  </div>
  <div class="flex gap-4 col-span-4">
    <NavigationLink href="/namespaces/{$namespace}/workflows">
      Workflows
    </NavigationLink>
    <NavigationLink href="/namespaces/{$namespace}/archival">
      Archival
    </NavigationLink>
  </div>
  <div class="flex justify-end gap-4 col-span-5 col-end-13 items-center">
    <div class="text-right">
      <DataConverterStatus />
    </div>
    <a
      class="header-button"
      href="https://github.com/temporalio/ui/issues/new/choose"
      target="_blank"
    >
      Report Bug/Give Feedback
    </a>

    {#if $user?.email}
      <button
        class="header-button min-w-min"
        on:click={() => goto(import.meta.env.VITE_API + '/auth/logout')}
      >
        Logout
        <img
          src={$user.picture}
          alt="User Avatar"
          class="rounded-full h-6 w-6 ml-2.5"
        />
      </button>
    {/if}
  </div>
</header>

<style lang="postcss">
  .header-button {
    @apply px-4 py-2 text-sm text-white flex items-center justify-center;
  }

  .header-button:hover {
    @apply bg-purple-100 rounded-md text-gray-900;
  }
</style>
