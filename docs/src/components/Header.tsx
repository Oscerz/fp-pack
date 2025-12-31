import { mount } from 'lithent';
import { appStore, navigateTo, setLanguage } from '@/store';
import { SearchModal } from '@/components/SearchModal';

export const Header = mount(renew => {
  const store = appStore.watch(renew);

  return () => {
    const isKorean = store.route.startsWith('/ko');

    return (
      <>
        <header class="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1b1b1f] transition-colors">
          <div class="mx-auto max-w-[1440px] px-6 md:px-6">
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
              </div>

              <nav class="flex items-center space-x-4">
                {/* Search button */}
                <button
                  type="button"
                  class="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  onClick={() => {
                    store.searchOpen = true;
                  }}
                  aria-label="Search"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <span class="hidden sm:inline">Search</span>
                  <kbd class="hidden md:inline-block px-1.5 py-0.5 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded">
                    ⌘K
                  </kbd>
                </button>
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

      {/* Search Modal */}
      {store.searchOpen ? (
        <SearchModal
          isOpen={store.searchOpen}
          onClose={() => {
            store.searchOpen = false;
          }}
        />
      ) : null}
    </>
    );
  };
});
