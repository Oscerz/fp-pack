import { mount, ref, mountCallback } from 'lithent';
import { navigateTo } from '@/store';
import { apiData } from '@/data/apiData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = mount<SearchModalProps>((renew, props) => {
  let searchQuery = '';
  let selectedIndex = 0;
  const inputRef = ref<HTMLInputElement | null>(null);

  const filterResults = () => {
    if (!searchQuery.trim()) {
      return apiData.slice(0, 10);
    }

    const query = searchQuery.toLowerCase();
    return apiData
      .filter(item => {
        const title = item.title.toLowerCase();
        const category = item.category.toLowerCase();
        return title.includes(query) || category.includes(query);
      })
      .slice(0, 10);
  };
  mountCallback(() => {
    // Focus input when modal opens
    setTimeout(() => {
      if (inputRef.value) {
        inputRef.value.focus();
      }
    }, 0);
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let results: any[] = [];
  const handleKeyDown = (e: KeyboardEvent) => {
    results = filterResults();

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, results.length - 1);
      renew();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, 0);
      renew();
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      navigateTo(results[selectedIndex].path);
      searchQuery = '';
      selectedIndex = 0;
      props.onClose();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      searchQuery = '';
      selectedIndex = 0;
      props.onClose();
    }
  };

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    searchQuery = target.value;
    selectedIndex = 0;
    renew();
  };

  const handleClose = () => {
    searchQuery = '';
    selectedIndex = 0;
    props.onClose();
  };

  return () => (
    <>
      {/* Backdrop */}
      <div
        class="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div class="fixed inset-0 z-[101] flex items-start justify-center pt-[20vh] px-4">
        <div
          class="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          onClick={(e: Event) => e.stopPropagation()}
        >
          {/* Search Input */}
          <div class="border-b border-gray-200 dark:border-gray-700 p-4">
            <div class="flex items-center">
              <svg
                class="w-5 h-5 text-gray-400 mr-3"
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
              <input
                ref={inputRef}
                type="text"
                class="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 text-lg"
                placeholder="Search functions..."
                value={searchQuery}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
              />
              <kbd class="hidden sm:inline-block px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded">
                ESC
              </kbd>
            </div>
          </div>

          {/* Results */}
          <div class="max-h-[400px] overflow-y-auto">
            {results.length === 0 ? (
              <div class="p-8 text-center text-gray-500 dark:text-gray-400">
                No results found
              </div>
            ) : (
              <ul>
                {results.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <li key={item.path}>
                      <button
                        type="button"
                        class={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-blue-50 dark:bg-blue-900/20 border-l-2 border-blue-600 dark:border-blue-400'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 border-l-2 border-transparent'
                        }`}
                        onClick={() => {
                          navigateTo(item.path);
                          handleClose();
                        }}
                        onMouseEnter={() => {
                          selectedIndex = index;
                          renew();
                        }}
                      >
                        <div class="flex flex-col">
                          <span
                            class={`font-medium ${
                              isSelected
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'text-gray-900 dark:text-white'
                            }`}
                          >
                            {item.title}
                          </span>
                          <span class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {item.category}
                          </span>
                        </div>
                        {isSelected && (
                          <kbd class="hidden sm:inline-block px-2 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded">
                            ↵
                          </kbd>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div class="border-t border-gray-200 dark:border-gray-700 px-4 py-3 bg-gray-50 dark:bg-gray-800/50">
            <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div class="flex items-center gap-4">
                <span class="flex items-center gap-1">
                  <kbd class="px-1.5 py-0.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded text-xs">
                    ↑
                  </kbd>
                  <kbd class="px-1.5 py-0.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded text-xs">
                    ↓
                  </kbd>
                  to navigate
                </span>
                <span class="flex items-center gap-1">
                  <kbd class="px-1.5 py-0.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded text-xs">
                    ↵
                  </kbd>
                  to select
                </span>
              </div>
              <span class="hidden sm:block">
                <kbd class="px-1.5 py-0.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded text-xs">
                  ESC
                </kbd>
                to close
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
