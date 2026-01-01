import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Has = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      has
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Check whether an object has an own property
    </p>

    <CodeBlock
      language="typescript"
      code={`import { has } from 'fp-kit';

has('id', { id: 1 });     // true
has('name', { id: 1 });   // false`}
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
          navigateTo('/object/hasPath');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          hasPath
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Check for a nested path
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/prop');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          prop
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Read a property safely
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
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
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
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
    </div>
  </div>
);
