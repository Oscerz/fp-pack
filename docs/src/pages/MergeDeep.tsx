import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const MergeDeep = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      mergeDeep
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Deeply merge two objects (nested objects are merged recursively)
    </p>

    <CodeBlock
      language="typescript"
      code={`import { mergeDeep } from 'fp-kit';

const base = { user: { name: 'Ada', info: { age: 20 } }, meta: { id: 1 } };
const patch = { user: { info: { age: 21 } }, meta: { active: true } };

mergeDeep(base, patch);
// { user: { name: 'Ada', info: { age: 21 } }, meta: { id: 1, active: true } }`}
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
          navigateTo('/object/merge');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          merge
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Shallow merge two objects
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
