<script context="module" lang="ts">
  import type { ErrorLoad } from '@sveltejs/kit';

  export const load: ErrorLoad = async function ({ error, status }) {
    return {
      props: {
        error,
        status,
      },
    };
  };
</script>

<script lang="ts">
  import Error from '$lib/components/error.svelte';
  import { isNetworkError } from '$lib/utilities/is-network-error';

  export let error: globalThis.Error;
  export let status: number;

  let requestFromAPIError: Record<string, any>;

  try {
    requestFromAPIError = JSON.parse(error.message);

    if (isNetworkError(requestFromAPIError)) {
      status = requestFromAPIError.statusCode;
    }
  } catch (e) {}
</script>

<Error {error} {status} />
