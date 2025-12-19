import { lstore } from 'lithent/helper';

export const appStore = lstore<{
  route: string;
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
}>({
  route: location.pathname,
  theme: 'light',
  sidebarOpen: false,
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

  if (window.location.pathname !== normalizedPath) {
    history.pushState(null, '', normalizedPath);
  }

  store.route = normalizedPath;
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

// Handle browser back/forward
window.addEventListener('popstate', () => {
  store.route = location.pathname;
});
