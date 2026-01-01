import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Prop = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      prop
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Safely read a property by key (returns undefined if missing)
    </p>

    <CodeBlock
      language="typescript"
      code={`import { prop } from 'fp-kit';

const user = { id: 1, name: 'Ada' };

prop('name', user); // 'Ada'
prop('age', user);  // undefined`}
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
          navigateTo('/object/propOr');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          propOr
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Read a property with a fallback default
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/path');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          path
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Read a nested path safely
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/pathOr');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          pathOr
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Read a nested path with a default
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/has');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          has
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Check if a key exists on an object
        </p>
      </div>
    </div>
  </div>
);
