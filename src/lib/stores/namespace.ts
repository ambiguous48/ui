import { browser } from '$app/env';
import { page } from '$app/stores';
import { namespaceUrlPattern } from '$lib/utilities/namespace-url-pattern';
import { derived } from 'svelte/store';

const onlyInBrowser = <T>(fn: () => T): T => {
  if (browser) return fn();
};

export const namespace = derived(page, ($page) => {
  const match = namespaceUrlPattern.match($page.url.pathname);

  const defaultNamespace = $page.stuff.settings.defaultNamespace;

  const namespace =
    onlyInBrowser(
      () => localStorage.getItem('currentNamespace') || defaultNamespace,
    ) || 'default';

  if (match) {
    onlyInBrowser(() =>
      localStorage.setItem('currentNamespace', match.namespace),
    );
    return match.namespace;
  }

  return namespace;
});
