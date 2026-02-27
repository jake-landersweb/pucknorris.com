export async function register() {
  // Turbopack SSR worker passes --localstorage-file without a valid path,
  // creating a read-only Proxy for localStorage where getItem/setItem are not functions.
  // Replace the entire global localStorage with a safe no-op implementation.
  if (typeof localStorage !== 'undefined' && typeof (localStorage as Storage).getItem !== 'function') {
    try {
      (globalThis as unknown as Record<string, unknown>).localStorage = {
        getItem: () => null,
        setItem: () => undefined,
        removeItem: () => undefined,
        clear: () => undefined,
        key: () => null,
        length: 0,
      };
    } catch {
      // Cannot replace the Proxy — nothing more we can do from instrumentation
    }
  }
}
