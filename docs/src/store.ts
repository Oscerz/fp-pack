import { lstore } from 'lithent/helper';

// Get path from hash
const getPathFromHash = (): string => {
  const hash = location.hash.slice(1); // Remove #
  return hash || '/';
};

export const appStore = lstore<{
  route: string;
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  searchOpen: boolean;
}>({
  route: getPathFromHash(),
  theme: 'light',
  sidebarOpen: false,
  searchOpen: false,
});

// Get store without subscription (for utility functions)
const store = appStore.watch();

// Check if current route is Korean
export const isKoreanRoute = () => store.route.startsWith('/ko');

// Resolve route for given language
const resolveRouteForLanguage = (path: string, lang: 'en' | 'ko'): string => {
  const normalized = path.replace(/\/+$/, '') || '/';

  if (lang === 'ko') {
    return normalized.startsWith('/ko') ? normalized : `/ko${normalized}`;
  } else {
    return normalized.replace(/^\/ko/, '') || '/';
  }
};

// Internal navigation
const navigateInternal = (path: string) => {
  const normalizedPath = path.replace(/\/+$/, '') || '/';

  store.route = normalizedPath;
  location.hash = `#${normalizedPath}`;
  window.scrollTo(0, 0);
};

// Navigate to route (language-aware)
export function navigateTo(path: string) {
  const lang: 'en' | 'ko' = isKoreanRoute() ? 'ko' : 'en';
  const target = resolveRouteForLanguage(path, lang);
  navigateInternal(target);
}

// Set language
export const setLanguage = (lang: 'en' | 'ko') => {
  const target = resolveRouteForLanguage(store.route, lang);
  if (target !== store.route) {
    navigateInternal(target);
  }
};

// Toggle language
export const toggleLanguage = () => {
  setLanguage(isKoreanRoute() ? 'en' : 'ko');
};

// Listen to hashchange (browser back/forward and hash changes)
window.addEventListener('hashchange', () => {
  store.route = getPathFromHash();
  window.scrollTo(0, 0);
});

// Keyboard shortcut for search (Cmd+K or Ctrl+K)
window.addEventListener('keydown', (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    store.searchOpen = !store.searchOpen;
  }
});
