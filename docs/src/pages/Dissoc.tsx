import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Dissoc = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      dissoc
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Remove a property or array index immutably
    </p>

    <CodeBlock
      language="typescript"
      code={`import { dissoc } from 'fp-kit';

dissoc('name', { id: 1, name: 'A' });
// { id: 1 }

dissoc(1, ['a', 'b', 'c']);
// ['a', 'c']`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Related Functions
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/assoc');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          assoc
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Set a key immutably
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/dissocPath');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          dissocPath
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Remove a nested path immutably
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/omit');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          omit
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Remove multiple keys
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/pick');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          pick
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Keep only specified keys
        </p>
      </div>
    </div>
  </div>
);
