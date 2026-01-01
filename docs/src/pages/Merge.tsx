import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Merge = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      merge
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Shallow merge objects (properties from the second overwrite the first)
    </p>

    <CodeBlock
      language="typescript"
      code={`import { merge } from 'fp-kit';

const a = { id: 1, name: 'Ada' };
const b = { name: 'Lovelace', active: true };

merge(a, b);
// { id: 1, name: 'Lovelace', active: true }`}
    />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      Deep merge?
    </h2>
    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
      For nested merges, use <code>mergeDeep</code> instead; <code>merge</code> only performs a shallow merge.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Related Functions
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/mergeDeep');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          mergeDeep
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Deep merge nested objects
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/mergeAll');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          mergeAll
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Merge many objects at once
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
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
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/evolve');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          evolve
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Transform values by key
        </p>
      </div>
    </div>
  </div>
);
