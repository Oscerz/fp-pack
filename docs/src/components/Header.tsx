import { mount } from 'lithent';
import { appStore, navigateTo, setLanguage } from '@/store';

export const Header = mount(renew => {
  const store = appStore.watch(renew);

  return () => {
    const isKorean = store.route.startsWith('/ko');

    return (
      <header class="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1b1b1f] transition-colors">
        <div class="mx-auto max-w-[1440px] px-6 md:px-12">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center space-x-4">
              <a
                href="/"
                onClick={(e: Event) => {
                  e.preventDefault();
                  navigateTo('/');
                }}
                class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all cursor-pointer"
              >
                fp-kit
              </a>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                Functional Programming Utilities
              </span>
            </div>

            <nav class="flex items-center space-x-4">
              {/* Language toggle */}
              <div class="flex items-center border border-gray-200 dark:border-gray-700 rounded-full text-xs font-semibold overflow-hidden">
                <button
                  type="button"
                  class={`px-3 py-1 transition-colors ${
                    isKorean
                      ? 'text-gray-600 dark:text-gray-400'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  }`}
                  aria-pressed={!isKorean}
                  onClick={() => setLanguage('en')}
                >
                  EN
                </button>
                <button
                  type="button"
                  class={`px-3 py-1 transition-colors ${
                    isKorean
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                  aria-pressed={isKorean}
                  onClick={() => setLanguage('ko')}
                >
                  KO
                </button>
              </div>

              <a
                href="https://github.com/your-repo/fp-kit"
                target="_blank"
                rel="noopener noreferrer"
                class="hidden sm:block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                GitHub
              </a>

              {/* Mobile menu toggle */}
              <button
                class="md:hidden hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md p-2"
                onClick={() => {
                  store.sidebarOpen = !store.sidebarOpen;
                }}
                aria-label="Toggle sidebar"
              >
                <svg
                  class="w-6 h-6 text-gray-600 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </header>
    );
  };
});
